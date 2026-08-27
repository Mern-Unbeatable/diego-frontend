import { useTranslation } from 'react-i18next';

const CertificatePreview = ({ pdfUrl, qrCode, courseTitle }) => {
  const { t } = useTranslation();

  if (pdfUrl) {
    return (
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0`}
        title={t('companyAdmin.certificates.preview.title', { courseTitle })}
        className="h-[200px] w-full bg-white"
      />
    );
  }

  if (qrCode) {
    return (
      <img
        src={qrCode}
        alt={t('companyAdmin.certificates.preview.qrAlt', { courseTitle })}
        className="mx-auto h-[180px] w-[180px] object-contain bg-white p-4"
      />
    );
  }

  return (
    <div className="flex h-[200px] items-center justify-center bg-[#1f3f38] p-8 text-sm text-[#c8ddd6]">
      {t('companyAdmin.certificates.preview.unavailable')}
    </div>
  );
};

export default CertificatePreview;
