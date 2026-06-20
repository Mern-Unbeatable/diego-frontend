import React from 'react';
import { LuPrinter, LuDownload } from 'react-icons/lu';
import Button from '../../../../../components/ui/buttons/Buttons';
import { Paragraph, Heading } from '../../../../../components/ui';

const CertificateCard = ({ certificate }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = certificate.imageUrl || '/image/mandatory_courses/image1.jpg';
    link.download = `certificate-${certificate.courseTitle.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mb-8 space-y-8 rounded-xl border border-gray-200 bg-white p-10 shadow-sm">
      {/* Course title */}
      <Heading level={3}>{certificate.courseTitle}</Heading>

      {/* Certificate preview image - smaller */}
      <div className="mx-auto max-w-2xl border border-amber-100 bg-gray-100">
        <img
          src={certificate.imageUrl || '/image/mandatory_courses/image1.jpg'}
          alt={`Certificate for ${certificate.courseTitle}`}
          className="object-contain"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/400x250?text=Certificate';
          }}
        />
      </div>

      {/* Message */}
      <Heading level={3}>{certificate.message}</Heading>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={handlePrint}
          icon={<LuPrinter className="text-base" />}
          label="Stampa"
          variant="primary"
          size="sm"
          className="px-4 py-2 text-xl"
          aria-label="Print certificate"
        />

        <Button
          onClick={handleDownload}
          icon={<LuDownload className="text-base" />}
          label="Scarica"
          variant="primary"
          size="sm"
          className="px-4 py-2 text-xl"
          aria-label="Download certificate"
        />
      </div>
    </div>
  );
};

export default CertificateCard;
