import { ENV_CONFIG } from '../config/env.config';

export const FALLBACK_COURSE_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRdy7X0K-tiZrcgxcNp2BhRjDH6MX6XaCpJyGXfHh6-jrw1Ga2tP3tEH8&s=10';

const API_ORIGIN = (() => {
  try {
    return new URL(ENV_CONFIG.API_BASE_URL).origin;
  } catch {
    return '';
  }
})();

export const resolveImageUrl = (url) => {
  if (!url) return FALLBACK_COURSE_IMAGE;

  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url);
      const isLocalhostSource =
        parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
      const isFrontendLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1');

      if (API_ORIGIN && isLocalhostSource && !isFrontendLocalhost) {
        return `${API_ORIGIN}${parsed.pathname}${parsed.search}`;
      }
      return url;
    } catch {
      return url;
    }
  }

  if (API_ORIGIN) {
    return `${API_ORIGIN}/${String(url).replace(/^\/+/, '')}`;
  }

  return url;
};

export const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
};

export const formatMinutesDuration = (totalMinutes) => {
  const minutes = Number(totalMinutes);
  if (!Number.isFinite(minutes) || minutes <= 0) return '-';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${remainingMinutes}m`;
};

export const formatCourseDuration = (course = {}) => {
  if (course.durationMinutes) {
    return formatMinutesDuration(course.durationMinutes);
  }

  if (course.duration) {
    return formatMinutesDuration(course.duration);
  }

  return '-';
};

export const formatEuro = (value) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value) || 0);
