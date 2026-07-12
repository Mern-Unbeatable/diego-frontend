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
  PRIVATE: API_ACCOUNT_TYPES.PRIVATE,
  COMPANY: API_ACCOUNT_TYPES.COMPANY,
  LICENSEE: API_ACCOUNT_TYPES.LICENSEE,
};

/** Map UI / draft accountType → API accountType */
export const mapAccountTypeToApi = (accountType) =>
  UI_TO_API_ACCOUNT_TYPE[accountType] || null;

/** Best-effort map API accountType → dashboard role */
export const mapAccountTypeToRole = (accountType) => {
  const apiType = mapAccountTypeToApi(accountType);
  if (apiType === API_ACCOUNT_TYPES.PRIVATE) return ROLES.PRIVATE_USER;
  if (apiType === API_ACCOUNT_TYPES.COMPANY) return ROLES.COMPANY_ADMIN;
  if (apiType === API_ACCOUNT_TYPES.LICENSEE) return ROLES.LICENSE_USER;
  return null;
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

const PRIVATE_FIELDS = [
  'firstName',
  'lastName',
  'birthDate',
  'city',
  'country',
  'residenceAddress',
  'traineeTaxCode',
  'citizenship',
];

/** Exact COMPANY profile keys from POST /auth/register/complete body */
const COMPANY_FIELDS = [
  'firstName',
  'lastName',
  'fiscalAddress',
  'fiscalCode',
  'citizenship',
  'contactNumber',
  'serviceType',
  'companyName',
  'companyAddress',
  'companyVatNumber',
  'companyTaxCode',
  'companyPosition',
  'pec',
  'uniqueCode',
];

const LICENSEE_FIELDS = [
  'firstName',
  'lastName',
  'companyName',
  'fiscalAddress',
  'vatNumber',
  'fiscalCode',
  'pec',
  'uniqueCode',
];

/**
 * Build POST /auth/register/complete body from registration draft + passwords.
 * Field names match the Diego-LMS API body exactly.
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
    return { ...base, ...pick(draft, PRIVATE_FIELDS) };
  }

  if (accountType === API_ACCOUNT_TYPES.COMPANY) {
    return { ...base, ...pick(draft, COMPANY_FIELDS) };
  }

  return { ...base, ...pick(draft, LICENSEE_FIELDS) };
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

/**
 * Normalize register/login success payloads.
 * Expected complete response:
 * { success, message, data: { user: { level }, accessToken, refreshToken } }
 */
export const extractAuthSession = (response) => {
  const root = response ?? {};

  // Prefer envelope.data when it holds tokens/user (Diego-LMS shape)
  const data =
    root.data?.accessToken || root.data?.user
      ? root.data
      : root.data?.data?.accessToken || root.data?.data?.user
        ? root.data.data
        : root.accessToken || root.user
          ? root
          : root.data ?? root;

  const accessToken =
    data.accessToken || data.tokens?.accessToken || data.token || null;

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
