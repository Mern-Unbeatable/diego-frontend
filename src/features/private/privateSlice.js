import { createSlice } from '@reduxjs/toolkit';
import {
  getMyEnrollmentsAPI,
  getMyTicketsAPI,
  createTicketAPI,
  getTicketByIdAPI,
} from './privateAPI';
import {
  mapEnrollmentsResponse,
  mapTicketsResponse,
  mapTicketDetailResponse,
} from './privateMappers';

const initialState = {
  enrollments: [],
  enrollmentsLoading: false,
  enrollmentsError: null,
  tickets: [],
  ticketsLoading: false,
  ticketsError: null,
  createTicketLoading: false,
  createTicketError: null,
  ticketDetail: null,
  ticketDetailLoading: false,
  ticketDetailError: null,
};

const privateSlice = createSlice({
  name: 'private',
  initialState,
  reducers: {
    resetPrivateError: (state) => {
      state.enrollmentsError = null;
      state.ticketsError = null;
      state.createTicketError = null;
      state.ticketDetailError = null;
    },
    resetTicketDetail: (state) => {
      state.ticketDetail = null;
      state.ticketDetailLoading = false;
      state.ticketDetailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyEnrollmentsAPI.pending, (state) => {
        state.enrollmentsLoading = true;
        state.enrollmentsError = null;
      })
      .addCase(getMyEnrollmentsAPI.fulfilled, (state, action) => {
        state.enrollmentsLoading = false;
        state.enrollments = mapEnrollmentsResponse(action.payload);
      })
      .addCase(getMyEnrollmentsAPI.rejected, (state, action) => {
        state.enrollmentsLoading = false;
        state.enrollmentsError = action.payload;
      })
      .addCase(getMyTicketsAPI.pending, (state) => {
        state.ticketsLoading = true;
        state.ticketsError = null;
      })
      .addCase(getMyTicketsAPI.fulfilled, (state, action) => {
        state.ticketsLoading = false;
        state.tickets = mapTicketsResponse(action.payload);
      })
      .addCase(getMyTicketsAPI.rejected, (state, action) => {
        state.ticketsLoading = false;
        state.ticketsError = action.payload;
      })
      .addCase(createTicketAPI.pending, (state) => {
        state.createTicketLoading = true;
        state.createTicketError = null;
      })
      .addCase(createTicketAPI.fulfilled, (state) => {
        state.createTicketLoading = false;
      })
      .addCase(createTicketAPI.rejected, (state, action) => {
        state.createTicketLoading = false;
        state.createTicketError = action.payload;
      })
      .addCase(getTicketByIdAPI.pending, (state) => {
        state.ticketDetailLoading = true;
        state.ticketDetailError = null;
        state.ticketDetail = null;
      })
      .addCase(getTicketByIdAPI.fulfilled, (state, action) => {
        state.ticketDetailLoading = false;
        state.ticketDetail = mapTicketDetailResponse(action.payload);
      })
      .addCase(getTicketByIdAPI.rejected, (state, action) => {
        state.ticketDetailLoading = false;
        state.ticketDetailError = action.payload;
      });
  },
});

export const { resetPrivateError, resetTicketDetail } = privateSlice.actions;
export default privateSlice.reducer;
