import { ROUTES } from '../../config/routes.js';

export const dashboardPath = {
  PLATFORM_ADMIN: ROUTES.PLATFORM_ADMIN.DASHBOARD,
  COMPANY_ADMIN: ROUTES.COMPANY_ADMIN.DASHBOARD,
  COMPANY_EMPLOYEE: ROUTES.COMPANY_EMPLOYEE.DASHBOARD,
  LICENSE_USER: ROUTES.LICENSE_USER.DASHBOARD,
  PRIVATE_USER: ROUTES.PRIVATE_USER.DASHBOARD,
};

export const getUserRole = (user) => {
  if (!user) return null;
  if (typeof user === 'string') return user;
  if (typeof user === 'object') return user.role || null;
  return null;
};

export const getDashboardPath = (role) => dashboardPath[role] || null;
