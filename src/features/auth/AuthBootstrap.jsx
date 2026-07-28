import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hydrateAuth } from '../auth/authSlice';

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  return children;
}
