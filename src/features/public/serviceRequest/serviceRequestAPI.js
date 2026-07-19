import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../../config/api/errorHandler';
import { createServiceRequestService } from './serviceRequestService';

export const createServiceRequestAPI = createAsyncThunk(
  'serviceRequest/create',
  async (formData, { rejectWithValue, signal }) => {
    try {
      return await createServiceRequestService(formData, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
