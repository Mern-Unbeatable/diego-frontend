import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { LuPrinter, LuDownload } from 'react-icons/lu';
import Button from '../../../../../components/ui/buttons/Buttons';
import { COOKIE_STORAGE } from '../../../../../utils/cookies/cookieStorage';

const NoImageState = () => (
  <div className="flex h-full min-h-[250px] w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
    no image added
  </div>
);

const fetchPdfBlobUrl = async (pdfUrl) => {
  const token = COOKIE_STORAGE.getToken();
  const response = await fetch(pdfUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error('Impossibile caricare il PDF');
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

const CertificateCard = ({ certificate }) => {
  const previewBlobUrlRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const getPdfFileName = () =>
    `certificate-${certificate.courseTitle.replace(/\s+/g, '-').toLowerCase()}.pdf`;

  useEffect(() => {
    let cancelled = false;

    const loadPreview = async () => {
      if (!certificate.pdfUrl) {
        setPreviewUrl(null);
        return;
      }

      setPreviewLoading(true);

      try {
        const blobUrl = await fetchPdfBlobUrl(certificate.pdfUrl);

        if (cancelled) {
          URL.revokeObjectURL(blobUrl);
          return;
        }

        if (previewBlobUrlRef.current) {
          URL.revokeObjectURL(previewBlobUrlRef.current);
        }

        previewBlobUrlRef.current = blobUrl;
        setPreviewUrl(blobUrl);
      } catch {
        if (!cancelled) {
          setPreviewUrl(certificate.pdfUrl);
        }
      } finally {
        if (!cancelled) {
          setPreviewLoading(false);
        }
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
  }, [certificate.pdfUrl]);

  const resolvePdfUrl = async () => {
    if (!certificate.pdfUrl) {
      toast.error(
        certificate.message || 'Attestato PDF non disponibile al momento',
      );
      return null;
    }

    if (previewBlobUrlRef.current) {
      return previewBlobUrlRef.current;
    }

    try {
      return await fetchPdfBlobUrl(certificate.pdfUrl);
    } catch {
      return certificate.pdfUrl;
    }
  };

  const handlePrint = async () => {
    try {
      const pdfUrl = await resolvePdfUrl();
      if (!pdfUrl) return;

      const printWindow = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      if (!printWindow) {
        toast.error('Impossibile aprire la finestra di stampa');
        return;
      }

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    } catch {
      toast.error('Impossibile stampare il certificato');
    }
  };

  const handleDownload = async () => {
    try {
      const pdfUrl = await resolvePdfUrl();
      if (!pdfUrl) return;

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = getPdfFileName();
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (pdfUrl !== previewBlobUrlRef.current) {
        URL.revokeObjectURL(pdfUrl);
      }
    } catch {
      toast.error('Impossibile scaricare il certificato');
    }
  };

  return (
    <div className="mb-6 space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900">{certificate.courseTitle}</h3>

      <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-amber-100 bg-gray-100">
        {previewLoading ? (
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
        <p
          className={`text-xl font-semibold ${
            certificate.canDownload ? 'text-gray-500' : 'text-amber-600'
          }`}
        >
          {certificate.message}
        </p>
      )}

      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={handlePrint}
          icon={<LuPrinter className="text-sm" />}
          label="Stampa"
          variant="primary"
          size="sm"
          className="cursor-pointer px-3 py-1.5 text-sm font-semibold"
          aria-label="Print certificate"
        />

        <Button
          onClick={handleDownload}
          icon={<LuDownload className="text-sm" />}
          label="Scarica"
          variant="primary"
          size="sm"
          className="cursor-pointer px-3 py-1.5 text-sm font-semibold"
          aria-label="Download certificate"
        />
      </div>
    </div>
  );
};

export default CertificateCard;
