import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

export const getMyEnrollmentsService = async ({ signal } = {}) => {
  return await request({
    method: 'GET',
    url: endpoints.private.MY_ENROLLMENTS,
    signal,
  });
};

export const getMyTicketsService = async ({ signal } = {}) => {
  return await request({
    method: 'GET',
    url: endpoints.private.MY_TICKETS,
    signal,
  });
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
  return await request({
    method: 'GET',
    url: endpoints.private.GET_TICKET_BY_ID(ticketId),
    signal,
  });
};

export const getNotificationsService = async ({ signal } = {}) => {
  return await request({
    method: 'GET',
    url: endpoints.private.NOTIFICATIONS,
    signal,
  });
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
  { page = 1, limit = 20, signal } = {},
) => {
  return await request({
    method: 'GET',
    url: endpoints.private.MY_CERTIFICATES,
    params: { page, limit },
    signal,
  });
};

export const getMyProfileService = async ({ signal } = {}) => {
  return await request({
    method: 'GET',
    url: endpoints.private.MY_PROFILE,
    signal,
  });
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
