import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContactAPI } from './contactAPI';
import { selectContact } from './contactSelectors';

export const useContact = () => {
  const dispatch = useDispatch();
  const contactState = useSelector(selectContact);

  const createContact = useCallback(
    async (payload) => {
      const result = await dispatch(createContactAPI(payload)).unwrap();
      return result;
    },
    [dispatch],
  );

  return {
    createContact,
    ...contactState,
  };
};
