import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { normalizeApiError } from '../../config/api/client';
import {
  getAvailableQuizzesService,
  getCourseByIdService,
  getLessonByIdService,
  getLessonProgressService,
  getMyQuizProgressService,
  scormFinishService,
  scormLaunchService,
  startQuizService,
  submitQuizService,
  trackLessonProgressService,
  getScormProgressService,
  logAntiCheatService,
} from './learningService';
import {
  mapCoursePlayerData,
  mapQuizAnswersForApi,
  mapQuizQuestionsForUi,
  findNextAccessibleModule,
  findPreviousAccessibleModule,
  applyLessonCompletionToModules,
  isModuleAccessible,
} from './learningMappers';
import { MIN_WATCH_PERCENT } from './trackingConstants';
import { unwrapApiData } from '../api/utils';

const mapQuizResultForUi = (apiResult, fallbackPassScore = 70) => ({
  score: apiResult?.scorePercent ?? 0,
  correct: apiResult?.correctCount ?? 0,
  total: apiResult?.totalQuestions ?? 0,
  passed: Boolean(apiResult?.passed),
  pendingManualReview: apiResult?.pendingManualReview ?? false,
  passScore: apiResult?.passScorePercent ?? fallbackPassScore,
  time: '—',
  alreadySubmitted: apiResult?.alreadySubmitted ?? false,
});

const LESSON_ADVANCE_DELAY_MS = 450;
const LESSON_UNMOUNT_DELAY_MS = 150;

