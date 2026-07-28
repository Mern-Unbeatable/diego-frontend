export const unwrapApiData = (response) => response?.data ?? response;

const collectValidationErrors = (error) => {
  const candidates = [
    error?.data?.errors,
    error?.errors,
    error?.data?.data?.errors,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate;
    }
  }

  return null;
};

const formatValidationErrors = (errors = []) =>
  errors
    .map((item) => {
      if (!item) return '';
      if (typeof item === 'string') return item;

      const message = item.message || item.msg || item.error;
      const field = item.field || item.path || item.param;

      if (message && field) {
        return `${field}: ${message}`;
      }

      return message || field || '';
    })
    .filter(Boolean)
    .join('\n');

export const getRtkErrorMessage = (error) => {
  if (!error) return 'Request failed';
  if (typeof error === 'string') return error;

  const validationErrors = collectValidationErrors(error);
  if (validationErrors) {
    const formatted = formatValidationErrors(validationErrors);
    if (formatted) return formatted;
  }

  if (typeof error?.data === 'string') return error.data;
  if (error?.data?.message) return error.data.message;
  if (error?.message) return error.message;
  return 'Request failed';
};

export const transformErrorResponse = (response) => ({
  message: response?.data?.message || 'Request failed',
  errors: response?.data?.errors || null,
  status: response?.status,
});
