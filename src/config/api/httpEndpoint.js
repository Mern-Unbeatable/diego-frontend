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
    REVIEWS: '/reviews',
    COURSES_PUBLIC: '/courses/public',
    COURSE_DETAILS: '/courses',
    COURSE_DETAILS_BY_SLUG: '/courses/slug',
    PAYMENTS_INTENT_COURSE: '/payments/intent/course',
    PAYMENTS_INTENT_COURSE_VERIFY: '/payments/intent/course/verify',
  },
  private: {
    MY_ENROLLMENTS: '/enrollments/my',
    MY_COURSE_PROGRESS: (courseId) => `/enrollments/my-progress/${courseId}`,
    MY_TICKETS: '/tickets/my',
    CREATE_TICKET: '/tickets',
    GET_TICKET_BY_ID: (ticketId) => `/tickets/${ticketId}`,
    NOTIFICATIONS: '/notifications',
    MARK_NOTIFICATIONS_READ: '/notifications/mark-read',
    MARK_ALL_NOTIFICATIONS_READ: '/notifications/mark-all-read',
    MY_CERTIFICATES: '/certificates/my',
    MY_PROFILE: '/users/me',
  },
  learning: {
    COURSE_BY_ID: (courseId) => `/courses/${courseId}`,
    LESSON_PROGRESS: (courseId) => `/courses/${courseId}/lessons/progress`,
    LESSON_BY_ID: (courseId, lessonId) =>
      `/courses/${courseId}/lessons/${lessonId}`,
    TRACK_LESSON_PROGRESS: (courseId, lessonId) =>
      `/courses/${courseId}/lessons/${lessonId}/progress`,
    LESSON_STATUS: (courseId, lessonId) =>
      `/courses/${courseId}/lessons/${lessonId}/status`,
    QUIZZES_AVAILABLE: (courseId) => `/quizzes/${courseId}/available`,
    QUIZ_MY_PROGRESS: (courseId) => `/quizzes/${courseId}/my-progress`,
    START_QUIZ: (courseId, quizId) =>
      `/quizzes/${courseId}/start-quiz/${quizId}`,
    SUBMIT_QUIZ: (courseId, quizId) => `/quizzes/${courseId}/submit/${quizId}`,
    SCORM_LAUNCH: '/scorm/launch',
    SCORM_COMMIT: '/scorm/commit',
    SCORM_FINISH: '/scorm/finish',
  },
};
