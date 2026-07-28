import { request } from '../../../config/api/request';
import { endpoints } from '../../../config/api/httpEndpoint';

export const createCollaborationService = async (payload, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.public.COLLABORATIONS,
    data: payload,
    signal,
    skipAuth: true,
  });
};
