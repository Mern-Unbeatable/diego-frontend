import AdminSettingsDashboard from '../pages/admin/super/sections/AdminSettingsDashboard';
import FeedbackAdminDashboard from '../pages/admin/super/sections/FeedbackAdminDashboard';
import FigureAdminDashboard from '../pages/admin/super/sections/FigureAdminDashboard';
import TicketAdminDashboard from '../pages/admin/super/sections/TicketAdminDashboard';

import LicenseeSuperAdminDashboard from '../pages/admin/super/sections/LicenseManagementSuperAdmin';
import FreelancerView from '../pages/admin/freelancer/FreelancerView';
import ReportDetail from '../pages/admin/freelancer/sections/ReportDetail';
import License from '../pages/admin/freelancer/sections/License';
import SuperAdminView from '../pages/admin/super/SuperAdminView';
import Report from '../pages/admin/freelancer/sections/Report';

import StudentHomeView from '../pages/admin/studentAdmin/StudentHomeView.jsx';
import StudentIPofile from '../pages/admin/studentAdmin/components/StudentIPofile.jsx';
import CertificatePage from '../pages/admin/studentAdmin/components/CertificatePage.jsx';
import CredentialsReceived from '../pages/admin/studentAdmin/CredentialsReceived.jsx';

import SupportFeedbackView from '../pages/admin/studentAdmin/SupportFeedbackView.jsx';
import NotificationsView from '../pages/admin/studentAdmin/NotificationsView.jsx';
import CourseContentView from '../pages/admin/studentAdmin/CourseContentView.jsx';
import SupportTicketView from '../pages/admin/studentAdmin/SupportTicketView.jsx';

import QuizesView from '../pages/admin/studentAdmin/QuizesView.jsx';
import QuizResult from '../pages/admin/studentAdmin/QuizResult.jsx';
import PrivacyPolicyView from '../pages/admin/studentAdmin/PrivacyPolicyView.jsx';
import { ROLES } from '../config/roles';
import AdminReport from '../pages/admin/super/sections/AdminReport.jsx';
import CompanyHome from '../components/company/CompanyHome.jsx';
import CompanyTrainingView from '../pages/admin/company/CompanyTrainingView.jsx';
import CompanyCourseRosterView from '../pages/admin/company/CompanyCourseRosterView.jsx';
import CompanyTicketListView from '../pages/admin/company/CompanyTicketListView.jsx';
import CompanyOpenTicketView from '../pages/admin/company/CompanyOpenTicketView.jsx';
import CompanyTicketDetailView from '../pages/admin/company/CompanyTicketDetailView.jsx';
import CompanyCertificatesView from '../pages/admin/company/CompanyCertificatesView.jsx';
import CompanyPrivacyPolicyView from '../pages/admin/company/CompanyPrivacyPolicyView.jsx';
import LicenView from '../pages/admin/freelancer/LicenPrivaceyView.jsx';
import LicenPrivaceyView from '../pages/admin/freelancer/LicenPrivaceyView.jsx';
import FreelancerAddCource from '../pages/admin/freelancer/components/FreelancerAddCource.jsx';
import FreelancerTicket from '../pages/admin/freelancer/components/FreelancerTicket.jsx';
import EnrolledStudents from '../pages/admin/freelancer/components/EnrolledStudents.jsx';
import CompanyCourseList from '../pages/admin/company/CompanyCourseList.jsx';

export const dashboardRoutes = [
  {
    //  ✅ Super Admins
    roles: [ROLES.SUPER_ADMIN],
    routes: [
      { path: 'super-admin', element: <SuperAdminView /> },
      {
        path: 'super-admin/gestione-licenze',
        element: <LicenseeSuperAdminDashboard />,
      },
      {
        path: 'super-admin/impostazioni/*',
        element: <AdminSettingsDashboard />,
      },
      { path: 'super-admin/ticket', element: <TicketAdminDashboard /> },
      { path: 'super-admin/feedback', element: <FeedbackAdminDashboard /> },
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
      { path: 'company-admin/gestisci-formazione', element: <CompanyTrainingView /> },
      {
        path: 'company-admin/gestisci-formazione/corsi/:courseId',
        element: <CompanyCourseRosterView />,

      },
      { path: 'company-admin/ticket', element: <CompanyTicketListView /> },
      { path: 'company-admin/ticket/nuovo', element: <CompanyOpenTicketView /> },
      { path: 'company-admin/ticket/:ticketId', element: <CompanyTicketDetailView /> },
      { path: 'company-admin/attestati', element: <CompanyCertificatesView /> },
      { path: 'company-admin/privacy-policy', element: <CompanyPrivacyPolicyView /> },
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

      { path: 'company-admin/my-courses', element: <CompanyCourseList /> }
    ],
  },

  {
    //  ✅ Private Users
    roles: [ROLES.PRIVATE_USER],
    routes: [
      { path: 'private-user', element: <StudentHomeView /> },
      { path: 'private-user-ticket', element: <SupportTicketView /> },
      { path: 'private-user/ticket-feedback', element: <SupportFeedbackView /> },
      { path: 'private-user/profile', element: <StudentIPofile /> },
      { path: 'private-user/credentials', element: <CredentialsReceived /> },
      { path: 'private-user/notifications', element: <NotificationsView /> },
      { path: 'private-user/attestati', element: <CertificatePage /> },
      { path: 'private-user/privacy-policy', element: <PrivacyPolicyView /> },
      { path: 'private-user/course/:id', element: <CourseContentView /> },
    ],
  },
];

