import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../../config/api/errorHandler';
import { createReviewService } from './reviewService';

export const createReviewAPI = createAsyncThunk(
  'review/create',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createReviewService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
