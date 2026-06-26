import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authAPI';
import { STORAGE } from '../../config/storage/storageKeys';

// PLATFORM_ADMIN
// COMPANY_ADMIN
// COMPANY_EMPLOYEE
// LICENSE_USER
// PRIVATE_USER

const storedUser = 'COMPANY_ADMIN'; // STORAGE.getUser(); // For testing purposes, we can set a default user role here. In production, you would retrieve the user from storage.
const storedToken = 'Asdf1234'; // STORAGE.getToken(); // For testing purposes, we can set a default token here. In production, you would retrieve the token from storage.

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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.isAuthenticated = !!action.payload.user && !!action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
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
