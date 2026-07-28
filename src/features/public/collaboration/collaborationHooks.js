import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCollaborationAPI } from './collaborationAPI';
import { selectCollaboration } from './collaborationSelectors';

export const useCollaboration = () => {
  const dispatch = useDispatch();
  const collaborationState = useSelector(selectCollaboration);

  const createCollaboration = useCallback(
    async (payload) => {
      const result = await dispatch(createCollaborationAPI(payload)).unwrap();
      return result;
    },
    [dispatch],
  );

  return {
    createCollaboration,
    ...collaborationState,
  };
};
