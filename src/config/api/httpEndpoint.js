export const endpoints = {
  auth: {
    LOGIN: '/auth/signin',
    VERIFY_LOGIN_OTP: '/auth/verify-login-otp',
    REGISTER: '/auth/register/start',
    VERIFY_REGISTER_OTP: '/auth/register/verify-otp',
    REGISTER_COMPLETE: '/auth/register/complete',
    REFRESH: '/auth/refresh',
  },
  admin: {
    GET_USER_QR_CODE: '/qr-cards/by-email',
    licence: {
      GET_ALL: '/licences',
      CREATE: '/licences/create',
    },
  },
  user: {
    SETTINGS: '/user/settings',
  },
  subscription: {
    GET_ALL: '/subscriptions',
    CREATE: '/subscriptions/create',
  },
  public: {
    CONTACTS: '/contacts',
    SERVICE_REQUESTS: '/service-requests',
  },
  private: {
    MY_ENROLLMENTS: '/enrollments/my',
    MY_TICKETS: '/tickets/my',
    CREATE_TICKET: '/tickets',
    GET_TICKET_BY_ID: (ticketId) => `/tickets/${ticketId}`,
    NOTIFICATIONS: '/notifications',
    MARK_NOTIFICATIONS_READ: '/notifications/mark-read',
    MARK_ALL_NOTIFICATIONS_READ: '/notifications/mark-all-read',
    MY_CERTIFICATES: '/certificates/my',
    MY_PROFILE: '/users/me',
  },
};
