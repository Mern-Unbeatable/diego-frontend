import { createSlice } from '@reduxjs/toolkit';
import { createCoursePaymentIntentAPI } from './paymentAPI';

const initialState = {
  loading: false,
  error: null,
  paymentIntent: null,
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
      });
  },
});

export const { resetPaymentError, resetPaymentIntent } = paymentSlice.actions;
export default paymentSlice.reducer;
