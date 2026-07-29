import ENV_CONFIG from '../config/env.config';

export const resolveAbsoluteContentUrl = (contentUrl) => {
  if (!contentUrl || typeof contentUrl !== 'string') return '';
  const trimmed = contentUrl.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const apiBase = ENV_CONFIG.API_BASE_URL || '';
  const origin = apiBase.replace(/\/api\/v\d+\/?$/i, '') || window.location.origin;

  if (trimmed.startsWith('/')) return `${origin}${trimmed}`;
  return `${origin}/${trimmed}`;
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
