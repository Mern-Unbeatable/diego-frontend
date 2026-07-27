export const ROUTES = Object.freeze({
  COMMON: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
  },

  PLATFORM_ADMIN: {
    DASHBOARD: '/dashboard/super-admin',
    LICENSES: '/dashboard/super-admin/license-management',
    SETTINGS: '/dashboard/super-admin/settings',
    TICKETS: '/dashboard/super-admin/ticket',
    FEEDBACK: '/dashboard/super-admin/feedback',
    FIGURES: '/dashboard/super-admin/figures',
    REPORTS: '/dashboard/super-admin/report',
  },

  COMPANY_ADMIN: {
    DASHBOARD: '/dashboard/company-admin',
    TRAINING: '/dashboard/company-admin/training',
    CERTIFICATES: '/dashboard/company-admin/certificates',
    TICKETS: '/dashboard/company-admin/ticket',
    COURSES: '/dashboard/company-admin/my-courses',
    PRIVACY: '/dashboard/company-admin/privacy-policy',
  },

  COMPANY_EMPLOYEE: {
    DASHBOARD: '/dashboard/company-employee',
    COURSE: '/dashboard/company-employee/course',
    CERTIFICATES: '/dashboard/company-employee/certificates',
    CREDENTIALS: '/dashboard/company-employee/credentials',
  },

  LICENSE_USER: {
    DASHBOARD: '/dashboard/license-user',
    LICENSE: '/dashboard/license-user/license',
    STUDENTS: '/dashboard/license-user/enrolled-students',
    COURSES: '/dashboard/license-user/course-list',
    TICKETS: '/dashboard/license-user/ticket',
    REPORTS: '/dashboard/license-user/report',
    PRIVACY: '/dashboard/license-user/privacy-policy',
  },

  PRIVATE_USER: {
    DASHBOARD: '/dashboard/private-user',
    PROFILE: '/dashboard/private-user/profile',
    COURSE: '/dashboard/private-user/course',
    CERTIFICATES: '/dashboard/private-user/certificates',
    CREDENTIALS: '/dashboard/private-user/credentials',
    NOTIFICATIONS: '/dashboard/private-user/notifications',
    FEEDBACK: '/dashboard/private-user/feedback',
    TICKETS: '/dashboard/private-user/ticket',
    PRIVACY: '/dashboard/private-user/privacy-policy',
  },
});
