import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../../config/api/errorHandler';
import { createCoursePaymentIntentService } from './paymentService';

export const createCoursePaymentIntentAPI = createAsyncThunk(
  'payment/createCoursePaymentIntent',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createCoursePaymentIntentService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
