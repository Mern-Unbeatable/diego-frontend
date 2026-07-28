const ENROLLMENT_CONFLICT_PATTERN =
  /already enrolled|already completed|already purchased/i;

export const getPaymentErrorMessage = (error) => {
  if (!error) return '';
  if (typeof error === 'string') return error;
  return error?.message || '';
};

export const isEnrollmentConflictError = (message = '') =>
  ENROLLMENT_CONFLICT_PATTERN.test(message);

export const resolveEnrollmentConflictToast = (message, t) => {
  if (/already completed/i.test(message)) {
    return t('paymentPages.section2.alreadyCompleted');
  }

  if (/already purchased/i.test(message)) {
    return t('paymentPages.section2.alreadyPurchased');
  }

  return t('paymentPages.section2.alreadyEnrolled');
};
