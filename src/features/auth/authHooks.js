// authHooks.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginAPI,
  verifyLoginOtpAPI,
  registerAPI,
  verifyRegisterOtpAPI,
  registerCompleteAPI,
} from './authAPI';
import { selectAuth } from './authSelectors';
import { clearLoginOtp } from './authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  // ✅ EMAIL LOGIN OTP CALLBACK
  const login = useCallback(
    async (credentials) => {
      const result = await dispatch(loginAPI(credentials)).unwrap();
      return result;
    },
    [dispatch],
  );

  // ✅ VERIFY LOGIN OTP CALLBACK
  const verifyLoginOtp = useCallback(
    async (otp) => {
      const result = await dispatch(verifyLoginOtpAPI(otp)).unwrap();
      // For now, just return a resolved promise
      return result;
    },
    [dispatch],
  );

  // ✅ REGISTER CALLBACK
  const register = useCallback(
    async (credentials) => {
      const result = await dispatch(registerAPI(credentials)).unwrap();
      return result;
    },
    [dispatch],
  );

  // ✅ REGISTER OTP CALLBACK
  const verifyRegisterOtp = useCallback(
    async (otp) => {
      const result = await dispatch(verifyRegisterOtpAPI(otp)).unwrap();
      return result;
    },
    [dispatch],
  );

  //✅  REGISTER COMPLETE CALLBACK
  const registerComplete = useCallback(
    async (credentials) => {
      const result = await dispatch(registerCompleteAPI(credentials)).unwrap();
      return result;
    },
    [dispatch],
  );

  const resetLoginOtp = useCallback(() => {
    dispatch(clearLoginOtp());
  }, [dispatch]);

  return {
    login,
    verifyLoginOtp,
    register,
    verifyRegisterOtp,
    registerComplete,
    resetLoginOtp,
    ...authState, // This gives you loading, error, user, token, isAuthenticated
  };
};
