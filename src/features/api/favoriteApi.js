import { baseApi } from './baseApi';
import { endpoints } from '../../config/api/httpEndpoint';
import { unwrapApiData, transformErrorResponse } from './utils';

const getPayloadData = (payload) => unwrapApiData(payload) ?? {};

const mapFavoriteIdsResponse = (payload) => {
  const data = getPayloadData(payload);
  const rawIds = data?.courseIds ?? data?.ids ?? (Array.isArray(data) ? data : []);

  return {
    courseIds: Array.isArray(rawIds) ? rawIds.map(String) : [],
  };
};

const mapFavoriteCheckResponse = (payload) => {
  const data = getPayloadData(payload);

  return {
    isFavorite: Boolean(data?.isFavorite ?? data?.favorite ?? data?.isFavorited),
  };
};

const favoriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyFavoriteCourses: builder.query({
      query: () => ({
        url: endpoints.favorite.LIST,
        method: 'GET',
      }),
      transformResponse: (response) => getPayloadData(response),
      transformErrorResponse,
      providesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),

    getMyFavoriteCourseIds: builder.query({
      query: () => ({
        url: endpoints.favorite.IDS,
        method: 'GET',
      }),
      transformResponse: (response) => mapFavoriteIdsResponse(response),
      transformErrorResponse,
      providesTags: [{ type: 'Favorite', id: 'IDS' }],
    }),

    checkFavorite: builder.query({
      query: (courseId) => ({
        url: endpoints.favorite.CHECK(courseId),
        method: 'GET',
      }),
      transformResponse: (response) => mapFavoriteCheckResponse(response),
      transformErrorResponse,
      providesTags: (_result, _error, courseId) => [{ type: 'Favorite', id: courseId }],
    }),

    addFavorite: builder.mutation({
      query: (courseId) => ({
        url: endpoints.favorite.ADD(courseId),
        method: 'POST',
      }),
      transformResponse: (response) => getPayloadData(response),
      transformErrorResponse,
      async onQueryStarted(courseId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          favoriteApi.util.updateQueryData('getMyFavoriteCourseIds', undefined, (draft) => {
            const normalizedId = String(courseId);
            if (!draft.courseIds.includes(normalizedId)) {
              draft.courseIds.push(normalizedId);
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),

    removeFavorite: builder.mutation({
      query: (courseId) => ({
        url: endpoints.favorite.REMOVE(courseId),
        method: 'DELETE',
      }),
      transformResponse: (response) => getPayloadData(response),
      transformErrorResponse,
      async onQueryStarted(courseId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          favoriteApi.util.updateQueryData('getMyFavoriteCourseIds', undefined, (draft) => {
            const normalizedId = String(courseId);
            draft.courseIds = draft.courseIds.filter((id) => id !== normalizedId);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetMyFavoriteCoursesQuery,
  useGetMyFavoriteCourseIdsQuery,
  useCheckFavoriteQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;

export default favoriteApi;
