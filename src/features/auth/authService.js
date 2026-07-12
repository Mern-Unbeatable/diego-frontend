// authService.js

// auth service ->

import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

//==========================================================================
// ✅ LOGIN SERVICE
//==========================================================================
export const loginService = async (credentials, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.auth.LOGIN,
    data: credentials,
    signal,
  });
};

// ==========================================================================
// ✅ VERIFY LOGIN OTP SERVICE
// ===========================================================================
export const otpVerificationService = async (credentials, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.auth.VERIFY_LOGIN_OTP,
    data: credentials,
    signal,
  });
};

// ==============================================================
// ✅ REGISTER SERVICE
// =============================================================
export const registerService = async (credentials, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.auth.REGISTER,
    data: credentials,
    signal,
  });
};

// ============================================================
// ✅ VERIFY REGISTER OTP SERVICE
// ============================================================
export const verifyRegisterOtpService = async (
  credentials,
  { signal } = {},
) => {
  return await request({
    method: 'POST',
    url: endpoints.auth.VERIFY_REGISTER_OTP,
    data: credentials,
    signal,
  });
};

// ============================================================
// ✅ REGISTER COMPLETE SERVICE
// ============================================================
export const registerCompleteService = async (credentials, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.auth.REGISTER_COMPLETE,
    data: credentials,
    signal,
  });
};
