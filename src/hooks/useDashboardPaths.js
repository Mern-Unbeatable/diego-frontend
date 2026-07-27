import { useMemo } from 'react';
import { ROUTES } from '../config/routes';
import { getDashboardPath } from '../utils/auth/authUtils';
import COOKIE_STORAGE from '../utils/cookies/cookieStorage';

export const useDashboardPaths = () => {
  const role = COOKIE_STORAGE.getUser();

  return useMemo(() => {
    const dashboard = getDashboardPath(role) || ROUTES.PRIVATE_USER.DASHBOARD;

    if (role === 'COMPANY_EMPLOYEE') {
      return {
        dashboard,
        course: ROUTES.COMPANY_EMPLOYEE.COURSE,
        certificates: ROUTES.COMPANY_EMPLOYEE.CERTIFICATES,
        credentials: ROUTES.COMPANY_EMPLOYEE.CREDENTIALS,
      };
    }

    return {
      dashboard,
      course: ROUTES.PRIVATE_USER.COURSE,
      certificates: ROUTES.PRIVATE_USER.CERTIFICATES,
      credentials: ROUTES.PRIVATE_USER.CREDENTIALS,
    };
  }, [role]);
};
