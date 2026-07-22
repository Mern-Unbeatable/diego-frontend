import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewAPI } from './reviewAPI';
import { selectReview } from './reviewSelectors';

export const useReview = () => {
  const dispatch = useDispatch();
  const reviewState = useSelector(selectReview);

  const createReview = useCallback(
    async (payload) => {
      const result = await dispatch(createReviewAPI(payload)).unwrap();
      return result;
    },
    [dispatch],
  );

  return {
    createReview,
    ...reviewState,
  };
};
