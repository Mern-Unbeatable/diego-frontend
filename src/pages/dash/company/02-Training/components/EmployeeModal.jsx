import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Form from '../../../../../Forms/Form';
import Input from '../../../../../Forms/Input';
import Select from '../../../../../Forms/Select';
import DatePicker from '../../../../../Forms/DatePicker';
import { EMPLOYEE_STATUS } from '../../../../../features/company/employee/employeeConstants';
import {
  buildEmployeePositionOptions,
  buildEmployeeStatusOptions,
} from '../../../../../features/company/companyI18nHelpers';
import {
  createEmployeeFormResolver,
  mapEmployeeToFormValues,
} from '../../../../../features/company/employee/employeeMappers';
import { getAssignableCourses } from '../../../../../features/company/employee/employeeService';
import { formatApiErrorMessage } from '../../../../../config/api/errorHandler';

/**
 * Single reusable modal for the employee CRUD flow.
 */
const EmployeeModal = ({
  mode = 'add',
  initialData = null,
  onSubmit,
  onClose,
}) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
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

  const positionOptions = useMemo(() => buildEmployeePositionOptions(t), [t]);
  const statusOptions = useMemo(() => buildEmployeeStatusOptions(t), [t]);

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
        label: initialData.assignedCourseTitle || t('companyAdmin.training.assignedCourseFallback'),
      });
    }

    return [{ value: '', label: t('companyAdmin.employeeModal.noCourseAssigned') }, ...options];
  }, [courseOptions, initialData, t]);

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
        formatApiErrorMessage(error) || t('companyAdmin.common.errors.saveFailed'),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = t(`companyAdmin.employeeModal.titles.${mode}`, {
    defaultValue: t('companyAdmin.employeeModal.titles.add'),
  });
  const buttonLabel =
    mode === 'edit'
      ? t('companyAdmin.employeeModal.buttons.saveChanges')
      : t('companyAdmin.employeeModal.buttons.save');

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="employee-modal-title"
    >
      <div
        ref={modalRef}
        className="flex max-h-[95vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#404040] hover:bg-gray-100"
            aria-label={t('companyAdmin.common.back')}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <h3
              id="employee-modal-title"
              className="text-base font-semibold text-[#1f1f1f] sm:text-lg"
            >
              {title}
            </h3>
            {(isEditMode || isViewMode) && initialData ? (
              <p className="truncate text-xs text-gray-500 sm:text-sm">
                {isViewMode
                  ? t('companyAdmin.employeeModal.subtitle.viewing')
                  : t('companyAdmin.employeeModal.subtitle.editing')}{' '}
                {initialData.firstName} {initialData.lastName}
              </p>
            ) : null}
          </div>
          <div className="w-9" />
        </div>

        <Form
          key={`${mode}-${initialData?.userId || 'new'}`}
          resolver={resolver}
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5">
            {submitError ? (
              <p className="rounded-lg bg-[#fbe9e7] px-3 py-2 text-sm text-[#dd6b5f]">
                {submitError}
              </p>
            ) : null}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <Input
                name="firstName"
                label={t('companyAdmin.employeeModal.fields.firstName')}
                placeholder={t('companyAdmin.employeeModal.placeholders.firstName')}
                required
                disabled={isSubmitting || isViewMode}
                variant="employee"
              />
              <Input
                name="lastName"
                label={t('companyAdmin.employeeModal.fields.lastName')}
                placeholder={t('companyAdmin.employeeModal.placeholders.lastName')}
                required
                disabled={isSubmitting || isViewMode}
                variant="employee"
              />
              <div className="sm:col-span-2">
                <Input
                  name="email"
                  label={t('companyAdmin.employeeModal.fields.email')}
                  placeholder={t('companyAdmin.employeeModal.placeholders.email')}
                  type="email"
                  required
                  disabled={isSubmitting || isViewMode || isEditMode}
                  variant="employee"
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  name="phone"
                  label={t('companyAdmin.employeeModal.fields.phone')}
                  placeholder={t('companyAdmin.employeeModal.placeholders.phone')}
                  type="tel"
                  required
                  disabled={isSubmitting || isViewMode}
                  variant="employee"
                />
              </div>

              <Select
                name="position"
                label={t('companyAdmin.employeeModal.fields.position')}
                required
                disabled={isSubmitting || isViewMode}
                variant="employee"
                options={[
                  { value: '', label: t('companyAdmin.employeeModal.placeholders.selectRole') },
                  ...positionOptions,
                ]}
              />
              <div className="min-w-0">
                <label className="mb-1.5 block text-sm font-medium text-[#222222]">
                  {t('companyAdmin.employeeModal.fields.hireDate')}{' '}
                  <span className="text-[#e34f4f]">*</span>
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
                label={t('companyAdmin.employeeModal.fields.status')}
                required
                disabled={isSubmitting || isViewMode}
                variant="employee"
                options={statusOptions}
              />
              <Select
                name="assignedCourseId"
                label={t('companyAdmin.employeeModal.fields.assignedCourse')}
                disabled={isSubmitting || isViewMode}
                variant="employee"
                options={courseSelectOptions}
              />

              {!isViewMode ? (
                <div className="sm:col-span-2">
                  <Input
                    name="password"
                    label={
                      isEditMode
                        ? t('companyAdmin.employeeModal.fields.passwordOptional')
                        : t('companyAdmin.employeeModal.fields.password')
                    }
                    placeholder={
                      isEditMode
                        ? t('companyAdmin.employeeModal.placeholders.passwordOptional')
                        : t('companyAdmin.employeeModal.placeholders.passwordCreate')
                    }
                    type={showPassword ? 'text' : 'password'}
                    required={!isEditMode}
                    minLength={isEditMode ? undefined : 6}
                    disabled={isSubmitting}
                    variant="employee"
                    inputClassName="pr-12"
                    interactiveSuffix
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-[#7a7a7a] transition-colors hover:text-[#73bfa1] focus:outline-none"
                        aria-label={
                          showPassword
                            ? t('companyAdmin.employeeModal.aria.hidePassword')
                            : t('companyAdmin.employeeModal.aria.showPassword')
                        }
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-100 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-5 sm:py-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-full items-center justify-center rounded-full border border-gray-300 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 sm:w-auto"
              disabled={isSubmitting}
            >
              {isViewMode ? t('companyAdmin.common.close') : t('companyAdmin.common.cancel')}
            </button>
            {!isViewMode ? (
              <button
                type="submit"
                className="relative inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73bfa1] px-6 text-sm font-medium text-white hover:bg-[#63a88c] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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
            ) : null}
          </div>
        </Form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default EmployeeModal;
