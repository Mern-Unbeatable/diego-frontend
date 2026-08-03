import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

const unwrap = (response) => response?.data ?? response;

export const getAccessLinkInfoService = async (token, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.enrollmentAccess.INFO(token),
    signal,
    skipAuth: true,
  });
  return unwrap(response);
};

export const redeemAccessLinkService = async (token, payload, { signal } = {}) => {
  const response = await request({
    method: 'POST',
    url: endpoints.enrollmentAccess.REDEEM(token),
    data: payload,
    signal,
    skipAuth: true,
  });
  return unwrap(response);
};
