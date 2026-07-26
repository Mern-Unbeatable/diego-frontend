const getPayloadData = (payload) => payload?.data ?? payload ?? {};

const getLocalizedText = (value, locale = 'it') => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.it || value.en || Object.values(value).find(Boolean) || '';
};

const formatTicketDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const USER_LEVEL_LABELS = {
  PRIVATE_USER: 'Utente privato',
  LICENSE_USER: 'Licenziatario',
  COMPANY_ADMIN: 'Admin azienda',
  COMPANY_EMPLOYEE: 'Dipendente',
  PLATFORM_ADMIN: 'Admin piattaforma',
};

export const mapTicketStatusLabel = (status) => {
  switch (String(status || '').toUpperCase()) {
    case 'OPEN':
      return 'Aperto';
    case 'IN_PROGRESS':
      return 'In lavorazione';
    case 'RESOLVED':
      return 'Risolto';
    case 'CLOSED':
      return 'Chiuso';
    default:
      return status || '';
  }
};

export const mapTicketStatusToApi = (label = '') => {
  switch (label) {
    case 'Aperto':
      return 'OPEN';
    case 'In lavorazione':
      return 'IN_PROGRESS';
    case 'Chiuso':
      return 'CLOSED';
    case 'Risolto':
      return 'RESOLVED';
    default:
      return undefined;
  }
};

export const mapTicketPriorityLabel = (priority) => {
  switch (String(priority || '').toUpperCase()) {
    case 'CRITICAL':
      return 'Critical';
    case 'LOW':
      return 'Low';
    default:
      return 'Medium';
  }
};

export const mapTicketPriorityToApi = (label = '') => {
  switch (label) {
    case 'Critical':
      return 'CRITICAL';
    case 'Low':
      return 'LOW';
    case 'Medium':
      return 'MEDIUM';
    default:
      return undefined;
  }
};

export const formatTicketDisplayId = (ticket = {}) => {
  if (ticket.displayId) return ticket.displayId;

  const ticketNumber = ticket.ticketNumber;
  if (ticketNumber != null && ticketNumber !== '') {
    return `#${ticketNumber}`;
  }
  return '—';
};

export const getTicketBadgeTone = (status) => {
  switch (String(status || '').toUpperCase()) {
    case 'OPEN':
      return 'bg-[#fce8e6] text-[#d9534f]';
    case 'IN_PROGRESS':
      return 'bg-[#fdf2df] text-[#e59a2b]';
    case 'RESOLVED':
    case 'CLOSED':
      return 'bg-[#e6f6ef] text-[#57a080]';
    default:
      return 'bg-[#f1f1f1] text-[#666666]';
  }
};

export const mapAdminTicketRow = (ticket, locale = 'it') => ({
  id: ticket.id,
  ticketNumber: ticket.ticketNumber ?? null,
  displayId: formatTicketDisplayId(ticket),
  subject: getLocalizedText(ticket.subject, locale),
  message: getLocalizedText(ticket.message, locale),
  question: ticket.question ?? null,
  answer: getLocalizedText(ticket.answer, locale),
  rawStatus: ticket.status ?? null,
  status: mapTicketStatusLabel(ticket.status),
  priority: ticket.priority ?? 'MEDIUM',
  attachments: ticket.attachments ?? null,
  userId: ticket.user?.id ?? null,
  userName: ticket.user?.name?.trim() || ticket.user?.email || '—',
  userEmail: ticket.user?.email ?? '',
  userLevel: ticket.user?.level ?? null,
  userLevelLabel: USER_LEVEL_LABELS[ticket.user?.level] || ticket.user?.level || '—',
  tenantId: ticket.tenant?.id ?? null,
  tenantName: ticket.tenant?.name ?? '—',
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
  createdAtFormatted: formatTicketDate(ticket.createdAt),
  updatedAtFormatted: formatTicketDate(ticket.updatedAt),
});

export const mapAdminTicketsResponse = (payload, locale = 'it') => {
  const data = getPayloadData(payload);
  const tickets = data?.tickets ?? [];
  const meta = data?.meta ?? {};

  return {
    tickets: Array.isArray(tickets) ? tickets.map((t) => mapAdminTicketRow(t, locale)) : [],
    meta: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      total: meta.total ?? 0,
      totalPages: meta.totalPages ?? 1,
    },
  };
};

export const mapAdminTicketDetailResponse = (payload, locale = 'it') => {
  const data = getPayloadData(payload);
  const ticket = data?.ticket ?? data;
  if (!ticket?.id) return null;
  return mapAdminTicketRow(ticket, locale);
};

export const buildTicketAnswerPayload = (text, locale = 'it') => ({
  answer: {
    [locale]: text.trim(),
    it: text.trim(),
    en: text.trim(),
  },
});
