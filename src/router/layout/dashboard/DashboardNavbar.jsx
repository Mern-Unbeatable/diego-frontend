import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Bell, Plus, Search, UserRound } from 'lucide-react';

const DashboardNavbar = () => {
  const location = useLocation();
  const isCompanyArea = location.pathname.startsWith('/dashboard/company-admin');

  return (
    <header className="sticky top-0 z-20 border-b border-[#ececec] bg-[#f7f7f7]/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="w-full text-center lg:w-auto lg:text-left">
          <span className="text-sm font-medium text-[#2a2a2a]">
            Stai cercando nuovi corsi?{' '}
          </span>
          <Link to="/" className="text-sm font-medium text-[#73bfa1] hover:underline">
            Esplora ora
          </Link>
        </div>

        {isCompanyArea ? (
          <Link
            to="/dashboard/company-admin/gestisci-formazione?addUser=1"
            className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#63a88c]"
          >
            <Plus size={16} />
            Aggiungi utente
          </Link>
        ) : (
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
            <button
              type="button"
              className="rounded-full bg-white p-2 text-[#414141] shadow-sm hover:bg-[#f0f0f0]"
              aria-label="Profile"
            >
              <UserRound size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
