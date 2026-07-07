import { lazy } from 'react';
import { ROLES } from '../config/roles.js';
import { ROUTES } from '../config/routes.js';

//==========================================================================
// SUPER_ADMIN
//==========================================================================
const SuperAdminView = lazy(
  () => import('../pages/dash/super/01-home/SuperAdminView.jsx'),
);
const LicenseManagementView = lazy(
  () => import('../pages/dash/super/02-License/LicenseManagementView.jsx'),
);
const AdminSettingsDashboard = lazy(
  () => import('../pages/dash/super/03-Settings/AdminSettingsDashboard.jsx'),
);
const TicketView = lazy(
  () => import('../pages/dash/super/04-Ticket/TicketView.jsx'),
);
const FeedbackView = lazy(
  () => import('../pages/dash/super/05-Feedback/FeedbackView.jsx'),
);
const FiguresView = lazy(
  () => import('../pages/dash/super/06-Figures/FiguresView.jsx'),
);
const AdminReportView = lazy(
  () => import('../pages/dash/super/07-Report/AdminReportView.jsx'),
);

//==========================================================================
// COMPANY_ADMIN
//==========================================================================
const CompanyHomeView = lazy(
  () => import('../pages/dash/company/01-Home/CompanyHomeView.jsx'),
);
const CompanyTrainingView = lazy(
  () => import('../pages/dash/company/02-Training/CompanyTrainingView.jsx'),
);
const CompanyCertificatesView = lazy(
  () =>
    import('../pages/dash/company/03-Certificates/CompanyCertificatesView.jsx'),
);
const CompanyTicketListView = lazy(
  () => import('../pages/dash/company/04-Ticket/CompanyTicketListView.jsx'),
);
const CompanyOpenTicketView = lazy(
  () => import('../pages/dash/company/04-Ticket/CompanyOpenTicketView.jsx'),
);
const CompanyTicketDetailView = lazy(
  () => import('../pages/dash/company/04-Ticket/CompanyTicketDetailView.jsx'),
);
const CompanyCourseList = lazy(
  () => import('../pages/dash/company/05-Courses/CompanyCourseList.jsx'),
);
const CompanyCourseRosterView = lazy(
  () => import('../pages/dash/company/05-Courses/CompanyCourseRosterView.jsx'),
);
const CompanyPrivacyPolicyView = lazy(
  () => import('../pages/dash/company/06-Privacy/CompanyPrivacyPolicyView.jsx'),
);

//==========================================================================
// LICENSE_USER
//==========================================================================
const LicenseHomeView = lazy(
  () => import('../pages/dash/license/01-Home/LicenseHomeView.jsx'),
);
const LicenseView = lazy(
  () => import('../pages/dash/license/02-License/LicenseView.jsx'),
);
const EnrolledView = lazy(
  () => import('../pages/dash/license/03-Enrolled/EnrolledView.jsx'),
);
const CourseListView = lazy(
  () => import('../pages/dash/license/04-CourseList/CourseListView.jsx'),
);
const LicenseTicketView = lazy(
  () => import('../pages/dash/license/05-Ticket/LicenseTicketView.jsx'),
);
const LicensePrivacyView = lazy(
  () => import('../pages/dash/license/07-PrivacyPolicy/LicensePrivacyView.jsx'),
);
const LicenseReportView = lazy(
  () => import('../pages/dash/license/06-Report/LicenseReportView.jsx'),
);

//==========================================================================
// PRIVATE_USER
//==========================================================================
const StudentHomeView = lazy(
  () => import('../pages/dash/private/01-Home/StudentHomeView.jsx'),
);
const StudentProfileView = lazy(
  () => import('../pages/dash/private/components/StudentProfileView.jsx'),
);
const CertificatesView = lazy(
  () => import('../pages/dash/private/07-MyCertificates/CertificatesView.jsx'),
);
const CredentialsView = lazy(
  () => import('../pages/dash/private/05-Credentials/CredentialsView.jsx'),
);
const SupportFeedbackView = lazy(
  () => import('../pages/dash/private/03-Feedback/SupportFeedbackView.jsx'),
);
const NotificationsView = lazy(
  () => import('../pages/dash/private/06-Notifications/NotificationsView.jsx'),
);
const SupportTicketView = lazy(
  () => import('../pages/dash/private/02-Tickets/SupportTicketView.jsx'),
);
const PrivacyPolicyView = lazy(
  () => import('../pages/dash/private/08-PrivacyPolicy/PrivacyPolicyView.jsx'),
);
const CourseDetailsView = lazy(
  () => import('../pages/dash/private/09-Course/CourseDetailsView.jsx'),
);
const CourseHomeView = lazy(
  () => import('../pages/dash/private/09-Course/CourseHomeView.jsx'),
);

/**
 * Dashboard routes for supported user roles.
 * Each role group contains its own route definitions and redirect aliases.
 *
 */
