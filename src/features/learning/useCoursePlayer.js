import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
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
} from './learningService';
import {
  mapCoursePlayerData,
  mapQuizAnswersForApi,
  mapQuizQuestionsForUi,
} from './learningMappers';

export const useCoursePlayer = (courseId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [scormSession, setScormSession] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  const loadPlayer = useCallback(async () => {
    if (!courseId) return;

    setLoading(true);
    setError(null);

    try {
      const [courseRes, progressRes, quizzesRes, quizProgressRes] = await Promise.all([
        getCourseByIdService(courseId),
        getLessonProgressService(courseId),
        getAvailableQuizzesService(courseId),
        getMyQuizProgressService(courseId),
      ]);

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

      const firstLesson = mapped.modules.find((m) => m.type !== 'quiz');
      const currentModule =
        mapped.modules.find((m) => m.status === 'current') || firstLesson;

      if (currentModule?.type !== 'quiz') {
        setActiveLessonId(currentModule?.id ?? null);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Errore nel caricamento del corso';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadPlayer();
  }, [loadPlayer]);

  const loadLessonDetail = useCallback(
    async (lessonId) => {
      if (!courseId || !lessonId) return null;

      setLessonLoading(true);
      try {
        const response = await getLessonByIdService(courseId, lessonId);
        const lesson = response?.data?.lesson ?? null;
        setActiveLesson(lesson);
        return lesson;
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err?.message || 'Impossibile caricare la lezione',
        );
        return null;
      } finally {
        setLessonLoading(false);
      }
    },
    [courseId],
  );

  useEffect(() => {
    if (!activeLessonId || !playerData) return;
    loadLessonDetail(activeLessonId);
  }, [activeLessonId, loadLessonDetail, playerData]);

  const selectModule = useCallback(
    async (moduleId) => {
      const module = playerData?.modules?.find((m) => m.id === moduleId);
      if (!module) return;

      if (module.status === 'locked') {
        toast.error('Completa le lezioni precedenti per sbloccare questo contenuto.');
        return;
      }

      if (module.type === 'quiz') {
        setActiveQuiz(null);
        setQuizLoading(true);
        try {
          const response = await startQuizService(
            courseId,
            module.quizId,
            playerData.enrollment.id,
          );
          const quiz = response?.data?.quiz ?? null;
          setActiveQuiz({
            ...quiz,
            uiQuestions: mapQuizQuestionsForUi(quiz),
            moduleTitle: module.title,
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

  const completeLesson = useCallback(
    async (lessonId, timeSpentSecs = 0) => {
      if (!courseId || !lessonId) return;

      try {
        await trackLessonProgressService(courseId, lessonId, {
          completed: true,
          timeSpentSecs,
        });
        toast.success('Lezione completata');
        await loadPlayer();
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err?.message || 'Errore nel salvataggio del progresso',
        );
      }
    },
    [courseId, loadPlayer],
  );

  const launchScorm = useCallback(
    async (lessonId) => {
      if (!playerData?.enrollment?.id) return null;

      try {
        const response = await scormLaunchService({
          enrollmentId: playerData.enrollment.id,
          lessonId,
        });
        const session = response?.data ?? response;
        setScormSession(session);
        return session;
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err?.message || 'Impossibile avviare SCORM',
        );
        return null;
      }
    },
    [playerData?.enrollment?.id],
  );

  const finishScorm = useCallback(
    async (sessionId, status = 'completed') => {
      try {
        await scormFinishService({
          sessionId,
          cmiData: {
            'cmi.core.lesson_status': status,
            'cmi.completion_status': status,
          },
        });
        toast.success('Lezione SCORM completata');
        setScormSession(null);
        await loadPlayer();
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err?.message || 'Errore chiusura SCORM',
        );
      }
    },
    [loadPlayer],
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
        await loadPlayer();
        return result;
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err?.message || 'Invio quiz fallito',
        );
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
    activeQuiz,
    quizLoading,
    submittingQuiz,
    loadPlayer,
    selectModule,
    completeLesson,
    launchScorm,
    finishScorm,
    submitQuiz,
    closeQuiz,
  };
};
