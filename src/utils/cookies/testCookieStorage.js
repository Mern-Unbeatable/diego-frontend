import COOKIE_STORAGE from './cookieStorage';

// Test function to verify cookie storage
const testCookieStorage = () => {
  // Set test cookie
  COOKIE_STORAGE.set('test_cookie', 'Hello World', { expires: 1 });

  // Get test cookie
  const value = COOKIE_STORAGE.get('test_cookie');
  console.log('Test cookie value:', value);

  // Remove test cookie
  COOKIE_STORAGE.remove('test_cookie');
  console.log('Test cookie removed');

  // Test auth cookies
  COOKIE_STORAGE.setToken('test_token_123', true);
  console.log('Token set:', COOKIE_STORAGE.getToken());

  COOKIE_STORAGE.clearAll();
  console.log('All cookies cleared');
};

export default testCookieStorage;
