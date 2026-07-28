import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';

export const extractPackagesFromResponse = (response) => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.packages)) return response.packages;

  const layer1 = unwrapApiData(response);
  if (Array.isArray(layer1)) return layer1;
  if (Array.isArray(layer1?.packages)) return layer1.packages;

  const layer2 = unwrapApiData(layer1);
  if (Array.isArray(layer2)) return layer2;
  if (Array.isArray(layer2?.packages)) return layer2.packages;

  if (layer1?.data?.packages) return layer1.data.packages;
  if (layer2?.data?.packages) return layer2.data.packages;

  return [];
};

const extractPackage = (response) => {
  const data = unwrapApiData(response);
  return data?.package || data;
};

const patchPackageList = (draft, pkg, { replace = false } = {}) => {
  if (!pkg?.id) return;
  const index = draft.findIndex((item) => item.id === pkg.id);
  if (index >= 0) {
    draft[index] = replace ? pkg : { ...draft[index], ...pkg };
    return;
  }
  draft.unshift(pkg);
};

const coursePackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoursePackages: builder.query({
      query: (params = {}) => ({
        url: '/course-packages',
        method: 'GET',
        params,
      }),
      transformResponse: (response) => extractPackagesFromResponse(response),
      transformErrorResponse,
      providesTags: (result) =>
        result
          ? [
              ...result.map((pkg) => ({ type: 'CoursePackage', id: pkg.id })),
              { type: 'CoursePackage', id: 'LIST' },
            ]
          : [{ type: 'CoursePackage', id: 'LIST' }],
    }),

    getCoursePackagesForSelection: builder.query({
      query: (type) => ({
        url: '/course-packages/for-selection',
        method: 'GET',
        params: { type },
      }),
      transformResponse: (response) => extractPackagesFromResponse(response),
      transformErrorResponse,
      providesTags: (_result, _error, type) => [
        { type: 'CoursePackage', id: `SELECTION-${type}` },
      ],
    }),

    getCoursePackageById: builder.query({
      query: (id) => ({
        url: `/course-packages/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => extractPackage(response),
      transformErrorResponse,
      providesTags: (_result, _error, id) => [{ type: 'CoursePackage', id }],
    }),

    createCoursePackage: builder.mutation({
      query: (body) => ({
        url: '/course-packages',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => extractPackage(response),
      transformErrorResponse,
      invalidatesTags: (result) => [
        { type: 'CoursePackage', id: 'LIST' },
        ...(result?.type ? [{ type: 'CoursePackage', id: `SELECTION-${result.type}` }] : []),
      ],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: pkg } = await queryFulfilled;
          if (!pkg?.id) return;

          const patchList = (draft) => patchPackageList(draft, pkg);

          dispatch(
            coursePackageApi.util.updateQueryData('getCoursePackages', undefined, patchList),
          );
          dispatch(
            coursePackageApi.util.updateQueryData('getCoursePackages', {}, patchList),
          );

          if (pkg.type) {
            dispatch(
              coursePackageApi.util.updateQueryData(
                'getCoursePackagesForSelection',
                pkg.type,
                patchList,
              ),
            );
          }
        } catch {
          // noop
        }
      },
    }),

    updateCoursePackage: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/course-packages/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response) => extractPackage(response),
      transformErrorResponse,
      invalidatesTags: (result, _error, { id }) => [
        { type: 'CoursePackage', id: 'LIST' },
        { type: 'CoursePackage', id },
        ...(result?.type
          ? [{ type: 'CoursePackage', id: `SELECTION-${result.type}` }]
          : [
              { type: 'CoursePackage', id: 'SELECTION-SINGLE_USER' },
              { type: 'CoursePackage', id: 'SELECTION-COMPANY' },
            ]),
      ],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: pkg } = await queryFulfilled;
          if (!pkg?.id) return;

          const patchList = (draft) => patchPackageList(draft, pkg, { replace: true });

          dispatch(
            coursePackageApi.util.updateQueryData('getCoursePackages', undefined, patchList),
          );
          dispatch(
            coursePackageApi.util.updateQueryData('getCoursePackages', {}, patchList),
          );

          ['SINGLE_USER', 'COMPANY'].forEach((type) => {
            dispatch(
              coursePackageApi.util.updateQueryData(
                'getCoursePackagesForSelection',
                type,
                patchList,
              ),
            );
          });

          dispatch(
            coursePackageApi.util.updateQueryData('getCoursePackageById', id, () => pkg),
          );
        } catch {
          // noop
        }
      },
    }),

    deleteCoursePackage: builder.mutation({
      query: (id) => ({
        url: `/course-packages/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
      invalidatesTags: [
        { type: 'CoursePackage', id: 'LIST' },
        { type: 'CoursePackage', id: 'SELECTION-SINGLE_USER' },
        { type: 'CoursePackage', id: 'SELECTION-COMPANY' },
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          const removeFromList = (draft) => {
            const index = draft.findIndex((item) => item.id === id);
            if (index >= 0) draft.splice(index, 1);
          };

          dispatch(
            coursePackageApi.util.updateQueryData('getCoursePackages', undefined, removeFromList),
          );
          dispatch(
            coursePackageApi.util.updateQueryData('getCoursePackages', {}, removeFromList),
          );

          ['SINGLE_USER', 'COMPANY'].forEach((type) => {
            dispatch(
              coursePackageApi.util.updateQueryData(
                'getCoursePackagesForSelection',
                type,
                removeFromList,
              ),
            );
          });
        } catch {
          // noop
        }
      },
    }),
  }),
});

export const {
  useGetCoursePackagesQuery,
  useGetCoursePackagesForSelectionQuery,
  useLazyGetCoursePackageByIdQuery,
  useCreateCoursePackageMutation,
  useUpdateCoursePackageMutation,
  useDeleteCoursePackageMutation,
} = coursePackageApi;

export default coursePackageApi;
