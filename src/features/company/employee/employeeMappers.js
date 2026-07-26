import { EMPLOYEE_STATUS } from './employeeConstants';
import { validateEmployeeForm } from '../../../utils/validate/validateForm';

const formatDateInput = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

const resolveLocalizedTitle = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.it || value.en || Object.values(value)[0] || '';
};

export const mapApiStatusToUi = (status) =>
  status === 'ACTIVE' ? EMPLOYEE_STATUS.ACTIVE : EMPLOYEE_STATUS.INACTIVE;

export const mapUiStatusToApi = (status) =>
  status === EMPLOYEE_STATUS.ACTIVE ? 'ACTIVE' : 'SUSPENDED';

export const mapEmployeeFromApi = (record = {}) => ({
  id: record.id,
  userId: record.userId,
  firstName: record.firstName || '',
  lastName: record.lastName || '',
  email: record.email || '',
  phone: record.contactNumber || '',
  position: record.jobTitle || record.role || '',
  hireDate: formatDateInput(record.employmentDate),
  status: mapApiStatusToUi(record.status),
  assignedCourseId: record.courseId || '',
  assignedCourseTitle:
    record.courseTitle || resolveLocalizedTitle(record.assignedCourse?.title),
  companyCoursePurchaseId: record.assignedCourse?.companyCoursePurchaseId || null,
  raw: record,
});

export const mapEmployeesListResponse = (response = {}, { pageSize = 6 } = {}) => {
  const employees = response?.employees ?? [];
  const meta = response?.meta ?? {};

  return {
    items: employees.map(mapEmployeeFromApi),
    total: meta.total ?? employees.length,
    page: meta.page ?? 1,
    pageSize: meta.limit ?? pageSize,
    totalPages: meta.totalPages ?? 1,
  };
};

export const mapAssignableCourseOption = (course = {}) => {
  const title = resolveLocalizedTitle(course.courseTitle) || 'Corso';

  return {
    value: course.courseId,
    label: title,
    courseId: course.courseId,
    companyCoursePurchaseId: course.companyCoursePurchaseId || null,
    slug: course.slug || null,
  };
};

export const mapEmployeeFormToApiPayload = (
  form,
  { assignableCourses = [] } = {},
) => {
  const payload = {
    firstName: form.firstName?.trim(),
    lastName: form.lastName?.trim(),
    email: form.email?.trim(),
    contactNumber: form.phone?.trim(),
    role: form.position,
    jobTitle: form.position,
    employmentDate: form.hireDate
      ? new Date(form.hireDate).toISOString()
      : undefined,
    status: mapUiStatusToApi(form.status),
  };

  if (form.password?.trim()) {
    payload.password = form.password.trim();
  }

  if (form.assignedCourseId) {
    const selectedCourse = assignableCourses.find(
      (course) => course.courseId === form.assignedCourseId,
    );

    payload.courseIds = [form.assignedCourseId];

    if (selectedCourse?.companyCoursePurchaseId) {
      payload.companyCoursePurchaseId = selectedCourse.companyCoursePurchaseId;
    }
  }

  return payload;
};

export const mapEmployeeFormToUpdatePayload = (
  form,
  { assignableCourses = [], previousAssignedCourseId = '' } = {},
) => {
  const payload = {
    firstName: form.firstName?.trim(),
    lastName: form.lastName?.trim(),
    contactNumber: form.phone?.trim(),
    role: form.position,
    jobTitle: form.position,
    employmentDate: form.hireDate
      ? new Date(form.hireDate).toISOString()
      : undefined,
    status: mapUiStatusToApi(form.status),
  };

  if (form.password?.trim()) {
    payload.password = form.password.trim();
  }

  const nextCourseId = form.assignedCourseId || '';
  const currentCourseId =
    previousAssignedCourseId || form.previousAssignedCourseId || '';

  if (nextCourseId && nextCourseId !== currentCourseId) {
    const selectedCourse = assignableCourses.find(
      (course) => course.courseId === nextCourseId,
    );

    payload.courseIds = [nextCourseId];

    if (selectedCourse?.companyCoursePurchaseId) {
      payload.companyCoursePurchaseId = selectedCourse.companyCoursePurchaseId;
    }
  }

  return payload;
};

export const mapEmployeeToFormValues = (employee = null) => ({
  firstName: employee?.firstName || '',
  lastName: employee?.lastName || '',
  email: employee?.email || '',
  phone: employee?.phone || '',
  position: employee?.position || '',
  hireDate: employee?.hireDate || '',
  status: employee?.status || EMPLOYEE_STATUS.ACTIVE,
  assignedCourseId: employee?.assignedCourseId || '',
  password: '',
});

export const createEmployeeFormResolver = (mode = 'add') => async (values) => {
  const fieldErrors = validateEmployeeForm(values, { mode });

  if (!Object.keys(fieldErrors).length) {
    return { values, errors: {} };
  }

  return {
    values: {},
    errors: Object.entries(fieldErrors).reduce((acc, [key, message]) => {
      acc[key] = { type: 'validation', message };
      return acc;
    }, {}),
  };
};
