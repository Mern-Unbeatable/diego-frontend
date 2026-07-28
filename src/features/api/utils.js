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

const extractErrorPayload = (response) => {
  if (!response) return {};
  if (response.data && typeof response.data === 'object') return response.data;
  return response;
};

export const getRtkErrorMessage = (error) => {
  if (!error) return 'Request failed';
  if (typeof error === 'string') return error;

  if (error?.status === 'FETCH_ERROR') {
    const fetchMessage = error?.error || error?.data?.message;
    if (fetchMessage && fetchMessage !== 'Rejected') {
      return `Network error: ${fetchMessage}. Verify backend is running on port 5000 and restart the frontend dev server.`;
    }
    return 'Network error: cannot reach API. Start backend (npm run dev in lms) and restart frontend (npm run dev in diego-frontend).';
  }

  if (error?.status === 'PARSING_ERROR') {
    return 'Server returned an invalid response. Check backend logs.';
  }

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

export const transformErrorResponse = (response, meta) => {
  const payload = extractErrorPayload(response);
  const status = meta?.response?.status ?? payload?.statusCode ?? response?.status;

  return {
    message: payload?.message || response?.message || 'Request failed',
    errors: payload?.errors || response?.errors || null,
    status,
    statusCode: payload?.statusCode ?? status,
  };
};
