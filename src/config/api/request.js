// request.js

import { axiosInstance } from './client';

export const request = async ({
  method,
  url,
  data,
  params,
  signal,
  skipAuth,
  headers,
  timeout,
}) => {
  const response = await axiosInstance({
    method,
    url,
    data,
    params,
    signal,
    skipAuth,
    headers,
    timeout,
  });
  return response.data;
};
