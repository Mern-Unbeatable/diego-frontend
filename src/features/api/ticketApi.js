import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';
import {
  mapAdminTicketsResponse,
  mapAdminTicketDetailResponse,
} from './ticketMappers';

const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: ({
        page = 1,
        limit = 20,
        status,
        priority,
        search,
        userId,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = {}) => ({
        url: '/tickets',
        method: 'GET',
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          ...(status ? { status } : {}),
          ...(priority ? { priority } : {}),
          ...(search ? { search } : {}),
          ...(userId ? { userId } : {}),
        },
      }),
      transformResponse: (response) => mapAdminTicketsResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.tickets?.length
          ? [
              ...result.tickets.map((ticket) => ({ type: 'Ticket', id: ticket.id })),
              { type: 'Ticket', id: 'LIST' },
            ]
          : [{ type: 'Ticket', id: 'LIST' }],
    }),

    getTicketById: builder.query({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => mapAdminTicketDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (_result, _error, id) => [{ type: 'Ticket', id }],
    }),

    updateTicket: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/tickets/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response) => mapAdminTicketDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Ticket', id },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),

    updateTicketStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tickets/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      transformResponse: (response) => mapAdminTicketDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Ticket', id },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),

    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, id) => [
        { type: 'Ticket', id },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),

    createTicket: builder.mutation({
      query: ({ subject, message, attachment }) => {
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('message', message);
        if (attachment) {
          formData.append('attachments', attachment);
        }
        return {
          url: '/tickets',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => mapAdminTicketDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: [
        { type: 'Ticket', id: 'LIST' },
        { type: 'Ticket', id: 'MY_LIST' },
      ],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useUpdateTicketMutation,
  useUpdateTicketStatusMutation,
  useDeleteTicketMutation,
  useCreateTicketMutation,
} = ticketApi;

export default ticketApi;
