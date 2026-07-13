// authAPI.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../config/api/errorHandler';

import {
  loginService,
  otpVerificationService,
  registerService,
  verifyRegisterOtpService,
  registerCompleteService,
} from './authService';

//=============================================================
// ✅ Login API thunk
//=============================================================
export const loginAPI = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue, signal }) => {
    try {
      return await loginService(credentials, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

//=============================================================
// ✅ OTP Verification API thunk
//=============================================================
export const verifyLoginOtpAPI = createAsyncThunk(
  'auth/verifyLoginOtp',
  async (credentials, { rejectWithValue, signal }) => {
    try {
      return await otpVerificationService(credentials, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

//=============================================================
// ✅ Register API thunk
//=============================================================
export const registerAPI = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue, signal }) => {
    try {
      return await registerService(credentials, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// ============================================================
// ✅ Verify Register OTP API thunk
// ============================================================
export const verifyRegisterOtpAPI = createAsyncThunk(
  'auth/verifyRegisterOtp',
  async (credentials, { rejectWithValue, signal }) => {
    try {
      return await verifyRegisterOtpService(credentials, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// ============================================================
// REGISTER COMPLETE API THUNK
// ============================================================
export const registerCompleteAPI = createAsyncThunk(
  'auth/registerComplete',
  async (credentials, { rejectWithValue, signal }) => {
    try {
      return await registerCompleteService(credentials, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
