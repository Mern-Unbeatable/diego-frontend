export const isRTL = (lang) => ['ar'].includes(lang);

export const applyDirection = (lang) => {
  const dir = isRTL(lang) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
};
