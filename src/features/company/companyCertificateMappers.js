const resolveLocalizedTitle = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.it || value.en || Object.values(value).find(Boolean) || '';
};

const formatCertificateDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('it-IT');
};

export const mapCompanyCertificate = (certificate = {}) => {
  const user = certificate.user ?? certificate.employee ?? {};
  const course = certificate.course ?? {};

  const employeeName =
    user.name ||
    user.fullName ||
    `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
    user.email ||
    '—';

  const courseTitle =
    resolveLocalizedTitle(course.title) ||
    resolveLocalizedTitle(course.courseTitle) ||
    '—';

  return {
    id: certificate.id,
    userId: user.id || user.userId || null,
    employeeName,
    courseId: course.id || null,
    courseTitle,
    pdfUrl: certificate.pdfUrl || null,
    qrCode: certificate.qrCode || null,
    status: certificate.status || null,
    issuedAt: certificate.issuedAt || null,
    issuedAtFormatted: formatCertificateDate(certificate.issuedAt),
    downloadableUntil: certificate.downloadableUntil || null,
    isExpired: certificate.isExpired ?? false,
  };
};

export const mapCompanyCertificatesResponse = (payload = {}) => {
  const data = payload?.data ?? payload ?? {};
  const certificates = data?.certificates ?? [];
  const meta = data?.meta ?? {};

  return {
    certificates: Array.isArray(certificates)
      ? certificates.map(mapCompanyCertificate)
      : [],
    meta: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      total: meta.total ?? 0,
      totalPages: meta.totalPages ?? 1,
    },
  };
};
