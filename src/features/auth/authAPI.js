import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../config/api/errorHandler';

import { loginService } from './authService';
//--------------------------------
// ✅ Login API thunk
//--------------------------------
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
