import i18n from '../../language/i18n';
import { MIN_WATCH_PERCENT } from './trackingConstants';

const getLang = () => (i18n.language || 'it').split('-')[0];

export const pickLocalized = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  const lang = getLang();
  return (
    value[lang] ||
    value.it ||
    value.en ||
    Object.values(value).find((v) => typeof v === 'string' && v) ||
    ''
  );
};

const formatDuration = (durationSecs) => {
  const secs = Number(durationSecs);
  if (!Number.isFinite(secs) || secs <= 0) return '—';
  const mins = Math.ceil(secs / 60);
  return `${mins} min`;
};

/**
 * Completed only when backend marks it OR real watch/read threshold is met.
 * Partial watchPercent below threshold stays unplayed.
 */
const isLessonCompleted = (lesson) => {
  if (!lesson) return false;
  if (lesson.isCompleted === true) return true;
  if (lesson.completed === true) return true;
  if (['SCORM', 'SCORM_12'].includes(lesson.contentType)) {
    return ['COMPLETED', 'PASSED'].includes(lesson.scormStatus);
  }
  if ((lesson.watchPercent ?? 0) >= MIN_WATCH_PERCENT) return true;
  const timeSpentSecs = lesson.timeSpentSecs ?? 0;
  const durationSecs = lesson.durationSecs ?? null;
  const effectiveMinSecs = durationSecs && durationSecs > 0 ? durationSecs : 120;
  if (['PDF', 'FILE', 'WORD', 'EXCEL'].includes(lesson.contentType)) {
    return timeSpentSecs >= Math.ceil(effectiveMinSecs * (MIN_WATCH_PERCENT / 100));
  }
  return false;
};

export const isModuleAccessible = (module) =>
  Boolean(module && module.status !== 'locked');

export const findNextAccessibleModule = (modules, currentModuleId) => {
  if (!Array.isArray(modules) || !currentModuleId) return null;
  const currentIndex = modules.findIndex((module) => module.id === currentModuleId);
  if (currentIndex < 0) return null;
  return modules.slice(currentIndex + 1).find((module) => isModuleAccessible(module)) ?? null;
};

export const findPreviousAccessibleModule = (modules, currentModuleId) => {
  if (!Array.isArray(modules) || !currentModuleId) return null;
  const currentIndex = modules.findIndex((module) => module.id === currentModuleId);
  if (currentIndex <= 0) return null;
  for (let i = currentIndex - 1; i >= 0; i -= 1) {
    if (isModuleAccessible(modules[i])) return modules[i];
  }
  return null;
};

const hasSequentialBlockers = (allModules, index) =>
  allModules.slice(0, index).some((module) => {
    if (module.type === 'quiz') return false;
    if (!module.isRequired) return false;
    return !module.isCompleted;
  });

export const refreshModuleLocks = (modules, navigationMode = 'SEQUENTIAL') => {
  if (!Array.isArray(modules)) return [];

  let foundCurrent = false;

  return modules.map((item, index) => {
    let isLocked = Boolean(item.isLocked);
    let isAccessible = true;

    if (navigationMode === 'SEQUENTIAL') {
      if (hasSequentialBlockers(modules, index)) {
        isLocked = true;
        isAccessible = false;
      } else {
        isLocked = false;
        isAccessible = true;
      }
    } else if (item.isLocked) {
      isLocked = true;
      isAccessible = false;
    }

    let status = 'upcoming';
    if (item.isCompleted) {
      status = 'done';
    } else if (isLocked || !isAccessible) {
      status = 'locked';
    } else if (!foundCurrent) {
      status = 'current';
      foundCurrent = true;
    }

    return {
      ...item,
      isLocked,
      isAccessible,
      status,
    };
  });
};

export const applyLessonCompletionToModules = (
  modules,
  completedLessonId,
  navigationMode = 'SEQUENTIAL',
  extra = {},
) => {
  if (!Array.isArray(modules) || !completedLessonId) return modules;

  const updated = modules.map((module) =>
    module.id === completedLessonId
      ? {
          ...module,
          isCompleted: true,
          watchPercent: Math.max(module.watchPercent ?? 0, extra.watchPercent ?? MIN_WATCH_PERCENT),
          lastPositionSecs: extra.lastPositionSecs ?? module.lastPositionSecs ?? 0,
        }
      : module,
  );

  return refreshModuleLocks(updated, navigationMode);
};

