import { normalizeApiError } from './client';

/**
 * Build a user-facing message from API validation errors.
 * @param {Error|Object} error
 * @returns {string}
 */
export const formatApiErrorMessage = (error) => {
  if (typeof error === 'string') return error;

  const normalized = normalizeApiError(error);

  if (normalized.errors?.length) {
    const details = normalized.errors
      .map((item) => item.message || `${item.field}: non valido`)
      .join('. ');

    return details || normalized.message;
  }

  return normalized.message;
};

/**
 * Handle API errors in Redux thunks
 * Re-throws abort errors for RTK to handle
 * Returns normalized error message for other errors
 * @param {Error} error - Error from axios
 * @returns {string} Error message
 */
export const handleApiError = (error) => {
  // Re-throw abort errors — RTK handles cancelled thunks natively
  if (error.name === 'CanceledError' || error.name === 'AbortError') {
    throw error;
  }

  return formatApiErrorMessage(error);
};

/**
 * Get full normalized error object (for detailed error handling)
 * @param {Error} error - Error from axios
 * @returns {Object} Normalized error object with message, code, status, errors
 */
export const getNormalizedError = (error) => {
  if (error.name === 'CanceledError' || error.name === 'AbortError') {
    return {
      message: 'Request cancelled',
      code: 'REQUEST_CANCELLED',
      status: null,
      errors: null,
    };
  }

  return normalizeApiError(error);
};
