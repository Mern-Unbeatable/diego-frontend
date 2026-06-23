import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

const formFields = [
    { name: 'name', label: 'Nome', placeholder: 'Inserisci il tuo nome...' },
    { name: 'surname', label: 'Cognome', placeholder: 'Inserisci il tuo cognome...' },
    { name: 'email', label: 'E-mail dipendente', placeholder: 'franco.rossi@mototo.com' },
    { name: 'phone', label: 'Numero di contatto', placeholder: '+39 340 00 00000' },
    { name: 'birthDate', label: 'Data di nascita', placeholder: 'GG/MM/AAAA' },
    { name: 'birthPlace', label: 'Luogo', placeholder: 'Inserisci il luogo di nascita' },
    { name: 'taxCode', label: 'Codice Fiscale', placeholder: 'Inserisci il tuo codice fiscale' },
];

const extraFields = [
    { name: 'courseName', label: 'Nome del corso', placeholder: 'Inserisci il nome del corso' },
    { name: 'password', label: 'Password', placeholder: "Crea una password per il tuo lavoratore" },
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

const EmployeeModal = ({ mode, employee, onClose }) => {
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

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#113b2b]/60 p-4">
            <div className="max-h-[95vh] w-full max-w-[740px] overflow-y-auto rounded-2xl bg-white px-8 py-7 sm:px-14 sm:py-10">
                <button type="button" onClick={onClose} className="mb-4 inline-flex text-[#404040]">
                    <ArrowLeft size={20} />
                </button>

                <h3 className="mb-8 text-center text-2xl md:text-3xl font-semibold text-[#1f1f1f]">{title}</h3>

                <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
                    {formFields.map((field) => (
                        <Field
                            key={field.name}
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                        />
                    ))}

                    {mode === 'add' &&
                        extraFields.map((field) => (
                            <Field
                                key={field.name}
                                label={field.label}
                                placeholder={field.placeholder}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                            />
                        ))}

                    <div className="flex justify-end pt-2">
                        <button type="button" onClick={onClose} className="rounded-full bg-[#73bfa1] px-7 py-2.5 text-sm font-semibold text-white hover:bg-[#63a88c]">
                            {buttonLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeModal;