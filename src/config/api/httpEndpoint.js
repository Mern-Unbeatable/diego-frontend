export const endpoints = {
  auth: {
    LOGIN: '/auth/signin',
    OTP_VERIFY: '/auth/verify-login-otp',
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
};
