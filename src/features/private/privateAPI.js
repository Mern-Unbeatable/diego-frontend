import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../config/api/errorHandler';
import {
  getMyEnrollmentsService,
  getMyTicketsService,
  createTicketService,
  getTicketByIdService,
} from './privateService';

export const getMyEnrollmentsAPI = createAsyncThunk(
  'private/getMyEnrollments',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getMyEnrollmentsService({ signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getMyTicketsAPI = createAsyncThunk(
  'private/getMyTickets',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getMyTicketsService({ signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createTicketAPI = createAsyncThunk(
  'private/createTicket',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await createTicketService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getTicketByIdAPI = createAsyncThunk(
  'private/getTicketById',
  async (ticketId, { rejectWithValue, signal }) => {
    try {
      return await getTicketByIdService(ticketId, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
