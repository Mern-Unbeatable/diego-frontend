import React, { useState } from 'react';
import { LuPrinter, LuDownload } from 'react-icons/lu';
import Button from '../../../../../components/ui/buttons/Buttons';

const NoImageState = () => (
  <div className="flex h-full min-h-[250px] w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
    no image added
  </div>
);

const CertificateCard = ({ certificate }) => {
  const [imageError, setImageError] = useState(false);
  const showImage = certificate.imageUrl && !imageError;

  const handlePrint = () => {
    if (!certificate.pdfUrl) return;

    const printWindow = window.open(certificate.pdfUrl, '_blank');

    if (printWindow) {
      printWindow.onload = () => printWindow.print();
    }
  };

  const handleDownload = () => {
    if (!certificate.canDownload || !certificate.pdfUrl) return;

    const link = document.createElement('a');
    link.href = certificate.pdfUrl;
    link.download = `certificate-${certificate.courseTitle.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mb-6 space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900">{certificate.courseTitle}</h3>

      <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-amber-100 bg-gray-100">
        {showImage ? (
          <img
            src={certificate.imageUrl}
            alt={`Certificate for ${certificate.courseTitle}`}
            className="mx-auto max-h-[320px] w-full object-contain"
            onError={() => setImageError(true)}
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
          className="px-3 py-1.5 text-sm font-semibold"
          aria-label="Print certificate"
          disabled={!certificate.canDownload || !certificate.pdfUrl}
        />

        <Button
          onClick={handleDownload}
          icon={<LuDownload className="text-sm" />}
          label="Scarica"
          variant="primary"
          size="sm"
          className="px-3 py-1.5 text-sm font-semibold"
          aria-label="Download certificate"
          disabled={!certificate.canDownload || !certificate.pdfUrl}
        />
      </div>
    </div>
  );
};

export default CertificateCard;
