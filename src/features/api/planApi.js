import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';
import { mapLicensePlansResponse } from '../admin/adminMappers';

const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLicensePlans: builder.query({
      query: (params = {}) => ({
        url: '/license-plans',
        method: 'GET',
        params: {
          limit: 100,
          sortBy: 'sortOrder',
          sortOrder: 'asc',
          ...params,
        },
      }),
      transformResponse: (response) =>
        mapLicensePlansResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: ['LicensePlan'],
    }),

    createLicensePlan: builder.mutation({
      query: (data) => ({
        url: '/license-plans',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['LicensePlan'],
    }),

    updateLicensePlan: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/license-plans/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['LicensePlan'],
    }),

    deleteLicensePlan: builder.mutation({
      query: (id) => ({
        url: `/license-plans/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['LicensePlan'],
    }),

    toggleLicensePlanActive: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/license-plans/${id}/toggle-active`,
        method: 'PATCH',
        body: { isActive },
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['LicensePlan'],
    }),
  }),
});

export const {
  useGetLicensePlansQuery,
  useCreateLicensePlanMutation,
  useUpdateLicensePlanMutation,
  useDeleteLicensePlanMutation,
  useToggleLicensePlanActiveMutation,
} = planApi;

export default planApi;
