import { request } from '../../../config/api/request';
import { endpoints } from '../../../config/api/httpEndpoint';

export const getPublicCoursesService = async ({ signal } = {}) => {
  return await request({
    method: 'GET',
    url: endpoints.public.COURSES_PUBLIC,
    signal,
    skipAuth: true,
  });
};

export const getCourseDetailsService = async (courseId, { signal } = {}) => {
  return await request({
    method: 'GET',
    url: `${endpoints.public.COURSE_DETAILS}/${courseId}`,
    signal,
  });
};
