import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { validateForm } from '../../../../../utils/validate/validateForm';

const formFields = [
  { name: 'name', label: 'Nome', placeholder: 'Inserisci il tuo nome...' },
  {
    name: 'surname',
    label: 'Cognome',
    placeholder: 'Inserisci il tuo cognome...',
  },
  {
    name: 'email',
    label: 'E-mail dipendente',
    placeholder: 'franco.rossi@mototo.com',
  },
  {
    name: 'phone',
    label: 'Numero di contatto',
    placeholder: '+39 340 00 00000',
  },
  { name: 'birthDate', label: 'Data di nascita', placeholder: 'GG/MM/AAAA' },
  {
    name: 'birthPlace',
    label: 'Luogo',
    placeholder: 'Inserisci il luogo di nascita',
  },
  {
    name: 'taxCode',
    label: 'Codice Fiscale',
    placeholder: 'Inserisci il tuo codice fiscale',
  },
];

const extraFields = [
  {
    name: 'courseName',
    label: 'Nome del corso',
    placeholder: 'Inserisci il nome del corso',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Crea una password per il tuo lavoratore',
  },
];

const emptyForm = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  birthDate: '',
  birthPlace: '',
  taxCode: '',
  courseName: '',
  password: '',
};

const Field = ({ label, placeholder, value, onChange, name }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-[#222222]">
      {label}
      <span className="text-[#e34f4f]">*</span>
    </span>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="h-12 w-full rounded-lg border border-transparent bg-[#edf5f2] px-4 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9da8a4] focus:border-[#73bfa1]"
      placeholder={placeholder}
    />
  </label>
);

// Local
const EmployeeModal = ({ mode, employee, onClose, onSave }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Focus trap and auto-focus
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Populate form for edit mode
  useEffect(() => {
    if (mode === 'edit' && employee) {
      const parts = employee.name?.split(' ') || ['', ''];
      setForm({
        name: parts[0] || '',
        surname: parts.slice(1).join(' ') || '',
        email: employee.email || '',
        phone: employee.phone || '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setTouched({});
  }, [mode, employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
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

    // Mark all fields as touched to show errors
    const allTouched = {};
    Object.keys(form).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave?.(form);
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      // Show error notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = mode === 'edit' ? 'Modifica utente' : 'Aggiungi utente';
  const buttonLabel = mode === 'edit' ? 'Richiedi modifica' : 'Salva';
  const isEditMode = mode === 'edit';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-[#113b2b]/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
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
          {/* Close button - fixed position */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-[#73bfa1] focus:ring-offset-2 focus:outline-none"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
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

            {isEditMode && employee && (
              <p className="mt-1 text-center text-sm text-gray-500">
                Stai modificando {employee.name}
              </p>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-8 py-7 sm:px-14 sm:py-10"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {formFields.map((field, index) => (
                <div
                  key={field.name}
                  className={
                    field.name === 'email' || field.name === 'phone'
                      ? 'md:col-span-2'
                      : ''
                  }
                >
                  <Field
                    ref={index === 0 ? firstInputRef : undefined}
                    label={field.label}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[field.name] ? errors[field.name] : ''}
                    required
                    disabled={isSubmitting}
                    data-error={!!errors[field.name] && touched[field.name]}
                  />
                </div>
              ))}

              {mode === 'add' &&
                extraFields.map((field) => (
                  <div
                    key={field.name}
                    className={field.name === 'note' ? 'md:col-span-2' : ''}
                  >
                    <Field
                      label={field.label}
                      placeholder={field.placeholder}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field.name] ? errors[field.name] : ''}
                      disabled={isSubmitting}
                      data-error={!!errors[field.name] && touched[field.name]}
                    />
                  </div>
                ))}
            </div>

            {/* Form actions */}
            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full border border-gray-300 px-7 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-[#73bfa1] focus:ring-offset-2 focus:outline-none sm:w-auto"
                disabled={isSubmitting}
              >
                Annulla
              </button>
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeModal;
