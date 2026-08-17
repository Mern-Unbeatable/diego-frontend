import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV_CONFIG } from '../../config/env.config';
import { endpoints } from '../../config/api/httpEndpoint';
import { logout, setUser } from '../auth/authSlice';
import { COOKIE_STORAGE } from '../../utils/cookies/cookieStorage';
import { STORAGE } from '../../utils/storage/authStorage';
import { tagTypesList } from './tagList';

const getStoredAccessToken = (getState) =>
  getState()?.auth?.token ||
  COOKIE_STORAGE.getToken() ||
  STORAGE.getToken();

const baseQuery = fetchBaseQuery({
  baseUrl: ENV_CONFIG.API_BASE_URL,
  credentials: 'include',
  timeout: 120000,
  prepareHeaders: (headers, { getState, extra, endpoint, type, arg }) => {
    const token = getStoredAccessToken(getState);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    const body = typeof arg === 'object' && arg !== null ? arg.body : undefined;
    if (body instanceof FormData) {
      headers.delete('content-type');
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

    const refreshPayload = refreshResult?.data?.data ?? refreshResult?.data ?? {};
    const refreshData = refreshPayload?.data ?? refreshPayload;
    const newToken =
      refreshData?.accessToken ||
      refreshData?.tokens?.accessToken ||
      refreshData?.token;
    const newRefreshToken =
      refreshData?.refreshToken ||
      refreshData?.tokens?.refreshToken;

    if (refreshResult?.data?.success !== false && newToken) {
      COOKIE_STORAGE.setToken(newToken);
      STORAGE.setToken(newToken);
      if (newRefreshToken) {
        COOKIE_STORAGE.setRefreshToken(newRefreshToken);
        STORAGE.setRefreshToken(newRefreshToken);
      }
      api.dispatch(setUser({ token: newToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      api.dispatch(baseApi.util.resetApiState());
    }
  }

  const licenseErrorCode = result?.error?.data?.code;
  if (
    result?.error?.status === 403 &&
    ['LICENSE_EXPIRED', 'LICENSE_SUSPENDED'].includes(licenseErrorCode) &&
    typeof window !== 'undefined' &&
    !window.location.pathname.startsWith('/dashboard/license-user/license')
  ) {
    window.location.assign('/dashboard/license-user/license');
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
