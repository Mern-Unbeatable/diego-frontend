import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';
import { formatApiErrorMessage } from '../../config/api/errorHandler';
import {
  mapCourseFormToPayload,
  mapLessonFormToPayload,
  mapQuizFormToPayload,
  resolveQuizIsPublished,
  extractCreatedCourseId,
  extractCreatedQuizId,
} from './adminMappers';

const unwrap = (response) => response?.data ?? response;

export const getPlatformDashboardService = async ({ periodDays = 30, signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.admin.DASHBOARD,
    params: { periodDays },
    signal,
  });
  return unwrap(response);
};

export const getEmergencyControlsService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.admin.EMERGENCY_CONTROLS,
    signal,
  });
  return unwrap(response);
};

export const updateEmergencyControlsService = async (payload, { signal } = {}) => {
  const response = await request({
    method: 'PATCH',
    url: endpoints.admin.EMERGENCY_CONTROLS,
    data: payload,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return unwrap(response);
};

export const getLicensesService = async (params = {}, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.admin.LICENSES,
    params,
    signal,
  });
  return unwrap(response);
};

export const createLicenseService = async (payload, { signal } = {}) => {
  const response = await request({
    method: 'POST',
    url: endpoints.admin.LICENSES,
    data: payload,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return unwrap(response);
};

export const updateLicenseService = async (userId, payload, { signal } = {}) => {
  const response = await request({
    method: 'PATCH',
    url: endpoints.admin.LICENSE_BY_USER(userId),
    data: payload,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return unwrap(response);
};

export const deleteLicenseService = async (userId, { signal } = {}) => {
  const response = await request({
    method: 'DELETE',
    url: endpoints.admin.LICENSE_BY_USER(userId),
    signal,
  });
  return unwrap(response);
};

export const getLicensePlansService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.admin.LICENSE_PLANS,
    params: { limit: 100, sortBy: 'sortOrder', sortOrder: 'asc' },
    signal,
  });
  return unwrap(response);
};

export const createLicensePlanService = async (payload, { signal } = {}) => {
  const response = await request({
    method: 'POST',
    url: endpoints.admin.LICENSE_PLANS,
    data: payload,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return unwrap(response);
};

export const updateLicensePlanService = async (planId, payload, { signal } = {}) => {
  const response = await request({
    method: 'PATCH',
    url: endpoints.admin.LICENSE_PLAN_BY_ID(planId),
    data: payload,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return unwrap(response);
};

export const getCoursesService = async (params = {}, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.admin.COURSES,
    params,
    signal,
  });
  return unwrap(response);
};

export const createCourseService = async ({ payload, files = {} }, { signal } = {}) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
      return;
    }
    formData.append(key, String(value));
  });

  if (files.thumbnail) formData.append('thumbnailUrl', files.thumbnail);
  if (files.document) formData.append('documentUrl', files.document);
  if (files.scorm) formData.append('scormPackageUrl', files.scorm);
  if (files.video) formData.append('videoUrl', files.video);

  return unwrap(
    await request({
      method: 'POST',
      url: endpoints.admin.COURSES,
      data: formData,
      signal,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000,
    }),
  );
};

