import {
  mapCourseFormToPayload,
  mapLessonFormToPayload,
  mapQuizFormToPayload,
  extractCreatedCourseId,
  extractCreatedQuizId,
} from '../admin/adminMappers';

const appendPayloadToFormData = (formData, payload) => {
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
      return;
    }
    formData.append(key, String(value));
  });
};

export const buildCourseFormData = (formValues, files = {}, tenantId) => {
  const payload = mapCourseFormToPayload(formValues, tenantId ? { tenantId } : {});
  const formData = new FormData();
  appendPayloadToFormData(formData, payload);

  if (files.thumbnail) formData.append('thumbnailUrl', files.thumbnail);
  if (files.document) formData.append('documentUrl', files.document);
  if (files.scorm) formData.append('scormPackageUrl', files.scorm);

  return formData;
};

export const buildLessonFormData = (lesson, index, options = {}) => {
  const mapped = mapLessonFormToPayload(lesson, index, options);
  if (!mapped) return null;

  const formData = new FormData();
  appendPayloadToFormData(formData, mapped.payload);

  if (mapped.files.contentUrl) {
    formData.append('contentUrl', mapped.files.contentUrl);
  }
  if (mapped.files.scormPackageUrl) {
    formData.append('scormPackageUrl', mapped.files.scormPackageUrl);
  }

  return formData;
};

export const buildQuizPayload = (quizData) => mapQuizFormToPayload(quizData);

export const getCreatedCourseId = (response) => extractCreatedCourseId(response);

export const getCreatedQuizId = (response, fallbackId = null) =>
  extractCreatedQuizId(response) || fallbackId;

export const saveLessonsForCourse = async ({
  courseId,
  lessons,
  createLesson,
}) => {
  const lessonResults = [];
  const lessonErrors = [];

  for (let index = 0; index < lessons.length; index += 1) {
    const lesson = lessons[index];
    if (lesson?.isSaved) continue;

    const formData = buildLessonFormData(lesson, index);
    if (!formData) {
      lessonErrors.push(`Lezione ${index + 1}: titolo o file mancante`);
      continue;
    }

    try {
      const lessonResponse = await createLesson({ courseId, formData }).unwrap();
      lessonResults.push(lessonResponse);
    } catch (error) {
      lessonErrors.push(
        `Lezione ${index + 1}: ${error?.data?.message || error?.message || 'errore'}`,
      );
    }
  }

  return { lessons: lessonResults, lessonErrors };
};

export const saveQuizForCourse = async ({
  courseId,
  quizData,
  createQuiz,
  updateQuiz,
  publishQuiz,
}) => {
  if (!courseId) {
    throw new Error('Salva prima il corso con il pulsante "Salva corso"');
  }
  if (!quizData) {
    throw new Error('Configura il quiz prima di salvarlo');
  }

  const quizPayload = buildQuizPayload(quizData);
  const existingQuizId = quizData.savedQuizId || quizData.quizId || null;

  const quizResult = existingQuizId
    ? await updateQuiz({ quizId: existingQuizId, data: quizPayload }).unwrap()
    : await createQuiz({ courseId, data: quizPayload }).unwrap();

  const quizId = getCreatedQuizId(quizResult, existingQuizId);
  let published = false;

  if (quizId && quizData.publish) {
    await publishQuiz({ quizId, isPublished: true }).unwrap();
    published = true;
  }

  return {
    quiz: quizResult,
    quizId,
    published,
    isUpdate: Boolean(existingQuizId),
  };
};
