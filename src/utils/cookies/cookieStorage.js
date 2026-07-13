// src/utils/storage/cookieStorage.js
import Cookies from 'js-cookie';

const COOKIE_OPTIONS = {
  default: {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
  auth: {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: 7,
  },
  remember: {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: 30,
  },
  session: {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: 1,
  },
  temp: {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: 1 / 24,
  },
};

export const COOKIE_STORAGE = {
  setToken: (token, rememberMe = false) => {
    const options = rememberMe ? COOKIE_OPTIONS.remember : COOKIE_OPTIONS.auth;
    Cookies.set('auth_token', token, options);
  },

  getToken: () => {
    return Cookies.get('auth_token') || null;
  },

  clearToken: () => {
    Cookies.remove('auth_token', { path: '/' });
  },

  setRefreshToken: (token, rememberMe = false) => {
    const options = rememberMe ? COOKIE_OPTIONS.remember : COOKIE_OPTIONS.auth;
    Cookies.set('refresh_token', token, options);
  },

  getRefreshToken: () => {
    return Cookies.get('refresh_token') || null;
  },

  clearRefreshToken: () => {
    Cookies.remove('refresh_token', { path: '/' });
  },

  setUser: (user) => {
    try {
      const userString = JSON.stringify(user);
      Cookies.set('user_data', userString, COOKIE_OPTIONS.session);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  },

  getUser: () => {
    try {
      const userString = Cookies.get('user_data');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  clearUser: () => {
    Cookies.remove('user_data', { path: '/' });
  },

  setTempData: (key, value, expiresInHours = 1) => {
    try {
      const options = {
        ...COOKIE_OPTIONS.temp,
        expires: expiresInHours / 24,
      };
      Cookies.set(`temp_${key}`, JSON.stringify(value), options);
    } catch (error) {
      console.error('Error storing temp data:', error);
    }
  },

  getTempData: (key) => {
    try {
      const data = Cookies.get(`temp_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error parsing temp data:', error);
      return null;
    }
  },

  clearTempData: (key) => {
    Cookies.remove(`temp_${key}`, { path: '/' });
  },

  clearAll: () => {
    Cookies.remove('auth_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });
    Cookies.remove('user_data', { path: '/' });

    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      if (cookieName.startsWith('temp_')) {
        Cookies.remove(cookieName, { path: '/' });
      }
    });
  },

  isAuthenticated: () => {
    return !!Cookies.get('auth_token');
  },

  getAll: () => {
    return Cookies.get();
  },

  set: (name, value, options = {}) => {
    Cookies.set(name, value, { ...COOKIE_OPTIONS.default, ...options });
  },

  get: (name) => {
    return Cookies.get(name) || null;
  },

  remove: (name) => {
    Cookies.remove(name, { path: '/' });
  },
};

export default COOKIE_STORAGE;
