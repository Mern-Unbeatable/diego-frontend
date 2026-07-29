import { LICENSE_STATUS } from './adminConstants';

const getPayloadData = (payload) => payload?.data ?? payload ?? {};

const toI18n = (value) => {
  if (!value) return undefined;
  if (typeof value === 'object') return value;
  const text = String(value).trim();
  return text ? { it: text, en: text } : undefined;
};

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);

export const mapDashboardResponse = (payload) => {
  const data = getPayloadData(payload);

  return {
    revenue30d: data?.platformTurnover?.amount ?? 0,
    revenueTrend: data?.platformTurnover?.changePercent ?? 0,
    activeUsers: data?.totalActiveUsers?.total ?? 0,
    usersTrend: data?.totalActiveUsers?.changePercent ?? 0,
    licenses: {
      total: data?.totalLicenses?.total ?? 0,
      active: data?.totalLicenses?.active ?? 0,
      trial: data?.totalLicenses?.onTrial ?? 0,
      trend: data?.totalLicenses?.changePercent ?? 0,
    },
    health: data?.healthStatus?.uptimePercent ?? 0,
    uptime: data?.healthStatus?.changePercent ?? 0,
    totalCourses: data?.courses?.totalLoaded ?? data?.courses?.totalOnPlatform ?? 0,
  };
};

export const mapEmergencyControlsResponse = (payload) => {
  const data = getPayloadData(payload);
  const controls = data?.controls ?? [];

  const findEnabled = (key) =>
    controls.find((item) => item.key === key)?.enabled ?? false;

  return {
    download: findEnabled('downloadPermissionEnabled'),
    userPanel: findEnabled('newUserRegistrationEnabled'),
    payments: findEnabled('paymentProcessingEnabled'),
    maintenance: findEnabled('maintenanceModeEnabled'),
  };
};

export const mapEmergencyControlUpdate = (key, enabled) => {
  const fieldMap = {
    download: 'downloadPermissionEnabled',
    userPanel: 'newUserRegistrationEnabled',
    payments: 'paymentProcessingEnabled',
    maintenance: 'maintenanceModeEnabled',
  };

  return { [fieldMap[key]]: enabled };
};

const mapLicenseStatus = (license) => {
  if (license?.isSuspended) return LICENSE_STATUS.INACTIVE;
  if (license?.expiresAt && new Date(license.expiresAt) < new Date()) {
    return LICENSE_STATUS.INACTIVE;
  }
  if (license?.payment && license.payment.status !== 'SUCCEEDED') {
    return LICENSE_STATUS.PENDING;
  }
  return LICENSE_STATUS.ACTIVE;
};

export const mapLicenseRow = (license) => {
  const usersUsed = license?.tenant?._count?.users ?? 0;

  return {
    id: license.id,
    userId: license.userId,
    azienda: license.companyName || license.user?.email || '—',
    fatturato: Number(license.payment?.amount ?? 0),
    used: usersUsed,
    users: usersUsed,
    cap: license.maxUsers ?? 0,
    stato: mapLicenseStatus(license),
    phone: license.phoneNumber ?? '',
    email: license.emailAddress || license.user?.email || '',
    pec: license.certifiedEmail ?? '',
    subdomain: license.subdomain ?? '',
    customDomain: license.customDomain ?? '',
    plan: license.plan?.tier ?? '',
    planTier: license.plan?.tier ?? '',
    tenantId: license.tenantId ?? license.tenant?.id ?? null,
    raw: license,
  };
};

export const mapLicensesResponse = (payload) => {
  const data = getPayloadData(payload);
  const licenses = data?.licenses ?? data?.items ?? [];
  const meta = data?.meta ?? {};

  return {
    licenses: Array.isArray(licenses) ? licenses.map(mapLicenseRow) : [],
    meta: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      total: meta.total ?? 0,
      totalPages: meta.totalPages ?? 1,
    },
  };
};

