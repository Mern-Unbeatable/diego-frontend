import i18n from '../../language/i18n';

const getCourseTitle = (courseTitle) => {
  if (!courseTitle || typeof courseTitle !== 'object') {
    return '';
  }

  const lang = (i18n.language || 'it').split('-')[0];

  return (
    courseTitle[lang] ||
    courseTitle.it ||
    courseTitle.en ||
    Object.values(courseTitle).find(Boolean) ||
    ''
  );
};

const getProgress = (enrollment) => {
  const value = enrollment?.progress?.percentage;
  const numeric = Number(value);

  return Number.isFinite(numeric) ? Math.min(100, Math.max(0, numeric)) : 0;
};

const getStatusMeta = (status, progress) => {
  const normalizedStatus = String(status || '').toUpperCase();

  if (normalizedStatus === 'COMPLETED' || progress >= 100) {
    return { category: 'COMPLETATO', buttonText: 'Scarica attestato' };
  }

  if (
    ['IN_PROGRESS', 'STARTED', 'ACTIVE'].includes(normalizedStatus) ||
    progress > 0
  ) {
    return { category: 'IN CORSO', buttonText: 'Riprendi' };
  }

  return { category: 'NON ANCORA INIZIATO', buttonText: 'Inizia corso' };
};

export const mapEnrollmentToCourse = (enrollment) => {
  const course = enrollment?.course;
  const progress = getProgress(enrollment);
  const { category, buttonText } = getStatusMeta(enrollment?.status, progress);

  return {
    id: enrollment.id,
    courseId: enrollment.courseId ?? course?.id ?? null,
    slug: course?.slug ?? null,
    title: getCourseTitle(course?.courseTitle),
    category,
    thumbnailUrl: course?.thumbnailUrl ?? null,
    progress,
    buttonText,
    status: enrollment?.status ?? null,
    format: course?.format ?? null,
    completedLessons: enrollment?.progress?.completedLessons ?? 0,
    totalLessons: enrollment?.progress?.totalLessons ?? 0,
  };
};

export const mapEnrollmentsResponse = (payload) => {
  const enrollments = payload?.data?.enrollments;

  if (!Array.isArray(enrollments)) {
    return [];
  }

  return enrollments.map(mapEnrollmentToCourse);
};

const formatTicketDate = (value) => {
  if (!value) return '';

  return new Date(value).toLocaleString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getLocalizedAnswer = (answer) => {
  if (!answer) return null;
  if (typeof answer === 'string') return answer;

  const lang = (i18n.language || 'it').split('-')[0];

  return answer[lang] || answer.it || answer.en || Object.values(answer).find(Boolean) || null;
};

const mapTicketStatus = (status) => {
  const normalizedStatus = String(status || '').toUpperCase();

  switch (normalizedStatus) {
    case 'OPEN':
    case 'PENDING':
      return 'Aperto';
    case 'IN_PROGRESS':
      return 'In lavorazione';
    case 'CLOSED':
    case 'RESOLVED':
    case 'COMPLETED':
      return 'Chiuso';
    default:
      return status || '';
  }
};

export const mapTicketItem = (ticket) => ({
  id: ticket.id,
  subject: ticket.subject ?? '',
  message: ticket.message ?? '',
  question: ticket.question ?? null,
  answer: getLocalizedAnswer(ticket.answer),
  status: mapTicketStatus(ticket.status),
  rawStatus: ticket.status ?? null,
  attachments: ticket.attachments ?? null,
  userName: ticket.user?.name ?? '',
  userEmail: ticket.user?.email ?? '',
  userLevel: ticket.user?.level ?? null,
  createdAt: formatTicketDate(ticket.createdAt),
  updatedAt: formatTicketDate(ticket.updatedAt),
});

export const mapTicketDetailResponse = (payload) => {
  const ticket = payload?.data?.ticket;

  if (!ticket) {
    return null;
  }

  return mapTicketItem(ticket);
};

export const mapTicketsResponse = (payload) => {
  const tickets = payload?.data?.tickets;

  if (!Array.isArray(tickets)) {
    return [];
  }

  return tickets.map(mapTicketItem);
};

const getLocalizedText = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;

  const lang = (i18n.language || 'it').split('-')[0];

  return (
    value[lang] ||
    value.it ||
    value.en ||
    Object.entries(value).find(([key]) => !['pdfUrl'].includes(key))?.[1] ||
    ''
  );
};

const formatNotificationDate = (value) => {
  if (!value) return '';

  return new Date(value).toLocaleString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const mapNotificationItem = (notification) => ({
  id: notification.id,
  type: notification.type ?? null,
  title: getLocalizedText(notification.title),
  message: getLocalizedText(notification.message),
  pdfUrl: notification.message?.pdfUrl ?? null,
  unread: !notification.read,
  read: notification.read ?? false,
  sentAt: formatNotificationDate(notification.sentAt ?? notification.createdAt),
});

export const mapNotificationsResponse = (payload) => {
  const notifications = payload?.data?.notifications;
  const meta = payload?.data?.meta ?? {};

  return {
    notifications: Array.isArray(notifications)
      ? notifications.map(mapNotificationItem)
      : [],
    meta: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      total: meta.total ?? 0,
      totalPages: meta.totalPages ?? 0,
      unreadCount: meta.unreadCount ?? 0,
    },
  };
};

