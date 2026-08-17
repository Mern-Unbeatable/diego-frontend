import { baseApi } from './baseApi';
import { unwrapApiData, transformErrorResponse } from './utils';

const platformApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatformStatus: builder.query({
      query: () => ({
        url: '/platform-settings/status',
        method: 'GET',
      }),
      transformResponse: (response) => unwrapApiData(response),
      transformErrorResponse,
    }),
  }),
});

export const { useGetPlatformStatusQuery } = platformApi;
export default platformApi;
