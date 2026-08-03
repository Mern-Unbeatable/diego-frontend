import { createSlice } from '@reduxjs/toolkit';
import { createReviewAPI } from './reviewAPI';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetReviewError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReviewAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReviewAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createReviewAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewError } = reviewSlice.actions;
export default reviewSlice.reducer;
