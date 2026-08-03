import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Bell,
  Search,
  UserRound,
  LogOut,
  Settings,
  HelpCircle,
  User,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { ROLES } from '../../config/roles';
import { ROUTES } from '../../config/routes';
import { canAccess } from '../../config/permissions';
import COOKIE_STORAGE from '../../utils/cookies/cookieStorage';
import { STORAGE } from '../../utils/storage/authStorage';
import { getUserRole } from '../../utils/auth/authUtils';
import { useUIStore } from '../../features/zustand';

const helpRouteByRole = {
  [ROLES.PLATFORM_ADMIN]: ROUTES.PLATFORM_ADMIN.TICKETS,
  [ROLES.COMPANY_ADMIN]: ROUTES.COMPANY_ADMIN.TICKETS,
  [ROLES.COMPANY_EMPLOYEE]: null,
  [ROLES.LICENSE_USER]: ROUTES.LICENSE_USER.TICKETS,
  [ROLES.PRIVATE_USER]: ROUTES.PRIVATE_USER.TICKETS,
};

const getDisplayName = (profile, fallbackRole) => {
  const firstName = profile?.firstName || profile?.givenName || '';
  const lastName = profile?.lastName || profile?.familyName || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

  return (
    fullName ||
    profile?.name ||
    profile?.fullName ||
    profile?.displayName ||
    profile?.email ||
    fallbackRole ||
    'Account'
  );
};

const getDisplayEmail = (profile) =>
  profile?.email || profile?.username || profile?.mail || '';

const DashboardNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openSidebar } = useUIStore();
  const { user } = useSelector((state) => state.auth);

  const role = getUserRole(user);
  const profile = COOKIE_STORAGE.getProfile() || STORAGE.getProfile() || null;
  const displayName = getDisplayName(profile, role);
  const displayEmail = getDisplayEmail(profile);

  const menuItems = [
    canAccess(role, ROUTES.PRIVATE_USER.PROFILE) && {
      label: 'Profile',
      to: ROUTES.PRIVATE_USER.PROFILE,
      icon: User,
    },
    canAccess(role, ROUTES.PLATFORM_ADMIN.SETTINGS) && {
      label: 'Settings',
      to: ROUTES.PLATFORM_ADMIN.SETTINGS,
      icon: Settings,
    },
    helpRouteByRole[role] &&
      canAccess(role, helpRouteByRole[role]) && {
        label: 'Help & Support',
        to: helpRouteByRole[role],
        icon: HelpCircle,
      },
  ].filter(Boolean);

  const handleLogout = () => {
    COOKIE_STORAGE.clearAll();
    STORAGE.clearAll();
    window.location.reload(); // Reload the page to reset the state
  };

  return (
    <header className="sticky top-0 z-20 border-b border-[#ececec] bg-[#f7f7f7]/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-16">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 lg:min-w-0 lg:flex-1">
          <button
            type="button"
            onClick={openSidebar}
            className="rounded-full bg-white p-2 text-[#414141] shadow-sm hover:bg-[#f0f0f0] lg:hidden"
            aria-label="Apri menu"
          >
            <Menu size={20} />
          </button>

          <div className="hidden min-w-0 text-left lg:block">
            <span className="text-sm font-medium text-[#2a2a2a]">
              Stai cercando nuovi corsi?{' '}
            </span>
            <Link
              to="/"
              className="text-sm font-medium text-[#73bfa1] hover:underline"
            >
              Esplora ora
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="rounded-full bg-white p-2 text-[#414141] shadow-sm hover:bg-[#f0f0f0]"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            className="rounded-full bg-white p-2 text-[#414141] shadow-sm hover:bg-[#f0f0f0]"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 rounded-full bg-white px-3 py-2 text-[#414141] shadow-sm transition-colors hover:bg-[#f0f0f0]"
              aria-label="Profile menu"
            >
              <UserRound size={18} />
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />

                {/* Dropdown */}
                <div
                  className="absolute right-0 z-100 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    {/* User Info */}
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-medium text-[#2a2a2a]">
                        {displayName}
                      </p>
                      {displayEmail ? (
                        <p className="truncate text-xs text-gray-500">
                          {displayEmail}
                        </p>
                      ) : null}
                    </div>

                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#2a2a2a] transition-colors hover:bg-[#f7f7f7]"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Icon size={18} />
                          {item.label}
                        </Link>
                      );
                    })}

                    <div className="border-t border-gray-100">
                      <button
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
