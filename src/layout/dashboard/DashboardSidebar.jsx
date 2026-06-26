import { NavLink } from 'react-router-dom';
import { LiaThumbsUp } from 'react-icons/lia';
import { BsUpload } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import {
  IoAlbumsOutline,
  IoBusinessOutline,
  IoCardOutline,
  IoChatbubbleOutline,
  IoDocumentTextOutline,
  IoHomeOutline,
  IoLockClosedOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoRibbonOutline,
  IoSettingsOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { ROLES } from '../../config/roles';

import { useUIStore } from '../../features/zustand';
import { getUserRole } from '../../utils/authUtils';

const linksByRole = {
  [ROLES.PLATFORM_ADMIN]: [
    {
      path: '/dashboard/super-admin',
      label: 'Dashboard',
      icon: <IoHomeOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/license-management',
      label: 'Gestione licenze',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/settings',
      label: 'Impostazioni',
      icon: <IoSettingsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/ticket',
      label: 'Ticket',
      icon: <IoTicketOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/feedback',
      label: 'Feedback',
      icon: <LiaThumbsUp className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/figures',
      label: 'Figura previste LMS CSR 59',
      icon: <BsUpload className="text-[18px]" />,
    },
    {
      path: '/dashboard/super-admin/report',
      label: 'Report',
      icon: <BsUpload className="text-[18px]" />,
    },
  ],

  [ROLES.COMPANY_ADMIN]: [
    {
      path: '/dashboard/company-admin',
      label: 'Home',
      icon: <IoHomeOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-admin/training',
      label: 'Gestisci la formazione',
      icon: <IoBusinessOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-admin/certificates',
      label: 'I tuoi attestati',
      icon: <IoRibbonOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-admin/ticket',
      label: 'Ticket',
      icon: <IoTicketOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-admin/my-courses',
      label: 'I tuoi corsi',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-admin/privacy-policy',
      label: 'Privacy & policy',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
  ],

  [ROLES.COMPANY_EMPLOYEE]: [
    {
      path: '/dashboard/company-employee',
      label: 'Dashboard',
      icon: <IoHomeOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-employee/item-1',
      label: 'Item 1',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
  ],

  [ROLES.LICENSE_USER]: [
    {
      path: '/dashboard/license-user',
      label: 'Home',
      icon: <IoHomeOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/license',
      label: 'Licenze',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/enrolled-students',
      label: 'Studenti iscritti',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/course-list',
      label: 'Course List',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/ticket',
      label: 'Ticket',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/license-report',
      label: 'Report',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/license-privacy',
      label: 'Privacy & policy',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
  ],

  [ROLES.PRIVATE_USER]: [
    {
      path: '/dashboard/private-user',
      label: 'Dashboard',
      icon: <IoHomeOutline className="text-[19px]" />,
      end: true, // Exact match for root path
    },
    {
      path: '/dashboard/private-user/ticket',
      label: 'Support Tickets',
      icon: <IoTicketOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/private-user/feedback',
      label: 'Feedback',
      icon: <IoChatbubbleOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/private-user/profile',
      label: 'Profile',
      icon: <IoPersonOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/private-user/credentials',
      label: 'Credentials',
      icon: <IoCardOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/private-user/notifications',
      label: 'Notifications',
      icon: <IoNotificationsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/private-user/certificates',
      label: 'My Certificates',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/private-user/privacy-policy',
      label: 'Privacy Policy',
      icon: <IoLockClosedOutline className="text-[19px]" />,
    },
    // Note: '/dashboard/private-user/course/:id' is dynamic, so not added to sidebar
  ],
};

const DashboardSidebar = () => {
  const { setActiveLink } = useUIStore();
  const { user } = useSelector((state) => state.auth);
  const role = getUserRole(user);
  const links = linksByRole[role] || [];

  return (
    <aside className="fixed top-0 left-0 z-30 h-screen w-[300px] overflow-y-auto bg-white shadow-md">
      <div className="flex justify-center py-4">
        <div className="flex items-center">
          <img
            className="h-10 w-10 bg-cover object-contain"
            src="/images/icons/title.png"
            alt="UnoSicurezza Logo"
          />
          <h1 className="text-2xl font-bold text-gray-900">UnoSicurezza</h1>
        </div>
      </div>

      <nav className="space-y-1.5 px-2">
        {links.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setActiveLink(path)}
            end={
              path === '/dashboard/company-admin' ||
              path === '/dashboard/super-admin'
            }
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium ${
                isActive
                  ? 'bg-[#73bfa1] text-white'
                  : 'text-[#2f2f2f] hover:bg-[#f3f5f4]'
              }`
            }
          >
            <span>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