export const mapLicensePlansResponse = (payload) => {
  const data = getPayloadData(payload);
  const plans = data?.plans ?? (Array.isArray(data) ? data : []);

  return plans.map((plan) => ({
    id: plan.id,
    tier: plan.tier,
    label:
      plan.label ||
      (typeof plan.name === 'string' ? plan.name : null) ||
      plan.name?.it ||
      plan.name?.en ||
      plan.tier,
    name: plan.name,
    description: plan.description,
    features: plan.features,
    supportLevel: plan.supportLevel,
    maxUsers: plan.maxUsers,
    maxCourses: plan.maxCourses,
    storageMb: plan.storageMb,
    priceMonthly: plan.priceMonthly,
    priceYearly: plan.priceYearly ?? plan.priceAnnual,
    priceAnnual: plan.priceAnnual ?? plan.priceYearly,
    isActive: plan.isActive ?? true,
    sortOrder: plan.sortOrder ?? 0,
  }));
};

const PLAN_TIERS = ['BEGINNER', 'STANDARD', 'PREMIUM', 'ENTERPRISE'];

const planText = (value, fallback = '') => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    return value.it || value.en || value.fr || value.zh || fallback;
  }
  return fallback;
};

const planFeatureLines = (features) => {
  if (Array.isArray(features)) {
    return features.join('\n');
  }
  if (features && typeof features === 'object') {
    const list = features.it || features.en || Object.values(features)[0];
    return Array.isArray(list) ? list.join('\n') : '';
  }
  return '';
};

export const mapPlanToFormData = (plan) => {
  if (!plan) {
    return {
      tier: 'BEGINNER',
      nome: '',
      descrizione: '',
      funzionalita: '',
      supporto: '',
      maxUsers: 50,
      maxCourses: 20,
      storageGb: 5,
      priceMonthly: 29,
      priceYearly: 290,
      sortOrder: 0,
      isActive: true,
    };
  }

  return {
    tier: plan.tier,
    nome: planText(plan.name, plan.label || plan.tier),
    descrizione: planText(plan.description),
    funzionalita: planFeatureLines(plan.features),
    supporto: planText(plan.supportLevel),
    maxUsers: plan.maxUsers ?? 50,
    maxCourses: plan.maxCourses ?? 20,
    storageGb: plan.storageMb ? Math.round(plan.storageMb / 1024) : 5,
    priceMonthly: plan.priceMonthly ?? 0,
    priceYearly: plan.priceYearly ?? plan.priceAnnual ?? 0,
    sortOrder: plan.sortOrder ?? 0,
    isActive: plan.isActive ?? true,
  };
};

const toPlanI18n = (text) => {
  const value = String(text || '').trim();
  return { it: value, en: value, fr: value, zh: value };
};

const toPlanFeatureI18n = (text) => {
  const items = String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return { it: items, en: items, fr: items, zh: items };
};

export const mapPlanFormToCreatePayload = (formData) => {
  const features = toPlanFeatureI18n(formData.funzionalita);
  const description = String(formData.descrizione || '').trim();
  const supportLevel = String(formData.supporto || '').trim();

  return {
    tier: formData.tier,
    name: toPlanI18n(formData.nome),
    ...(description ? { description: toPlanI18n(description) } : {}),
    ...(features.it.length > 0 ? { features } : {}),
    ...(supportLevel ? { supportLevel: toPlanI18n(supportLevel) } : {}),
    maxUsers: Number(formData.maxUsers),
    maxCourses: Number(formData.maxCourses),
    storageMb: Math.round(Number(formData.storageGb || 0) * 1024),
    priceMonthly: Number(formData.priceMonthly),
    priceYearly: Number(formData.priceYearly),
    priceAnnual: Number(formData.priceYearly),
    sortOrder: Number(formData.sortOrder || 0),
    isActive: Boolean(formData.isActive),
  };
};

export const mapPlanFormToUpdatePayload = (formData) => {
  const features = toPlanFeatureI18n(formData.funzionalita);
  const description = String(formData.descrizione || '').trim();
  const supportLevel = String(formData.supporto || '').trim();

  return {
    name: toPlanI18n(formData.nome),
    description: description ? toPlanI18n(description) : null,
    features: features.it.length > 0 ? features : null,
    supportLevel: supportLevel ? toPlanI18n(supportLevel) : null,
    maxUsers: Number(formData.maxUsers),
    maxCourses: Number(formData.maxCourses),
    storageMb: Math.round(Number(formData.storageGb || 0) * 1024),
    priceMonthly: Number(formData.priceMonthly),
    priceYearly: Number(formData.priceYearly),
    priceAnnual: Number(formData.priceYearly),
    sortOrder: Number(formData.sortOrder || 0),
    isActive: Boolean(formData.isActive),
  };
};

