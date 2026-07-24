import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

const unwrap = (response) => response?.data ?? response;

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

export const getMyCertificatesService = async (params = {}, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.MY_CERTIFICATES,
    params,
    signal,
  });
  return unwrap(response);
};

export const getMyTicketsService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.private.MY_TICKETS,
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
