import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

const formFields = [
  { name: 'name', label: 'Nome', placeholder: 'Inserisci il tuo nome...' },
  { name: 'surname', label: 'Cognome', placeholder: 'Inserisci il tuo cognome...' },
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
  <label className="block min-w-0">
    <span className="mb-1.5 block text-sm font-medium text-[#222222]">
      {label}
      <span className="text-[#e34f4f]">*</span>
    </span>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="h-11 w-full rounded-lg border border-transparent bg-[#edf5f2] px-3 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9da8a4] focus:border-[#73bfa1] sm:h-12 sm:px-4"
      placeholder={placeholder}
    />
  </label>
);

const EmployeeModal = ({ mode, employee, onClose, onSubmit, saving = false }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (mode === 'edit' && employee) {
      const parts = employee.name.split(' ');
      setForm((prev) => ({
        ...prev,
        name: parts[0] || '',
        surname: parts[1] || '',
        email: employee.email,
        phone: employee.phone,
      }));
      return;
    }
    setForm(emptyForm);
  }, [mode, employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const title = mode === 'edit' ? 'Modifica utente' : 'Aggiungi utente';
  const buttonLabel = mode === 'edit' ? 'Richiedi modifica' : 'Salva';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onSubmit) {
      await onSubmit(form);
      return;
    }
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="flex max-h-[95vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#404040] hover:bg-gray-100"
            aria-label="Indietro"
          >
            <ArrowLeft size={18} />
          </button>
          <h3 className="min-w-0 flex-1 text-center text-base font-semibold text-[#1f1f1f] sm:text-lg">
            {title}
          </h3>
          <div className="w-9" />
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit}
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {formFields.map((field) => (
                <div
                  key={field.name}
                  className={
                    field.name === 'email' || field.name === 'taxCode'
                      ? 'sm:col-span-2'
                      : ''
                  }
                >
                  <Field
                    label={field.label}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            {mode === 'add' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {extraFields.map((field) => (
                  <div
                    key={field.name}
                    className={field.name === 'courseName' ? 'sm:col-span-2' : ''}
                  >
                    <Field
                      label={field.label}
                      placeholder={field.placeholder}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-100 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-5 sm:py-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-full border border-gray-300 px-5 text-sm font-medium text-[#4f4f4f]"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#73bfa1] px-6 text-sm font-medium text-white hover:bg-[#63a88c] disabled:opacity-60"
            >
              {saving ? 'Salvataggio...' : buttonLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
