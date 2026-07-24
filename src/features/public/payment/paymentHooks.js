import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCoursePaymentIntentAPI,
  verifyCoursePaymentIntentAPI,
} from './paymentAPI';
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

  const verifyCoursePaymentIntent = useCallback(
    async (paymentIntentId) => {
      const result = await dispatch(
        verifyCoursePaymentIntentAPI(paymentIntentId),
      ).unwrap();
      return result;
    },
    [dispatch],
  );

  return {
    createCoursePaymentIntent,
    verifyCoursePaymentIntent,
    clearPaymentIntent,
    ...paymentState,
  };
};