const formatCertificateDate = (value) => {
  if (!value) return '';

  return new Date(value).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const mapCertificateItem = (certificate) => {
  const course = certificate?.course ?? {};
  const canDownload = certificate?.canDownload ?? false;

  return {
    id: certificate.id,
    courseTitle: getCourseTitle(course.title ?? course.courseTitle),
    courseId: course.id ?? null,
    slug: course.slug ?? null,
    thumbnailUrl: course.thumbnailUrl ?? null,
    pdfUrl: certificate.pdfUrl ?? null,
    qrCode: certificate.qrCode ?? null,
    companyLogoUrl: certificate.companyLogoUrl ?? null,
    imageUrl: certificate.pdfUrl ?? null,
    status: certificate.status ?? null,
    issuedAt: formatCertificateDate(certificate.issuedAt),
    downloadableUntil: formatCertificateDate(certificate.downloadableUntil),
    downloadCount: certificate.downloadCount ?? 0,
    lastDownloadedAt: formatCertificateDate(certificate.lastDownloadedAt),
    archived: certificate.archived ?? false,
    downloadStatus: certificate.downloadStatus ?? null,
    canDownload,
    daysRemaining: certificate.daysRemaining ?? 0,
    isFreeWindowActive: certificate.isFreeWindowActive ?? false,
    isExpired: certificate.isExpired ?? false,
    needsArchivePurchase: certificate.needsArchivePurchase ?? false,
    enrollmentStatus: certificate.enrollmentStatus ?? null,
    completedAt: formatCertificateDate(certificate.completedAt),
    message: canDownload
      ? "Ce l'hai fatta! Il tuo attestato è pronto: clicca qui per scaricarlo."
      : certificate.freeDownloadMessage || '',
  };
};

export const mapCertificatesResponse = (payload) => {
  const certificates = payload?.data?.certificates;
  const meta = payload?.data?.meta ?? {};
  const archive = payload?.data?.archive ?? {};

  return {
    certificates: Array.isArray(certificates)
      ? certificates.map(mapCertificateItem)
      : [],
    meta: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      total: meta.total ?? 0,
      totalPages: meta.totalPages ?? 0,
    },
    archive: {
      hasActiveSubscription: archive.hasActiveSubscription ?? false,
      expiresAt: archive.expiresAt ?? null,
      freeDownloadDays: archive.freeDownloadDays ?? 30,
      plan: archive.plan ?? null,
    },
  };
};

const formatProfileDateInput = (value) => {
  if (!value) return '';

  return new Date(value).toISOString().split('T')[0];
};

export const mapProfileResponse = (payload) => {
  const user = payload?.data?.user;

  if (!user) {
    return null;
  }

  const firstName = user.firstName ?? null;
  const lastName = user.lastName ?? null;
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || null;

  return {
    id: user.id,
    email: user.email ?? null,
    firstName,
    lastName,
    fullName,
    avatar: user.avatar ?? null,
    birthDate: user.birthDate ? formatProfileDateInput(user.birthDate) : null,
    city: user.city ?? null,
    country: user.country ?? null,
    residenceAddress: user.residenceAddress ?? null,
    traineeTaxCode: user.traineeTaxCode ?? null,
    companyName: user.companyName ?? null,
    companyAddress: user.companyAddress ?? null,
    companyTaxCode: user.companyTaxCode ?? null,
    companyVatNumber: user.companyVatNumber ?? null,
    companyPosition: user.companyPosition ?? null,
    citizenship: user.citizenship ?? null,
    contactNumber: user.contactNumber ?? null,
    preferredLanguage: user.preferredLanguage ?? null,
    profileCompleted: user.profileCompleted ?? null,
    level: user.level ?? null,
    status: user.status ?? null,
    counts: user._count
      ? {
          enrollments: user._count.enrollments ?? null,
          certificates: user._count.certificates ?? null,
          payments: user._count.payments ?? null,
        }
      : null,
    enrollments: user.enrollments ?? [],
  };
};

const setPayloadValue = (payload, key, value) => {
  if (value == null) return;

  const normalized = typeof value === 'string' ? value.trim() : value;

  if (normalized !== '') {
    payload[key] = normalized;
  }
};

export const mapProfileUpdatePayload = (formValues, preferredLanguage) => {
  const payload = {};

  setPayloadValue(payload, 'firstName', formValues.firstName);
  setPayloadValue(payload, 'lastName', formValues.lastName);
  setPayloadValue(payload, 'fiscalAddress', formValues.address);
  setPayloadValue(payload, 'city', formValues.city);
  setPayloadValue(payload, 'country', formValues.country);
  setPayloadValue(payload, 'companyName', formValues.companyName);
  setPayloadValue(payload, 'companyAddress', formValues.companyAddress);
  setPayloadValue(payload, 'companyVatNumber', formValues.companyVatNumber);
  setPayloadValue(payload, 'traineeTaxCode', formValues.traineeTaxCode);

  if (preferredLanguage) {
    payload.preferredLanguage = preferredLanguage;
  }

  if (formValues.birthDate) {
    payload.birthDate = new Date(formValues.birthDate).toISOString();
  }

  return payload;
};
