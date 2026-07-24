import { createSlice } from '@reduxjs/toolkit';
import {
  createCoursePaymentIntentAPI,
  verifyCoursePaymentIntentAPI,
} from './paymentAPI';

const initialState = {
  loading: false,
  verifying: false,
  error: null,
  verifyError: null,
  paymentIntent: null,
  enrollment: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentError: (state) => {
      state.error = null;
    },
    resetPaymentIntent: (state) => {
      state.paymentIntent = null;
      state.error = null;
      state.verifyError = null;
      state.enrollment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCoursePaymentIntentAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoursePaymentIntentAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentIntent = action.payload?.data || null;
      })
      .addCase(createCoursePaymentIntentAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyCoursePaymentIntentAPI.pending, (state) => {
        state.verifying = true;
        state.verifyError = null;
      })
      .addCase(verifyCoursePaymentIntentAPI.fulfilled, (state, action) => {
        state.verifying = false;
        state.enrollment = action.payload?.data?.enrollment || null;
      })
      .addCase(verifyCoursePaymentIntentAPI.rejected, (state, action) => {
        state.verifying = false;
        state.verifyError = action.payload;
      });
  },
});

export const { resetPaymentError, resetPaymentIntent } = paymentSlice.actions;
export default paymentSlice.reducer;
