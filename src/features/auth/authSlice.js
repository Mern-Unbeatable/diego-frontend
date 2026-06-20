import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authAPI';
import { STORAGE } from '../../config/storage/storageKeys';
import { ROLES } from '../../config/roles';

const initialState = {
  user: STORAGE.getUser() || null,
  token: STORAGE.getToken() || null,
  isAuthenticated: !!STORAGE.getToken(),
  loading: false,
  error: null,
  tempRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.tempRole = null;
      STORAGE.clearToken();
    },
    resetAuthError: (state) => {
      state.error = null;
    },
    forceRole: (state, action) => {
      const allowedRoles = Object.values(ROLES);
      if (!allowedRoles.includes(action.payload)) {
        console.warn('Invalid role ignored:', action.payload);
        return;
      }
      state.tempRole = action.payload;
    },
    clearForcedRole: (state) => {
      state.tempRole = null;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.tempRole = null;
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

export const { logout, resetAuthError, forceRole, clearForcedRole } =
  authSlice.actions;
export default authSlice.reducer;
