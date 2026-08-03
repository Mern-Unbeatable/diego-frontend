export const SINGLE_USER_PACKAGE_TEMPLATE = {
  type: 'SINGLE_USER',
  key: 'single-user-standard',
  title: 'Corso singolo',
  description: '',
  isDefault: false,
  isActive: true,
  features: [
    { kind: 'simple', text: 'Accesso a vita' },
    { kind: 'simple', text: 'Compatibile SCORM' },
    { kind: 'simple', text: 'Compatibile con dispositivi mobili' },
    { kind: 'simple', text: 'Certificato incluso' },
  ],
};

export const COMPANY_PACKAGE_TEMPLATE = {
  type: 'COMPANY',
  key: 'company-standard',
  title: 'Pacchetto aziendale',
  description:
    'Soluzione per supportare le aziende nel monitoraggio delle scadenze normative, garantendo assistenza tempestiva e conformità.',
  isDefault: false,
  isActive: true,
  features: [
    {
      kind: 'pricing',
      label: '1-20 utenti - €150/utente',
      price: '150',
      currency: 'EUR',
      minUsers: '1',
      maxUsers: '20',
    },
    {
      kind: 'pricing',
      label: '21-50 utenti - €420/utente',
      price: '420',
      currency: 'EUR',
      minUsers: '21',
      maxUsers: '50',
    },
    {
      kind: 'pricing',
      label: '51-200 utenti - €1000/utente',
      price: '1000',
      currency: 'EUR',
      minUsers: '51',
      maxUsers: '200',
    },
    {
      kind: 'feature',
      label: 'Include pannello di amministrazione',
      currency: 'EUR',
    },
  ],
};

export const getPackageFormTemplate = (type = 'SINGLE_USER') =>
  type === 'COMPANY'
    ? { ...COMPANY_PACKAGE_TEMPLATE, features: COMPANY_PACKAGE_TEMPLATE.features.map((row) => ({ ...row })) }
    : { ...SINGLE_USER_PACKAGE_TEMPLATE, features: SINGLE_USER_PACKAGE_TEMPLATE.features.map((row) => ({ ...row })) };
