import { ENV_CONFIG } from '../../config/env.config';

export const PROGRESS_PAGE_SIZE = 6;

export const PROGRESS_BADGE_TONE = {
  Completato: 'bg-[#e6f6ef] text-[#57a080]',
  'In corso': 'bg-[#fdf2df] text-[#e59a2b]',
  'Non iniziato': 'bg-[#fce8e6] text-[#d9534f]',
};

export const formatProgressDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('it-IT');
};

export const resolveCertificateUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const base = ENV_CONFIG.API_BASE_URL.replace(/\/api\/v1\/?$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};
