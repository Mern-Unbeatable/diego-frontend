import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../../config/api/errorHandler';
import { createContactService } from './contactService';

export const createContactAPI = createAsyncThunk(
  'contact/create',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createContactService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
