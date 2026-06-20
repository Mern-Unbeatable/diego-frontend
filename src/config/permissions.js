import { ROLES } from './roles';
import { ROUTES } from './routes';

export const PERMISSIONS = Object.freeze({
  [ROLES.ADMIN]: [ROUTES.ADMIN_DASHBOARD, ROUTES.DASHBOARD, ROUTES.HOME],
  [ROLES.STUDENT]: [ROUTES.STUDENT_DASHBOARD, ROUTES.DASHBOARD, ROUTES.HOME],
  [ROLES.TEACHER]: [ROUTES.HOME, ROUTES.DASHBOARD],
  [ROLES.GUEST]: [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER],
});

export const canAccess = (role, route) =>
  (PERMISSIONS[role] || []).includes(route);
