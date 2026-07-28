// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
// import { STORAGE } from '../../utils/storage/authStorage';
import { COOKIE_STORAGE } from '../../utils/cookies/cookieStorage';
import {
  loginAPI,
  verifyLoginOtpAPI,
  registerAPI,
  verifyRegisterOtpAPI,
  registerCompleteAPI,
} from './authAPI';

//  PLATFORM_ADMIN
//  COMPANY_ADMIN
//  COMPANY_EMPLOYEE
//  LICENSE_USER
//  PRIVATE_USER
const userRoles = COOKIE_STORAGE.getUser();
const storedToken = COOKIE_STORAGE.getToken();
const storedUser = userRoles || null;

const initialState = {
  user: storedUser,
  token: storedToken || null,
  isAuthenticated: !!storedUser && !!storedToken,
  loading: false,
  error: null,
  loginOtp: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loginOtp = null;
      COOKIE_STORAGE.clearAll();
    },
    setUser: (state, action) => {
      if (action.payload?.token) {
        state.token = action.payload.token;
        COOKIE_STORAGE.setToken(action.payload.token);
      }
      if (action.payload?.user !== undefined) {
        state.user = action.payload.user;
      }
      state.isAuthenticated = !!state.user && !!state.token;
    },
    resetAuthError: (state) => {
      state.error = null;
    },
    clearLoginOtp: (state) => {
      state.loginOtp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //=====================================================
      // ✅ LOGIN CASE
      //=====================================================
      .addCase(loginAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        const data = payload.data || payload;
        state.loginOtp = data?.otp || null;
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //=====================================================
      //✅ VERIFY OTP CASE
      //=====================================================
      .addCase(verifyLoginOtpAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginOtpAPI.fulfilled, (state, action) => {
        const payloadData = action.payload || {};

        state.loading = false;
        state.loginOtp = null;
        state.user = payloadData.data.user.level || null;
        state.token = payloadData.data.accessToken || null;
        state.isAuthenticated =
          !!payloadData.data.user && !!payloadData.data.accessToken;
      })
      .addCase(verifyLoginOtpAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //=====================================================
      //✅ REGISTER CASE
      //=====================================================
      .addCase(registerAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAPI.fulfilled, (state, action) => {
        console.log('Register OTP sent successful:', action.payload);
        state.loading = false;
      })
      .addCase(registerAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================================================
      // ✅ VERIFY REGISTER OTP CASE
      // ====================================================
      .addCase(verifyRegisterOtpAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegisterOtpAPI.fulfilled, (state, action) => {
        console.log('Verify Register OTP successful:', action.payload);
        state.loading = false;
      })
      .addCase(verifyRegisterOtpAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================================================
      // REISTER COMPLETE CASE
      // ====================================================
      .addCase(registerCompleteAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCompleteAPI.fulfilled, (state, action) => {
        console.log('Register Complete successful:', action.payload);
        const payloadData = action.payload || {};
        const data = payloadData.data || payloadData;

        state.loading = false;
        state.user =
          data.user?.level ||
          data.user?.role ||
          (typeof data.user === 'string' ? data.user : null) ||
          data.level ||
          null;
        state.token =
          data.accessToken || data.tokens?.accessToken || data.token || null;
        state.isAuthenticated = !!state.user && !!state.token;
      })
      .addCase(registerCompleteAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, resetAuthError, clearLoginOtp } = authSlice.actions;
export default authSlice.reducer;