export const mapCoursePlayerData = ({
  coursePayload,
  progressPayload,
  quizzesPayload,
  quizProgressPayload,
}) => {
  const course = coursePayload?.data?.course ?? coursePayload?.course ?? null;
  const progressData = progressPayload?.data?.progress ?? progressPayload?.progress ?? null;
  const quizzes =
    quizzesPayload?.data?.quizzes ?? quizzesPayload?.quizzes ?? [];
  const quizProgressList =
    quizProgressPayload?.data?.progress ?? quizProgressPayload?.progress ?? [];
  const quizProgressMap = new Map(
    quizProgressList.map((item) => [item.quizId, item]),
  );

  if (!course) return null;

  const enrollment = progressData?.enrollment ?? null;
  const summary = progressData?.summary ?? {};
  const lessonRows = progressData?.lessons ?? course.lessons ?? [];

  const lessons = lessonRows.map((lesson) => ({
    id: lesson.lessonId ?? lesson.id,
    title: lesson.title ?? pickLocalized(lesson.title),
    orderIndex: lesson.orderIndex ?? 0,
    contentType: lesson.contentType,
    durationSecs: lesson.durationSecs ?? null,
    isRequired: lesson.isRequired ?? true,
    isLocked: lesson.isLocked ?? false,
    isAccessible: true,
    isCompleted: isLessonCompleted(lesson),
    contentUrl: lesson.contentUrl ?? null,
    youtubeUrl: lesson.youtubeUrl ?? null,
    scormPackageUrl: lesson.scormPackageUrl ?? null,
    scormEntryPoint: lesson.scormEntryPoint ?? null,
    timeSpentSecs: lesson.timeSpentSecs ?? 0,
    watchPercent: lesson.watchPercent ?? 0,
    lastPositionSecs: lesson.lastPositionSecs ?? 0,
    scormStatus: lesson.scormStatus ?? null,
  }));

  const quizModules = quizzes
    .filter((q) => q.isPublished !== false)
    .map((quiz) => {
      const progress = quizProgressMap.get(quiz.id);
      return {
        id: `quiz-${quiz.id}`,
        quizId: quiz.id,
        title: pickLocalized(quiz.quizTitle),
        quizType: quiz.quizType,
        passScorePercent: quiz.passScorePercent ?? 80,
        orderIndex:
          1000 +
          (quiz.quizType === 'FINAL_TEST'
            ? 2
            : quiz.quizType === 'POST_TEST'
              ? 1
              : 0),
        type: 'quiz',
        isCompleted: progress?.hasPassed ?? false,
        isAccessible: true,
      };
    });

  const allModules = [...lessons, ...quizModules].sort(
    (a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0),
  );

  const navigationMode = course.navigationMode ?? 'SEQUENTIAL';
  let foundCurrent = false;

  const modules = allModules.map((item, index) => {
    let isLocked = Boolean(item.isLocked);
    let isAccessible = true;

    if (navigationMode === 'SEQUENTIAL') {
      if (hasSequentialBlockers(allModules, index)) {
        isLocked = true;
        isAccessible = false;
      } else {
        isLocked = false;
        isAccessible = true;
      }
    } else if (item.isLocked) {
      isLocked = true;
      isAccessible = false;
    }

    let status = 'upcoming';
    if (item.isCompleted) {
      status = 'done';
    } else if (isLocked || !isAccessible) {
      status = 'locked';
    } else if (!foundCurrent) {
      status = 'current';
      foundCurrent = true;
    }

    return {
      ...item,
      isLocked,
      isAccessible,
      status,
      time:
        item.type === 'quiz'
          ? 'Quiz'
          : formatDuration(item.durationSecs),
    };
  });

  return {
    course: {
      id: course.id,
      slug: course.slug,
      title: pickLocalized(course.courseTitle),
      description: pickLocalized(course.description),
      thumbnailUrl: course.thumbnailUrl ?? null,
      videoUrl: course.videoUrl ?? null,
      navigationMode: course.navigationMode ?? 'SEQUENTIAL',
      passScorePercent: course.passScorePercent ?? 80,
    },
    certificate: progressData?.certificate ?? null,
    enrollment: enrollment
      ? {
          id: enrollment.id,
          status: enrollment.status,
          startedAt: enrollment.startedAt,
          completedAt: enrollment.completedAt,
          expiresAt: enrollment.expiresAt,
        }
      : null,
    progress: summary.percentage ?? 0,
    modules,
    lessons,
    quizzes: quizModules,
  };
};

export const mapQuizQuestionsForUi = (quiz) => {
  const questions = Array.isArray(quiz?.questions) ? quiz.questions : [];

  return questions.map((question) => ({
    id: question.id,
    text: pickLocalized(question.text),
    type: question.type ?? 'SINGLE',
    options: (question.options ?? []).map((option) => ({
      id: option.id,
      label: pickLocalized(option.text),
    })),
    passScorePercent: quiz.passScorePercent ?? 80,
  }));
};

export const mapQuizAnswersForApi = (questions, answersByIndex) =>
  questions.map((question, index) => {
    const answer = answersByIndex[index];
    if (!answer) {
      return { questionId: question.id, selectedOptionIds: [] };
    }

    if (question.type === 'FREE_TEXT') {
      return { questionId: question.id, textAnswer: String(answer) };
    }

    if (Array.isArray(answer)) {
      return { questionId: question.id, selectedOptionIds: answer };
    }

    return { questionId: question.id, selectedOptionIds: [answer] };
  });