export const createQuizService = async (courseId, payload, { signal } = {}) => {
  const response = await request({
    method: 'POST',
    url: endpoints.admin.QUIZ_CREATE(courseId),
    data: payload,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return unwrap(response);
};

export const updateQuizService = async (quizId, payload, { signal } = {}) => {
  const response = await request({
    method: 'PATCH',
    url: endpoints.admin.QUIZ_UPDATE(quizId),
    data: payload,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return unwrap(response);
};

export const saveQuizForCourseService = async (
  courseId,
  quizData,
  { signal } = {},
) => {
  if (!courseId) {
    throw new Error('Salva prima il corso con il pulsante "Salva corso"');
  }

  if (!quizData) {
    throw new Error('Configura il quiz prima di salvarlo');
  }

  const quizPayload = mapQuizFormToPayload(quizData);
  const existingQuizId = quizData.savedQuizId || quizData.quizId || null;

  const quizResult = existingQuizId
    ? await updateQuizService(existingQuizId, quizPayload, { signal })
    : await createQuizService(courseId, quizPayload, { signal });

  const quizId = extractCreatedQuizId(quizResult) || existingQuizId;
  const isPublished = resolveQuizIsPublished(quizData);
  let published = isPublished;

  if (quizId) {
    await publishQuizService(quizId, isPublished, { signal });
  }

  return {
    quiz: quizResult,
    quizId,
    published,
    isUpdate: Boolean(existingQuizId),
  };
};

/** @deprecated use saveQuizForCourseService */
export const createQuizForCourseService = saveQuizForCourseService;

const attachQuizToCourse = async (courseId, quizData, { signal } = {}) => {
  if (!quizData) {
    return { quiz: null, quizId: null, quizError: null, published: false };
  }

  try {
    const result = await saveQuizForCourseService(courseId, quizData, { signal });
    return {
      quiz: result.quiz,
      quizId: result.quizId,
      quizError: null,
      published: result.published,
    };
  } catch (error) {
    return {
      quiz: null,
      quizId: null,
      quizError: formatApiErrorMessage(error),
      published: false,
    };
  }
};

export const publishQuizService = async (quizId, isPublished = true, { signal } = {}) => {
  const response = await request({
    method: 'PATCH',
    url: endpoints.admin.QUIZ_PUBLISH(quizId),
    data: { isPublished },
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return unwrap(response);
};

export const createLessonService = async (
  courseId,
  payload,
  files = {},
  { signal } = {},
) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
      return;
    }
    formData.append(key, String(value));
  });

  if (files.contentUrl) formData.append('contentUrl', files.contentUrl);
  if (files.scormPackageUrl) formData.append('scormPackageUrl', files.scormPackageUrl);

  const response = await request({
    method: 'POST',
    url: endpoints.admin.LESSON_CREATE(courseId),
    data: formData,
    signal,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 300000,
  });

  return unwrap(response);
};

const saveLessonsForCourse = async (courseId, lessons, { signal } = {}) => {
  const lessonResults = [];
  const lessonErrors = [];

  for (let index = 0; index < lessons.length; index += 1) {
    const mappedLesson = mapLessonFormToPayload(lessons[index], index);
    if (!mappedLesson) {
      lessonErrors.push(`Lezione ${index + 1}: titolo o file mancante`);
      continue;
    }

    try {
      const lessonResponse = await createLessonService(
        courseId,
        mappedLesson.payload,
        mappedLesson.files,
        { signal },
      );
      lessonResults.push(lessonResponse);
    } catch (error) {
      lessonErrors.push(
        `Lezione ${index + 1}: ${error?.message || 'errore durante il caricamento'}`,
      );
    }
  }

  return { lessons: lessonResults, lessonErrors };
};

export const createLessonsForCourseService = async (
  courseId,
  lessons,
  { signal } = {},
) => {
  if (!courseId) {
    throw new Error('Salva prima il corso prima di aggiungere le lezioni');
  }

  if (!lessons?.length) {
    throw new Error('Aggiungi almeno una lezione da salvare');
  }

  return saveLessonsForCourse(courseId, lessons, { signal });
};

export const createCourseOnlyService = async (
  { formData, courseFiles = {} },
  { signal } = {},
) => {
  const coursePayload = mapCourseFormToPayload(formData, {
    tenantId: formData.tenantId,
  });

  const courseResponse = await createCourseService(
    { payload: coursePayload, files: courseFiles },
    { signal },
  );

  const courseId = extractCreatedCourseId(courseResponse);
  if (!courseId) {
    throw new Error('Corso creato ma ID non ricevuto dal server');
  }

  return {
    courseId,
    course: courseResponse,
  };
};

export const createCourseWithContentService = async (
  { formData, courseFiles = {}, lessons = [], quizData },
  { signal } = {},
) => {
  const coursePayload = mapCourseFormToPayload(formData, {
    tenantId: formData.tenantId,
  });

  const courseResponse = await createCourseService(
    { payload: coursePayload, files: courseFiles },
    { signal },
  );

  const courseId = extractCreatedCourseId(courseResponse);
  if (!courseId) {
    throw new Error('Corso creato ma ID non ricevuto dal server');
  }

  const { lessons: lessonResults, lessonErrors } = await saveLessonsForCourse(
    courseId,
    lessons,
    { signal },
  );

  let quizResult = null;
  let quizError = null;

  if (quizData) {
    const quizAttachment = await attachQuizToCourse(courseId, quizData, { signal });
    quizResult = quizAttachment.quiz;
    quizError = quizAttachment.quizError;
  }

  return {
    courseId,
    course: courseResponse,
    lessons: lessonResults,
    lessonErrors,
    quiz: quizResult,
    quizError,
  };
};
