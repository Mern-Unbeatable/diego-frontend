import { request } from '../../../config/api/request';
import { endpoints } from '../../../config/api/httpEndpoint';

export const createCoursePaymentIntentService = async (payload, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.public.PAYMENTS_INTENT_COURSE,
    data: payload,
    signal,
  });
};

export const verifyCoursePaymentIntentService = async (
  paymentIntentId,
  { signal } = {},
) => {
  return await request({
    method: 'GET',
    url: endpoints.public.PAYMENTS_INTENT_COURSE_VERIFY,
    params: { paymentIntentId },
    signal,
  });
};
