import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { IoMenu } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '../../ui';

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      {
        label: 'Seveso',
        dropdown: [
          {
            label: 'Corsi SEVESO',
            path: '/services/sev/sev-courses',
          },
        ],
      },
      {
        label: 'Sicurezza',
        dropdown: [
          {
            label: 'Servizio ASPP e RSPP',
            path: '/services/security/asp-service',
          },
          {
            label: 'Redazione DVR',
            path: '/services/security/dvr-editorial',
          },
          {
            label: 'Piani di emergenza',
            path: '/services/security/emergency-plans',
          },
          {
            label: 'Fulminazione',
            path: '/services/security/lightning',
          },
          {
            label: 'Legionella',
            path: '/services/security/legion',
          },
          {
            label: 'Potabilità acqua',
            path: '/services/safety/drinking-water',
          },
          {
            label: 'Radon',
            path: '/services/security/radon',
          },
          {
            label: 'Analisi di laboratorio',
            path: '/services/security/laboratory-analysis',
          },
          {
            label: 'Building management',
            path: '/services/security/building-management',
          },
        ],
      },
      {
        label: 'Ambiente',
        dropdown: [{ label: 'RENTRI', path: '/services/environment/rent' }],
      },
      {
        label: 'Videosorveglianza',
        dropdown: [
          {
            label: 'Gestione autorizzazione impianti',
            path: '/services/video/authorization',
          },
        ],
      },
      {
        label: 'Medicina del lavoro',
        dropdown: [
          {
            label: 'Incarichi medico competente',
            path: '/services/medicine/assignments',
          },
          {
            label: 'Gestione visite mediche',
            path: '/services/medicine-del/assignments',
          },
          {
            label: 'Analisi laboratorio',
            path: '/services/medicine-del/analysis',
          },
        ],
      },
      {
        label: 'Condominio',
        dropdown: [
          {
            label: 'Gestione immobiliare',
            path: '/services/condominium/management',
          },
        ],
      },
    ],
  },
  {
    label: 'Formazione',
    path: '/training',
    dropdown: [
      {
        label: 'La nostra piattaforma',
        dropdown: [
          { label: 'Come funziona', path: '/training/courses/how-it-works' },
        ],
      },
      {
        label: 'Corsi',
        dropdown: [
          {
            label: 'Corsi SEVESO',
            path: '/training/courses/our',
          },
          {
            label: 'Corsi obbligatori',
            path: '/training/courses/mandatory-courses',
          },
          {
            label: 'Catalogo',
            path: '/training/courses/catalog',
          },
        ],
      },
    ],
  },
  { label: 'Chi siamo', path: '/who_we_are' },
  { label: 'Collabora con noi', path: '/work_with_us' },
  { label: 'Contattaci', path: '/contact_us' },
];

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const isActive = (item) => {
    if (item.path === location.pathname) return true;
    if (item.dropdown) {
      return item.dropdown.some(
        (sub) =>
          sub.path === location.pathname ||
          (sub.dropdown &&
            sub.dropdown.some((deep) => deep.path === location.pathname)),
      );
    }
    return false;
  };

  return (
    <Container>
      <nav className="relative flex items-center py-4 sm:py-5 lg:py-6">
        {/* Logo */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-6 lg:gap-10">
          <Link to="/" className="min-w-0 shrink">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <img
                className="h-8 w-8 bg-cover object-contain text-[#46BB9D] sm:h-10 sm:w-10"
                src="/images/icons/title.png"
                alt="Home"
              />

              <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                UnoSicurezza
              </h1>
            </div>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden min-w-0 flex-1 justify-center xl:flex">
            <div className="flex items-center gap-3 xl:gap-6">
              {navItems.map((item, index) => (
                <div key={index} className="group relative">
                  {!item.dropdown ? (
                    <Link
                      to={item.path}
                      className={`border-b border-transparent text-sm font-semibold whitespace-nowrap transition-all duration-300 xl:text-base ${
                        isActive(item)
                          ? 'border-[#73BFA1] text-[#73BFA1]'
                          : 'text-[#252525] hover:border-[#63be9a]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-1 border-b border-transparent text-sm font-medium whitespace-nowrap transition-all duration-200 hover:border-[#73BFA1] xl:text-[15px] ${
                          isActive(item) ? 'text-[#73BFA1]' : 'text-gray-700'
                        }`}
                      >
                        <span>{item.label}</span>
                        <FaChevronDown
                          size={14}
                          className="transition-transform duration-200 group-hover:rotate-180"
                        />
                      </Link>

                      {/* ✅ Desktop dropdown (wider) */}
                      <div className="invisible absolute top-full z-50 mt-2 w-64 rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        {item.dropdown.map((sub, i) => (
                          <div key={i} className="group/sub relative">
                            {/* --- DESKTOP LINK/SPAN LOGIC --- */}
                            {sub.dropdown ? (
                              <span
                                className="flex cursor-default items-center justify-between px-4 py-2 text-base font-semibold text-gray-700 hover:bg-[#EAF5F1] hover:text-[#568F79]" // cursor-default added for visual cue
                              >
                                {sub.label}
                                <FaChevronDown
                                  size={12}
                                  className="ml-2 rotate-[-90deg] transition-transform group-hover/sub:rotate-0"
                                />
                              </span>
                            ) : (
                              <Link
                                to={sub.path}
                                className="flex items-center justify-between px-4 py-2 text-base font-semibold text-gray-700 hover:bg-[#EAF5F1] hover:text-[#568F79]"
                              >
                                {sub.label}
                              </Link>
                            )}
                            {/* --- END DESKTOP LINK/SPAN LOGIC --- */}

                            {sub.dropdown && (
                              <div className="invisible absolute top-0 left-full z-50 ml-1 w-64 rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover/sub:visible group-hover/sub:opacity-100">
                                {sub.dropdown.map((deep, j) => (
                                  <Link
                                    key={j}
                                    to={deep.path}
                                    className="block px-4 py-2 text-base font-semibold text-gray-700 hover:bg-[#EAF5F1] hover:text-[#568F79]"
                                  >
                                    {deep.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* --- E-Learning Button (Desktop) --- */}
          <div className="hidden shrink-0 xl:block">
            <Link
              to="/auth/register/choose-language"
              className="inline-block rounded-full bg-[#73BFA1] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white xl:px-8 xl:py-3 xl:text-base"
            >
              E-Learning
            </Link>
          </div>
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <div className="shrink-0 xl:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 p-2 text-gray-700"
          >
            {isMenuOpen ? <GrClose size={28} /> : <IoMenu size={28} />}
          </button>
        </div>

        {/* --- MOBILE MENU --- */}
        {isMenuOpen && (
          <div className="shadow-5xl absolute top-full right-0 left-0 z-99 max-h-[calc(100vh-5rem)] overflow-y-auto bg-white xl:hidden">
            <nav>
              <div className="flex flex-col space-y-3 px-1 pt-6 pb-6 sm:px-2">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {!item.dropdown ? (
                      <Link
                        to={item.path}
                        className={`block py-2 text-[15px] font-medium break-words ${
                          isActive(item) ? 'text-[#73BFA1]' : 'text-gray-700'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.path}
                            className={`flex-1 py-2 text-left text-[15px] font-medium break-words ${
                              isActive(item)
                                ? 'text-[#73BFA1]'
                                : 'text-gray-700'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === item.label ? null : item.label,
                              )
                            }
                          >
                            <FaChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${
                                openDropdown === item.label ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {openDropdown === item.label && (
                          <div className="mt-1 space-y-2 pl-4">
                            {item.dropdown.map((sub, i) => (
                              <div key={i}>
                                {/* --- MOBILE LINK/SPAN LOGIC --- */}
                                {sub.dropdown ? (
                                  <div className="flex items-center justify-between">
                                    <span
                                      className="block cursor-default rounded-sm py-1 pl-4 text-base font-semibold break-words duration-200 hover:bg-[#EAF5F1] hover:text-[#568F79]" // cursor-default added
                                    >
                                      {sub.label}
                                    </span>
                                  </div>
                                ) : (
                                  <Link
                                    to={sub.path}
                                    className="block rounded-sm py-1 pl-4 text-base font-semibold break-words duration-200 hover:bg-[#EAF5F1] hover:text-[#568F79]"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                )}
                                {/* --- END MOBILE LINK/SPAN LOGIC --- */}

                                {sub.dropdown && (
                                  <div className="mt-1 space-y-2 pl-4">
                                    {sub.dropdown.map((deep, j) => (
                                      <Link
                                        key={j}
                                        to={deep.path}
                                        className="block rounded-sm py-1 pl-4 text-base font-semibold break-words duration-200 hover:bg-[#EAF5F1] hover:text-[#568F79]"
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {deep.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <Link
                  to="/auth/UserLanguage"
                  className="mt-4 inline-block w-full rounded-full bg-[#5FD4C8] px-8 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-[#4fc4b8]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  E-Learning
                </Link>
              </div>
            </nav>
          </div>
        )}
      </nav>
    </Container>
  );
};

export default MainNavbar;
