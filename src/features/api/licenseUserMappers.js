const getPayloadData = (payload) => payload?.data ?? payload ?? {};

const getLocalizedText = (value, locale = 'it') => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.it || value.en || Object.values(value).find(Boolean) || '';
};

export const formatLicenseDate = (value) => {
  if (!value) return '—';
  return new Date(value).toISOString().split('T')[0];
};

export const formatCourseDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('it-IT');
};

export const mapCourseStatusLabel = (course) => {
  if (!course?.isActive) return 'In manutenzione';
  if (course?.isB2BOnly) return 'In approvazione';
  return 'Pubblicato';
};

export const mapHomeCourseStatusLabel = (course) => {
  if (!course?.isActive) return 'Immatricolazione';
  return 'Pubblicato';
};

export const mapLicenseUserDashboard = (payload) => {
  const data = getPayloadData(payload);
  return {
    totaleSales: {
      value: data?.totalSold?.amount ?? 0,
      change: data?.totalSold?.changePercent ?? 0,
      currency: data?.totalSold?.currency ?? 'EUR',
    },
    newUsers: {
      value: data?.newUsers?.total ?? 0,
      weeklyIncrease: data?.newUsers?.thisWeek ?? 0,
      change: data?.newUsers?.changePercent ?? 0,
    },
    courses: {
      current: data?.myCourses?.used ?? 0,
      total: data?.myCourses?.limit ?? 0,
      percentage: data?.myCourses?.percentUsed ?? 0,
    },
    activeStudents: {
      current: data?.activeStudents?.active ?? 0,
      total: data?.activeStudents?.limit ?? 0,
      percentage: data?.activeStudents?.percentUsed ?? 0,
    },
    tickets: {
      value: data?.myTickets?.open ?? 0,
    },
  };
};

export const mapLicenseUserReport = (payload) => {
  const data = getPayloadData(payload);
  const chartDays = Number(data?.chartDays) || 7;
  const chartData = Array.isArray(data?.data) ? data.data : [];

  if (chartData.length > 0) {
    return {
      chartDays,
      series: data?.series ?? 'both',
      labels: chartData.map((point) => point.label ?? ''),
      currentData: chartData.map((point) => Number(point.current ?? point.amount ?? 0)),
      previousData: chartData.map((point) => Number(point.previous ?? 0)),
      currentTotal: Number(data?.currentTotal ?? data?.total ?? 0),
      previousTotal: Number(data?.previousTotal ?? 0),
      changePercent: Number(data?.changePercent ?? 0),
      chartDaysOptions: data?.chartDaysOptions ?? [7, 30, 90],
    };
  }

  const fallbackLabels =
    chartDays === 7
      ? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
      : Array.from({ length: chartDays }, (_, index) => `${index + 1}`);

  return {
    chartDays,
    series: data?.series ?? 'both',
    labels: fallbackLabels,
    currentData: Array(chartDays).fill(0),
    previousData: Array(chartDays).fill(0),
    currentTotal: Number(data?.currentTotal ?? 0),
    previousTotal: Number(data?.previousTotal ?? 0),
    changePercent: Number(data?.changePercent ?? 0),
    chartDaysOptions: data?.chartDaysOptions ?? [7, 30, 90],
  };
};

const TAB_TO_STATUS_FILTER = {
  active: 'ACTIVE',
  expiring: 'EXPIRING',
  expired: 'EXPIRED',
};

export const mapTabToStatusFilter = (tab) => TAB_TO_STATUS_FILTER[tab] ?? 'ACTIVE';

