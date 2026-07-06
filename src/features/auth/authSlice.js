// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { STORAGE } from '../../utils/storage/authStorage';
import { loginAPI, otpVerifyAPI } from './authAPI';

//  PLATFORM_ADMIN
//  COMPANY_ADMIN
//  COMPANY_EMPLOYEE
//  LICENSE_USER
//  PRIVATE_USER

const storedUser = ''; // Hardcoded for testing purposes
const storedToken = 'sample_token'; // Hardcoded for testing purposes

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
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
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.isAuthenticated = !!action.payload.user && !!action.payload.token;
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
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.isAuthenticated = !!action.payload.user && !!action.payload.token;
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
