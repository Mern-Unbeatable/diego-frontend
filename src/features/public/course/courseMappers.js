import { formatCourseDuration } from '../../../utils/courseMedia';

export const getLocalizedValue = (value, language) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return value || '';
  }
  return value[language] || value.en || Object.values(value)[0] || '';
};

export const mapCoursePricing = (courseSource, { language, t }) => {
  const pricingSource = courseSource.pricing || {};
  const singleUserFeatures =
    (courseSource.singleUserPackage?.features || []).length > 0
      ? (courseSource.singleUserPackage?.features || []).map((feature) =>
          getLocalizedValue(feature, language),
        )
      : pricingSource.singleUser?.features || [];

  const companyFeatures =
    (courseSource.companyPackage?.features || []).length > 0
      ? (courseSource.companyPackage?.features || []).map((feature) => ({
          ...feature,
          label:
            getLocalizedValue(feature.label, language) || feature.label || '',
        }))
      : pricingSource.company?.features || [];

  return {
    singleUser: {
      title:
        getLocalizedValue(courseSource.singleUserPackage?.title, language) ||
        pricingSource.singleUser?.title ||
        t('trainingPages.section12.singleCourse.title'),
      price:
        pricingSource.singleUser?.price ??
        courseSource.price ??
        courseSource.basePrice ??
        0,
      features: singleUserFeatures.filter(Boolean),
    },
    company: {
      title:
        getLocalizedValue(courseSource.companyPackage?.title, language) ||
        pricingSource.company?.title ||
        t('trainingPages.section12.companyPackage.title'),
      description:
        getLocalizedValue(courseSource.companyPackage?.description, language) ||
        pricingSource.company?.description ||
        '',
      features: companyFeatures.filter((feature) =>
        typeof feature === 'string' ? feature : feature?.label,
      ),
    },
  };
};

export const mapCourseFromApi = (courseSource, { language, t, courseSlug }) => {
  if (!courseSource) return null;

  const pricing = mapCoursePricing(courseSource, { language, t });

  return {
    id: courseSource.id,
    slug: courseSource.slug || courseSlug,
    courseTitle: courseSource.courseTitle || '-',
    description: courseSource.description || '-',
    category: courseSource.format || getLocalizedValue(courseSource.type, language) || '-',
    rating: courseSource.averageRating || 0,
    reviews: courseSource.totalReviews || courseSource?._count?.reviews || 0,
    singleUserFeatures: pricing.singleUser.features,
    pricing,
    basePrice: courseSource.basePrice ?? 0,
    price: courseSource.price ?? 0,
    thumbnailUrl: courseSource.thumbnailUrl || '',
    videoUrl: courseSource.videoUrl || '',
    duration: formatCourseDuration(courseSource),
    code: courseSource.trainingPlanId || courseSource.slug || courseSource.id,
  };
};

const getFeatureLabel = (feature) => {
  if (typeof feature === 'string') return feature;
  return feature?.label || '';
};

export const mapPublicCoursesToCatalogCards = (courses = []) =>
  (courses || []).map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.courseTitle,
    category: course.format || '-',
    duration: formatCourseDuration(course),
    description: course.description || '',
    oldPrice: course.basePrice || 0,
    price: course.price || 0,
    rating: course.averageRating ?? 0,
    reviews: course.totalReviews ?? course?._count?.reviews ?? 0,
    thumbnailUrl: course.thumbnailUrl || '',
    videoUrl: course.videoUrl || '',
  }));

export const getCheckoutSelection = (course, { plan, tierId }) => {
  if (!course) return null;

  const pricing = course.pricing;
  const normalizedPlan = plan === 'company' ? 'company' : 'single';

  if (normalizedPlan === 'company' && tierId) {
    const tier = (pricing?.company?.features || []).find(
      (feature) =>
        typeof feature === 'object' &&
        feature?.type === 'pricing' &&
        feature.id === tierId,
    );

    if (tier) {
      const tierLabel = getFeatureLabel(tier);
      return {
        plan: 'company',
        planTitle: pricing.company.title,
        tierLabel,
        price: Number(tier.price) || 0,
        displayTitle: course.courseTitle,
        subtitle: `${pricing.company.title} — ${tierLabel}`,
      };
    }
  }

  return {
    plan: 'single',
    planTitle: pricing?.singleUser?.title || '',
    tierLabel: null,
    price: Number(pricing?.singleUser?.price ?? course.price ?? 0),
    displayTitle: course.courseTitle,
    subtitle: pricing?.singleUser?.title || '',
  };
};
