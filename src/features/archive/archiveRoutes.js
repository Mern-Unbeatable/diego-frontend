import { ROUTES } from '../../config/routes';

export const resolveArchiveRoutes = (pathname = '') => {
  if (pathname.includes('/company-admin/')) {
    return {
      certificates: ROUTES.COMPANY_ADMIN.CERTIFICATES,
      archive: ROUTES.COMPANY_ADMIN.ARCHIVE,
    };
  }

  if (pathname.includes('/company-employee/')) {
    return {
      certificates: ROUTES.COMPANY_EMPLOYEE.CERTIFICATES,
      archive: ROUTES.COMPANY_EMPLOYEE.ARCHIVE,
    };
  }

  return {
    certificates: ROUTES.PRIVATE_USER.CERTIFICATES,
    archive: ROUTES.PRIVATE_USER.ARCHIVE,
  };
};
