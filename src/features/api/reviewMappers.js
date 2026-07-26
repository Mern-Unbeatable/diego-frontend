const getPayloadData = (payload) => payload?.data ?? payload ?? {};

const getLocalizedText = (value, locale = 'it') => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.it || value.en || Object.values(value).find(Boolean) || '';
};

const formatReviewDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const mapAdminReviewRow = (review, locale = 'it') => ({
  id: review.id,
  name: getLocalizedText(review.name, locale),
  message: getLocalizedText(review.comment, locale),
  rating: Number(review.rating ?? 0),
  published: Boolean(review.isPublished),
  isPublic: Boolean(review.isPublic),
  tenantId: review.tenantId ?? null,
  createdAt: review.createdAt,
  updatedAt: review.updatedAt,
  createdAtFormatted: formatReviewDate(review.createdAt),
});

export const mapAdminReviewsResponse = (payload, locale = 'it') => {
  const data = getPayloadData(payload);
  const reviews = data?.reviews ?? [];
  const meta = data?.meta ?? {};

  return {
    reviews: Array.isArray(reviews) ? reviews.map((r) => mapAdminReviewRow(r, locale)) : [],
    meta: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      total: meta.total ?? 0,
      totalPages: meta.totalPages ?? 1,
    },
  };
};

export const mapAdminReviewDetailResponse = (payload, locale = 'it') => {
  const data = getPayloadData(payload);
  const review = data?.review ?? data;
  if (!review?.id) return null;
  return mapAdminReviewRow(review, locale);
};
