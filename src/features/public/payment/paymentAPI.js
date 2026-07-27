import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../../config/api/errorHandler';
import {
  createCompanyCourseCheckoutService,
  createCoursePaymentIntentService,
  verifyCoursePaymentIntentService,
} from './paymentService';

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

export const verifyCoursePaymentIntentAPI = createAsyncThunk(
  'payment/verifyCoursePaymentIntent',
  async (paymentIntentId, { rejectWithValue, signal }) => {
    try {
      return await verifyCoursePaymentIntentService(paymentIntentId, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createCompanyCourseCheckoutAPI = createAsyncThunk(
  'payment/createCompanyCourseCheckout',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createCompanyCourseCheckoutService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
