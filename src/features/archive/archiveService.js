import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

const unwrap = (response) => response?.data ?? response;

export const getArchivePlanService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.certificate.ARCHIVE_PLAN,
    signal,
  });
  return unwrap(response);
};

export const createArchivePaymentIntentService = async ({ signal } = {}) => {
  const response = await request({
    method: 'POST',
    url: endpoints.archive.PAYMENT_INTENT,
    signal,
  });
  return unwrap(response);
};

export const verifyArchivePaymentIntentService = async (
  paymentIntentId,
  { signal } = {},
) => {
  const response = await request({
    method: 'GET',
    url: endpoints.archive.PAYMENT_INTENT_VERIFY,
    params: { paymentIntentId },
    signal,
  });
  return unwrap(response);
};
