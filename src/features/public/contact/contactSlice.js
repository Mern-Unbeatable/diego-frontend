import { createSlice } from '@reduxjs/toolkit';
import { createContactAPI } from './contactAPI';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContactAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContactAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createContactAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactError } = contactSlice.actions;
export default contactSlice.reducer;