export const getAvailablePlanTiers = (plans = []) => {
  const used = new Set(plans.map((plan) => plan.tier));
  return PLAN_TIERS.filter((tier) => !used.has(tier));
};

export const resolveLicensePlanTier = (value, plans = []) => {
  const map = {};
  plans.forEach((plan) => {
    map[plan.tier] = plan.tier;
    map[plan.label] = plan.tier;
  });
  return map[value] || value || 'BEGINNER';
};

export const mapLicenseDetailResponse = (payload) => {
  const data = getPayloadData(payload);
  const license = data?.license ?? data;
  return mapLicenseRow(license);
};

export const getEmptyLicenseFormValues = (plans = []) => ({
  nomeEnteDiFormazione: '',
  nome: '',
  cognome: '',
  password: '',
  numeroDiTelefono: '',
  indirizzoEmail: '',
  postaElettronicaCertificataPEC: '',
  sottodominio: '',
  tipoDiPiano: plans[0]?.tier || 'BEGINNER',
});

export const mapLicenseToFormData = (license, plans = []) => ({
  nomeEnteDiFormazione: license?.azienda || '',
  nome: license?.firstName || '',
  cognome: license?.lastName || '',
  password: '',
  numeroDiTelefono: license?.phone || '',
  indirizzoEmail: license?.email || '',
  postaElettronicaCertificataPEC: license?.pec || '',
  sottodominio: license?.subdomain || '',
  tipoDiPiano: license?.planTier || license?.plan || plans[0]?.tier || 'BEGINNER',
});

export const mapLicenseFormToCreatePayload = (formData, planTier) => {
  const subdomain = String(formData.sottodominio || '').trim().toLowerCase();

  return {
    email: formData.indirizzoEmail?.trim(),
    firstName: formData.nome?.trim() || undefined,
    lastName: formData.cognome?.trim() || undefined,
    password: formData.password?.trim() || undefined,
    companyName: formData.nomeEnteDiFormazione?.trim(),
    phoneNumber: formData.numeroDiTelefono?.trim(),
    emailAddress: formData.indirizzoEmail?.trim(),
    certifiedEmail: formData.postaElettronicaCertificataPEC?.trim() || null,
    subdomain,
    customDomain: `${subdomain}.unosicurezza.com`,
    planTier,
    waivePayment: true,
    billingCycle: 'YEARLY',
  };
};

export const mapLicenseFormToUpdatePayload = (formData, planTier) => ({
  companyName: formData.nomeEnteDiFormazione?.trim(),
  phoneNumber: formData.numeroDiTelefono?.trim(),
  emailAddress: formData.indirizzoEmail?.trim(),
  certifiedEmail: formData.postaElettronicaCertificataPEC?.trim() || null,
  subdomain: formData.sottodominio?.trim().toLowerCase(),
  customDomain: `${String(formData.sottodominio || '').trim().toLowerCase()}.unosicurezza.com`,
  ...(planTier ? { planTier } : {}),
});

export const getEmptyCourseFormValues = () => ({
  category: 'CATALOG',
  format: 'SCORM',
  modalitaNavigazione: 'SEQUENTIAL',
  titoloPianoFormativo: '',
  idPianoFormativo: '',
  descrizione: '',
  idAzioneFormativa: '',
  titoloIntervento: '',
  slug: '',
  codiceCorso: '',
  aziendaFormazione: '',
  dataInizio: '',
  dataFine: '',
  cig: '',
  cup: '',
  cip: '',
  tipologia: '',
  durata: '',
  durataOre: '',
  validityDays: '90',
  passScorePercent: '80',
  sedeCorso: '',
  selezionaTipologia: '',
  settore: '',
  fondo: '',
  metodologia: '',
  responsabileProgetto: '',
  tutor: '',
  iva: '',
  prezzoBase: '',
  prezzoVendita: '',
  soloB2B: false,
  inManutenzione: false,
  singleUserPackageId: '',
  companyPackageId: '',
  thumbnailUrl: '',
  thumbnailFile: null,
});

const getI18nField = (value, locale = 'it') => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.en || value.it || Object.values(value)[0] || '';
};

const formatDateInput = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

