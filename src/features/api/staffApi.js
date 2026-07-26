import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';
import {
  mapStaffMembersResponse,
  mapStaffMemberDetailResponse,
} from './staffMappers';

const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffMembers: builder.query({
      query: ({
        page = 1,
        limit = 20,
        role,
        status,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = {}) => ({
        url: '/staff',
        method: 'GET',
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          ...(role ? { role } : {}),
          ...(status ? { status } : {}),
          ...(search ? { search } : {}),
        },
      }),
      transformResponse: (response) => mapStaffMembersResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.staffMembers?.length
          ? [
              ...result.staffMembers.map((member) => ({
                type: 'Staff',
                id: member.id,
              })),
              { type: 'Staff', id: 'LIST' },
            ]
          : [{ type: 'Staff', id: 'LIST' }],
    }),

    getStaffMemberById: builder.query({
      query: (staffMemberId) => ({
        url: `/staff/${staffMemberId}`,
        method: 'GET',
      }),
      transformResponse: (response) => mapStaffMemberDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (_result, _error, staffMemberId) => [
        { type: 'Staff', id: staffMemberId },
      ],
    }),

    createStaffMember: builder.mutation({
      query: (formData) => ({
        url: '/staff',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response) => mapStaffMemberDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: [{ type: 'Staff', id: 'LIST' }],
    }),

    updateStaffMember: builder.mutation({
      query: ({ staffMemberId, ...body }) => ({
        url: `/staff/${staffMemberId}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response) => mapStaffMemberDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { staffMemberId }) => [
        { type: 'Staff', id: staffMemberId },
        { type: 'Staff', id: 'LIST' },
      ],
    }),

    deleteStaffMember: builder.mutation({
      query: (staffMemberId) => ({
        url: `/staff/${staffMemberId}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, staffMemberId) => [
        { type: 'Staff', id: staffMemberId },
        { type: 'Staff', id: 'LIST' },
      ],
    }),

    uploadStaffDocument: builder.mutation({
      query: ({ staffMemberId, documentType, formData }) => ({
        url: `/staff/${staffMemberId}/documents/${documentType}`,
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { staffMemberId }) => [
        { type: 'Staff', id: staffMemberId },
        { type: 'Staff', id: 'LIST' },
      ],
    }),

    downloadStaffDocument: builder.query({
      query: ({ staffMemberId, documentType }) => ({
        url: `/staff/${staffMemberId}/documents/${documentType}`,
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
    }),

    deleteStaffDocument: builder.mutation({
      query: ({ staffMemberId, documentType }) => ({
        url: `/staff/${staffMemberId}/documents/${documentType}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { staffMemberId }) => [
        { type: 'Staff', id: staffMemberId },
        { type: 'Staff', id: 'LIST' },
      ],
    }),

    confirmStaffMember: builder.mutation({
      query: (staffMemberId) => ({
        url: `/staff/${staffMemberId}/confirm`,
        method: 'POST',
      }),
      transformResponse: (response) => mapStaffMemberDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: (_result, _error, staffMemberId) => [
        { type: 'Staff', id: staffMemberId },
        { type: 'Staff', id: 'LIST' },
      ],
    }),

    cancelStaffMember: builder.mutation({
      query: (staffMemberId) => ({
        url: `/staff/${staffMemberId}/cancel`,
        method: 'POST',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, staffMemberId) => [
        { type: 'Staff', id: staffMemberId },
        { type: 'Staff', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetStaffMembersQuery,
  useGetStaffMemberByIdQuery,
  useLazyDownloadStaffDocumentQuery,
  useCreateStaffMemberMutation,
  useUpdateStaffMemberMutation,
  useDeleteStaffMemberMutation,
  useUploadStaffDocumentMutation,
  useDeleteStaffDocumentMutation,
  useConfirmStaffMemberMutation,
  useCancelStaffMemberMutation,
} = staffApi;

export default staffApi;
