import { getPackageFormTemplate } from './coursePackageTemplates';

const getI18nText = (value, locale = 'it') => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.en || value.it || Object.values(value)[0] || '';
};

const toSourceI18n = (text) => {
  const value = String(text || '').trim();
  return value ? { it: value } : undefined;
};

export const getPackageDisplayTitle = (pkg, locale = 'it') => {
  if (!pkg) return '';
  const title = getI18nText(pkg.title, locale);
  return title || pkg.key || 'Pacchetto';
};

export const mapPackagesToSelectOptions = (packages = [], { includeEmpty = true } = {}) => {
  const options = (packages || []).map((pkg) => ({
    value: pkg.id,
    label: `${getPackageDisplayTitle(pkg)}${pkg.isActive === false ? ' (inattivo)' : ''}`,
    disabled: pkg.isActive === false,
  }));

  if (includeEmpty) {
    return [{ value: '', label: '— Seleziona pacchetto —' }, ...options];
  }

  return options;
};

const mapFeatureToFormRow = (feature) => {
  if (!feature || typeof feature !== 'object') {
    return { kind: 'simple', text: String(feature || '') };
  }

  if (feature.type === 'pricing') {
    return {
      kind: 'pricing',
      id: feature.id || '',
      label: getI18nText(feature.label, 'it'),
      minUsers: feature.minUsers != null ? String(feature.minUsers) : '',
      maxUsers: feature.maxUsers != null ? String(feature.maxUsers) : '',
      price: feature.price != null ? String(feature.price) : '',
      currency: feature.currency || 'EUR',
    };
  }

  if (feature.type === 'feature') {
    return {
      kind: 'feature',
      id: feature.id || '',
      label: getI18nText(feature.label, 'it'),
      currency: feature.currency || 'EUR',
    };
  }

  return {
    kind: 'simple',
    text: getI18nText(feature, 'it'),
  };
};

export const getEmptyCoursePackageFormValues = (type = 'SINGLE_USER') =>
  getPackageFormTemplate(type);

export const mapCoursePackageToFormValues = (pkg) => {
  if (!pkg) return getEmptyCoursePackageFormValues();

  return {
    type: pkg.type || 'SINGLE_USER',
    key: pkg.key || '',
    title: getI18nText(pkg.title, 'it'),
    description: pkg.type === 'COMPANY' ? getI18nText(pkg.description, 'it') : '',
    features: (pkg.features || []).map(mapFeatureToFormRow),
    isActive: pkg.isActive !== false,
    isDefault: Boolean(pkg.isDefault),
  };
};

const mapFormFeatureToPayload = (row, packageType) => {
  if (!row) return null;

  if (row.kind === 'pricing') {
    const label = toSourceI18n(row.label);
    if (!label || !row.minUsers || !row.price) return null;

    const item = {
      type: 'pricing',
      label,
      minUsers: Number(row.minUsers),
      maxUsers: row.maxUsers !== '' && row.maxUsers != null ? Number(row.maxUsers) : null,
      price: Number(row.price),
      currency: row.currency || 'EUR',
    };
    if (row.id) item.id = row.id;
    return item;
  }

  if (row.kind === 'feature') {
    const label = toSourceI18n(row.label);
    if (!label) return null;

    const item = {
      type: 'feature',
      label,
      currency: row.currency || 'EUR',
    };
    if (row.id) item.id = row.id;
    return item;
  }

  const simple = toSourceI18n(row.text);
  return simple || null;
};

export const mapCoursePackageFormToPayload = (formData) => {
  const title = toSourceI18n(formData.title);
  if (!title) {
    throw new Error('Il titolo del pacchetto è obbligatorio');
  }

  const description =
    formData.type === 'COMPANY' ? toSourceI18n(formData.description) : undefined;

  const features = (formData.features || [])
    .map((row) => mapFormFeatureToPayload(row, formData.type))
    .filter(Boolean);

  const payload = {
    type: formData.type,
    title,
    isActive: formData.isActive !== false,
    isDefault: Boolean(formData.isDefault),
  };

  if (formData.key?.trim()) payload.key = formData.key.trim();
  if (description) payload.description = description;
  if (features.length) payload.features = features;

  if (formData.type === 'SINGLE_USER' && payload.description) {
    delete payload.description;
  }

  return payload;
};

export const pickDefaultPackageId = (packages = []) => {
  const list = packages || [];
  const active = list.filter((pkg) => pkg.isActive !== false);
  const pool = active.length ? active : list;

  const platformDefault = pool.find((pkg) => pkg.isDefault && !pkg.tenantId);
  if (platformDefault) return platformDefault.id;

  const anyDefault = pool.find((pkg) => pkg.isDefault);
  if (anyDefault) return anyDefault.id;

  const platformPackage = pool.find((pkg) => !pkg.tenantId);
  return platformPackage?.id || pool[0]?.id || '';
};

export const getAuthUserLevel = (user) => {
  if (!user) return '';
  if (typeof user === 'string') return user.toUpperCase();
  return String(user.level || user.role || '').toUpperCase();
};

export const canManageCoursePackage = (pkg, user) => {
  if (pkg === undefined) {
    const level = getAuthUserLevel(user);
    return level === 'PLATFORM_ADMIN' || level === 'LICENSE_USER';
  }
  if (!pkg) return false;
  const level = getAuthUserLevel(user);
  return level === 'PLATFORM_ADMIN' || level === 'LICENSE_USER';
};

export const findPackageById = (packages = [], id) =>
  (packages || []).find((pkg) => pkg.id === id) || null;

export const filterActivePackages = (packages = []) =>
  (packages || []).filter((pkg) => pkg.isActive !== false);

export const filterPackagesByType = (packages = [], type) =>
  (packages || []).filter((pkg) => pkg.type === type);