export const dashboardRoutes = [
  {
    /** ✅ Super admin route group */
    id: 'SUPER_ADMIN',
    roles: [ROLES.PLATFORM_ADMIN],
    routes: [
      { path: ROUTES.PLATFORM_ADMIN.DASHBOARD, element: <SuperAdminView /> },
      {
        path: ROUTES.PLATFORM_ADMIN.LICENSES,
        element: <LicenseManagementView />,
      },
      {
        path: ROUTES.PLATFORM_ADMIN.SETTINGS + '/*',
        element: <AdminSettingsDashboard />,
      },
      { path: ROUTES.PLATFORM_ADMIN.TICKETS, element: <TicketView /> },
      { path: ROUTES.PLATFORM_ADMIN.FEEDBACK, element: <FeedbackView /> },
      { path: ROUTES.PLATFORM_ADMIN.FIGURES, element: <FiguresView /> },
      { path: ROUTES.PLATFORM_ADMIN.REPORTS, element: <AdminReportView /> },
    ],
  },

  {
    /** ✅ Company admin route group */
    id: 'COMPANY_ADMIN',
    roles: [ROLES.COMPANY_ADMIN],
    routes: [
      { path: ROUTES.COMPANY_ADMIN.DASHBOARD, element: <CompanyHomeView /> },
      { path: ROUTES.COMPANY_ADMIN.TRAINING, element: <CompanyTrainingView /> },
      {
        path: `${ROUTES.COMPANY_ADMIN.TRAINING}/courses/:courseId`,
        element: <CompanyCourseRosterView />,
      },
      {
        path: ROUTES.COMPANY_ADMIN.TICKETS,
        element: <CompanyTicketListView />,
      },
      {
        path: `${ROUTES.COMPANY_ADMIN.TICKETS}/new`,
        element: <CompanyOpenTicketView />,
      },
      {
        path: `${ROUTES.COMPANY_ADMIN.TICKETS}/:ticketId`,
        element: <CompanyTicketDetailView />,
      },
      {
        path: ROUTES.COMPANY_ADMIN.CERTIFICATES,
        element: <CompanyCertificatesView />,
      },
      {
        path: ROUTES.COMPANY_ADMIN.PRIVACY,
        element: <CompanyPrivacyPolicyView />,
      },
      { path: ROUTES.COMPANY_ADMIN.COURSES, element: <CompanyCourseList /> },
    ],
  },

  {
    /** ✅ Company employee route group */
    id: 'COMPANY_EMPLOYEE',
    roles: [ROLES.COMPANY_EMPLOYEE],
    routes: [
      {
        path: ROUTES.COMPANY_EMPLOYEE.DASHBOARD,
        element: <CompanyCourseList />,
      },
    ],
  },

  {
    /** ✅ License user route group */
    id: 'LICENSE_USER',
    roles: [ROLES.LICENSE_USER],
    routes: [
      { path: ROUTES.LICENSE_USER.DASHBOARD, element: <LicenseHomeView /> },
      { path: ROUTES.LICENSE_USER.LICENSE, element: <LicenseView /> },
      { path: ROUTES.LICENSE_USER.STUDENTS, element: <EnrolledView /> },
      { path: ROUTES.LICENSE_USER.COURSES, element: <CourseListView /> },
      { path: ROUTES.LICENSE_USER.TICKETS, element: <LicenseTicketView /> },
      { path: ROUTES.LICENSE_USER.REPORTS, element: <LicenseReportView /> },
      { path: ROUTES.LICENSE_USER.PRIVACY, element: <LicensePrivacyView /> },
    ],
  },

  {
    /** ✅ Private user route group */
    id: 'PRIVATE_USER',
    roles: [ROLES.PRIVATE_USER],
    routes: [
      { path: ROUTES.PRIVATE_USER.DASHBOARD, element: <StudentHomeView /> },
      { path: ROUTES.PRIVATE_USER.TICKETS, element: <SupportTicketView /> },
      {
        path: ROUTES.PRIVATE_USER.FEEDBACK,
        element: <SupportFeedbackView />,
      },
      { path: ROUTES.PRIVATE_USER.PROFILE, element: <StudentProfileView /> },
      { path: ROUTES.PRIVATE_USER.CREDENTIALS, element: <CredentialsView /> },
      {
        path: ROUTES.PRIVATE_USER.NOTIFICATIONS,
        element: <NotificationsView />,
      },
      { path: ROUTES.PRIVATE_USER.CERTIFICATES, element: <CertificatesView /> },
      { path: ROUTES.PRIVATE_USER.PRIVACY, element: <PrivacyPolicyView /> },
      { path: ROUTES.PRIVATE_USER.COURSE, element: <CourseHomeView /> },
      {
        path: `${ROUTES.PRIVATE_USER.COURSE}/:id`,
        element: <CourseDetailsView />,
      },
    ],
  },
];
