import { ROLES } from '../../config/roles';

/** UI role ids used in ProfileSetup */
export const UI_ACCOUNT_TYPES = {
  STANDARD: 'standard',
  BUSINESS: 'business',
  LICENSED: 'licensed',
};

/** Backend accountType values for POST /auth/register/complete */
export const API_ACCOUNT_TYPES = {
  PRIVATE: 'PRIVATE',
  COMPANY: 'COMPANY',
  LICENSEE: 'LICENSEE',
};

const UI_TO_API_ACCOUNT_TYPE = {
  [UI_ACCOUNT_TYPES.STANDARD]: API_ACCOUNT_TYPES.PRIVATE,
  [UI_ACCOUNT_TYPES.BUSINESS]: API_ACCOUNT_TYPES.COMPANY,
  [UI_ACCOUNT_TYPES.LICENSED]: API_ACCOUNT_TYPES.LICENSEE,
  // allow already-mapped values
  PRIVATE: API_ACCOUNT_TYPES.PRIVATE,
  COMPANY: API_ACCOUNT_TYPES.COMPANY,
  LICENSEE: API_ACCOUNT_TYPES.LICENSEE,
};

const CITIZENSHIP_MAP = {
  italiana: 'ITALIAN',
  italian: 'ITALIAN',
  ITALIAN: 'ITALIAN',
  estera: 'FOREIGN',
  foreign: 'FOREIGN',
  FOREIGN: 'FOREIGN',
};

/** Map UI / draft accountType → API accountType */
export const mapAccountTypeToApi = (accountType) =>
  UI_TO_API_ACCOUNT_TYPE[accountType] || null;

/** Best-effort map API accountType → dashboard role (fallback if response omits level) */
export const mapAccountTypeToRole = (accountType) => {
  const apiType = mapAccountTypeToApi(accountType);
  if (apiType === API_ACCOUNT_TYPES.PRIVATE) return ROLES.PRIVATE_USER;
  if (apiType === API_ACCOUNT_TYPES.COMPANY) return ROLES.COMPANY_ADMIN;
  if (apiType === API_ACCOUNT_TYPES.LICENSEE) return ROLES.LICENSE_USER;
  return null;
};

export const mapCitizenshipToApi = (value) => {
  if (!value) return undefined;
  return CITIZENSHIP_MAP[value] || String(value).toUpperCase();
};

const pick = (obj, keys) => {
  const result = {};
  keys.forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== '') {
      result[key] = value;
    }
  });
  return result;
};

/**
 * Build POST /auth/register/complete body from registration draft + passwords.
 * Field names follow the Diego-LMS Postman collection.
 */
export const buildRegisterCompletePayload = (draft = {}, passwords = {}) => {
  const accountType = mapAccountTypeToApi(draft.accountType);
  if (!accountType) {
    throw new Error('Missing or invalid account type');
  }

  const preferredLanguage =
    draft.preferredLanguage ||
    (typeof localStorage !== 'undefined' &&
      localStorage.getItem('i18nextLng')?.split('-')[0]) ||
    'en';

  const base = {
    accountType,
    password: passwords.password || passwords.newPassword,
    confirmPassword: passwords.confirmPassword,
    consent: draft.consent !== false,
    preferredLanguage,
  };

  if (accountType === API_ACCOUNT_TYPES.PRIVATE) {
    return {
      ...base,
      ...pick(draft, [
        'firstName',
        'lastName',
        'birthDate',
        'city',
        'country',
        'residenceAddress',
        'traineeTaxCode',
      ]),
      // legacy form aliases
      ...(draft.residenceAddress
        ? {}
        : draft.address
          ? { residenceAddress: draft.address }
          : {}),
      ...(draft.traineeTaxCode
        ? {}
        : draft.taxCode
          ? { traineeTaxCode: draft.taxCode }
          : {}),
      citizenship: mapCitizenshipToApi(draft.citizenship),
    };
  }

  if (accountType === API_ACCOUNT_TYPES.COMPANY) {
    return {
      ...base,
      ...pick(draft, [
        'firstName',
        'lastName',
        'fiscalAddress',
        'fiscalCode',
        'contactNumber',
        'serviceType',
        'companyName',
        'companyAddress',
        'companyVatNumber',
        'companyTaxCode',
        'companyPosition',
        'pec',
        'uniqueCode',
      ]),
      citizenship: mapCitizenshipToApi(draft.citizenship),
      // legacy form aliases from CompanyInfoForm
      ...(draft.fiscalAddress
        ? {}
        : draft.office
          ? { fiscalAddress: draft.office }
          : {}),
      ...(draft.companyVatNumber
        ? {}
        : draft.vatNumber
          ? { companyVatNumber: draft.vatNumber }
          : {}),
      ...(draft.companyTaxCode || draft.fiscalCode
        ? draft.fiscalCode
          ? {}
          : draft.taxCode
            ? { fiscalCode: draft.taxCode, companyTaxCode: draft.taxCode }
            : {}
        : draft.taxCode
          ? { fiscalCode: draft.taxCode, companyTaxCode: draft.taxCode }
          : {}),
    };
  }

  // LICENSEE
  return {
    ...base,
    ...pick(draft, [
      'firstName',
      'lastName',
      'companyName',
      'fiscalAddress',
      'vatNumber',
      'fiscalCode',
      'pec',
      'uniqueCode',
    ]),
    ...(draft.fiscalAddress
      ? {}
      : draft.office
        ? { fiscalAddress: draft.office }
        : {}),
    ...(draft.fiscalCode
      ? {}
      : draft.taxCode
        ? { fiscalCode: draft.taxCode }
        : {}),
    ...(draft.uniqueCode
      ? {}
      : draft.subdomain
        ? { uniqueCode: draft.subdomain }
        : {}),
  };
};

export const validateRegistrationPassword = (password, confirmPassword) => {
  if (!password || !confirmPassword) {
    return 'Password and confirmation are required';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must include at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must include at least one number';
  }
  if (!/[!@$%&?]/.test(password)) {
    return 'Password must include at least one special character (!, ?, $, %, &)';
  }
  return null;
};

/** Normalize register/login success payloads from varying backend envelopes */
export const extractAuthSession = (response) => {
  const payload = response?.data ?? response ?? {};
  const data = payload.data ?? payload;

  const accessToken =
    data.accessToken ||
    data.tokens?.accessToken ||
    data.token ||
    null;

  const refreshToken =
    data.refreshToken || data.tokens?.refreshToken || null;

  const user = data.user ?? null;
  const level =
    (typeof user === 'string' ? user : null) ||
    user?.level ||
    user?.role ||
    data.level ||
    null;

  return { accessToken, refreshToken, user, level, data };
};