export const useCoursePlayer = (courseId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [scormSession, setScormSession] = useState(null);
  const [finishingScorm, setFinishingScorm] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  const activeLessonIdRef = useRef(null);
  const activeQuizIdRef = useRef(null);
  const advancedLessonsRef = useRef(new Set());

  useEffect(() => {
    activeLessonIdRef.current = activeLessonId;
  }, [activeLessonId]);

  useEffect(() => {
    activeQuizIdRef.current = activeQuiz?.id ?? null;
  }, [activeQuiz?.id]);

  const loadPlayer = useCallback(async ({
    preserveSelection = false,
    advanceFromModuleId = null,
  } = {}) => {
    if (!courseId) return null;

    const keepLessonId = preserveSelection ? activeLessonIdRef.current : null;
    const keepQuizId = preserveSelection ? activeQuizIdRef.current : null;
    const advanceFromId = advanceFromModuleId ?? keepLessonId;

    if (!preserveSelection && !advanceFromModuleId) {
      setLoading(true);
    }
    setError(null);

    try {
      const settled = await Promise.allSettled([
        getCourseByIdService(courseId),
        getLessonProgressService(courseId),
        getAvailableQuizzesService(courseId),
        getMyQuizProgressService(courseId),
      ]);

      const courseRes = settled[0].status === 'fulfilled' ? settled[0].value : null;
      const progressRes = settled[1].status === 'fulfilled' ? settled[1].value : null;
      const quizzesRes = settled[2].status === 'fulfilled' ? settled[2].value : null;
      const quizProgressRes = settled[3].status === 'fulfilled' ? settled[3].value : null;

      if (!courseRes) {
        const progressErr = settled[1].status === 'rejected' ? settled[1].reason : null;
        throw progressErr ?? settled[0].reason ?? new Error('Errore nel caricamento del corso');
      }

      const mapped = mapCoursePlayerData({
        coursePayload: courseRes,
        progressPayload: progressRes,
        quizzesPayload: quizzesRes,
        quizProgressPayload: quizProgressRes,
      });

      if (!mapped?.enrollment?.id) {
        throw new Error('Non sei iscritto a questo corso.');
      }

      setPlayerData(mapped);

      if (advanceFromId) {
        const nextModule = findNextAccessibleModule(mapped.modules, advanceFromId);
        if (nextModule) {
          setActiveQuiz(null);
          setScormSession(null);
          if (nextModule.type === 'quiz') {
            setActiveLessonId(null);
          } else {
            setActiveLessonId(nextModule.id);
          }
          return { mapped, nextModule };
        }
      }

      if (preserveSelection) {
        if (keepQuizId) {
          return mapped;
        }
        if (keepLessonId) {
          setActiveLessonId(keepLessonId);
          return mapped;
        }
      }

      const firstLesson = mapped.modules.find((m) => m.type !== 'quiz');
      const currentModule =
        mapped.modules.find((m) => m.status === 'current') || firstLesson;

      if (currentModule?.type !== 'quiz') {
        setActiveLessonId(currentModule?.id ?? null);
      }

      return mapped;
    } catch (err) {
      const message = normalizeApiError(err).message;

      if (preserveSelection || advanceFromModuleId) {
        console.warn('Course player refresh failed:', message);
        return null;
      }

      setError(message);
      return null;
    } finally {
      if (!preserveSelection && !advanceFromModuleId) {
        setLoading(false);
      }
    }
  }, [courseId]);

  useEffect(() => {
    advancedLessonsRef.current = new Set();
    loadPlayer();
  }, [courseId, loadPlayer]);

  useEffect(() => {
    if (!playerData?.modules) return;
    playerData.modules.forEach((module) => {
      if (module.status === 'done' && module.type !== 'quiz') {
        advancedLessonsRef.current.add(module.id);
      }
    });
  }, [playerData?.modules]);

  useEffect(() => {
    if (!activeLessonId || !courseId) {
      setActiveLesson(null);
      return undefined;
    }

    let cancelled = false;
    setLessonLoading(true);
    setActiveLesson(null);

    getLessonByIdService(courseId, activeLessonId)
      .then((response) => {
        if (!cancelled) {
          setActiveLesson(response?.data?.lesson ?? null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(normalizeApiError(err).message || 'Impossibile caricare la lezione');
          setActiveLesson(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLessonLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeLessonId, courseId]);

  const selectModule = useCallback(
    async (moduleId, snapshot = null) => {
      const data = snapshot ?? playerData;
      const module = data?.modules?.find((m) => m.id === moduleId);
      if (!module) return;

      if (module.status === 'locked') {
        toast.error('Completa le lezioni precedenti per sbloccare questo contenuto.');
        return;
      }

      if (module.type === 'quiz') {
        setActiveLessonId(null);
        setScormSession(null);
        setActiveQuiz(null);
        setQuizLoading(true);
        try {
          const response = await startQuizService(
            courseId,
            module.quizId,
            data.enrollment.id,
          );
          const quiz = response?.data?.quiz ?? null;
          const passScore = module.passScorePercent ?? quiz.passScorePercent ?? 80;

          if (quiz?.alreadyPassed && quiz?.lastResult) {
            setActiveQuiz({
              ...quiz,
              uiQuestions: [],
              moduleTitle: module.title,
              passScorePercent: passScore,
              initialResult: mapQuizResultForUi(quiz.lastResult, passScore),
            });
            return;
          }

          setActiveQuiz({
            ...quiz,
            uiQuestions: mapQuizQuestionsForUi(quiz),
            moduleTitle: module.title,
            passScorePercent: passScore,
            initialResult: null,
          });
        } catch (err) {
          toast.error(
            err?.response?.data?.message || err?.message || 'Quiz non disponibile',
          );
        } finally {
          setQuizLoading(false);
        }
        return;
      }

      setActiveLessonId(moduleId);
      setScormSession(null);
    },
    [courseId, playerData],
  );

  const advanceToNextModuleLocal = useCallback(
    (completedModuleId, snapshot = null) => {
      const data = snapshot ?? playerData;
      const modules = data?.modules ?? [];
      const nextModule = findNextAccessibleModule(modules, completedModuleId);
      if (!nextModule) return null;

      setActiveQuiz(null);
      setScormSession(null);

      if (nextModule.type === 'quiz') {
        setActiveLessonId(null);
        selectModule(nextModule.id, data);
      } else {
        setActiveLessonId(nextModule.id);
      }

      return nextModule;
    },
    [playerData, selectModule],
  );

  const advanceAfterCompletion = useCallback(
    (completedModuleId) => new Promise((resolve) => {
      window.setTimeout(async () => {
        setActiveLesson(null);

        await new Promise((waitResolve) => {
          window.setTimeout(waitResolve, LESSON_UNMOUNT_DELAY_MS);
        });

        try {
          const result = await loadPlayer({ advanceFromModuleId: completedModuleId });
          if (result?.nextModule) {
            if (result.nextModule.type === 'quiz') {
              await selectModule(result.nextModule.id, result.mapped);
            }
            resolve(result.nextModule);
            return;
          }
        } catch {
          // loadPlayer handles errors internally; fall through to local navigation
        }

        resolve(advanceToNextModuleLocal(completedModuleId));
      }, LESSON_ADVANCE_DELAY_MS);
    }),
    [advanceToNextModuleLocal, loadPlayer, selectModule],
  );

  const completeLesson = useCallback(
    async (lessonId, timeSpentSecs = 0, extra = {}) => {
      if (!courseId || !lessonId) return;

      try {
        await trackLessonProgressService(courseId, lessonId, {
          completed: true,
          timeSpentSecs,
          watchPercent: extra.watchPercent ?? 100,
          lastPositionSecs: extra.lastPositionSecs,
        });

        advancedLessonsRef.current.add(lessonId);
        setPlayerData((prev) => {
          if (!prev) return prev;
          const modules = applyLessonCompletionToModules(
            prev.modules,
            lessonId,
            prev.course?.navigationMode ?? 'SEQUENTIAL',
            {
              watchPercent: extra.watchPercent ?? 100,
              lastPositionSecs: extra.lastPositionSecs,
            },
          );
          const completedLessons = modules.filter(
            (m) => m.type !== 'quiz' && m.isCompleted,
          ).length;
          const totalLessons = modules.filter((m) => m.type !== 'quiz').length;
          return {
            ...prev,
            modules,
            progress: totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : prev.progress,
          };
        });

        toast.success('Lezione completata');
        await advanceAfterCompletion(lessonId);
      } catch (err) {
        toast.error(
          err?.response?.data?.message
            || err?.message
            || 'Impossibile completare la lezione.',
        );
      }
    },
    [courseId, advanceAfterCompletion],
  );

  const trackVideoProgress = useCallback(
    async (lessonId, payload) => {
      if (!courseId || !lessonId) return null;

      const reachedThreshold =
        payload?.completed === true || (payload?.watchPercent ?? 0) >= MIN_WATCH_PERCENT;
      const alreadyAdvanced = advancedLessonsRef.current.has(lessonId);
      const isActiveLesson = lessonId === activeLessonIdRef.current;
      const shouldFinalize = reachedThreshold && !alreadyAdvanced && isActiveLesson;

      const savePayload = reachedThreshold
        ? {
            ...payload,
            completed: true,
            watchPercent: Math.max(payload?.watchPercent ?? 0, MIN_WATCH_PERCENT),
          }
        : payload;

      try {
        const response = await trackLessonProgressService(courseId, lessonId, savePayload);

        if (shouldFinalize) {
          advancedLessonsRef.current.add(lessonId);

          setPlayerData((prev) => {
            if (!prev) return prev;
            const modulesWithProgress = prev.modules.map((module) =>
              module.id === lessonId
                ? {
                    ...module,
                    watchPercent: Math.max(
                      module.watchPercent ?? 0,
                      savePayload.watchPercent ?? 0,
                    ),
                    lastPositionSecs: Math.max(
                      module.lastPositionSecs ?? 0,
                      savePayload.lastPositionSecs ?? savePayload.timeSpentSecs ?? 0,
                    ),
                    timeSpentSecs: Math.max(
                      module.timeSpentSecs ?? 0,
                      savePayload.timeSpentSecs ?? 0,
                    ),
                  }
                : module,
            );
            const modules = applyLessonCompletionToModules(
              modulesWithProgress,
              lessonId,
              prev.course?.navigationMode ?? 'SEQUENTIAL',
              savePayload,
            );
            const completedLessons = modules.filter(
              (m) => m.type !== 'quiz' && m.isCompleted,
            ).length;
            const totalLessons = modules.filter((m) => m.type !== 'quiz').length;
            return {
              ...prev,
              modules,
              progress: totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : prev.progress,
            };
          });

          toast.success('Lezione completata — passaggio alla lezione successiva');
          advanceAfterCompletion(lessonId);
        } else {
          setPlayerData((prev) => {
            if (!prev) return prev;
            const modules = prev.modules.map((module) =>
              module.id === lessonId
                ? {
                    ...module,
                    watchPercent: Math.max(
                      module.watchPercent ?? 0,
                      savePayload.watchPercent ?? 0,
                    ),
                    lastPositionSecs: Math.max(
                      module.lastPositionSecs ?? 0,
                      savePayload.lastPositionSecs ?? savePayload.timeSpentSecs ?? 0,
                    ),
                    timeSpentSecs: Math.max(
                      module.timeSpentSecs ?? 0,
                      savePayload.timeSpentSecs ?? 0,
                    ),
                  }
                : module,
            );
            return { ...prev, modules };
          });
        }

        return response?.data?.progress ?? response?.data ?? null;
      } catch (apiErr) {
        console.error('Video progress save failed:', apiErr?.message);
        if (shouldFinalize) {
          toast.error(
            apiErr?.response?.data?.message
              || apiErr?.message
              || 'Impossibile salvare il progresso. Completa le lezioni precedenti.',
          );
        }
        return null;
      }
    },
    [courseId, advanceAfterCompletion],
  );

  const logAntiCheat = useCallback(async (payload) => {
    if (!payload?.enrollmentId) return null;
    try {
      await logAntiCheatService(payload.enrollmentId, {
        lessonId: payload.lessonId,
        eventType: payload.eventType,
        metadata: payload.metadata,
      });
      return true;
    } catch (err) {
      console.error('Anti-cheat log failed:', err?.message);
      return null;
    }
  }, []);

  const pollScormProgress = useCallback(
    async (enrollmentId, lessonId) => {
      if (!enrollmentId) return null;
      try {
        const response = await getScormProgressService(enrollmentId, lessonId);
        const progressList = response?.data?.progress ?? response?.data?.data?.progress ?? [];
        const row = Array.isArray(progressList)
          ? progressList.find((item) => item.lessonId === lessonId)
          : null;
        if (!row) return null;
        return {
          scormStatus: row.scormStatus,
          scormScore: row.scormScore,
          isCompleted: row.completed || ['COMPLETED', 'PASSED'].includes(row.scormStatus),
        };
      } catch {
        return null;
      }
    },
    [],
  );

  const finalizeScormLesson = useCallback(
    async (completedLessonId) => {
      setScormSession(null);
      if (completedLessonId) {
        setPlayerData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            modules: applyLessonCompletionToModules(
              prev.modules,
              completedLessonId,
              prev.course?.navigationMode ?? 'SEQUENTIAL',
            ),
          };
        });
        await advanceAfterCompletion(completedLessonId);
      } else {
        await loadPlayer({ preserveSelection: true });
      }
    },
    [advanceAfterCompletion, loadPlayer],
  );

  const handleScormComplete = useCallback(async () => {
    const completedLessonId = activeLessonIdRef.current;
    toast.success('Lezione SCORM completata');
    await finalizeScormLesson(completedLessonId);
  }, [finalizeScormLesson]);

  const launchScorm = useCallback(
    async (lessonId) => {
      if (!playerData?.enrollment?.id) return null;

      try {
        const response = await scormLaunchService({
          enrollmentId: playerData.enrollment.id,
          lessonId,
        });
        const session = unwrapApiData(response);
        if (!session?.playerUrl) {
          toast.error('Sessione SCORM non avviata correttamente dal server.');
          return null;
        }
        setScormSession(session);
        return session;
      } catch (err) {
        toast.error(normalizeApiError(err).message || 'Impossibile avviare SCORM');
        return null;
      }
    },
    [playerData?.enrollment?.id],
  );

  const finishScorm = useCallback(
    async (sessionId, status = 'completed') => {
      const completedLessonId = activeLessonIdRef.current;
      setFinishingScorm(true);
      try {
        await scormFinishService({
          sessionId,
          cmiData: {
            'cmi.core.lesson_status': status,
            'cmi.completion_status': status,
          },
        });
        toast.success('Lezione SCORM completata');
        await finalizeScormLesson(completedLessonId);
      } catch (err) {
        toast.error(normalizeApiError(err).message || 'Errore chiusura SCORM');
      } finally {
        setFinishingScorm(false);
      }
    },
    [finalizeScormLesson],
  );

  const submitQuiz = useCallback(
    async (answersByIndex) => {
      if (!activeQuiz?.id || !playerData?.enrollment?.id) return null;

      setSubmittingQuiz(true);
      try {
        const answers = mapQuizAnswersForApi(activeQuiz.uiQuestions, answersByIndex);
        const response = await submitQuizService(courseId, activeQuiz.id, {
          enrollmentId: playerData.enrollment.id,
          answers,
        });
        const result = response?.data?.result ?? response?.result ?? null;

        if (!result) {
          toast.error('Risposta quiz non valida dal server.');
          return null;
        }

        const uiResult = mapQuizResultForUi(
          result,
          activeQuiz.passScorePercent ?? result.passScorePercent ?? 80,
        );

        loadPlayer({ preserveSelection: true }).catch(() => {});

        return uiResult;
      } catch (err) {
        const message =
          err?.response?.data?.message || err?.message || 'Invio quiz fallito';

        if (message.toLowerCase().includes('already passed')) {
          const fallbackResult = mapQuizResultForUi(
            activeQuiz.lastResult ?? activeQuiz.initialResult,
            activeQuiz.passScorePercent ?? 80,
          );
          if (fallbackResult.total > 0 || fallbackResult.score > 0) {
            fallbackResult.alreadySubmitted = true;
            fallbackResult.passed = true;
            loadPlayer({ preserveSelection: true }).catch(() => {});
            return fallbackResult;
          }
        }

        toast.error(message);
        return null;
      } finally {
        setSubmittingQuiz(false);
      }
    },
    [activeQuiz, courseId, loadPlayer, playerData?.enrollment?.id],
  );

  const closeQuiz = useCallback(() => {
    setActiveQuiz(null);
  }, []);

  const currentModuleId = useMemo(() => {
    if (activeQuiz?.id) {
      const quizModule = playerData?.modules?.find(
        (m) => m.type === 'quiz' && m.quizId === activeQuiz.id,
      );
      return quizModule?.id ?? null;
    }
    return activeLessonId;
  }, [activeQuiz?.id, activeLessonId, playerData?.modules]);

  const navigation = useMemo(() => {
    const modules = playerData?.modules ?? [];
    const resolvedModule =
      modules.find((m) => m.id === currentModuleId)
      ?? modules.find((m) => m.id === activeLessonId)
      ?? null;
    const resolvedId = resolvedModule?.id ?? currentModuleId ?? activeLessonId ?? null;
    const currentIndex = resolvedId
      ? modules.findIndex((m) => m.id === resolvedId)
      : -1;

    const previous = resolvedId
      ? findPreviousAccessibleModule(modules, resolvedId)
      : null;
    const next = resolvedId
      ? findNextAccessibleModule(modules, resolvedId)
      : modules.find((m) => isModuleAccessible(m) && m.status !== 'done') ?? null;

    return {
      currentIndex,
      previous,
      next,
      hasPrevious: Boolean(previous),
      hasNext: Boolean(next),
    };
  }, [activeLessonId, currentModuleId, playerData?.modules]);

  const goToPreviousModule = useCallback(() => {
    if (navigation.previous && navigation.previous.status !== 'locked') {
      setActiveQuiz(null);
      selectModule(navigation.previous.id);
    }
  }, [navigation.previous, selectModule]);

  const goToNextModule = useCallback(() => {
    const next = navigation.next
      ?? (currentModuleId
        ? findNextAccessibleModule(playerData?.modules ?? [], currentModuleId)
        : null);
    if (next && isModuleAccessible(next)) {
      setActiveQuiz(null);
      selectModule(next.id);
    } else if (next?.status === 'locked') {
      toast.error('Completa le lezioni precedenti per sbloccare il contenuto successivo.');
    }
  }, [currentModuleId, navigation.next, playerData?.modules, selectModule]);

  const activeModule = useMemo(
    () => playerData?.modules?.find((m) => m.id === activeLessonId) ?? null,
    [activeLessonId, playerData?.modules],
  );

  return {
    loading,
    error,
    playerData,
    activeLessonId,
    activeLesson,
    activeModule,
    lessonLoading,
    scormSession,
    finishingScorm,
    activeQuiz,
    quizLoading,
    submittingQuiz,
    loadPlayer,
    selectModule,
    completeLesson,
    trackVideoProgress,
    logAntiCheat,
    pollScormProgress,
    handleScormComplete,
    launchScorm,
    finishScorm,
    submitQuiz,
    closeQuiz,
    navigation,
    goToPreviousModule,
    goToNextModule,
  };
};
