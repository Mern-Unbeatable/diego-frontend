import { COOKIE_STORAGE } from '../../utils/cookies/cookieStorage';
import { STORAGE } from '../../utils/storage/authStorage';

export const readPersistedAuth = () => {
  const token = COOKIE_STORAGE.getToken() || STORAGE.getToken() || null;
  const refreshToken =
    COOKIE_STORAGE.getRefreshToken() || STORAGE.getRefreshToken() || null;
  const user = COOKIE_STORAGE.getUser() || STORAGE.getUser() || null;

  return {
    user,
    token,
    refreshToken,
    isAuthenticated: Boolean(user && token),
  };
};
