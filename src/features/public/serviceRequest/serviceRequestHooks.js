import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createServiceRequestAPI } from './serviceRequestAPI';
import { selectServiceRequest } from './serviceRequestSelectors';

export const useServiceRequest = () => {
  const dispatch = useDispatch();
  const serviceRequestState = useSelector(selectServiceRequest);

  const createServiceRequest = useCallback(
    async (formData) => {
      const result = await dispatch(createServiceRequestAPI(formData)).unwrap();
      return result;
    },
    [dispatch],
  );

  return {
    createServiceRequest,
    ...serviceRequestState,
  };
};