export const mapMyLicenseCard = (payload, locale = 'it') => {
  const data = getPayloadData(payload);
  const license = data?.license;
  if (!license) return null;

  const user = license.user ?? {};
  const plan = license.plan ?? {};
  const firstName = user.firstName?.trim() || '';
  const lastName = user.lastName?.trim() || '';
  const name =
    [lastName, firstName].filter(Boolean).join(', ') ||
    license.companyName ||
    'Licenziatario';

  const statusMap = {
    ACTIVE: 'active',
    EXPIRING: 'expiring',
    EXPIRED: 'expired',
  };

  return {
    id: license.id,
    userId: license.userId,
    name,
    role: getLocalizedText(plan.name, locale) || plan.tier || 'Freelancer',
    expiryDate: formatLicenseDate(license.expiresAt),
    status: statusMap[license.computedStatus || data?.status] || 'active',
    isExpired: Boolean(license.usage?.isExpired ?? license.computedStatus === 'EXPIRED'),
    isSuspended: Boolean(license.isSuspended),
    companyName: license.companyName ?? '',
    vatNumber: license.vatNumber ?? '',
    billingAddress: license.billingAddress ?? '',
    planId: plan.id ?? license.planId,
    usage: license.usage ?? null,
    raw: license,
  };
};

export const mapLicensePlans = (payload, locale = 'it') => {
  const data = getPayloadData(payload);
  const plans = data?.plans ?? (Array.isArray(data) ? data : []);

  return plans.map((plan) => ({
    id: plan.id,
    tier: plan.tier,
    name: getLocalizedText(plan.name, locale) || plan.label || plan.tier,
    description: getLocalizedText(plan.description, locale),
    priceYearly: plan.priceYearly ?? plan.priceAnnual ?? plan.displayPrice ?? 0,
    priceMonthly: plan.priceMonthly ?? null,
    maxUsers: plan.maxUsers ?? 0,
    maxCourses: plan.maxCourses ?? 0,
    storageMb: plan.storageMb ?? 0,
    features: Array.isArray(plan.features)
      ? plan.features
      : plan.features?.[locale] || plan.features?.it || [],
    supportLevel: getLocalizedText(plan.supportLevel, locale),
    label: plan.label || getLocalizedText(plan.name, locale),
  }));
};

export const mapLicenseUserCourseRow = (course, locale = 'it', variant = 'home') => {
  const title = getLocalizedText(course.courseTitle, locale) || course.slug || 'Corso';
  const enrolledStudents =
    course.enrollmentCount ?? course._count?.enrollments ?? 0;
  const progress = Math.round(
    Number(course.averageProgress ?? course.progress ?? 0) || 0,
  );

  const base = {
    id: course.id,
    name: title,
    title,
    enrolledStudents,
    enrolled: enrolledStudents,
    progress,
    published_date: formatCourseDate(course.createdAt),
    createdAt: course.createdAt,
    isActive: course.isActive,
    slug: course.slug,
    description: getLocalizedText(course.description, locale),
    duration: course.durationMinutes
      ? `${Math.round(course.durationMinutes / 60)} ore`
      : course.duration
        ? `${course.duration} ore`
        : '—',
    instructor: course.teacher
      ? [course.teacher.firstName, course.teacher.lastName].filter(Boolean).join(' ')
      : '—',
    category: course.category ?? '—',
    thumbnailUrl: course.thumbnailUrl ?? '',
    raw: course,
  };

  if (variant === 'report') {
    return {
      ...base,
      status: mapCourseStatusLabel(course),
    };
  }

  return {
    ...base,
    status: mapHomeCourseStatusLabel(course),
  };
};

export const mapLicenseUserCoursesResponse = (payload, locale = 'it', variant = 'home') => {
  const data = getPayloadData(payload);
  const courses = data?.courses ?? [];
  const meta = data?.meta ?? {};

  return {
    courses: courses.map((course) => mapLicenseUserCourseRow(course, locale, variant)),
    meta: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      total: meta.total ?? courses.length,
      totalPages: meta.totalPages ?? 1,
    },
  };
};

export const getUserDisplayName = (user) => {
  if (!user) return 'Utente';
  if (user.name?.trim()) return user.name.trim();

  const firstName = user.firstName?.trim() || '';
  const lastName = user.lastName?.trim() || '';

  if (firstName && lastName) {
    return `${lastName}, ${firstName}`;
  }

  return firstName || lastName || user.email || 'Utente';
};

export const CHART_PERIOD_MAP = {
  ultimi7: 7,
  ultimi30: 30,
  ultimi90: 90,
};
