import { Link, NavLink, useLocation } from 'react-router-dom';
import { LiaThumbsUp } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import {
  IoAlbumsOutline,
  IoBarChartOutline,
  IoBookOutline,
  IoBusinessOutline,
  IoCardOutline,
  IoCartOutline,
  IoChatbubbleOutline,
  IoDocumentTextOutline,
  IoHomeOutline,
  IoKeyOutline,
  IoLayersOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoSettingsOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { ROLES } from '../../config/roles';

import { useUIStore } from '../../features/zustand';
import { getUserRole } from '../../utils/auth/authUtils';
import { useGetMyLicenseQuery } from '../../features/api/licenseUserApi';
import { LICENSE_EXPIRED_ALLOWED_PATHS } from '../../router/guards/LicenseGuard';

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
      icon: <IoKeyOutline className="text-[19px]" />,
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
      icon: <IoPeopleOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/enrolled-students',
      label: 'Studenti iscritti',
      icon: <IoSchoolOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/course-list',
      label: 'Corsi e pacchetti',
      icon: <IoBookOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/course-packages',
      label: 'Pacchetti corso',
      icon: <IoLayersOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/report',
      label: 'Report',
      icon: <IoBarChartOutline className="text-[19px]" />,
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
      icon: <IoSchoolOutline className="text-[19px]" />,
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
      icon: <IoBookOutline className="text-[19px]" />,
    },
    // {
    //   path: '/dashboard/company-admin/purchases',
    //   label: 'Pacchetti acquistati',
    //   icon: <IoCartOutline className="text-[19px]" />,
    // },
    {
      path: '/dashboard/company-admin/privacy-policy',
      label: 'Privacy & policy',
      icon: <IoLockClosedOutline className="text-[19px]" />,
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
      path: '/dashboard/license-user/report',
      label: 'Report',
      icon: <IoBarChartOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/license',
      label: 'Licenze',
      icon: <IoKeyOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/enrolled-students',
      label: 'Studenti iscritti',
      icon: <IoPeopleOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/course-list',
      label: 'Corsi e pacchetti',
      icon: <IoBookOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/ticket',
      label: 'Ticket',
      icon: <IoTicketOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-user/privacy-policy',
      label: 'Privacy & policy',
      icon: <IoLockClosedOutline className="text-[19px]" />,
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
      icon: <IoRibbonOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/private-user/privacy-policy',
      label: 'Privacy Policy',
      icon: <IoLockClosedOutline className="text-[19px]" />,
    },
    // Note: '/dashboard/private-user/course/:id' is dynamic, so not added to sidebar
  ],
};

const PRIVATE_USER_LABEL_KEYS = {
  '/dashboard/private-user': 'privateHome.sidebar.dashboard',
  '/dashboard/private-user/ticket': 'privateHome.sidebar.supportTickets',
  '/dashboard/private-user/profile': 'privateHome.sidebar.profile',
  '/dashboard/private-user/credentials': 'privateHome.sidebar.credentials',
  '/dashboard/private-user/notifications': 'privateHome.sidebar.notifications',
  '/dashboard/private-user/certificates': 'privateHome.sidebar.myCertificates',
  '/dashboard/private-user/privacy-policy': 'privateHome.sidebar.privacyPolicy',
};

const DashboardSidebar = () => {
  const { t } = useTranslation();
  const { isOpen, setActiveLink, closeSidebar } = useUIStore();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const role = getUserRole(user);
  const { data: license } = useGetMyLicenseQuery({}, {
    skip: role !== ROLES.LICENSE_USER,
  });
  const isLicenseBlocked =
    role === ROLES.LICENSE_USER &&
    (license?.status === 'expired' || license?.isExpired || license?.isSuspended);
  const allLinks = linksByRole[role] || [];
  const links = useMemo(() => {
    const filteredLinks = isLicenseBlocked
      ? allLinks.filter((link) => LICENSE_EXPIRED_ALLOWED_PATHS.includes(link.path))
      : allLinks;

    if (role !== ROLES.PRIVATE_USER) {
      return filteredLinks;
    }

    return filteredLinks.map((link) => ({
      ...link,
      label: PRIVATE_USER_LABEL_KEYS[link.path]
        ? t(PRIVATE_USER_LABEL_KEYS[link.path])
        : link.label,
    }));
  }, [allLinks, isLicenseBlocked, role, t]);

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
        className={`fixed top-0 left-0 z-50 h-screen w-[min(300px,88vw)] overflow-y-auto bg-white shadow-md transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
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
                `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium ${isActive
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
