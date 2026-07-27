import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const resetScrollPosition = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  document
    .querySelectorAll('main.overflow-y-auto, [data-scroll-container]')
    .forEach((element) => {
      element.scrollTop = 0;
    });
};

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    resetScrollPosition();
  }, [pathname, search]);

  return <Outlet />;
}
