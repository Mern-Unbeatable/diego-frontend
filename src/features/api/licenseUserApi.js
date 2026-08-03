import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';
import {
  mapAdminTicketDetailResponse,
  mapAdminTicketsResponse,
} from './ticketMappers';
import {
  mapLicensePlans,
  mapLicenseUserCoursesResponse,
  mapLicenseUserDashboard,
  mapLicenseUserReport,
  mapMyLicenseCard,
} from './licenseUserMappers';
import { endpoints } from '../../config/api/httpEndpoint';

const licenseUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLicenseUserDashboard: builder.query({
      query: (params = {}) => ({
        url: endpoints.licenseUser.DASHBOARD,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => mapLicenseUserDashboard(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: [{ type: 'LicenseUserDashboard', id: 'HOME' }],
    }),

    getLicenseUserReport: builder.query({
      query: ({ chartDays = 7, series = 'both', locale = 'it' } = {}) => ({
        url: endpoints.licenseUser.REPORT,
        method: 'GET',
        params: { chartDays, series, locale },
      }),
      transformResponse: (response) => mapLicenseUserReport(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: [{ type: 'LicenseUserDashboard', id: 'REPORT' }],
    }),

    getMyLicense: builder.query({
      query: ({ statusFilter } = {}) => ({
        url: endpoints.licenseUser.MY_LICENSE,
        method: 'GET',
        params: statusFilter ? { statusFilter } : undefined,
      }),
      transformResponse: (response) => mapMyLicenseCard(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: [{ type: 'License', id: 'MY' }],
    }),

    getMyLicenseDetail: builder.query({
      query: () => ({
        url: endpoints.licenseUser.MY_LICENSE_DETAIL,
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response)?.license ?? null,
      transformErrorResponse,
      providesTags: [{ type: 'License', id: 'MY_DETAIL' }],
    }),

    getPublicLicensePlans: builder.query({
      query: () => ({
        url: endpoints.licenseUser.PLANS,
        method: 'GET',
      }),
      transformResponse: (response) => mapLicensePlans(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: ['LicensePlan'],
    }),

    createLicenseRenewalCheckout: builder.mutation({
      query: (body) => ({
        url: endpoints.licenseUser.RENEWAL_CHECKOUT,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
    }),

    getMyTickets: builder.query({
      query: ({ page = 1, limit = 20, status, priority, search } = {}) => ({
        url: endpoints.licenseUser.MY_TICKETS,
        method: 'GET',
        params: {
          page,
          limit,
          ...(status ? { status } : {}),
          ...(priority ? { priority } : {}),
          ...(search ? { search } : {}),
        },
      }),
      transformResponse: (response) => mapAdminTicketsResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.tickets?.length
          ? [
              ...result.tickets.map((ticket) => ({ type: 'Ticket', id: ticket.id })),
              { type: 'Ticket', id: 'MY_LIST' },
            ]
          : [{ type: 'Ticket', id: 'MY_LIST' }],
    }),

    getMyTicketById: builder.query({
      query: (id) => ({
        url: endpoints.licenseUser.TICKET_BY_ID(id),
        method: 'GET',
      }),
      transformResponse: (response) => mapAdminTicketDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (_result, _error, id) => [{ type: 'Ticket', id }],
    }),

    createMyTicket: builder.mutation({
      query: ({ subject, message, attachment }) => {
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('message', message);
        if (attachment) {
          formData.append('attachments', attachment);
        }
        return {
          url: endpoints.licenseUser.CREATE_TICKET,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => mapAdminTicketDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: [
        { type: 'Ticket', id: 'MY_LIST' },
        { type: 'LicenseUserDashboard', id: 'HOME' },
      ],
    }),

    getLicenseUserCourses: builder.query({
      query: ({ page = 1, limit = 20, search, variant = 'home' } = {}) => ({
        url: endpoints.licenseUser.COURSES,
        method: 'GET',
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
        },
      }),
      transformResponse: (response, _meta, arg) =>
        mapLicenseUserCoursesResponse(
          unwrapApiData(response),
          'it',
          arg?.variant ?? 'home',
        ),
      transformErrorResponse,
      providesTags: ['Course'],
    }),
  }),
});

export const {
  useGetLicenseUserDashboardQuery,
  useGetLicenseUserReportQuery,
  useGetMyLicenseQuery,
  useGetMyLicenseDetailQuery,
  useGetPublicLicensePlansQuery,
  useCreateLicenseRenewalCheckoutMutation,
  useGetMyTicketsQuery,
  useGetMyTicketByIdQuery,
  useCreateMyTicketMutation,
  useGetLicenseUserCoursesQuery,
} = licenseUserApi;

export default licenseUserApi;
