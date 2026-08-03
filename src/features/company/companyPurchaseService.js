import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

const unwrap = (response) => response?.data ?? response;

export const getCompanyPurchasesService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.PURCHASES,
    signal,
  });
  return unwrap(response)?.purchases ?? [];
};

export const inviteEmployeeToPurchaseService = async (payload, { signal } = {}) => {
  const response = await request({
    method: 'POST',
    url: endpoints.company.INVITE_EMPLOYEE,
    data: payload,
    signal,
  });
  return unwrap(response);
};

export const sendAccessLinkService = async (enrollmentId, { signal } = {}) => {
  const response = await request({
    method: 'POST',
    url: endpoints.company.SEND_ACCESS_LINK,
    data: { enrollmentId },
    signal,
  });
  return unwrap(response);
};

export const revokeSeatService = async (enrollmentId, { signal } = {}) => {
  const response = await request({
    method: 'DELETE',
    url: endpoints.company.REVOKE_SEAT(enrollmentId),
    signal,
  });
  return unwrap(response);
};
