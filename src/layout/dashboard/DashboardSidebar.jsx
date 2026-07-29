import { Link, NavLink, useLocation } from 'react-router-dom';
import { LiaThumbsUp } from 'react-icons/lia';
import { BsUpload } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import {
  IoAlbumsOutline,
  IoBusinessOutline,
  IoCardOutline,
  IoChatbubbleOutline,
  IoDocumentTextOutline,
  IoHomeOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoRibbonOutline,
  IoSettingsOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { ROLES } from '../../config/roles';

import { useUIStore } from '../../features/zustand';
import { getUserRole } from '../../utils/auth/authUtils';

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
      path: '/dashboard/super-admin/inquiries',
      label: 'Richieste web',
      icon: <IoMailOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/figures',
      label: 'Figura previste LMS CSR 59',
      icon: <BsUpload className="text-[18px]" />,
    },
    {
      path: '/dashboard/super-admin/enrolled-students',
      label: 'Studenti iscritti',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/course-list',
      label: 'Corsi e pacchetti',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/course-packages',
      label: 'Pacchetti corso',
      icon: <IoAlbumsOutline className="text-[19px]" />,
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
      path: '/dashboard/company-admin/purchases',
      label: 'Pacchetti acquistati',
      icon: <IoBusinessOutline className="text-[19px]" />,
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
      label: 'I miei corsi',
      icon: <IoHomeOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-employee/credentials',
      label: 'Credenziali',
      icon: <IoLockClosedOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-employee/certificates',
      label: 'I tuoi attestati',
      icon: <IoRibbonOutline className="text-[19px]" />,
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
      label: 'Corsi e pacchetti',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/ticket',
      label: 'Ticket',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/report',
      label: 'Report',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/privacy-policy',
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
    // {
    //   path: '/dashboard/private-user/feedback',
    //   label: 'Feedback',
    //   icon: <IoChatbubbleOutline className="text-[19px]" />,
    // },
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
  const { isOpen, setActiveLink, closeSidebar } = useUIStore();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const role = getUserRole(user);
  const links = linksByRole[role] || [];

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeSidebar}
          aria-label="Chiudi menu"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[min(300px,88vw)] overflow-y-auto bg-white shadow-md transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative flex justify-center py-4 pr-10">
          <Link to="/" className="flex items-center" onClick={closeSidebar}>
            <img
              className="h-10 w-10 bg-cover object-contain"
              src="/images/icons/title.png"
              alt="UnoSicurezza Logo"
            />
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">UnoSicurezza</h1>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="absolute top-4 right-3 rounded-full p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Chiudi menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1.5 px-2 pb-6">
          {links.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setActiveLink(path)}
              end={
                path === '/dashboard/company-admin' ||
                path === '/dashboard/super-admin' ||
                path === '/dashboard/company-employee' ||
                path === '/dashboard/license-user' ||
                path === '/dashboard/private-user'
              }
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? 'bg-[#73bfa1] text-white'
                    : 'text-[#2f2f2f] hover:bg-[#f3f5f4]'
                }`
              }
            >
              <span className="shrink-0">{icon}</span>
              <span className="leading-snug">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;
