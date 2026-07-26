import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';
import {
  mapAdminReviewsResponse,
  mapAdminReviewDetailResponse,
} from './reviewMappers';

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: ({
        page = 1,
        limit = 20,
        rating,
        search,
        isPublished,
        isPublic,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = {}) => ({
        url: '/reviews/all',
        method: 'GET',
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          ...(rating ? { rating } : {}),
          ...(search ? { search } : {}),
          ...(isPublished !== undefined && isPublished !== null
            ? { isPublished }
            : {}),
          ...(isPublic !== undefined && isPublic !== null ? { isPublic } : {}),
        },
      }),
      transformResponse: (response) => mapAdminReviewsResponse(unwrapApiData(response)),
      transformErrorResponse,
      providesTags: (result) =>
        result?.reviews?.length
          ? [
              ...result.reviews.map((review) => ({ type: 'Review', id: review.id })),
              { type: 'Review', id: 'LIST' },
            ]
          : [{ type: 'Review', id: 'LIST' }],
    }),

    publishReview: builder.mutation({
      query: ({ id, isPublished, isPublic }) => ({
        url: `/reviews/${id}/publish`,
        method: 'PATCH',
        body: {
          isPublished,
          ...(isPublic !== undefined ? { isPublic } : {}),
        },
      }),
      transformResponse: (response) => mapAdminReviewDetailResponse(unwrapApiData(response)),
      transformErrorResponse,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Review', id },
        { type: 'Review', id: 'LIST' },
      ],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: (_result, _error, id) => [
        { type: 'Review', id },
        { type: 'Review', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  usePublishReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;

export default reviewApi;
