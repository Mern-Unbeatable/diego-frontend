import { forwardRef, useEffect, useRef, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { validateEmployeeForm } from '../../../../../utils/validate/validateForm';
import {
  COURSE_OPTIONS,
  POSITION_OPTIONS,
  STATUS_OPTIONS,
  EMPLOYEE_STATUS,
} from '../../../../../features/company/employee/employeeConstants';

const courseSelectOptions = [
  { value: '', label: 'Nessun corso assegnato' },
  ...COURSE_OPTIONS.map((course) => ({ value: course.id, label: course.title })),
];

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  hireDate: '',
  status: EMPLOYEE_STATUS.ACTIVE,
  assignedCourseId: '',
  password: '',
};

const inputClasses =
  'h-12 w-full rounded-lg border border-transparent bg-[#edf5f2] px-4 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9da8a4] focus:border-[#73bfa1] disabled:cursor-not-allowed disabled:opacity-70';

const Field = forwardRef(
  (
    { label, placeholder, value, onChange, onBlur, name, type = 'text', error, required, disabled },
    ref,
  ) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#222222]">
        {label}
        {required && <span className="text-[#e34f4f]">*</span>}
      </span>
      <input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={inputClasses}
        placeholder={placeholder}
        disabled={disabled}
        data-error={!!error}
      />
      {error && <p className="mt-1 text-xs text-[#e34f4f]">{error}</p>}
    </label>
  ),
);
Field.displayName = 'Field';

const SelectInput = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  options,
  error,
  required,
  disabled,
}) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-[#222222]">
      {label}
      {required && <span className="text-[#e34f4f]">*</span>}
    </span>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={inputClasses}
      disabled={disabled}
      data-error={!!error}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-xs text-[#e34f4f]">{error}</p>}
  </label>
);

/**
 * Single reusable modal for the employee CRUD flow.
 *
 * @param {'add'|'edit'|'view'} mode
 * @param {object|null} initialData - employee record for edit/view, prefilled fields for add
 * @param {(payload: object) => Promise<void>|void} onSubmit
 * @param {() => void} onClose
 */
const EmployeeModal = ({ mode = 'add', initialData = null, onSubmit, onClose }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState('');
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (initialData) {
      setForm({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        position: initialData.position || '',
        hireDate: initialData.hireDate || '',
        status: initialData.status || EMPLOYEE_STATUS.ACTIVE,
        assignedCourseId: initialData.assignedCourseId || '',
        password: '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setTouched({});
    setSubmitError('');
  }, [mode, initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isViewMode) return;

    const allTouched = {};
    Object.keys(form).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const validationErrors = validateEmployeeForm(form, { mode });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      position: form.position,
      hireDate: form.hireDate,
      status: form.status,
      assignedCourseId: form.assignedCourseId || null,
    };

    // Password is only sent when it's required (add) or was actually changed (edit).
    if (form.password?.trim()) {
      payload.password = form.password.trim();
    }

    setSubmitError('');
    setIsSubmitting(true);
    try {
      await onSubmit?.(payload);
      onClose();
    } catch (error) {
      setSubmitError(error?.message || 'Salvataggio non riuscito. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const titles = {
    add: 'Aggiungi utente',
    edit: 'Modifica utente',
    view: 'Dettagli utente',
  };
  const buttonLabels = {
    add: 'Salva',
    edit: 'Salva modifiche',
  };
  const title = titles[mode] || titles.add;
  const buttonLabel = buttonLabels[mode] || buttonLabels.add;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[#113b2b]/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          ref={modalRef}
          className="animate-in fade-in zoom-in relative max-h-[95vh] w-full max-w-[740px] overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-in-out"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-[#73bfa1] focus:ring-offset-2 focus:outline-none"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="border-b border-gray-100 px-8 py-6 sm:px-14">
            <button
              type="button"
              onClick={onClose}
              className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-[#404040] transition-colors hover:text-[#73bfa1] focus:ring-2 focus:ring-[#73bfa1] focus:ring-offset-2 focus:outline-none"
            >
              <ArrowLeft size={18} />
              Indietro
            </button>

            <h3
              id="modal-title"
              className="text-center text-2xl font-semibold text-[#1f1f1f] md:text-3xl"
            >
              {title}
            </h3>

            {(isEditMode || isViewMode) && initialData && (
              <p className="mt-1 text-center text-sm text-gray-500">
                {isViewMode ? 'Stai visualizzando' : 'Stai modificando'}{' '}
                {initialData.firstName} {initialData.lastName}
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-8 py-7 sm:px-14 sm:py-10"
          >
            {submitError && (
              <p className="rounded-lg bg-[#fbe9e7] px-4 py-2 text-sm text-[#dd6b5f]">
                {submitError}
              </p>
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field
                ref={firstInputRef}
                label="Nome"
                placeholder="Inserisci il nome..."
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName ? errors.firstName : ''}
                required
                disabled={isSubmitting || isViewMode}
              />
              <Field
                label="Cognome"
                placeholder="Inserisci il cognome..."
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName ? errors.lastName : ''}
                required
                disabled={isSubmitting || isViewMode}
              />
              <div className="md:col-span-2">
                <Field
                  label="E-mail dipendente"
                  placeholder="franco.rossi@mototo.com"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : ''}
                  required
                  disabled={isSubmitting || isViewMode}
                />
              </div>
              <div className="md:col-span-2">
                <Field
                  label="Numero di contatto"
                  placeholder="+39 340 00 00000"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone ? errors.phone : ''}
                  required
                  disabled={isSubmitting || isViewMode}
                />
              </div>

              <SelectInput
                label="Ruolo"
                name="position"
                value={form.position}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.position ? errors.position : ''}
                required
                disabled={isSubmitting || isViewMode}
                options={[{ value: '', label: 'Seleziona un ruolo' }, ...POSITION_OPTIONS]}
              />
              <Field
                label="Data di assunzione"
                name="hireDate"
                type="date"
                value={form.hireDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.hireDate ? errors.hireDate : ''}
                required
                disabled={isSubmitting || isViewMode}
              />
              <SelectInput
                label="Stato"
                name="status"
                value={form.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.status ? errors.status : ''}
                required
                disabled={isSubmitting || isViewMode}
                options={STATUS_OPTIONS}
              />
              <SelectInput
                label="Corso assegnato"
                name="assignedCourseId"
                value={form.assignedCourseId}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting || isViewMode}
                options={courseSelectOptions}
              />

              {!isViewMode && (
                <div className="md:col-span-2">
                  <Field
                    label={
                      isEditMode ? 'Nuova password (opzionale)' : 'Password'
                    }
                    placeholder={
                      isEditMode
                        ? 'Lascia vuoto per non modificarla'
                        : 'Crea una password per il tuo lavoratore'
                    }
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password ? errors.password : ''}
                    required={!isEditMode}
                    disabled={isSubmitting}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full border border-gray-300 px-7 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-[#73bfa1] focus:ring-offset-2 focus:outline-none sm:w-auto"
                disabled={isSubmitting}
              >
                {isViewMode ? 'Chiudi' : 'Annulla'}
              </button>
              {!isViewMode && (
                <button
                  type="submit"
                  className="relative w-full rounded-full bg-[#73bfa1] px-7 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#63a88c] focus:ring-2 focus:ring-[#73bfa1] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">{buttonLabel}</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    buttonLabel
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeModal;
