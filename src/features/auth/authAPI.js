// src/features/auth/authFetch.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { POST } from '../../config/api/httpMethods';
import { endpoints } from '../../config/api/httpEndpoint';
import { STORAGE } from '../../config/storage/storageKeys';

// ========== Login ==========
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await POST(endpoints.auth.LOGIN, { email, password });
      const { data } = res || {};

      const accessToken = data?.tokens?.accessToken;
      const refreshToken = data?.tokens?.refreshToken;
      if (accessToken) {
        // store tokens in localStorage
        STORAGE.setToken(accessToken);
        STORAGE.setRefreshToken(refreshToken);
      }
      if (data?.user) {
        STORAGE.setUser(data.user);
      }
      // return the clean payload to slice
      return {
        user: data?.user,
        token: accessToken,
        refreshToken,
      };
    } catch (err) {
      console.error('LOGIN ERROR:', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to login user',
      );
    }
  },
);
