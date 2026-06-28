import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { ROLES } from '../config/roles';

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
// COMPANY_EMPLOYEE
//==========================================================================
const FreelancerView = lazy(
  () => import('../pages/dash/freelancer/FreelancerView.jsx'),
);
const FreelancerAddCourse = lazy(
  () => import('../pages/dash/freelancer/components/FreelancerAddCource.jsx'),
);
const FreelancerTicket = lazy(
  () => import('../pages/dash/freelancer/components/FreelancerTicket.jsx'),
);
const EnrolledStudents = lazy(
  () => import('../pages/dash/freelancer/components/EnrolledStudents.jsx'),
);
const LicensePage = lazy(
  () => import('../pages/dash/freelancer/sections/License.jsx'),
);
const LicensePrivacyView = lazy(
  () => import('../pages/dash/freelancer/LicenPrivaceyView.jsx'),
);
const ReportPage = lazy(
  () => import('../pages/dash/freelancer/sections/Report.jsx'),
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
      { path: 'super-admin', element: <SuperAdminView /> },
      {
        path: 'super-admin/license-management',
        element: <LicenseManagementView />,
      },
      { path: 'super-admin/settings/*', element: <AdminSettingsDashboard /> },
      { path: 'super-admin/ticket', element: <TicketView /> },
      { path: 'super-admin/feedback', element: <FeedbackView /> },
      { path: 'super-admin/figures', element: <FiguresView /> },
      { path: 'super-admin/report', element: <AdminReportView /> },
    ],
  },

  {
    /** ✅ Company admin route group */
    id: 'COMPANY_ADMIN',
    roles: [ROLES.COMPANY_ADMIN],
    routes: [
      { path: 'company-admin', element: <CompanyHomeView /> },
      { path: 'company-admin/training', element: <CompanyTrainingView /> },
      {
        path: 'company-admin/training/courses/:courseId',
        element: <CompanyCourseRosterView />,
      },
      { path: 'company-admin/ticket', element: <CompanyTicketListView /> },
      { path: 'company-admin/ticket/new', element: <CompanyOpenTicketView /> },
      {
        path: 'company-admin/ticket/:ticketId',
        element: <CompanyTicketDetailView />,
      },
      {
        path: 'company-admin/certificates',
        element: <CompanyCertificatesView />,
      },
      {
        path: 'company-admin/privacy-policy',
        element: <CompanyPrivacyPolicyView />,
      },
      { path: 'company-admin/my-courses', element: <CompanyCourseList /> },
    ],
  },

  {
    /** ✅ Company employee route group */
    id: 'COMPANY_EMPLOYEE',
    roles: [ROLES.COMPANY_EMPLOYEE],
    routes: [{ path: 'company-employee', element: <CompanyCourseList /> }],
  },

  {
    /** ✅ License user route group */
    id: 'LICENSE_USER',
    roles: [ROLES.LICENSE_USER],
    routes: [
      { path: 'license-user', element: <FreelancerView /> },
      { path: 'license-user/license', element: <LicensePage /> },
      { path: 'license-user/license-privacy', element: <LicensePrivacyView /> },
      { path: 'license-user/license-report', element: <ReportPage /> },
      { path: 'license-user/enrolled-students', element: <EnrolledStudents /> },
      { path: 'license-user/course-list', element: <FreelancerAddCourse /> },
      { path: 'license-user/ticket', element: <FreelancerTicket /> },
    ],
  },

  {
    /** ✅ Private user route group */
    id: 'PRIVATE_USER',
    roles: [ROLES.PRIVATE_USER],
    routes: [
      { path: 'private-user', element: <StudentHomeView /> },
      { path: 'private-user/ticket', element: <SupportTicketView /> },
      {
        path: 'private-user/feedback',
        element: <SupportFeedbackView />,
      },
      { path: 'private-user/profile', element: <StudentProfileView /> },
      { path: 'private-user/credentials', element: <CredentialsView /> },
      { path: 'private-user/notifications', element: <NotificationsView /> },
      { path: 'private-user/certificates', element: <CertificatesView /> },
      { path: 'private-user/privacy-policy', element: <PrivacyPolicyView /> },
      { path: 'private-user/course', element: <CourseHomeView /> },
      { path: 'private-user/course/:id', element: <CourseDetailsView /> },
    ],
  },
];
