export const dashboardPath = {
  PLATFORM_ADMIN: '/dashboard/super-admin',
  COMPANY_ADMIN: '/dashboard/company-admin',
  COMPANY_EMPLOYEE: '/dashboard/company-admin',
  LICENSE_USER: '/dashboard/license-user',
  PRIVATE_USER: '/dashboard/private-user',
};

export const getUserRole = (user) => {
  if (!user) return null;
  if (typeof user === 'string') return user;
  if (typeof user === 'object') return user.role || null;
  return null;
};

export const getDashboardPath = (role) => dashboardPath[role] || null;
