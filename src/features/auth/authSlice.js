import { createSlice } from '@reduxjs/toolkit';
import { STORAGE } from '../../config/storage/storageKeys';
import { loginAPI } from './authAPI';

//  PLATFORM_ADMIN
//  COMPANY_ADMIN
//  COMPANY_EMPLOYEE
//  LICENSE_USER
//  PRIVATE_USER

const storedUser = 'PLATFORM_ADMIN'; // Hardcoded for testing purposes
const storedToken = 'sample-token'; // Hardcoded for testing purposes

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  isAuthenticated: !!storedToken && !!storedUser,
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
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.isAuthenticated = !!action.payload.user && !!action.payload.token;
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //===================================
    // REGISTER CASE
    //===================================
  },
});

export const { logout, resetAuthError } = authSlice.actions;
export default authSlice.reducer;
