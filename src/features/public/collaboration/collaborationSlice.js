import { createSlice } from '@reduxjs/toolkit';
import { createCollaborationAPI } from './collaborationAPI';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const collaborationSlice = createSlice({
  name: 'collaboration',
  initialState,
  reducers: {
    resetCollaborationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollaborationAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCollaborationAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCollaborationAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCollaborationError } = collaborationSlice.actions;
export default collaborationSlice.reducer;
