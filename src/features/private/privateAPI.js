import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '../../config/api/errorHandler';
import {
  getMyEnrollmentsService,
  getMyTicketsService,
  createTicketService,
  getTicketByIdService,
  getNotificationsService,
  markNotificationsReadService,
  markAllNotificationsReadService,
  getMyCertificatesService,
  getMyProfileService,
  updateMyProfileService,
  updateMyAvatarService,
} from './privateService';

export const getMyEnrollmentsAPI = createAsyncThunk(
  'private/getMyEnrollments',
  async (params = {}, { rejectWithValue, signal }) => {
    try {
      return await getMyEnrollmentsService(params, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getMyTicketsAPI = createAsyncThunk(
  'private/getMyTickets',
  async (params = {}, { rejectWithValue, signal }) => {
    try {
      return await getMyTicketsService(params, { signal });
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

export const getNotificationsAPI = createAsyncThunk(
  'private/getNotifications',
  async (params = {}, { rejectWithValue, signal }) => {
    try {
      return await getNotificationsService(params, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const markNotificationsReadAPI = createAsyncThunk(
  'private/markNotificationsRead',
  async ({ notificationIds }, { rejectWithValue, signal }) => {
    try {
      return await markNotificationsReadService({ notificationIds }, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const markAllNotificationsReadAPI = createAsyncThunk(
  'private/markAllNotificationsRead',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await markAllNotificationsReadService({ signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getMyCertificatesAPI = createAsyncThunk(
  'private/getMyCertificates',
  async ({ page = 1, limit = 20, ...rest } = {}, { rejectWithValue, signal }) => {
    try {
      return await getMyCertificatesService(
        { page, limit, ...rest },
        { signal },
      );
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getMyProfileAPI = createAsyncThunk(
  'private/getMyProfile',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getMyProfileService({ signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const updateMyProfileAPI = createAsyncThunk(
  'private/updateMyProfile',
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await updateMyProfileService(payload, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const updateMyAvatarAPI = createAsyncThunk(
  'private/updateMyAvatar',
  async (avatar, { rejectWithValue, signal }) => {
    try {
      return await updateMyAvatarService(avatar, { signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
