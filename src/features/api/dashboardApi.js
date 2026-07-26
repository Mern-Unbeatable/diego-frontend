import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';
import {
  mapDashboardResponse,
  mapEmergencyControlsResponse,
} from '../admin/adminMappers';

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatformDashboard: builder.query({
      query: ({ periodDays = 30 } = {}) => ({
        url: '/incomes/dashboard/platform-admin',
        method: 'GET',
        params: { periodDays },
      }),
      transformResponse: (response) => mapDashboardResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: ['Dashboard'],
    }),

    getEmergencyControls: builder.query({
      query: () => ({
        url: '/platform-settings/emergency-controls',
        method: 'GET',
      }),
      transformResponse: (response) =>
        mapEmergencyControlsResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: ['EmergencyControls'],
    }),

    updateEmergencyControls: builder.mutation({
      query: (data) => ({
        url: '/platform-settings/emergency-controls',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) =>
        mapEmergencyControlsResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: ['EmergencyControls'],
    }),
  }),
});

export const {
  useGetPlatformDashboardQuery,
  useGetEmergencyControlsQuery,
  useUpdateEmergencyControlsMutation,
} = dashboardApi;

export default dashboardApi;
