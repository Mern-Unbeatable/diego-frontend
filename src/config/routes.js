import { ROLES } from './roles';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  STUDENT_DASHBOARD: '/student/dashboard',
  NOT_FOUND: '*',
};

export const ROLE_DASHBOARD_ROUTE = {
  [ROLES.SUPER_ADMIN]: '/super-admin',
  [ROLES.LICENSE_USER]: '/license-user',
  [ROLES.PRIVATE_USER]: '/private-user',
  [ROLES.COMPANY_ADMIN]: '/company-admin',
  [ROLES.COMPANY_EMPLOYEE]: '/company-user',
};
