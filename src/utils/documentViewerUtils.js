import ENV_CONFIG from '../config/env.config';
import { COOKIE_STORAGE } from './cookies/cookieStorage';
import { STORAGE } from './storage/authStorage';

const getApiOrigin = () => {
  const apiBase = ENV_CONFIG.API_BASE_URL || '';
  if (/^https?:\/\//i.test(apiBase)) {
    return apiBase.replace(/\/api\/v\d+\/?$/i, '').replace(/\/$/, '');
  }
  return '';
};

const isLocalhostOrigin = (origin = '') =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

const isApiOrUploadPath = (pathname = '') =>
  pathname.startsWith('/api/') || pathname.startsWith('/uploads/');

/**
 * Dev: Vite proxies /api and /uploads on the frontend origin (localhost:5173).
 * Prod: uploads and API routes are served from the API host (e.g. api-diego.maktechgroup.tech),
 * which may differ from the SPA host (diego.maktechgroup.tech).
 */
const resolveContentServingOrigin = () => {
  if (typeof window === 'undefined') {
    return getApiOrigin();
  }

  if (ENV_CONFIG.IS_DEV) {
    return window.location.origin;
  }

  return getApiOrigin() || window.location.origin;
};

const rewriteContentUrl = (parsed) => {
  const servingOrigin = resolveContentServingOrigin();
  if (!servingOrigin) return parsed.href;

  if (isApiOrUploadPath(parsed.pathname)) {
    return `${servingOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
  }

  if (isLocalhostOrigin(parsed.origin)) {
    return `${servingOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
  }

  return parsed.href;
};

const parseContentUrl = (rawUrl) => {
  const trimmed = String(rawUrl || '').trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return new URL(trimmed);
  }

  const base = resolveContentServingOrigin() || (typeof window !== 'undefined' ? window.location.origin : '');
  return new URL(trimmed.startsWith('/') ? trimmed : `/${trimmed}`, base);
};

/**
 * Resolves lesson/upload URLs to a browser-loadable URL.
 */
export const resolveAbsoluteContentUrl = (contentUrl) => {
  if (!contentUrl || typeof contentUrl !== 'string') return '';
  const trimmed = contentUrl.trim();
  if (!trimmed) return '';

  try {
    return rewriteContentUrl(parseContentUrl(trimmed));
  } catch {
    return trimmed;
  }
};

/** SCORM player HTML is served from /api/v1/scorm/player/:id */
export const resolveSameOriginApiUrl = (apiUrl) => {
  if (!apiUrl || typeof apiUrl !== 'string') return '';
  const trimmed = apiUrl.trim();
  if (!trimmed) return '';

  try {
    return rewriteContentUrl(parseContentUrl(trimmed));
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
