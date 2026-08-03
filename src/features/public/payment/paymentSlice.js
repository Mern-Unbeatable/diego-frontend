import { createSlice } from '@reduxjs/toolkit';
import {
  createCompanyCourseCheckoutAPI,
  createCompanyCoursePaymentIntentAPI,
  createCoursePaymentIntentAPI,
  verifyCompanyCoursePaymentIntentAPI,
  verifyCoursePaymentIntentAPI,
} from './paymentAPI';

const initialState = {
  loading: false,
  verifying: false,
  companyCheckoutLoading: false,
  error: null,
  verifyError: null,
  companyCheckoutError: null,
  paymentIntent: null,
  companyCheckout: null,
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
    resetCompanyCheckout: (state) => {
      state.companyCheckout = null;
      state.companyCheckoutError = null;
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
      .addCase(createCompanyCoursePaymentIntentAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompanyCoursePaymentIntentAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentIntent = action.payload?.data || null;
      })
      .addCase(createCompanyCoursePaymentIntentAPI.rejected, (state, action) => {
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
      })
      .addCase(verifyCompanyCoursePaymentIntentAPI.pending, (state) => {
        state.verifying = true;
        state.verifyError = null;
      })
      .addCase(verifyCompanyCoursePaymentIntentAPI.fulfilled, (state) => {
        state.verifying = false;
      })
      .addCase(verifyCompanyCoursePaymentIntentAPI.rejected, (state, action) => {
        state.verifying = false;
        state.verifyError = action.payload;
      })
      .addCase(createCompanyCourseCheckoutAPI.pending, (state) => {
        state.companyCheckoutLoading = true;
        state.companyCheckoutError = null;
      })
      .addCase(createCompanyCourseCheckoutAPI.fulfilled, (state, action) => {
        state.companyCheckoutLoading = false;
        state.companyCheckout = action.payload?.data || null;
      })
      .addCase(createCompanyCourseCheckoutAPI.rejected, (state, action) => {
        state.companyCheckoutLoading = false;
        state.companyCheckoutError = action.payload;
      });
  },
});

export const { resetPaymentError, resetPaymentIntent, resetCompanyCheckout } =
  paymentSlice.actions;
export default paymentSlice.reducer;
