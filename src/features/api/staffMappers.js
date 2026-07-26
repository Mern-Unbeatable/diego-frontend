const getPayloadData = (payload) => payload?.data ?? payload ?? {};

export const STAFF_ROLES = {
  TRAINING_PROJECT_MANAGER: 'TRAINING_PROJECT_MANAGER',
  CONTENT_MENTOR_TUTOR: 'CONTENT_MENTOR_TUTOR',
  PROCESS_TUTOR: 'PROCESS_TUTOR',
  PLATFORM_DEVELOPER: 'PLATFORM_DEVELOPER',
};

export const DOCUMENT_LABEL_TO_TYPE = {
  Curriculum: 'CURRICULUM',
  "Carta d'identita e Codice Fiscale": 'IDENTITY_CARD_TAX_CODE',
  'Certificati/Prova di Esperienza in Salute e Sicurezza': 'HEALTH_SAFETY_CERTIFICATE',
  'Certificati di Competenze Digitali': 'DIGITAL_SKILLS_CERTIFICATE',
  'Visura camerale': 'CHAMBER_OF_COMMERCE_CERTIFICATE',
};

export const DOCUMENT_TYPE_TO_LABEL = Object.fromEntries(
  Object.entries(DOCUMENT_LABEL_TO_TYPE).map(([label, type]) => [type, label]),
);

export const STAFF_FIGURE_SECTIONS = [
  {
    role: STAFF_ROLES.TRAINING_PROJECT_MANAGER,
    title: 'Responsabile del progetto di formazione',
    subtitle: 'Responsabile Progetto Formativo',
    documentLabels: [
      'Curriculum',
      'Certificati/Prova di Esperienza in Salute e Sicurezza',
      'Certificati di Competenze Digitali',
    ],
    showPersonFields: true,
  },
  {
    role: STAFF_ROLES.CONTENT_MENTOR_TUTOR,
    title: 'Mentore/tutore di contenuto',
    subtitle: 'Mentore/tutore di contenuto',
    documentLabels: [
      'Curriculum',
      "Carta d'identita e Codice Fiscale",
      'Certificati/Prova di Esperienza in Salute e Sicurezza',
      'Certificati di Competenze Digitali',
    ],
    showPersonFields: true,
  },
  {
    role: STAFF_ROLES.PROCESS_TUTOR,
    title: 'Tutor di processo',
    subtitle: 'Tutor di processo',
    documentLabels: ["Carta d'identita e Codice Fiscale"],
    showPersonFields: true,
  },
  {
    role: STAFF_ROLES.PLATFORM_DEVELOPER,
    title: 'Sviluppatore della piattaforma',
    subtitle: 'Sviluppatore della piattaforma',
    showPersonFields: false,
    companyLabel: 'Societa',
    documentLabels: ['Visura camerale'],
    showFooterActions: true,
  },
];

export const mapStaffMemberRow = (staffMember) => ({
  id: staffMember.id,
  role: staffMember.role,
  firstName: staffMember.firstName ?? '',
  lastName: staffMember.lastName ?? '',
  companyName: staffMember.companyName ?? '',
  status: staffMember.status,
  confirmedAt: staffMember.confirmedAt,
  createdAt: staffMember.createdAt,
  updatedAt: staffMember.updatedAt,
  documents: staffMember.documents ?? [],
  requiredDocuments: staffMember.requiredDocuments ?? [],
  completionStatus: staffMember.completionStatus ?? null,
});

export const mapStaffMembersResponse = (payload) => {
  const data = getPayloadData(payload);
  const staffMembers = data?.staffMembers ?? [];
  const meta = data?.meta ?? {};

  return {
    staffMembers: Array.isArray(staffMembers)
      ? staffMembers.map(mapStaffMemberRow)
      : [],
    meta: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      total: meta.total ?? 0,
      totalPages: meta.totalPages ?? 1,
    },
  };
};

export const mapStaffMemberDetailResponse = (payload) => {
  const data = getPayloadData(payload);
  const staffMember = data?.id ? data : data?.staffMember ?? data;
  if (!staffMember?.id) return null;
  return mapStaffMemberRow(staffMember);
};

export const mapStaffMemberToSectionInitial = (staffMember, documentLabels = []) => {
  if (!staffMember) {
    return {
      nome: '',
      cognome: '',
      societa: '',
      files: {},
    };
  }

  const files = {};
  documentLabels.forEach((label) => {
    const documentType = DOCUMENT_LABEL_TO_TYPE[label];
    const requirement = staffMember.requiredDocuments?.find(
      (item) => item.documentType === documentType,
    );
    const document = requirement?.document;
    if (document?.fileName || document?.fileUrl) {
      files[label] = {
        name: document.fileName || document.fileUrl.split('/').pop(),
        url: document.fileUrl,
      };
    }
  });

  return {
    nome: staffMember.firstName || '',
    cognome: staffMember.lastName || '',
    societa: staffMember.companyName || '',
    files,
  };
};

export const buildCreateStaffFormData = ({ role, firstName, lastName, companyName }) => {
  const formData = new FormData();
  formData.append('role', role);
  if (companyName) {
    formData.append('companyName', companyName);
  } else {
    if (firstName) formData.append('firstName', firstName);
    if (lastName) formData.append('lastName', lastName);
  }
  return formData;
};

export const buildStaffDocumentFormData = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
};
