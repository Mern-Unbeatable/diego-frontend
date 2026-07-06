export const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

export const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((item) => item.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

export const removeCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
