// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
// import { STORAGE } from '../../utils/storage/authStorage';
import { COOKIE_STORAGE } from '../../utils/cookies/cookieStorage';
import { loginAPI, otpVerifyAPI } from './authAPI';

//  PLATFORM_ADMIN
//  COMPANY_ADMIN
//  COMPANY_EMPLOYEE
//  LICENSE_USER
//  PRIVATE_USER
const userRoles = COOKIE_STORAGE.getUser();
const storedToken = COOKIE_STORAGE.getToken();

const storedUser = userRoles.level ? userRoles : null;

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  isAuthenticated: !!storedUser && !!storedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      STORAGE.clearAll();
    },
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //===================================
      // ✅ LOGIN CASE
      //===================================
      .addCase(loginAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        console.log('Login successful:', action.payload);
        state.loading = false;
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //===================================
      //✅ VERIFY OTP CASE
      //===================================
      .addCase(otpVerifyAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otpVerifyAPI.fulfilled, (state, action) => {
        console.log('OTP verification successful:', action.payload);

        const payloadData = action.payload || {};

        state.loading = false;
        state.user = payloadData.data.user || null;
        state.token = payloadData.data.accessToken || null;
        state.isAuthenticated =
          !!payloadData.data.user && !!payloadData.data.accessToken;
      })
      .addCase(otpVerifyAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //===================================
    //✅ REGISTER CASE
    //===================================
  },
});

export const { logout, resetAuthError } = authSlice.actions;
export default authSlice.reducer;
