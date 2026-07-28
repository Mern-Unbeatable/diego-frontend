const getPayloadData = (payload) => payload?.data ?? payload ?? {};

const formatInquiryDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatStatusLabel = (status) => {
  if (!status) return '—';
  return String(status)
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const mapServiceRequestRow = (item) => ({
  id: item.id,
  serviceName: item.serviceName || '—',
  firstName: item.firstName || '',
  lastName: item.lastName || '',
  fullName: [item.firstName, item.lastName].filter(Boolean).join(' ') || '—',
  companyName: item.companyName || '—',
  vatNumber: item.vatNumber || '—',
  phone: item.phone || '—',
  email: item.email || '—',
  message: item.message || '—',
  status: formatStatusLabel(item.status),
  rawStatus: item.status || '',
  adminNote: item.adminNote,
  handledAt: item.handledAt,
  documents: item.documents,
  createdAt: item.createdAt,
  createdAtFormatted: formatInquiryDate(item.createdAt),
});

export const mapContactRow = (item) => ({
  id: item.id,
  firstName: item.firstName || '',
  lastName: item.lastName || '',
  fullName: [item.firstName, item.lastName].filter(Boolean).join(' ') || '—',
  agencyName: item.agencyName || '—',
  vat: item.vat || '—',
  phone: item.phone ?? '—',
  email: item.email || '—',
  message: item.message || '—',
  status: formatStatusLabel(item.status),
  rawStatus: item.status || '',
  tenantId: item.tenantId,
  createdAt: item.createdAt,
  createdAtFormatted: formatInquiryDate(item.createdAt),
});

export const mapCollaborationRow = (item) => ({
  id: item.id,
  companyName: item.companyName || '—',
  collaborationType: formatStatusLabel(item.collaborationType),
  rawCollaborationType: item.collaborationType || '',
  contactName: item.contactName || '—',
  email: item.email || '—',
  telephone: item.telephone || '—',
  companySize: formatStatusLabel(item.companySize),
  rawCompanySize: item.companySize || '',
  description: item.description || '—',
  goals: item.goals,
  status: formatStatusLabel(item.status),
  rawStatus: item.status || '',
  notes: item.notes,
  tenantId: item.tenantId,
  createdAt: item.createdAt,
  createdAtFormatted: formatInquiryDate(item.createdAt),
});

const mapMeta = (meta = {}) => ({
  page: meta.page ?? 1,
  limit: meta.limit ?? 20,
  total: meta.total ?? 0,
  totalPages: meta.totalPages ?? 1,
  statusCounts: meta.statusCounts ?? null,
});

export const mapServiceRequestsResponse = (payload) => {
  const data = getPayloadData(payload);
  const serviceRequests = data?.serviceRequests ?? [];

  return {
    serviceRequests: Array.isArray(serviceRequests)
      ? serviceRequests.map(mapServiceRequestRow)
      : [],
    meta: mapMeta(data?.meta),
  };
};

export const mapContactsResponse = (payload) => {
  const data = getPayloadData(payload);
  const contacts = data?.contacts ?? [];

  return {
    contacts: Array.isArray(contacts) ? contacts.map(mapContactRow) : [],
    meta: mapMeta(data?.meta),
  };
};

export const mapCollaborationsResponse = (payload) => {
  const data = getPayloadData(payload);
  const collaborations = data?.collaborations ?? [];

  return {
    collaborations: Array.isArray(collaborations)
      ? collaborations.map(mapCollaborationRow)
      : [],
    meta: mapMeta(data?.meta),
  };
};
