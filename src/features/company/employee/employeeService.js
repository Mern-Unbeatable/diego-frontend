import {
  addCompanyEmployeeService,
  getAssignableCoursesService,
  getCompanyEmployeeDetailService,
  getCompanyEmployeesService,
  removeCompanyEmployeeService,
  updateCompanyEmployeeService,
} from '../companyService';
import {
  mapAssignableCourseOption,
  mapEmployeeFormToApiPayload,
  mapEmployeeFormToUpdatePayload,
  mapEmployeeFromApi,
  mapEmployeesListResponse,
} from './employeeMappers';

export const getEmployees = async (params = {}, { signal } = {}) => {
  const { page = 1, pageSize = 6, ...rest } = params;
  const response = await getCompanyEmployeesService(
    { page, limit: pageSize, ...rest },
    { signal },
  );

  return mapEmployeesListResponse(response, { pageSize });
};

export const getEmployeeById = async (userId, { signal } = {}) => {
  const response = await getCompanyEmployeeDetailService(userId, { signal });
  return mapEmployeeFromApi(response?.employee ?? response);
};

export const getAssignableCourses = async ({ signal } = {}) => {
  const response = await getAssignableCoursesService({ signal });
  const courses = response?.courses ?? [];

  return courses.map(mapAssignableCourseOption);
};

export const createEmployee = async (payload, { signal } = {}) => {
  const assignableCourses = await getAssignableCourses({ signal });
  const apiPayload = mapEmployeeFormToApiPayload(payload, {
    assignableCourses,
  });
  const response = await addCompanyEmployeeService(apiPayload, { signal });

  return {
    employee: mapEmployeeFromApi(response?.employee),
    emailSent: Boolean(response?.emailSent),
    assignedCoursesCount: response?.assignedCoursesCount ?? 0,
  };
};

export const updateEmployee = async (userId, payload, { signal } = {}) => {
  const assignableCourses = await getAssignableCourses({ signal });
  const apiPayload = mapEmployeeFormToUpdatePayload(payload, {
    assignableCourses,
    previousAssignedCourseId: payload.previousAssignedCourseId,
  });
  const response = await updateCompanyEmployeeService(userId, apiPayload, {
    signal,
  });

  return {
    employee: mapEmployeeFromApi(response?.employee),
    emailSent: Boolean(response?.emailSent),
    assignedCoursesCount: response?.assignedCoursesCount ?? 0,
  };
};

export const deleteEmployee = async (userId, { signal } = {}) =>
  removeCompanyEmployeeService(userId, { signal });

export const employeeService = {
  getEmployees,
  getEmployeeById,
  getAssignableCourses,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