export const parseMoneyInput = (value) => {
  if (value === '' || value === null || value === undefined) return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

  const normalized = String(value).trim().replace(/\s/g, '').replace(',', '.');
  if (!normalized) return 0;

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoneyInput = (value) => {
  if (value === '' || value === null || value === undefined) return '';
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return '';
  if (Number.isInteger(parsed)) return String(parsed);
  return String(parsed);
};

export const mapCourseDetailToFormValues = (course) => {
  if (!course) return getEmptyCourseFormValues();

  return {
    ...getEmptyCourseFormValues(),
    titoloPianoFormativo: getI18nField(course.trainingPlanTitle),
    idPianoFormativo: course.trainingPlanId || '',
    descrizione: getI18nField(course.description),
    idAzioneFormativa: course.trainingActionId || '',
    titoloIntervento: getI18nField(course.courseTitle),
    slug: course.slug || '',
    codiceCorso: getI18nField(course.code),
    aziendaFormazione: getI18nField(course.financingCompany),
    dataInizio: formatDateInput(course.courseStartDate),
    dataFine: formatDateInput(course.courseEndDate),
    cig: course.cig || '',
    cup: course.cup || '',
    cip: course.cip || '',
    tipologia: getI18nField(course.type),
    durata: course.durationMinutes ? String(course.durationMinutes) : '',
    durataOre: course.duration ? String(course.duration) : '',
    validityDays:
      course.validityDays !== undefined && course.validityDays !== null
        ? String(course.validityDays)
        : '90',
    passScorePercent:
      course.passScorePercent !== undefined && course.passScorePercent !== null
        ? String(course.passScorePercent)
        : '80',
    sedeCorso: getI18nField(course.courseLocation),
    selezionaTipologia: getI18nField(course.selectType),
    settore: getI18nField(course.sector),
    fondo: getI18nField(course.fund),
    metodologia: getI18nField(course.methodology),
    responsabileProgetto: getI18nField(course.trainingProjectManager),
    tutor: getI18nField(course.tutorName),
    iva: getI18nField(course.vat),
    prezzoBase: formatMoneyInput(course.basePrice),
    prezzoVendita: formatMoneyInput(course.price),
    soloB2B: Boolean(course.isB2BOnly),
    inManutenzione: course.isActive === false,
    category: course.category || 'CATALOG',
    format: course.format || 'SCORM',
    modalitaNavigazione: course.navigationMode || 'SEQUENTIAL',
    singleUserPackageId: course.singleUserPackageId || course.singleUserPackage?.id || '',
    companyPackageId: course.companyPackageId || course.companyPackage?.id || '',
    thumbnailUrl: course.thumbnailUrl || '',
    thumbnailFile: null,
  };
};

export const buildCourseFormDefaults = (course) => {
  if (!course) {
    return getEmptyCourseFormValues();
  }

  return mapCourseDetailToFormValues(course);
};

export const mapApiLessonsToDrafts = (lessons = []) =>
  (lessons || []).map((lesson, index) => mapApiLessonToFormValues(lesson, index));

export const getEmptyLessonFormValues = (orderIndex = 0) => ({
  title: '',
  orderIndex,
  contentType: 'VIDEO_YOUTUBE',
  durationSecs: '',
  youtubeUrl: '',
  scormEntryPoint: 'shared/launchpage.html',
  isRequired: true,
  isLocked: false,
  file: null,
});

const getLessonTitleForForm = (lesson) => {
  if (!lesson) return '';
  if (typeof lesson.title === 'string') return lesson.title.trim();
  if (lesson.title && typeof lesson.title === 'object') {
    return (
      getI18nField(lesson.title, 'it')
      || getI18nField(lesson.title, 'en')
      || Object.values(lesson.title).find((value) => typeof value === 'string' && value.trim())
      || ''
    );
  }
  return String(lesson.title || '').trim();
};

export const mapApiLessonToFormValues = (lesson, orderIndex = 0) => {
  if (!lesson) return getEmptyLessonFormValues(orderIndex);

  return {
    title: getLessonTitleForForm(lesson),
    orderIndex: lesson.orderIndex ?? orderIndex,
    contentType: lesson.contentType || 'VIDEO_YOUTUBE',
    durationSecs: lesson.durationSecs ?? '',
    youtubeUrl: lesson.youtubeUrl || '',
    scormEntryPoint: lesson.scormEntryPoint || 'shared/launchpage.html',
    isRequired: lesson.isRequired ?? true,
    isLocked: lesson.isLocked ?? false,
    file: null,
  };
};

export const getLessonDisplayTitle = (lesson, locale = 'it') => {
  if (!lesson) return 'Lezione';
  if (typeof lesson.title === 'string' && lesson.title.trim()) return lesson.title;
  if (lesson.title && typeof lesson.title === 'object') {
    return getI18nField(lesson.title, locale) || getI18nField(lesson.title, 'en') || 'Lezione';
  }
  return 'Lezione';
};

export const extractLessonId = (payload) => {
  const data = getPayloadData(payload);
  return data?.lesson?.id || data?.id || null;
};

export const mapCourseFormToPayload = (formData, { tenantId } = {}) => {
  const courseTitleText = formData.titoloIntervento?.trim() || formData.titoloPianoFormativo?.trim();
  const customSlug = formData.slug?.trim();

  const payload = {
    courseTitle: toI18n(courseTitleText),
    trainingPlanTitle: toI18n(formData.titoloPianoFormativo),
    trainingPlanId: formData.idPianoFormativo?.trim() || undefined,
    trainingActionId: formData.idAzioneFormativa?.trim() || undefined,
    description: toI18n(formData.descrizione),
    financingCompany: toI18n(formData.aziendaFormazione),
    courseStartDate: formData.dataInizio || undefined,
    courseEndDate: formData.dataFine || undefined,
    category: formData.category || 'CATALOG',
    format: formData.format || 'SCORM',
    navigationMode: formData.modalitaNavigazione || 'SEQUENTIAL',
    durationMinutes: Number(formData.durata) || undefined,
    duration: Number(formData.durataOre) || undefined,
    validityDays: Number(formData.validityDays) || 90,
    passScorePercent:
      formData.passScorePercent !== '' && formData.passScorePercent !== undefined
        ? Number(formData.passScorePercent)
        : 80,
    cig: formData.cig?.trim() || undefined,
    cup: formData.cup?.trim() || undefined,
    cip: formData.cip?.trim() || undefined,
    type: toI18n(formData.tipologia),
    courseLocation: toI18n(formData.sedeCorso),
    selectType: toI18n(formData.selezionaTipologia),
    sector: toI18n(formData.settore),
    fund: toI18n(formData.fondo),
    methodology: toI18n(formData.metodologia),
    trainingProjectManager: toI18n(formData.responsabileProgetto),
    tutorName: toI18n(formData.tutor),
    vat: toI18n(formData.iva),
    price: parseMoneyInput(formData.prezzoVendita),
    basePrice: parseMoneyInput(formData.prezzoBase) || parseMoneyInput(formData.prezzoVendita),
    slug: customSlug || slugify(courseTitleText),
    isActive: !formData.inManutenzione,
    isB2BOnly: Boolean(formData.soloB2B),
  };

  const codiceCorso = formData.codiceCorso?.trim();
  if (codiceCorso) {
    payload.code = toI18n(codiceCorso);
  }

  if (tenantId) {
    payload.tenantId = tenantId;
  }

  if (formData.singleUserPackageId) {
    payload.singleUserPackageId = formData.singleUserPackageId;
  }

  if (formData.companyPackageId) {
    payload.companyPackageId = formData.companyPackageId;
  }

  return payload;
};

export const mapLessonFormToPayload = (lesson, index, { isUpdate = false } = {}) => {
  const title = String(lesson?.title || '').trim();
  if (!title) return null;

  const contentType = lesson.contentType || 'VIDEO_YOUTUBE';
  const payload = {
    title: toI18n(title),
    orderIndex: Number.isFinite(Number(lesson.orderIndex)) ? Number(lesson.orderIndex) : index,
    contentType,
    durationSecs: Number(lesson.durationSecs) || undefined,
    isRequired: lesson.isRequired !== false,
    isLocked: Boolean(lesson.isLocked),
  };
  const files = {};

  if (contentType === 'VIDEO_YOUTUBE') {
    const youtubeUrl = String(lesson.youtubeUrl || '').trim();
    if (!youtubeUrl) return null;
    payload.youtubeUrl = youtubeUrl;
    return { payload, files };
  }

  if (contentType === 'SCORM' || contentType === 'SCORM_12') {
    if (!lesson.file && !isUpdate) return null;
    if (lesson.file) {
      files.scormPackageUrl = lesson.file;
    }
    payload.scormEntryPoint = String(lesson.scormEntryPoint || 'shared/launchpage.html').trim();
    payload.scormVersion = contentType === 'SCORM' ? '2004' : '1.2';
    return { payload, files };
  }

  if (!lesson.file && !isUpdate) return null;
  if (lesson.file) {
    files.contentUrl = lesson.file;
  }
  return { payload, files };
};

export const mapTenantsFromLicenses = (licenses = []) =>
  licenses
    .filter((license) => license.tenantId)
    .map((license) => ({
      id: license.tenantId,
      name: license.azienda,
      subdomain: license.subdomain,
    }));

const QUIZ_TYPE_MAP = {
  PRE_TEST: 'PRE_TEST',
  POST_TEST: 'POST_TEST',
  FINAL_TEST: 'FINAL_TEST',
  'Test Iniziale': 'PRE_TEST',
  'Test Intermedio': 'POST_TEST',
  'Test o Finale': 'FINAL_TEST',
  'Test Finale': 'FINAL_TEST',
};

const mapQuestionType = (value) => {
  const normalized = String(value || '').toUpperCase();
  if (['SINGLE', 'MULTIPLE', 'TRUE_FALSE', 'FREE_TEXT'].includes(normalized)) {
    return normalized;
  }

  const label = String(value || '').toLowerCase();
  if (label.includes('multipla')) return 'MULTIPLE';
  if (label.includes('vero') || label.includes('falso')) return 'TRUE_FALSE';
  if (label.includes('liber') || label.includes('testo')) return 'FREE_TEXT';
  return 'SINGLE';
};

const buildQuestionOptions = (question, questionId, questionType) => {
  if (questionType === 'FREE_TEXT') {
    return [];
  }

  if (questionType === 'TRUE_FALSE') {
    const options = question.options || [];
    const trueMarked = options.find(
      (option) =>
        option.correct &&
        String(option.text || '').toLowerCase().includes('vero'),
    );
    const falseMarked = options.find(
      (option) =>
        option.correct &&
        String(option.text || '').toLowerCase().includes('falso'),
    );
    const correctIsFalse = Boolean(falseMarked && !trueMarked);

    return [
      {
        id: options[0]?.id || `${questionId}-opt1`,
        text: { it: 'Vero', en: 'Vero' },
        isCorrect: !correctIsFalse,
      },
      {
        id: options[1]?.id || `${questionId}-opt2`,
        text: { it: 'Falso', en: 'Falso' },
        isCorrect: correctIsFalse,
      },
    ];
  }

  const options = (question.options || [])
    .map((option, optionIndex) => {
      const optionText = String(option.text || '').trim();
      if (!optionText) return null;
      return {
        id: option.id || `${questionId}-opt${optionIndex + 1}`,
        text: { it: optionText, en: optionText },
        isCorrect: Boolean(option.correct),
      };
    })
    .filter(Boolean);

  if (options.length < 2) return null;

  const correctCount = options.filter((option) => option.isCorrect).length;
  if (correctCount === 0) {
    options[0].isCorrect = true;
  }

  if (questionType === 'SINGLE') {
    const firstCorrectIndex = options.findIndex((option) => option.isCorrect);
    options.forEach((option, index) => {
      option.isCorrect = index === firstCorrectIndex;
    });
  }

  if (questionType === 'MULTIPLE') {
    const hasCorrect = options.some((option) => option.isCorrect);
    if (!hasCorrect) {
      options[0].isCorrect = true;
      options[1].isCorrect = true;
    }
  }

  return options;
};

export const resolveQuizIsPublished = (quizData) => {
  if (quizData?.publish === true) return true;
  if (quizData?.publish === false) return false;
  if (quizData?.publishStatus === 'DRAFT') return false;
  if (quizData?.publishStatus === 'PUBLISHED') return true;
  if (quizData?.isPublished === false) return false;
  return true;
};

export const mapApiQuizToFormData = (quiz) => {
  if (!quiz) return null;

  const questions = (Array.isArray(quiz.questions) ? quiz.questions : []).map(
    (question, index) => ({
      id: question.id || `question-${index + 1}`,
      title: `Domanda ${index + 1}`,
      text: getI18nField(question.text),
      questionType: question.type || 'SINGLE',
      options: (question.options || []).map((option, optionIndex) => ({
        id: option.id || `option-${index + 1}-${optionIndex + 1}`,
        text: getI18nField(option.text),
        correct: Boolean(option.isCorrect),
      })),
      feedback: {
        correct: '',
        incorrect: '',
      },
    }),
  );

  return {
    title: getI18nField(quiz.quizTitle) || 'Quiz',
    type: quiz.quizType || 'POST_TEST',
    minScore: quiz.passScorePercent ?? 70,
    questions: questions.length
      ? questions
      : [
          {
            id: 'question-1',
            title: 'Domanda 1',
            text: '',
            questionType: 'SINGLE',
            options: [],
            feedback: { correct: '', incorrect: '' },
          },
        ],
    feedback: {
      passed: getI18nField(quiz.feedback) || 'Superato',
      notPassed: 'Non superato',
    },
    savedQuizId: quiz.id,
    questionsCount: questions.length || 1,
    isPublished: Boolean(quiz.isPublished),
    publishStatus: quiz.isPublished ? 'PUBLISHED' : 'DRAFT',
  };
};

export const validateQuizFormData = (quizData) => {
  const questions = quizData?.questions || [];
  if (!questions.length) {
    return 'Aggiungi almeno una domanda al quiz';
  }

  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index];
    const questionLabel = `Domanda ${index + 1}`;
    const text = String(question.text || '').trim();
    if (!text) {
      return `${questionLabel}: inserisci il testo della domanda`;
    }

    const questionType = mapQuestionType(question.questionType);
    if (questionType === 'FREE_TEXT') continue;

    const options = (question.options || []).filter((option) =>
      String(option.text || '').trim(),
    );
    if (options.length < 2) {
      return `${questionLabel}: servono almeno 2 opzioni`;
    }

    const correctCount = options.filter((option) => option.correct).length;
    if (questionType === 'MULTIPLE' && correctCount < 1) {
      return `${questionLabel}: seleziona almeno una risposta corretta`;
    }
    if ((questionType === 'SINGLE' || questionType === 'TRUE_FALSE') && correctCount !== 1) {
      return `${questionLabel}: seleziona una sola risposta corretta`;
    }
  }

  return null;
};

