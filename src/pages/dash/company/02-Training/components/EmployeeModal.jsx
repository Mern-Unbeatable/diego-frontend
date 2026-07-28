import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import Form from '../../../../../Forms/Form';
import Input from '../../../../../Forms/Input';
import Select from '../../../../../Forms/Select';
import DatePicker from '../../../../../Forms/DatePicker';
import {
  EMPLOYEE_STATUS,
  POSITION_OPTIONS,
  STATUS_OPTIONS,
} from '../../../../../features/company/employee/employeeConstants';
import {
  createEmployeeFormResolver,
  mapEmployeeToFormValues,
} from '../../../../../features/company/employee/employeeMappers';
import { getAssignableCourses } from '../../../../../features/company/employee/employeeService';
import { formatApiErrorMessage } from '../../../../../config/api/errorHandler';

/**
 * Single reusable modal for the employee CRUD flow.
 */
const EmployeeModal = ({ mode = 'add', initialData = null, onSubmit, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const modalRef = useRef(null);

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const defaultValues = useMemo(
    () => mapEmployeeToFormValues(initialData),
    [initialData],
  );

  const resolver = useMemo(() => createEmployeeFormResolver(mode), [mode]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    let isMounted = true;

    getAssignableCourses()
      .then((courses) => {
        if (isMounted) setCourseOptions(courses);
      })
      .catch(() => {
        if (isMounted) setCourseOptions([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const courseSelectOptions = useMemo(() => {
    const options = courseOptions.map((course) => ({
      value: course.courseId,
      label: course.label,
    }));

    if (
      initialData?.assignedCourseId &&
      !options.some((option) => option.value === initialData.assignedCourseId)
    ) {
      options.unshift({
        value: initialData.assignedCourseId,
        label: initialData.assignedCourseTitle || 'Corso assegnato',
      });
    }

    return [{ value: '', label: 'Nessun corso assegnato' }, ...options];
  }, [courseOptions, initialData]);

  const handleFormSubmit = async (formValues) => {
    if (isViewMode) return;

    const payload = {
      firstName: formValues.firstName?.trim(),
      lastName: formValues.lastName?.trim(),
      email: formValues.email?.trim(),
      phone: formValues.phone?.trim(),
      position: formValues.position,
      hireDate: formValues.hireDate,
      status: formValues.status || EMPLOYEE_STATUS.ACTIVE,
      assignedCourseId: formValues.assignedCourseId || null,
      previousAssignedCourseId: initialData?.assignedCourseId || null,
    };

    if (formValues.password?.trim()) {
      payload.password = formValues.password.trim();
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      await onSubmit?.(payload);
      onClose();
    } catch (error) {
      setSubmitError(
        formatApiErrorMessage(error) || 'Salvataggio non riuscito. Riprova.',
      );
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

          <Form
            key={`${mode}-${initialData?.userId || 'new'}`}
            resolver={resolver}
            defaultValues={defaultValues}
            onSubmit={handleFormSubmit}
            className="space-y-5 px-8 py-7 sm:px-14 sm:py-10"
          >
            {submitError && (
              <p className="rounded-lg bg-[#fbe9e7] px-4 py-2 text-sm text-[#dd6b5f]">
                {submitError}
              </p>
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                name="firstName"
                label="Nome"
                placeholder="Inserisci il nome..."
                required
                disabled={isSubmitting || isViewMode}
                variant="employee"
              />
              <Input
                name="lastName"
                label="Cognome"
                placeholder="Inserisci il cognome..."
                required
                disabled={isSubmitting || isViewMode}
                variant="employee"
              />
              <div className="md:col-span-2">
                <Input
                  name="email"
                  label="E-mail dipendente"
                  placeholder="franco.rossi@mototo.com"
                  type="email"
                  required
                  disabled={isSubmitting || isViewMode || isEditMode}
                  variant="employee"
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  name="phone"
                  label="Numero di contatto"
                  placeholder="+39 340 00 00000"
                  type="tel"
                  required
                  disabled={isSubmitting || isViewMode}
                  variant="employee"
                />
              </div>

              <Select
                name="position"
                label="Ruolo"
                required
                disabled={isSubmitting || isViewMode}
                variant="employee"
                options={[
                  { value: '', label: 'Seleziona un ruolo' },
                  ...POSITION_OPTIONS,
                ]}
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#222222]">
                  Data di assunzione <span className="text-[#e34f4f]">*</span>
                </label>
                <DatePicker
                  name="hireDate"
                  hideLabel
                  required
                  variant="employee"
                  disabled={isSubmitting || isViewMode}
                />
              </div>
              <Select
                name="status"
                label="Stato"
                required
                disabled={isSubmitting || isViewMode}
                variant="employee"
                options={STATUS_OPTIONS}
              />
              <Select
                name="assignedCourseId"
                label="Corso assegnato"
                disabled={isSubmitting || isViewMode}
                variant="employee"
                options={courseSelectOptions}
              />

              {!isViewMode && (
                <div className="md:col-span-2">
                  <Input
                    name="password"
                    label={isEditMode ? 'Nuova password (opzionale)' : 'Password'}
                    placeholder={
                      isEditMode
                        ? 'Lascia vuoto per non modificarla'
                        : 'Crea una password per il tuo lavoratore'
                    }
                    type="password"
                    required={!isEditMode}
                    minLength={isEditMode ? undefined : 6}
                    disabled={isSubmitting}
                    variant="employee"
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
          </Form>
        </div>
      </div>
    </>
  );
};

export default EmployeeModal;
