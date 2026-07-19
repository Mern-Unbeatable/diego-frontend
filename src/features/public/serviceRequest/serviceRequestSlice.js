import { createSlice } from '@reduxjs/toolkit';
import { createServiceRequestAPI } from './serviceRequestAPI';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const serviceRequestSlice = createSlice({
  name: 'serviceRequest',
  initialState,
  reducers: {
    resetServiceRequestError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createServiceRequestAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceRequestAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createServiceRequestAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetServiceRequestError } = serviceRequestSlice.actions;
export default serviceRequestSlice.reducer;
