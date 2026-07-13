// utils/debug/cookieDebug.js
import Cookies from 'js-cookie';
import COOKIE_STORAGE from './cookieStorage';

export const debugCookies = () => {
  console.log('=== Cookie Debug Info ===');
  console.log('All Cookies:', Cookies.get());
  console.log('Auth Token:', COOKIE_STORAGE.getToken());
  console.log('Refresh Token:', COOKIE_STORAGE.getRefreshToken());
  console.log('User Data:', COOKIE_STORAGE.getUser());
  console.log('Is Authenticated:', COOKIE_STORAGE.isAuthenticated());
  console.log('===========================');
};

// Add to window for easy debugging
if (process.env.NODE_ENV === 'development') {
  window.debugCookies = debugCookies;
}
