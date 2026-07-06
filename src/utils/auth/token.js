const ACCESS_TOKEN = 'accessToken';

export const getToken = () => localStorage.getItem(ACCESS_TOKEN);

export const setToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
