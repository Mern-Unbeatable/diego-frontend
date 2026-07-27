import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCompanyCourseCheckoutAPI,
  createCoursePaymentIntentAPI,
  verifyCoursePaymentIntentAPI,
} from './paymentAPI';
import { resetCompanyCheckout, resetPaymentIntent } from './paymentSlice';
import { selectPayment } from './paymentSelectors';

export const usePayment = () => {
  const dispatch = useDispatch();
  const paymentState = useSelector(selectPayment);

  const createCoursePaymentIntent = useCallback(
    async (payload) => {
      const result = await dispatch(createCoursePaymentIntentAPI(payload)).unwrap();
      return result;
    },
    [dispatch],
  );

  const clearPaymentIntent = useCallback(() => {
    dispatch(resetPaymentIntent());
  }, [dispatch]);

  const verifyCoursePaymentIntent = useCallback(
    async (paymentIntentId) => {
      const result = await dispatch(
        verifyCoursePaymentIntentAPI(paymentIntentId),
      ).unwrap();
      return result;
    },
    [dispatch],
  );

  const createCompanyCourseCheckout = useCallback(
    async (payload) => {
      const result = await dispatch(createCompanyCourseCheckoutAPI(payload)).unwrap();
      return result;
    },
    [dispatch],
  );

  const clearCompanyCheckout = useCallback(() => {
    dispatch(resetCompanyCheckout());
  }, [dispatch]);

  return {
    createCoursePaymentIntent,
    verifyCoursePaymentIntent,
    createCompanyCourseCheckout,
    clearPaymentIntent,
    clearCompanyCheckout,
    ...paymentState,
  };
};
