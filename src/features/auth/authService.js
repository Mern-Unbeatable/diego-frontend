// authService.js

import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

// Login service
export const loginService = async (credentials, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.auth.LOGIN,
    data: credentials,
    signal,
  });
};

// OTP verification service
export const otpVerificationService = async (credentials, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.auth.OTP_VERIFY,
    data: credentials,
    signal,
  });
};
