// authHooks.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAPI, otpVerifyAPI } from './authAPI';
import { selectAuth } from './authSelectors';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  // EMAIL LOGIN OTP CALLBACK
  const login = useCallback(
    async (credentials) => {
      const result = await dispatch(loginAPI(credentials)).unwrap();
      return result;
    },
    [dispatch],
  );

  // VARIFY OTP CALLBACK
  const verifyOtp = useCallback(
    async (otp) => {
      const result = await dispatch(otpVerifyAPI(otp)).unwrap();
      // For now, just return a resolved promise
      return result;
    },
    [dispatch],
  );

  return {
    login,
    verifyOtp,
    ...authState, // This gives you loading, error, user, token, isAuthenticated
  };
};
