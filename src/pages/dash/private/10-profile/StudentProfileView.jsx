import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaKey,
  FaShieldAlt,
  FaDownload,
  FaListAlt,
  FaChevronRight,
  FaChevronLeft,
  FaBell,
} from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { LuArrowLeftToLine } from 'react-icons/lu';
import StudentInfoModal from './components/modal/StudentInfoModal';
import ProfileBanner from './components/ProfileBanner';
import Loading from '../../../../components/ui/Utilities/Loading';
import { ROUTES } from '../../../../config/routes';
import { logout } from '../../../../features/auth/authSlice';
import { usePrivate } from '../../../../features/private/privateHooks';

const menu = [
  {
    id: 1,
    icon: <FaHome />,
    label: 'Home',
    path: ROUTES.PRIVATE_USER.DASHBOARD,
  },
  {
    id: 2,
    icon: <IoSettingsSharp />,
    label: 'Modifica informazioni personali',
    action: 'edit-profile',
  },
  {
    id: 3,
    icon: <FaKey />,
    label: 'Nuove credenziali ricevute',
    path: ROUTES.PRIVATE_USER.CREDENTIALS,
  },
  {
    id: 4,
    icon: <FaShieldAlt />,
    label: 'Privacy & policy',
    path: ROUTES.PRIVATE_USER.PRIVACY,
  },
  {
    id: 5,
    icon: <FaDownload />,
    label: 'I tuoi attestati',
    path: ROUTES.PRIVATE_USER.CERTIFICATES,
  },
  {
    id: 6,
    icon: <FaListAlt />,
    label: 'Elenco dei certificati',
    path: ROUTES.PRIVATE_USER.CERTIFICATES,
  },
  {
    id: 7,
    icon: <LuArrowLeftToLine />,
    label: 'Anteprima / Dettagli',
    path: ROUTES.PRIVATE_USER.TICKETS,
  },
  {
    id: 8,
    icon: <FaBell />,
    label: 'Notifiche',
    path: ROUTES.PRIVATE_USER.NOTIFICATIONS,
  },
];

const StudentProfileView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { fetchMyProfile, profile, profileLoading, profileError } = usePrivate();

  useEffect(() => {
    fetchMyProfile().catch(() => {});
  }, [fetchMyProfile]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleMenuClick = (item) => {
    if (item.action === 'edit-profile') {
      setShowInfoModal(true);
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.COMMON.LOGIN);
  };

  if (profileLoading && !profile) {
    return <Loading size="md" className="min-h-60" />;
  }

  return (
    <div className="min-w-0 space-y-4 sm:space-y-5">
      <div>
        <button
          type="button"
          onClick={handleBack}
          aria-label="Torna indietro"
          title="Torna indietro"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F9F6] text-gray-600 shadow-sm hover:bg-[#e5f3ed]"
        >
          <FaChevronLeft className="text-sm" />
        </button>
      </div>

      {profileError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {profileError}
        </div>
      ) : null}

      <ProfileBanner
        profile={profile}
        onEditClick={() => setShowInfoModal(true)}
      />

      <div className="overflow-hidden rounded-xl border border-[#E6E6E6] bg-white p-3 shadow-sm sm:p-4 md:p-6">
        <div className="space-y-2 sm:space-y-2.5">
          {menu.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleMenuClick(item)}
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-[#E6E6E6] px-3 py-2.5 text-left transition hover:bg-gray-50 hover:shadow-sm sm:px-4 sm:py-3"
              aria-label={item.label}
            >
              <div className="flex min-w-0 items-center gap-2.5 text-gray-700 sm:gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F9F6] text-sm text-[#55B18D] sm:h-9 sm:w-9 sm:text-base">
                  {item.icon}
                </div>
                <span className="truncate text-sm font-medium text-[#252525] sm:text-base">
                  {item.label}
                </span>
              </div>

              <FaChevronRight className="shrink-0 text-xs text-[#1A1A1A] sm:text-sm" />
            </button>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-2.5 rounded-lg border border-red-100 px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 sm:mt-3 sm:gap-3 sm:px-4 sm:py-3 sm:text-base"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 sm:h-9 sm:w-9">
              <IoIosLogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            Esci
          </button>
        </div>
      </div>

      {showInfoModal ? (
        <StudentInfoModal
          profile={profile}
          onClose={() => setShowInfoModal(false)}
        />
      ) : null}
    </div>
  );
};

export default StudentProfileView;
