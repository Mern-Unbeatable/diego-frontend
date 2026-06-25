import { ROLES } from '../config/roles';

// ✅ super admin
import SuperAdminView from '../pages/dash/super/01-home/SuperAdminView.jsx';
import LicenseManagementView from '../pages/dash/super/02-License/LicenseManagementView.jsx';
import AdminSettingsDashboard from '../pages/dash/super/sections/AdminSettingsDashboard.jsx';
import FeedbackView from '../pages/dash/super/05-Feedback/FeedbackView.jsx';
import FigureAdminDashboard from '../pages/dash/super/sections/FigureAdminDashboard';
import TicketAdminDashboard from '../pages/dash/super/sections/TicketAdminDashboard';
import AdminReport from '../pages/dash/super/sections/AdminReport.jsx';

// ✅ freelancer
import FreelancerAddCource from '../pages/dash/freelancer/components/FreelancerAddCource.jsx';
import FreelancerTicket from '../pages/dash/freelancer/components/FreelancerTicket.jsx';
import EnrolledStudents from '../pages/dash/freelancer/components/EnrolledStudents.jsx';
import LicenPrivaceyView from '../pages/dash/freelancer/LicenPrivaceyView.jsx';
import FreelancerView from '../pages/dash/freelancer/FreelancerView';
import ReportDetail from '../pages/dash/freelancer/sections/ReportDetail';
import LicenView from '../pages/dash/freelancer/LicenPrivaceyView.jsx';
import License from '../pages/dash/freelancer/sections/License';
import Report from '../pages/dash/freelancer/sections/Report';

// ✅ Student Admin
import StudentHomeView from '../pages/dash/student/StudentHomeView.jsx';
import StudentIPofile from '../pages/dash/student/components/StudentIPofile.jsx';
import CertificatePage from '../pages/dash/student/components/CertificatePage.jsx';
import CredentialsReceived from '../pages/dash/student/CredentialsReceived.jsx';
import SupportFeedbackView from '../pages/dash/student/SupportFeedbackView.jsx';
import NotificationsView from '../pages/dash/student/NotificationsView.jsx';
import CourseContentView from '../pages/dash/student/CourseContentView.jsx';
import SupportTicketView from '../pages/dash/student/SupportTicketView.jsx';
import PrivacyPolicyView from '../pages/dash/student/PrivacyPolicyView.jsx';
import QuizesView from '../pages/dash/student/QuizesView.jsx';
import QuizResult from '../pages/dash/student/QuizResult.jsx';

// ✅ Company Admin
import CompanyHome from '../components/company/CompanyHome.jsx';
import CompanyCourseList from '../pages/dash/company/CompanyCourseList.jsx';
import CompanyTrainingView from '../pages/dash/company/CompanyTrainingView.jsx';
import CompanyCourseRosterView from '../pages/dash/company/CompanyCourseRosterView.jsx';
import CompanyTicketListView from '../pages/dash/company/CompanyTicketListView.jsx';
import CompanyOpenTicketView from '../pages/dash/company/CompanyOpenTicketView.jsx';
import CompanyTicketDetailView from '../pages/dash/company/CompanyTicketDetailView.jsx';
import CompanyCertificatesView from '../pages/dash/company/CompanyCertificatesView.jsx';
import CompanyPrivacyPolicyView from '../pages/dash/company/CompanyPrivacyPolicyView.jsx';

export const dashboardRoutes = [
  {
    //  ✅ Super Admins
    roles: [ROLES.SUPER_ADMIN],
    routes: [
      { path: 'super-admin', element: <SuperAdminView /> },
      {
        path: 'super-admin/gestione-licenze',
        element: <LicenseManagementView />,
      },
      {
        path: 'super-admin/impostazioni/*',
        element: <AdminSettingsDashboard />,
      },
      { path: 'super-admin/ticket', element: <TicketAdminDashboard /> },
      { path: 'super-admin/feedback', element: <FeedbackView /> },
      {
        path: 'super-admin/figura-previste',
        element: <FigureAdminDashboard />,
      },
      {
        path: 'super-admin/report',
        element: <AdminReport />,
      },
    ],
  },
  {
    //  ✅ Freelancers
    roles: [ROLES.LICENSE_USER],
    routes: [
      { path: 'license-user', element: <FreelancerView /> },
      { path: 'license-user-teacher', element: <FreelancerView /> },
      { path: 'license', element: <License /> },
      { path: 'license-privacy', element: <LicenPrivaceyView /> },
      { path: 'license-report', element: <Report /> },
      { path: 'enrolled-students', element: <EnrolledStudents /> },
      { path: 'course-list', element: <FreelancerAddCource /> },
      { path: 'ticket', element: <FreelancerTicket /> },
    ],
  },

  {
    //  ✅ Company Admins
    roles: [ROLES.COMPANY_ADMIN],
    routes: [
      { path: 'company-admin', element: <CompanyHome /> },
      {
        path: 'company-admin/gestisci-formazione',
        element: <CompanyTrainingView />,
      },
      {
        path: 'company-admin/gestisci-formazione/corsi/:courseId',
        element: <CompanyCourseRosterView />,
      },
      { path: 'company-admin/ticket', element: <CompanyTicketListView /> },
      {
        path: 'company-admin/ticket/nuovo',
        element: <CompanyOpenTicketView />,
      },
      {
        path: 'company-admin/ticket/:ticketId',
        element: <CompanyTicketDetailView />,
      },
      { path: 'company-admin/attestati', element: <CompanyCertificatesView /> },
      {
        path: 'company-admin/privacy-policy',
        element: <CompanyPrivacyPolicyView />,
      },
      { path: 'company-admin/my-courses', element: <CompanyCourseList /> },

      // Legacy aliases
      { path: 'company-admin-info', element: <CompanyTrainingView /> },
      { path: 'company-admin-teacher', element: <CompanyTrainingView /> },
      { path: 'company-admin-courses', element: <CompanyCourseRosterView /> },
      { path: 'company-admin-videos', element: <CompanyCertificatesView /> },
      { path: 'company-admin-settings', element: <CompanyPrivacyPolicyView /> },
    ],
  },
  {
    //  ✅ Company employees
    roles: [ROLES.COMPANY_EMPLOYEE],
    routes: [
      { path: 'company-admin/my-courses', element: <CompanyCourseList /> },
    ],
  },

  {
    //  ✅ Private Users
    roles: [ROLES.PRIVATE_USER],
    routes: [
      { path: 'private-user', element: <StudentHomeView /> },
      { path: 'private-user-ticket', element: <SupportTicketView /> },
      {
        path: 'private-user/ticket-feedback',
        element: <SupportFeedbackView />,
      },
      { path: 'private-user/profile', element: <StudentIPofile /> },
      { path: 'private-user/credentials', element: <CredentialsReceived /> },
      { path: 'private-user/notifications', element: <NotificationsView /> },
      { path: 'private-user/attestati', element: <CertificatePage /> },
      { path: 'private-user/privacy-policy', element: <PrivacyPolicyView /> },
      { path: 'private-user/course/:id', element: <CourseContentView /> },
    ],
  },
];
