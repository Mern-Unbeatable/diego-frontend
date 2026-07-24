import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

export const getCourseByIdService = (courseId, { signal } = {}) =>
  request({
    method: 'GET',
    url: endpoints.learning.COURSE_BY_ID(courseId),
    signal,
  });

export const getLessonProgressService = (courseId, { signal } = {}) =>
  request({
    method: 'GET',
    url: endpoints.learning.LESSON_PROGRESS(courseId),
    signal,
  });

export const getLessonByIdService = (courseId, lessonId, { signal } = {}) =>
  request({
    method: 'GET',
    url: endpoints.learning.LESSON_BY_ID(courseId, lessonId),
    params: { includeProgress: true },
    signal,
  });

export const trackLessonProgressService = (
  courseId,
  lessonId,
  payload,
  { signal } = {},
) =>
  request({
    method: 'PATCH',
    url: endpoints.learning.TRACK_LESSON_PROGRESS(courseId, lessonId),
    data: payload,
    signal,
  });

export const getAvailableQuizzesService = (courseId, { signal } = {}) =>
  request({
    method: 'GET',
    url: endpoints.learning.QUIZZES_AVAILABLE(courseId),
    signal,
  });

export const startQuizService = (
  courseId,
  quizId,
  enrollmentId,
  { signal } = {},
) =>
  request({
    method: 'GET',
    url: endpoints.learning.START_QUIZ(courseId, quizId),
    params: enrollmentId ? { enrollmentId } : undefined,
    signal,
  });

export const submitQuizService = (
  courseId,
  quizId,
  payload,
  { signal } = {},
) =>
  request({
    method: 'POST',
    url: endpoints.learning.SUBMIT_QUIZ(courseId, quizId),
    data: payload,
    signal,
  });

export const scormLaunchService = (payload, { signal } = {}) =>
  request({
    method: 'POST',
    url: endpoints.learning.SCORM_LAUNCH,
    data: payload,
    signal,
  });

export const scormFinishService = (payload, { signal } = {}) =>
  request({
    method: 'POST',
    url: endpoints.learning.SCORM_FINISH,
    data: payload,
    signal,
  });

export const getMyQuizProgressService = (courseId, { signal } = {}) =>
  request({
    method: 'GET',
    url: endpoints.learning.QUIZ_MY_PROGRESS(courseId),
    signal,
  });
