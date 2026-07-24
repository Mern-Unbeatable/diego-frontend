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

export const createCompanyCourseCheckoutService = async (payload, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.public.PAYMENTS_CHECKOUT_COMPANY_COURSE,
    data: payload,
    signal,
  });
};

export const createCompanyCoursePaymentIntentService = async (payload, { signal } = {}) => {
  return await request({
    method: 'POST',
    url: endpoints.public.PAYMENTS_INTENT_COMPANY_COURSE,
    data: payload,
    signal,
  });
};

export const verifyCompanyCoursePaymentIntentService = async (
  paymentIntentId,
  { signal } = {},
) => {
  return await request({
    method: 'GET',
    url: endpoints.public.PAYMENTS_INTENT_COMPANY_COURSE_VERIFY,
    params: { paymentIntentId },
    signal,
  });
};
