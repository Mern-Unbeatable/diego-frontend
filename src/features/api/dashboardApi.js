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

    getFinancialSettings: builder.query({
      query: () => ({
        url: '/platform-settings/financial',
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      providesTags: ['FinancialSettings'],
    }),

    updateFinancialSettings: builder.mutation({
      query: (data) => ({
        url: '/platform-settings/financial',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['FinancialSettings'],
    }),

    getSystemSettings: builder.query({
      query: () => ({
        url: '/platform-settings/system',
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      providesTags: ['SystemSettings'],
    }),

    updateSystemSettings: builder.mutation({
      query: (data) => ({
        url: '/platform-settings/system',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['SystemSettings'],
    }),

    testSystemSmtp: builder.mutation({
      query: () => ({
        url: '/platform-settings/system/test-smtp',
        method: 'POST',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
    }),

    getBrandSettings: builder.query({
      query: () => ({
        url: '/platform-settings/brand',
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      providesTags: ['BrandSettings'],
    }),

    updateBrandSettings: builder.mutation({
      query: (data) => ({
        url: '/platform-settings/brand',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['BrandSettings'],
    }),

    uploadBrandLogo: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('platformLogo', file);
        return {
          url: '/platform-settings/brand/logo',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['BrandSettings'],
    }),

    getWebhookSettings: builder.query({
      query: () => ({
        url: '/platform-settings/webhooks',
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      providesTags: ['WebhookSettings'],
    }),

    updateWebhookSettings: builder.mutation({
      query: (data) => ({
        url: '/platform-settings/webhooks',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: ['WebhookSettings'],
    }),

    testSms: builder.mutation({
      query: (body) => ({
        url: '/platform-settings/sms/test',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
    }),
  }),
});

export const {
  useGetPlatformDashboardQuery,
  useGetEmergencyControlsQuery,
  useUpdateEmergencyControlsMutation,
  useGetFinancialSettingsQuery,
  useUpdateFinancialSettingsMutation,
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
  useTestSystemSmtpMutation,
  useGetBrandSettingsQuery,
  useUpdateBrandSettingsMutation,
  useUploadBrandLogoMutation,
  useGetWebhookSettingsQuery,
  useUpdateWebhookSettingsMutation,
  useTestSmsMutation,
} = dashboardApi;

export default dashboardApi;
