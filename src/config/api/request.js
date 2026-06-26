import { axiosInstance } from './client';
export const request = async ({ method, url, data, params, signal }) => {
  const response = await axiosInstance({ method, url, data, params, signal });
  return response.data;
};
