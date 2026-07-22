import { request } from '../../../config/api/request';
import { endpoints } from '../../../config/api/httpEndpoint';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const buildCourseDetailsUrl = (courseIdentifier) => {
  const identifier = String(courseIdentifier || '').trim();
  if (!identifier) return endpoints.public.COURSE_DETAILS;

  if (UUID_REGEX.test(identifier)) {
    return `${endpoints.public.COURSE_DETAILS}/${identifier}`;
  }

  return `${endpoints.public.COURSE_DETAILS_BY_SLUG}/${encodeURIComponent(identifier)}`;
};

export const getPublicCoursesService = async ({ signal } = {}) => {
  return await request({
    method: 'GET',
    url: endpoints.public.COURSES_PUBLIC,
    signal,
    skipAuth: true,
  });
};

export const getCourseDetailsService = async (courseIdentifier, { signal } = {}) => {
  return await request({
    method: 'GET',
    url: buildCourseDetailsUrl(courseIdentifier),
    signal,
  });
};
