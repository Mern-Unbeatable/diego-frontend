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
