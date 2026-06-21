import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../../features/zustand';
import {
  IoAlbumsOutline,
  IoBusinessOutline,
  IoDocumentTextOutline,
  IoHomeOutline,
  IoRibbonOutline,
  IoSettingsOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { LiaThumbsUp } from 'react-icons/lia';
import { BsUpload } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { ROLES } from '../../../config/roles';



const linksByRole = {
  [ROLES.PLATFORM_ADMIN]: [
    {
      path: '/dashboard/super-admin',
      label: 'Dashboard',
      icon: <IoHomeOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/gestione-licenze',
      label: 'Gestione licenze',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/super-admin/impostazioni',
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
      path: '/dashboard/super-admin/figura-previste',
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
      path: '/dashboard/company-admin/gestisci-formazione',
      label: 'Gestisci la formazione',
      icon: <IoBusinessOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-admin/attestati',
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
      path: '/dashboard/company-user',
      label: 'Dashboard',
      icon: <IoHomeOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/company-admin/my-courses',
      label: 'Courses',
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
      path: '/dashboard/license',
      label: 'Licenze',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },

    {
      path: '/dashboard/enrolled-students',
      label: 'Studenti iscritti',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/course-list',
      label: 'Course List',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/ticket',
      label: 'Ticket',
      icon: <IoDocumentTextOutline className="text-[19px]" />,
    },


    {
      path: '/dashboard/license-report',
      label: 'Report',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/license-privacy',
      label: 'Privacy & policy',
      icon: <IoAlbumsOutline className="text-[19px]" />,
    },
  ],

  [ROLES.PRIVATE_USER]: [
    {
      path: '/dashboard/private-user',
      label: 'Dashboard',
      icon: <IoHomeOutline className="text-[19px]" />,
    },
    {
      path: '/dashboard/private-user-ticket',
      label: 'Ticket',
      icon: <IoTicketOutline className="text-[19px]" />,
    },
  ],
};

const DashboardSidebar = () => {
  // DEV MODE: set true to test sidebar links without real login role.
  const DEV_BYPASS_AUTH = true;
  // Change this value to test another role quickly.
  const DEV_MANUAL_ROLE = ROLES.PLATFORM_ADMIN;

  const { setActiveLink } = useUIStore();
  const { user, tempRole } = useSelector((state) => state.auth);
  const roles = DEV_BYPASS_AUTH ? DEV_MANUAL_ROLE : tempRole || user?.role;
  const links = linksByRole[roles] || [];


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
            end={path === '/dashboard/company-admin' || path === '/dashboard/super-admin'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium ${isActive
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
