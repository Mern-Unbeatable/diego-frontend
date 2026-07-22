import { request } from '../../../config/api/request';
import { endpoints } from '../../../config/api/httpEndpoint';

export const createReviewService = async (payload, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.public.REVIEWS,
    data: payload,
    signal,
    skipAuth: true,
  });
};
