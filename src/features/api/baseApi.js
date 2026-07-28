import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV_CONFIG } from '../../config/env.config';
import { endpoints } from '../../config/api/httpEndpoint';
import { logout, setUser } from '../auth/authSlice';
import { COOKIE_STORAGE } from '../../utils/cookies/cookieStorage';
import { STORAGE } from '../../utils/storage/authStorage';
import { tagTypesList } from './tagList';

const baseQuery = fetchBaseQuery({
  baseUrl: ENV_CONFIG.API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token || COOKIE_STORAGE.getToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken =
      STORAGE.getRefreshToken() || COOKIE_STORAGE.getRefreshToken();

    const refreshResult = await baseQuery(
      {
        url: endpoints.auth.REFRESH,
        method: 'POST',
        body: refreshToken ? { refreshToken } : undefined,
        credentials: 'include',
      },
      api,
      extraOptions,
    );

    const refreshData = refreshResult?.data?.data ?? refreshResult?.data;
    const newToken =
      refreshData?.accessToken ||
      refreshData?.tokens?.accessToken ||
      refreshData?.token;

    if (refreshResult?.data?.success !== false && newToken) {
      COOKIE_STORAGE.setToken(newToken);
      STORAGE.setToken(newToken);
      api.dispatch(setUser({ token: newToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
