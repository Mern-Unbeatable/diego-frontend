// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { COOKIE_STORAGE } from '../../utils/cookies/cookieStorage';
import { STORAGE } from '../../utils/storage/authStorage';
import { readPersistedAuth } from './authHydration';
import {
  loginAPI,
  verifyLoginOtpAPI,
  registerAPI,
  verifyRegisterOtpAPI,
  registerCompleteAPI,
} from './authAPI';

const persistedAuth = readPersistedAuth();

const initialState = {
  user: persistedAuth.user,
  token: persistedAuth.token,
  isAuthenticated: persistedAuth.isAuthenticated,
  loading: false,
  error: null,
};

const persistAuthCredentials = ({ user, token, refreshToken }) => {
  if (token) {
    COOKIE_STORAGE.setToken(token);
    STORAGE.setToken(token);
  }
  if (refreshToken) {
    COOKIE_STORAGE.setRefreshToken(refreshToken);
    STORAGE.setRefreshToken(refreshToken);
  }
  if (user) {
    COOKIE_STORAGE.setUser(user);
    STORAGE.setUser(user);
  }
};

const persistAuthCredentials = ({ user, token, refreshToken }) => {
  if (token) {
    COOKIE_STORAGE.setToken(token);
    STORAGE.setToken(token);
  }
  if (refreshToken) {
    COOKIE_STORAGE.setRefreshToken(refreshToken);
    STORAGE.setRefreshToken(refreshToken);
  }
  if (user) {
    COOKIE_STORAGE.setUser(user);
    STORAGE.setUser(user);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      COOKIE_STORAGE.clearAll();
      STORAGE.clearAll();
    },
    hydrateAuth: (state) => {
      const persisted = readPersistedAuth();
      state.user = persisted.user;
      state.token = persisted.token;
      state.isAuthenticated = persisted.isAuthenticated;
    },
    setUser: (state, action) => {
      if (action.payload?.token) {
        state.token = action.payload.token;
        COOKIE_STORAGE.setToken(action.payload.token);
        STORAGE.setToken(action.payload.token);
      }
      if (action.payload?.user !== undefined) {
        state.user = action.payload.user;
        if (action.payload.user) {
          COOKIE_STORAGE.setUser(action.payload.user);
          STORAGE.setUser(action.payload.user);
        }
      }
      state.isAuthenticated = !!state.user && !!state.token;
    },
    resetAuthError: (state) => {
      state.error = null;
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
        console.log('Login successful:', action.payload);
        state.loading = false;
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
        console.log('Verify OTP successful:', action.payload);
        const payloadData = action.payload || {};
        const data = payloadData.data || payloadData;

        state.loading = false;
        state.user = data.user?.level || data.user || null;
        state.token = data.accessToken || data.tokens?.accessToken || data.token || null;
        state.isAuthenticated = !!state.user && !!state.token;

        persistAuthCredentials({
          user: data.user || state.user,
          token: state.token,
          refreshToken: data.refreshToken || data.tokens?.refreshToken || null,
        });
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

        persistAuthCredentials({
          user: data.user || state.user,
          token: state.token,
          refreshToken: data.refreshToken || data.tokens?.refreshToken || null,
        });
      })
      .addCase(registerCompleteAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, resetAuthError, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
