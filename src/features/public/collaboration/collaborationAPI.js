import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../../config/api/errorHandler';
import { createCollaborationService } from './collaborationService';

export const createCollaborationAPI = createAsyncThunk(
  'collaboration/create',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createCollaborationService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
