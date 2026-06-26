import { useState, useEffect, useCallback } from 'react';
import { BREAKPOINTS, ITEMS_PER_PAGE, CAROUSEL_CONFIG } from '../data/courses';

export const useCarousel = (totalItems) => {
  const [state, setState] = useState({
    currentPage: 0,
    itemsPerPage: ITEMS_PER_PAGE.DESKTOP,
    isDragging: false,
    startX: 0,
    currentTranslate: 0,
    isMoved: false,
  });

  const getItemsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return ITEMS_PER_PAGE.DESKTOP;

    // Keep cards readable on 1024px laptops, use 4-up only on wider desktops.
    if (window.innerWidth >= 1280) return ITEMS_PER_PAGE.DESKTOP;
    if (window.innerWidth >= BREAKPOINTS.DESKTOP) return 3;
    if (window.innerWidth >= BREAKPOINTS.TABLET) return ITEMS_PER_PAGE.TABLET;
    return ITEMS_PER_PAGE.MOBILE;
  }, []);

  const totalPages = Math.ceil(totalItems / state.itemsPerPage);
  const showPagination = totalItems > state.itemsPerPage;

  const getClientX = useCallback((e) => {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }, []);

  const goToPage = useCallback((index) => {
    setState((prev) => ({ ...prev, currentPage: index }));
  }, []);

  const handleDragStart = useCallback(
    (e) => {
      if (e.button !== 0 && !e.touches) return;

      const clientX = getClientX(e);
      setState((prev) => ({
        ...prev,
        startX: clientX,
        isMoved: false,
        currentTranslate: -((prev.currentPage * 100) / prev.itemsPerPage),
      }));
    },
    [getClientX],
  );

  const handleDragMove = useCallback(
    (e) => {
      if (state.startX === 0) return;

      const currentX = getClientX(e);
      const deltaX = currentX - state.startX;

      if (Math.abs(deltaX) > 5) {
        setState((prev) => ({ ...prev, isMoved: true, isDragging: true }));
      }

      const dragPercentage = (deltaX / window.innerWidth) * 100;
      const newTranslate =
        -((state.currentPage * 100) / state.itemsPerPage) + dragPercentage;
      setState((prev) => ({ ...prev, currentTranslate: newTranslate }));
    },
    [state.startX, state.currentPage, state.itemsPerPage, getClientX],
  );

  const handleDragEnd = useCallback(() => {
    if (state.startX === 0) return;

    const pageTranslate = -((state.currentPage * 100) / state.itemsPerPage);
    const dragDistance = state.currentTranslate - pageTranslate;

    let newPage = state.currentPage;

    if (dragDistance < -CAROUSEL_CONFIG.SWIPE_THRESHOLD) {
      newPage = Math.min(totalPages - 1, state.currentPage + 1);
    } else if (dragDistance > CAROUSEL_CONFIG.SWIPE_THRESHOLD) {
      newPage = Math.max(0, state.currentPage - 1);
    }

    setState((prev) => ({
      ...prev,
      startX: 0,
      currentPage: newPage,
    }));

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isMoved: false,
        isDragging: false,
      }));
    }, CAROUSEL_CONFIG.TRANSITION_DURATION + 50);
  }, [state, totalPages]);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      setState((prev) => ({
        ...prev,
        itemsPerPage: newItemsPerPage,
        currentPage: 0,
      }));
    };

    window.addEventListener('resize', handleResize);
    setState((prev) => ({ ...prev, itemsPerPage: getItemsPerPage() }));

    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerPage]);

  return {
    state,
    totalPages,
    showPagination,
    goToPage,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getClientX,
  };
};
