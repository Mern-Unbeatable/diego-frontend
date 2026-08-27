import en from './en/translation.json' assert { type: 'json' };
import enCompanyAdmin from './en/companyAdmin.json' assert { type: 'json' };
import it from './it/translation.json' assert { type: 'json' };
import itCompanyAdmin from './it/companyAdmin.json' assert { type: 'json' };
import ar from './ar/translation.json' assert { type: 'json' };
import arCompanyAdmin from './ar/companyAdmin.json' assert { type: 'json' };
import zh from './zh/translation.json' assert { type: 'json' };
import zhCompanyAdmin from './zh/companyAdmin.json' assert { type: 'json' };

export const resources = {
  en: { translation: { ...en, ...enCompanyAdmin } },
  it: { translation: { ...it, ...itCompanyAdmin } },
  ar: { translation: { ...ar, ...arCompanyAdmin } },
  zh: { translation: { ...zh, ...zhCompanyAdmin } },
};
