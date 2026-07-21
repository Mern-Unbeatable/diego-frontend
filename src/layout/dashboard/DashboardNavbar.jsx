import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Bell,
  Plus,
  Search,
  UserRound,
  LogOut,
  Settings,
  HelpCircle,
  User,
  ChevronDown,
} from 'lucide-react';
import COOKIE_STORAGE from '../../utils/cookies/cookieStorage';

const DashboardNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    COOKIE_STORAGE.clearAll();
    window.location.reload(); // Reload the page to reset the state
  };

  return (
    <header className="sticky top-0 z-20 border-b border-[#ececec] bg-[#f7f7f7]/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="w-full text-center lg:w-auto lg:text-left">
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

        <div className="flex items-center gap-2">
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
                  className="absolute right-0 z-[100] mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    {/* User Info */}
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-medium text-[#2a2a2a]">
                        John Doe
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        john.doe@email.com
                      </p>
                    </div>

                    {/* Menu Items - Static buttons */}
                    <button
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#2a2a2a] transition-colors hover:bg-[#f7f7f7]"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={18} />
                      Profile
                    </button>

                    <button
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#2a2a2a] transition-colors hover:bg-[#f7f7f7]"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings size={18} />
                      Settings
                    </button>

                    <button
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#2a2a2a] transition-colors hover:bg-[#f7f7f7]"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <HelpCircle size={18} />
                      Help & Support
                    </button>

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
