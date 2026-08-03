import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';
import {
  mapServiceRequestsResponse,
  mapContactsResponse,
  mapCollaborationsResponse,
} from './inquiryMappers';

const inquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceRequests: builder.query({
      query: ({ page = 1, limit = 20, search, status } = {}) => ({
        url: '/service-requests',
        method: 'GET',
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
          ...(status ? { status } : {}),
        },
      }),
      transformResponse: (response) =>
        mapServiceRequestsResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.serviceRequests?.length
          ? [
              ...result.serviceRequests.map((item) => ({
                type: 'ServiceRequest',
                id: item.id,
              })),
              { type: 'ServiceRequest', id: 'LIST' },
            ]
          : [{ type: 'ServiceRequest', id: 'LIST' }],
    }),

    deleteServiceRequest: builder.mutation({
      query: (id) => ({
        url: `/service-requests/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, id) => [
        { type: 'ServiceRequest', id },
        { type: 'ServiceRequest', id: 'LIST' },
      ],
    }),

    getContacts: builder.query({
      query: ({ page = 1, limit = 20, search, status } = {}) => ({
        url: '/contacts',
        method: 'GET',
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
          ...(status ? { status } : {}),
        },
      }),
      transformResponse: (response) => mapContactsResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.contacts?.length
          ? [
              ...result.contacts.map((item) => ({ type: 'Contact', id: item.id })),
              { type: 'Contact', id: 'LIST' },
            ]
          : [{ type: 'Contact', id: 'LIST' }],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, id) => [
        { type: 'Contact', id },
        { type: 'Contact', id: 'LIST' },
      ],
    }),

    getCollaborations: builder.query({
      query: ({ page = 1, limit = 20, search, status } = {}) => ({
        url: '/collaborations',
        method: 'GET',
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
          ...(status ? { status } : {}),
        },
      }),
      transformResponse: (response) =>
        mapCollaborationsResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.collaborations?.length
          ? [
              ...result.collaborations.map((item) => ({
                type: 'Collaboration',
                id: item.id,
              })),
              { type: 'Collaboration', id: 'LIST' },
            ]
          : [{ type: 'Collaboration', id: 'LIST' }],
    }),

    deleteCollaboration: builder.mutation({
      query: (id) => ({
        url: `/collaborations/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, id) => [
        { type: 'Collaboration', id },
        { type: 'Collaboration', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetServiceRequestsQuery,
  useDeleteServiceRequestMutation,
  useGetContactsQuery,
  useDeleteContactMutation,
  useGetCollaborationsQuery,
  useDeleteCollaborationMutation,
} = inquiryApi;

export default inquiryApi;
