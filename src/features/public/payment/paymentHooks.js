import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCoursePaymentIntentAPI } from './paymentAPI';
import { resetPaymentIntent } from './paymentSlice';
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

  return {
    createCoursePaymentIntent,
    clearPaymentIntent,
    ...paymentState,
  };
};
