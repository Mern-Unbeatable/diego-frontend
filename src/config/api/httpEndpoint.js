export const endpoints = {
  auth: {
    LOGIN: '/auth/login',
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
