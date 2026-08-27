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

export const getMyTicketsService = async (params = {}, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.MY_TICKETS,
    params,
    signal,
  });
  return unwrap(response);
};

export const createTicketService = async (
  { subject, message, attachment },
  { signal } = {},
) => {
  const formData = new FormData();
  formData.append('subject', subject);
  formData.append('message', message);

  if (attachment) {
    formData.append('attachments', attachment);
  }

  return await request({
    method: 'POST',
    url: endpoints.private.CREATE_TICKET,
    data: formData,
    signal,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120000,
  });
};

export const getTicketByIdService = async (ticketId, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.GET_TICKET_BY_ID(ticketId),
    signal,
  });
  return unwrap(response);
};

export const getNotificationsService = async (params = {}, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.NOTIFICATIONS,
    params,
    signal,
  });
  return unwrap(response);
};

export const getUnreadNotificationsCountService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.NOTIFICATIONS_UNREAD_COUNT,
    signal,
  });
  return unwrap(response);
};

export const markNotificationsReadService = async (
  { notificationIds },
  { signal } = {},
) => {
  return await request({
    method: 'PATCH',
    url: endpoints.private.MARK_NOTIFICATIONS_READ,
    data: { notificationIds },
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const markAllNotificationsReadService = async ({ signal } = {}) => {
  return await request({
    method: 'PATCH',
    url: endpoints.private.MARK_ALL_NOTIFICATIONS_READ,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const getMyCertificatesService = async (
  params = {},
  { signal } = {},
) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.MY_CERTIFICATES,
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

export const updateMyProfileService = async (payload, { signal } = {}) => {
  return await request({
    method: 'PATCH',
    url: endpoints.private.MY_PROFILE,
    data: payload,
    signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const updateMyAvatarService = async (avatar, { signal } = {}) => {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return await request({
    method: 'PATCH',
    url: endpoints.private.MY_AVATAR,
    data: formData,
    signal,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120000,
  });
};

export const getMyCredentialsService = async ({ unreadOnly = false, signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.MY_CREDENTIALS,
    params: unreadOnly ? { unreadOnly: true } : undefined,
    signal,
  });
  return unwrap(response);
};

export const markCredentialViewedService = async (credentialId, { signal } = {}) => {
  const response = await request({
    method: 'PATCH',
    url: endpoints.private.MARK_CREDENTIAL_VIEWED(credentialId),
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
    buttonText = 'Scarica attestato';
  } else if (status === 'IN_PROGRESS' || progressPercent > 0) {
    category = 'IN CORSO';
    buttonText = 'Riprendi';
  }

  return {
    id: enrollment.id,
    courseId: enrollment.courseId || course.id,
    title,
    category,
    thumbnailUrl: course.thumbnailUrl || '',
    image: course.thumbnailUrl || '/images/course/course.png',
    progress: progressPercent,
    buttonText,
    totalLessons: enrollment?.progress?.totalLessons ?? course.lessonCount ?? 0,
    completedLessons: enrollment?.progress?.completedLessons ?? 0,
    status,
  };
};
