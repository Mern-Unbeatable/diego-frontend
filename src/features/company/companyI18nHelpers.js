export const getEmployeeStatusLabel = (t, status) => {
  if (status === 'Attivo') return t('companyAdmin.common.status.active');
  if (status === 'Inattivo') return t('companyAdmin.common.status.inactive');
  return status;
};

export const getProgressStatusLabel = (t, status) => {
  const map = {
    Completato: 'companyAdmin.common.progressStatus.completed',
    'In corso': 'companyAdmin.common.progressStatus.inProgress',
    'Non iniziato': 'companyAdmin.common.progressStatus.notStarted',
  };

  return map[status] ? t(map[status]) : status;
};

export const getProgressBadgeTone = (status) => {
  const tones = {
    Completato: 'bg-[#e6f6ef] text-[#57a080]',
    'In corso': 'bg-[#fdf2df] text-[#e59a2b]',
    'Non iniziato': 'bg-[#fce8e6] text-[#d9534f]',
  };

  return tones[status] || tones['Non iniziato'];
};

export const buildEmployeePositionOptions = (t) => [
  { value: 'Safety manager', label: t('companyAdmin.common.positions.safetyManager') },
  {
    value: 'Operatore di produzione',
    label: t('companyAdmin.common.positions.productionOperator'),
  },
  { value: 'Responsabile HR', label: t('companyAdmin.common.positions.hrManager') },
  {
    value: 'Tecnico di manutenzione',
    label: t('companyAdmin.common.positions.maintenanceTechnician'),
  },
  { value: 'Amministrazione', label: t('companyAdmin.common.positions.administration') },
];

export const buildEmployeeStatusOptions = (t) => [
  { value: 'Attivo', label: t('companyAdmin.common.status.active') },
  { value: 'Inattivo', label: t('companyAdmin.common.status.inactive') },
];
