import { request } from '../../../config/api/request';
import { endpoints } from '../../../config/api/httpEndpoint';

export const createContactService = async (payload, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.public.CONTACTS,
    data: payload,
    signal,
    skipAuth: true,
  });
};
