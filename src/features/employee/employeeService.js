import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

const unwrap = (response) => response?.data ?? response;

export const getMyEnrollmentsService = async (params = {}, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.MY_ENROLLMENTS,
    params,
    signal,
  });
  return unwrap(response);
};

export const getMyProfileService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.MY_PROFILE,
    signal,
  });
  return unwrap(response);
};

export const mapEnrollmentToCourseCard = (enrollment) => {
  const course = enrollment?.course ?? {};
  const title =
    typeof course.courseTitle === 'string'
      ? course.courseTitle
      : course.courseTitle?.it
        || course.courseTitle?.en
        || Object.values(course.courseTitle || {})[0]
        || 'Corso';

  const progressPercent = enrollment?.progress?.percentage ?? 0;
  const status = enrollment?.status ?? 'NOT_STARTED';

  let category = 'NON ANCORA INIZIATO';
  let buttonText = 'Inizia corso';

  if (status === 'COMPLETED' || progressPercent >= 100) {
    category = 'COMPLETATO';
    buttonText = 'Rivedi corso';
  } else if (status === 'IN_PROGRESS' || progressPercent > 0) {
    category = 'IN CORSO';
    buttonText = 'Riprendi';
  }

  return {
    id: enrollment.id,
    courseId: enrollment.courseId || course.id,
    title,
    category,
    image: course.thumbnailUrl || '/images/course/course.png',
    progress: progressPercent,
    buttonText,
    totalLessons: enrollment?.progress?.totalLessons ?? course.lessonCount ?? 0,
    completedLessons: enrollment?.progress?.completedLessons ?? 0,
    status,
  };
};
