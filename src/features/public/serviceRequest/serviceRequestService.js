import { request } from '../../../config/api/request';
import { endpoints } from '../../../config/api/httpEndpoint';

export const createServiceRequestService = async (
  formData,
  { signal } = {},
) => {
  return await request({
    method: 'POST',
    url: endpoints.public.SERVICE_REQUESTS,
    data: formData,
    signal,
    skipAuth: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120000,
  });
};