export const mapQuizFormToPayload = (quizData) => {
  const questions = (quizData?.questions || [])
    .map((question, index) => {
      const questionText = String(question.text || question.title || '').trim();
      if (!questionText) return null;

      const questionId = question.id || `q${index + 1}`;
      const questionType = mapQuestionType(question.questionType);
      const options = buildQuestionOptions(question, questionId, questionType);

      if (questionType !== 'FREE_TEXT' && (!options || options.length < 2)) {
        return null;
      }

      if (questionType === 'FREE_TEXT') {
        return {
          id: questionId,
          text: { it: questionText, en: questionText },
          type: 'FREE_TEXT',
          options: [],
          requiresManualGrading: true,
          points: 1,
        };
      }

      return {
        id: questionId,
        text: { it: questionText, en: questionText },
        type: questionType,
        options,
        points: 1,
      };
    })
    .filter(Boolean);

  if (questions.length === 0) {
    throw new Error('Aggiungi almeno una domanda valida al quiz');
  }

  return {
    quizTitle: {
      it: String(quizData?.title || 'Quiz').trim(),
      en: String(quizData?.title || 'Quiz').trim(),
    },
    quizType: QUIZ_TYPE_MAP[quizData?.type] || 'POST_TEST',
    passScorePercent: Number(quizData?.minScore) || 70,
    minimumScorePercent: 0,
    failScorePercent: 0,
    isActive: true,
    isPublished: resolveQuizIsPublished(quizData),
    questions,
    feedback: quizData?.feedback?.passed
      ? { it: quizData.feedback.passed, en: quizData.feedback.passed }
      : undefined,
  };
};

export const extractCreatedCourseId = (payload) => {
  const data = getPayloadData(payload);
  return data?.course?.id || data?.id || payload?.course?.id || null;
};

export const extractCreatedQuizId = (payload) => {
  const data = getPayloadData(payload);
  return data?.quiz?.id || data?.id || payload?.quiz?.id || null;
};
