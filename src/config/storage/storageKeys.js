import { storageKeys } from './authStorage';

// ========== Helper Functions ==========
const getItem = (key) => localStorage.getItem(key);
const setItem = (key, value) => localStorage.setItem(key, value);
const removeItem = (key) => localStorage.removeItem(key);

// JSON-safe helpers (optional, reusable)
const getJSON = (key) => {
  try {
    const value = getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    console.warn(`⚠️ Failed to parse JSON for key: ${key}`);
    removeItem(key);
    return null;
  }
};

const setJSON = (key, value) => setItem(key, JSON.stringify(value));

// ========== Main STORAGE API ==========
export const STORAGE = {
  // === USER ===
  getUser: () => getJSON(storageKeys.USER),
  setUser: (user) => setJSON(storageKeys.USER, user),
  clearUser: () => removeItem(storageKeys.USER),

  // === TOKEN ===
  getToken: () => getItem(storageKeys.TOKEN),
  setToken: (token) => setItem(storageKeys.TOKEN, token),

  getRefreshToken: () => getItem(storageKeys.REFRESH_TOKEN),
  setRefreshToken: (token) => setItem(storageKeys.REFRESH_TOKEN, token),

  clearToken: () => removeItem(storageKeys.TOKEN),

  // === CLEAR ALL (logout / app reset) ===
  clearAll: () => {
    Object.values(storageKeys).forEach((key) => removeItem(key));
  },
};
