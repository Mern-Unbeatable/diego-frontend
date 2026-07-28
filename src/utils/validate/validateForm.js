const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+()-]{8,15}$/;

/**
 * Pure validator for the employee form. Returns an `errors` object keyed by
 * field name — callers decide when/how to render them (see EmployeeModal's
 * `touched` state).
 *
 * @param {object} form - current form values
 * @param {object} [options]
 * @param {'add'|'edit'|'view'} [options.mode]
 * @returns {Record<string, string>} errors
 */
export const validateEmployeeForm = (form, { mode = 'add' } = {}) => {
  const errors = {};

  if (!form.firstName?.trim()) {
    errors.firstName = 'Il nome è obbligatorio';
  }

  if (!form.lastName?.trim()) {
    errors.lastName = 'Il cognome è obbligatorio';
  }

  if (!form.email?.trim()) {
    errors.email = "L'email è obbligatoria";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Inserisci un indirizzo email valido';
  }

  if (!form.phone?.trim()) {
    errors.phone = 'Il telefono è obbligatorio';
  } else if (!PHONE_REGEX.test(form.phone.trim())) {
    errors.phone = 'Inserisci un numero di telefono valido';
  }

  if (!form.position?.trim()) {
    errors.position = 'Il ruolo è obbligatorio';
  }

  if (!form.hireDate?.trim()) {
    errors.hireDate = 'La data di assunzione è obbligatoria';
  }

  if (!form.status?.trim()) {
    errors.status = 'Lo stato è obbligatorio';
  }

  // Password is required only when creating a new employee. In edit mode
  // it's an optional "change password" field, so it's only validated if
  // the user actually typed something.
  if (mode === 'add') {
    if (!form.password?.trim()) {
      errors.password = 'La password è obbligatoria';
    } else if (form.password.trim().length < 6) {
      errors.password = 'La password deve contenere almeno 6 caratteri';
    }
  } else if (form.password?.trim() && form.password.trim().length < 6) {
    errors.password = 'La password deve contenere almeno 6 caratteri';
  }

  return errors;
};

export default validateEmployeeForm;
