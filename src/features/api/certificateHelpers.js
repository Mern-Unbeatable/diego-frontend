import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { ENV_CONFIG } from '../../config/env.config';
import { useDownloadCertificateMutation } from './certificateApi';
import { getRtkErrorMessage } from './utils';

export const resolveAssetUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const base = ENV_CONFIG.API_BASE_URL.replace(/\/api\/v1\/?$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

export const canDownloadCertificate = (certificate) =>
  Boolean(certificate?.id && certificate?.status === 'ISSUED');

export const useCertificateDownload = () => {
  const [download] = useDownloadCertificateMutation();
  const [downloadingId, setDownloadingId] = useState(null);

  const downloadById = useCallback(
    async (certificate) => {
      if (!canDownloadCertificate(certificate)) {
        toast.error('Certificato non disponibile');
        return;
      }

      setDownloadingId(certificate.id);
      try {
        const result = await download(certificate.id).unwrap();
        const pdfUrl = resolveAssetUrl(result?.pdfUrl);
        if (!pdfUrl) {
          toast.error('Download non disponibile');
          return;
        }
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } catch (error) {
        toast.error(getRtkErrorMessage(error));
      } finally {
        setDownloadingId(null);
      }
    },
    [download],
  );

  const isDownloading = useCallback(
    (certificate) => {
      if (!certificate?.id) return downloadingId !== null;
      return downloadingId === certificate.id;
    },
    [downloadingId],
  );

  return { downloadById, isDownloading, downloadingId };
};
