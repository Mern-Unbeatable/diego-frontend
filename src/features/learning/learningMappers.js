import i18n from '../../language/i18n';

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

const isLessonCompleted = (lesson) => {
  if (!lesson) return false;
  if (lesson.isCompleted) return true;
  if (['SCORM', 'SCORM_12'].includes(lesson.contentType)) {
    return ['COMPLETED', 'PASSED'].includes(lesson.scormStatus);
  }
  return lesson.completed === true;
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
    isAccessible: lesson.isAccessible ?? true,
    isCompleted: isLessonCompleted(lesson),
    contentUrl: lesson.contentUrl ?? null,
    youtubeUrl: lesson.youtubeUrl ?? null,
    scormPackageUrl: lesson.scormPackageUrl ?? null,
    scormEntryPoint: lesson.scormEntryPoint ?? null,
    timeSpentSecs: lesson.timeSpentSecs ?? 0,
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
    let isLocked = item.isLocked ?? false;
    let isAccessible = item.isAccessible !== false;

    if (navigationMode === 'SEQUENTIAL') {
      const previousIncomplete = allModules
        .slice(0, index)
        .some((module) => !module.isCompleted);
      if (previousIncomplete) {
        isLocked = true;
        isAccessible = false;
      }
    } else if (item.isLocked) {
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
