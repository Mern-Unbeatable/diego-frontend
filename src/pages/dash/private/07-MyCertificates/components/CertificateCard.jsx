import { useEffect, useRef, useState } from 'react';
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
  <div className="flex h-full min-h-48 w-full items-center justify-center bg-gray-100 px-4 text-center text-sm text-gray-400 sm:min-h-[250px]">
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

const CertificateCard = ({
  certificate,
  archiveRoute = ROUTES.PRIVATE_USER.ARCHIVE,
}) => {
  const previewBlobUrlRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [downloadCertificate, { isLoading: isDownloading }] =
    useDownloadCertificateMutation();

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
      toast.error(
        getRtkErrorMessage(error) || 'Impossibile scaricare il certificato',
      );
    }
  };

  const handlePrint = async () => {
    if (!canDownload) {
      toast.error('Stampa non disponibile');
      return;
    }
    if (previewBlobUrlRef.current) {
      const printWindow = window.open(
        previewBlobUrlRef.current,
        '_blank',
        'noopener,noreferrer',
      );
      printWindow?.focus();
      printWindow?.print();
      return;
    }
    await handleDownload();
  };

  return (
    <article className="space-y-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:space-y-4 sm:p-4 md:space-y-5 md:p-6">
      <h3 className="text-sm font-semibold leading-snug text-gray-900 sm:text-base md:text-lg">
        {certificate.courseTitle}
      </h3>

      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-amber-100 bg-gray-100">
        {needsArchive ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-4 text-center sm:min-h-[250px] sm:p-6">
            <p className="text-sm text-[#666]">
              L&apos;anteprima gratuita è scaduta. Attiva l&apos;archivio cloud
              per scaricare di nuovo.
            </p>
            <Link
              to={archiveRoute}
              className="inline-flex h-10 w-full max-w-xs items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-semibold text-white hover:bg-[#63a88c] sm:w-auto"
            >
              Acquista archivio
            </Link>
          </div>
        ) : previewLoading ? (
          <div className="flex min-h-48 items-center justify-center text-sm text-gray-400 sm:min-h-[250px]">
            Caricamento PDF...
          </div>
        ) : previewUrl ? (
          <iframe
            src={`${previewUrl}#toolbar=0&navpanes=0`}
            title={`Certificate for ${certificate.courseTitle}`}
            className="h-56 w-full bg-white sm:h-72 md:h-80"
          />
        ) : (
          <NoImageState />
        )}
      </div>

      {certificate.message ? (
        <p
          className={`text-sm font-medium sm:text-base ${
            canDownload ? 'text-gray-500' : 'text-amber-600'
          }`}
        >
          {certificate.message}
        </p>
      ) : null}

      {certificate.daysRemaining > 0 && canDownload ? (
        <p className="text-xs font-medium text-[#d48c21] sm:text-sm">
          Disponibile per {certificate.daysRemaining} giorni
        </p>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        {needsArchive ? (
          <Link
            to={archiveRoute}
            className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-semibold text-white hover:bg-[#63a88c] sm:w-auto"
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
              className="h-10 w-full cursor-pointer justify-center px-4 py-2 text-sm font-semibold disabled:opacity-40 sm:h-auto sm:w-auto"
              aria-label="Print certificate"
            />
            <Button
              onClick={handleDownload}
              disabled={!canDownload || isDownloading}
              icon={<LuDownload className="text-sm" />}
              label={isDownloading ? 'Download...' : 'Scarica'}
              variant="primary"
              size="sm"
              className="h-10 w-full cursor-pointer justify-center px-4 py-2 text-sm font-semibold disabled:opacity-40 sm:h-auto sm:w-auto"
              aria-label="Download certificate"
            />
          </>
        )}
      </div>
    </article>
  );
};

export default CertificateCard;
