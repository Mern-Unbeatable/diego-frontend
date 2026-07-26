import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';
import { mapLicensesResponse, mapLicenseDetailResponse } from '../admin/adminMappers';

const licenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLicenses: builder.query({
      query: ({ page = 1, limit = 20, search, ...params } = {}) => ({
        url: '/licenses',
        method: 'GET',
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
          ...params,
        },
      }),
      transformResponse: (response) => mapLicensesResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.licenses?.length
          ? [
              ...result.licenses.map((license) => ({
                type: 'License',
                id: license.userId || license.id,
              })),
              { type: 'License', id: 'LIST' },
            ]
          : [{ type: 'License', id: 'LIST' }],
    }),

    createLicense: builder.mutation({
      query: (data) => ({
        url: '/licenses',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: [{ type: 'License', id: 'LIST' }],
    }),

    updateLicense: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `/licenses/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'License', id: userId },
        { type: 'License', id: 'LIST' },
      ],
    }),

    deleteLicense: builder.mutation({
      query: (userId) => ({
        url: `/licenses/${userId}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, userId) => [
        { type: 'License', id: userId },
        { type: 'License', id: 'LIST' },
      ],
    }),

    getLicenseByUser: builder.query({
      query: (userId) => ({
        url: `/licenses/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response) => mapLicenseDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (_result, _error, userId) => [{ type: 'License', id: userId }],
    }),
  }),
});

export const {
  useGetLicensesQuery,
  useGetLicenseByUserQuery,
  useCreateLicenseMutation,
  useUpdateLicenseMutation,
  useDeleteLicenseMutation,
} = licenseApi;

export default licenseApi;
