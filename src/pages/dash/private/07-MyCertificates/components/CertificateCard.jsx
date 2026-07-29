import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LuPrinter, LuDownload } from 'react-icons/lu';
import Button from '../../../../../components/ui/buttons/Buttons';
import { ROUTES } from '../../../../../config/routes';
import { COOKIE_STORAGE } from '../../../../../utils/cookies/cookieStorage';
import { useDownloadCertificateMutation } from '../../../../../features/api/certificateApi';
import { resolveAssetUrl } from '../../../../../features/api/certificateHelpers';
import { getRtkErrorMessage } from '../../../../../features/api/utils';

const NoImageState = () => (
  <div className="flex h-full min-h-[250px] w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
    Anteprima non disponibile
  </div>
);

const fetchPdfBlobUrl = async (pdfUrl) => {
  const token = COOKIE_STORAGE.getToken();
  const response = await fetch(pdfUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error('Impossibile caricare il PDF');
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

const CertificateCard = ({ certificate, archiveRoute = ROUTES.PRIVATE_USER.ARCHIVE }) => {
  const previewBlobUrlRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [downloadCertificate, { isLoading: isDownloading }] = useDownloadCertificateMutation();

  const canDownload = certificate.canDownload;
  const needsArchive = certificate.needsArchivePurchase;

  const getPdfFileName = () =>
    `certificate-${certificate.courseTitle.replace(/\s+/g, '-').toLowerCase()}.pdf`;

  useEffect(() => {
    let cancelled = false;

    const loadPreview = async () => {
      if (!canDownload || !certificate.pdfUrl) {
        setPreviewUrl(null);
        return;
      }

      setPreviewLoading(true);
      try {
        const assetUrl = resolveAssetUrl(certificate.pdfUrl);
        const blobUrl = await fetchPdfBlobUrl(assetUrl);
        if (cancelled) {
          URL.revokeObjectURL(blobUrl);
          return;
        }
        if (previewBlobUrlRef.current) URL.revokeObjectURL(previewBlobUrlRef.current);
        previewBlobUrlRef.current = blobUrl;
        setPreviewUrl(blobUrl);
      } catch {
        if (!cancelled) setPreviewUrl(null);
      } finally {
        if (!cancelled) setPreviewLoading(false);
      }
    };

    loadPreview();
    return () => {
      cancelled = true;
      if (previewBlobUrlRef.current) {
        URL.revokeObjectURL(previewBlobUrlRef.current);
        previewBlobUrlRef.current = null;
      }
    };
  }, [canDownload, certificate.pdfUrl]);

  const handleDownload = async () => {
    if (!canDownload) {
      toast.error(
        needsArchive
          ? 'Acquista il servizio di archiviazione per scaricare di nuovo'
          : 'Attestato non disponibile',
      );
      return;
    }

    try {
      const result = await downloadCertificate(certificate.id).unwrap();
      const pdfUrl = resolveAssetUrl(result?.pdfUrl || certificate.pdfUrl);
      if (!pdfUrl) {
        toast.error('Download non disponibile');
        return;
      }
      const blobUrl = await fetchPdfBlobUrl(pdfUrl);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = getPdfFileName();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error(getRtkErrorMessage(error) || 'Impossibile scaricare il certificato');
    }
  };

  const handlePrint = async () => {
    if (!canDownload) {
      toast.error('Stampa non disponibile');
      return;
    }
    if (previewBlobUrlRef.current) {
      const printWindow = window.open(previewBlobUrlRef.current, '_blank', 'noopener,noreferrer');
      printWindow?.focus();
      printWindow?.print();
      return;
    }
    await handleDownload();
  };

  return (
    <div className="mb-6 space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900">{certificate.courseTitle}</h3>

      <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-amber-100 bg-gray-100">
        {needsArchive ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-sm text-[#666]">
              L&apos;anteprima gratuita è scaduta. Attiva l&apos;archivio cloud per scaricare di nuovo.
            </p>
            <Link
              to={archiveRoute}
              className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
            >
              Acquista archivio
            </Link>
          </div>
        ) : previewLoading ? (
          <div className="flex min-h-[250px] items-center justify-center text-sm text-gray-400">
            Caricamento PDF...
          </div>
        ) : previewUrl ? (
          <iframe
            src={`${previewUrl}#toolbar=0&navpanes=0`}
            title={`Certificate for ${certificate.courseTitle}`}
            className="h-80 w-full bg-white"
          />
        ) : (
          <NoImageState />
        )}
      </div>

      {certificate.message && (
        <p className={`text-xl font-semibold ${canDownload ? 'text-gray-500' : 'text-amber-600'}`}>
          {certificate.message}
        </p>
      )}

      {certificate.daysRemaining > 0 && canDownload && (
        <p className="text-sm font-medium text-[#d48c21]">
          Disponibile per {certificate.daysRemaining} giorni
        </p>
      )}

      <div className="flex flex-wrap items-center justify-end gap-2">
        {needsArchive ? (
          <Link
            to={archiveRoute}
            className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
          >
            Acquista archivio cloud
          </Link>
        ) : (
          <>
            <Button
              onClick={handlePrint}
              disabled={!canDownload}
              icon={<LuPrinter className="text-sm" />}
              label="Stampa"
              variant="primary"
              size="sm"
              className="cursor-pointer px-3 py-1.5 text-sm font-semibold disabled:opacity-40"
              aria-label="Print certificate"
            />
            <Button
              onClick={handleDownload}
              disabled={!canDownload || isDownloading}
              icon={<LuDownload className="text-sm" />}
              label={isDownloading ? 'Download...' : 'Scarica'}
              variant="primary"
              size="sm"
              className="cursor-pointer px-3 py-1.5 text-sm font-semibold disabled:opacity-40"
              aria-label="Download certificate"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
