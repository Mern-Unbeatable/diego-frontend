import { request } from '../../config/api/request';
import { endpoints } from '../../config/api/httpEndpoint';

const unwrap = (response) => response?.data ?? response;

export const getCompanyDashboardService = async (params = {}, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.DASHBOARD,
    params,
    signal,
  });
  return unwrap(response);
};

export const getCompanyCoursesService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.COURSES,
    signal,
  });
  return unwrap(response);
};

export const getCompanyProgressReportService = async (
  params = {},
  { signal } = {},
) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.PROGRESS_REPORT,
    params,
    signal,
  });
  return unwrap(response);
};

export const getCompanyCertificatesService = async (
  params = {},
  { signal } = {},
) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.CERTIFICATES,
    params,
    signal,
  });
  return unwrap(response);
};

export const downloadCompanyCertificateService = async (
  certificateId,
  { signal } = {},
) => {
  const response = await request({
    method: 'GET',
    url: endpoints.certificate.DOWNLOAD(certificateId),
    signal,
  });
  return unwrap(response);
};

export const getCompanyEmployeesService = async (params = {}, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.EMPLOYEES,
    params,
    signal,
  });
  return unwrap(response);
};

export const addCompanyEmployeeService = async (payload, { signal } = {}) => {
  const response = await request({
    method: 'POST',
    url: endpoints.company.EMPLOYEES,
    data: payload,
    signal,
  });
  return unwrap(response);
};

export const updateCompanyEmployeeService = async (
  userId,
  payload,
  { signal } = {},
) => {
  const response = await request({
    method: 'PATCH',
    url: endpoints.company.EMPLOYEE_BY_ID(userId),
    data: payload,
    signal,
  });
  return unwrap(response);
};

export const removeCompanyEmployeeService = async (userId, { signal } = {}) => {
  const response = await request({
    method: 'DELETE',
    url: endpoints.company.EMPLOYEE_BY_ID(userId),
    signal,
  });
  return unwrap(response);
};

export const getCompanyEmployeeDetailService = async (userId, { signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.EMPLOYEE_BY_ID(userId),
    signal,
  });
  return unwrap(response);
};

export const getAssignableCoursesService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.ASSIGNABLE_COURSES,
    signal,
  });
  return unwrap(response);
};

export const assignCoursesToEmployeeService = async (
  userId,
  payload,
  { signal } = {},
) => {
  const response = await request({
    method: 'POST',
    url: endpoints.company.ASSIGN_COURSES(userId),
    data: payload,
    signal,
  });
  return unwrap(response);
};

export const sendEnrollmentReminderService = async (
  enrollmentId,
  { signal } = {},
) => {
  const response = await request({
    method: 'POST',
    url: endpoints.company.ENROLLMENT_REMINDER(enrollmentId),
    signal,
  });
  return unwrap(response);
};

export const downloadEmployeeCertificateService = async (
  userId,
  certificateId,
  { signal } = {},
) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.CERTIFICATE_DOWNLOAD(userId, certificateId),
    signal,
  });
  return unwrap(response);
};

export const getMyProfileService = async ({ signal } = {}) => {
  const response = await request({
    method: 'GET',
    url: endpoints.company.MY_PROFILE,
    signal,
  });
  return unwrap(response);
};
