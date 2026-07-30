import ENV_CONFIG from '../config/env.config';
import { COOKIE_STORAGE } from './cookies/cookieStorage';
import { STORAGE } from './storage/authStorage';

const getApiOrigin = () => {
  const apiBase = ENV_CONFIG.API_BASE_URL || '';
  if (/^https?:\/\//i.test(apiBase)) {
    return apiBase.replace(/\/api\/v\d+\/?$/i, '').replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

const shouldProxyToFrontendOrigin = (pathname = '') =>
  pathname.startsWith('/api/') || pathname.startsWith('/uploads/');

const rewriteToSameOriginIfNeeded = (parsed) => {
  if (typeof window === 'undefined') return parsed.href;
  if (parsed.origin === window.location.origin) return parsed.href;
  if (shouldProxyToFrontendOrigin(parsed.pathname)) {
    return `${window.location.origin}${parsed.pathname}${parsed.search}${parsed.hash}`;
  }
  return parsed.href;
};

/**
 * Resolves lesson/upload URLs to a browser-loadable URL.
 * In dev, Vite proxies /api and /uploads — use same-origin paths so PDF/SCORM embed in iframes.
 */
export const resolveAbsoluteContentUrl = (contentUrl) => {
  if (!contentUrl || typeof contentUrl !== 'string') return '';
  const trimmed = contentUrl.trim();
  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) {
    if (typeof window !== 'undefined') {
      try {
        return rewriteToSameOriginIfNeeded(new URL(trimmed));
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${trimmed}`;
    }
    const origin = getApiOrigin();
    return origin ? `${origin}${trimmed}` : trimmed;
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}/${trimmed}`;
  }

  const origin = getApiOrigin();
  return origin ? `${origin}/${trimmed}` : `/${trimmed}`;
};

/** SCORM player HTML is served from /api/v1/scorm/player/:id — must load same-origin in dev. */
export const resolveSameOriginApiUrl = (apiUrl) => {
  if (!apiUrl || typeof apiUrl !== 'string') return '';
  const trimmed = apiUrl.trim();
  if (!trimmed) return '';

  if (typeof window === 'undefined') return trimmed;

  try {
    const parsed = /^https?:\/\//i.test(trimmed)
      ? new URL(trimmed)
      : new URL(trimmed.startsWith('/') ? trimmed : `/${trimmed}`, window.location.origin);

    return rewriteToSameOriginIfNeeded(parsed);
  } catch {
    return trimmed;
  }
};

export const getAuthHeaders = () => {
  const token = COOKIE_STORAGE.getToken() || STORAGE.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAuthenticatedBlob = async (contentUrl, { signal } = {}) => {
  const absoluteUrl = resolveAbsoluteContentUrl(contentUrl);
  if (!absoluteUrl) {
    throw new Error('URL contenuto non valida');
  }

  const response = await fetch(absoluteUrl, {
    headers: getAuthHeaders(),
    credentials: 'include',
    signal,
  });

  if (!response.ok) {
    throw new Error(`Impossibile caricare il file (${response.status})`);
  }

  const blob = await response.blob();
  return { blob, response, absoluteUrl };
};

export const isPdfBlob = async (blob) => {
  if (!blob) return false;
  if (blob.type && blob.type.toLowerCase().includes('pdf')) return true;
  try {
    const header = await blob.slice(0, 5).text();
    return header.startsWith('%PDF');
  } catch {
    return false;
  }
};

export const isPdfContent = (contentType, contentUrl) => {
  if (contentType === 'PDF') return true;
  const extension = getFileExtension(contentUrl);
  if (extension === 'pdf') return true;
  return false;
};

export const getOfficeEmbedUrl = (contentUrl) => {
  const absoluteUrl = resolveAbsoluteContentUrl(contentUrl);
  if (!absoluteUrl) return '';
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
};

export const isLocalhostUrl = (contentUrl) => {
  const absoluteUrl = resolveAbsoluteContentUrl(contentUrl);
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(absoluteUrl);
};

export const getFileExtension = (contentUrl) => {
  if (!contentUrl) return '';
  const cleanUrl = contentUrl.split('?')[0].split('#')[0];
  const parts = cleanUrl.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

export const isWordDocumentUrl = (contentUrl) => {
  const extension = getFileExtension(contentUrl);
  return extension === 'doc' || extension === 'docx';
};

export const isExcelDocumentUrl = (contentUrl) => {
  const extension = getFileExtension(contentUrl);
  return ['xlsx', 'xls', 'csv', 'xlsm'].includes(extension);
};
