import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { PiNoteLight } from 'react-icons/pi';
import { TfiHome } from 'react-icons/tfi';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinksData = [
  { name: 'Home', icon: <TfiHome />, path: '/level-four/home' },
  {
    name: 'Gestisci la formazione',
    icon: <FaUsers />,
    path: '/level-four/gestisci-la',
  },
  {
    name: 'I tuoi attestati',
    icon: <PiNoteLight />,
    path: '/level-four/attestati',
  },
];

const SuperAdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* Mobile Top Bar */}
      <div className="fixed z-50 flex w-full items-center justify-between bg-white px-4 py-3 shadow lg:hidden">
        <a href="/">
          <div className="h-10 w-50">
            <img
              src="./image/icon/logo.jpg"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-gray-950"
        >
          {isOpen ? (
            <FiX className="h-7 w-7" />
          ) : (
            <FiMenu className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-[#ffffff] text-gray-950 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between bg-white p-4">
          <a href="/">
            <div className="h-10 w-50">
              <img
                src="./image/icon/logo.jpg"
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 flex flex-col">
          {navLinksData.map((link) => (
            <a
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
              className={`relative flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                isActive(link.path)
                  ? 'bg-[#73BFA1] font-semibold text-white'
                  : 'font-medium text-[#4A4A4A] hover:text-[#000044]'
              }`}
            >
              {/* Icon */}
              <span className="flex h-8 w-8 items-center justify-center text-3xl text-inherit">
                {link.icon}
              </span>

              {/* Label */}
              <span className="whitespace-nowrap">{link.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SuperAdminSidebar;
