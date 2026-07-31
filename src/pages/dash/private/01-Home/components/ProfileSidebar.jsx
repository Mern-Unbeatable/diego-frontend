import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const ProfileSidebar = ({ userName = '' }) => {
  const navigate = useNavigate();
  const displayName = userName || 'Corsista';

  const openProfilePage = () => {
    navigate('/dashboard/private-user/profile');
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center rounded-xl bg-white p-4 shadow-md sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex w-full justify-between gap-2 sm:mb-6">
          <h3 className="text-sm font-medium text-gray-700 sm:text-base">
            Il tuo profilo
          </h3>
        </div>

        <div className="flex w-full flex-row items-center gap-4 sm:flex-col sm:gap-0">
          <div className="relative shrink-0">
            <svg className="h-24 w-24 -rotate-90 transform sm:h-40 sm:w-40" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#73BFA1"
                strokeWidth="8"
                fill="none"
                strokeDasharray="440"
                strokeDashoffset="110"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center text-[#73BFA1] sm:h-24 sm:w-24">
                <FaUser className="h-8 w-8 sm:h-16 sm:w-16" />
              </div>
            </div>

            <div className="absolute top-1/2 right-2 bottom-auto z-10 -translate-y-1/2 transform sm:right-8 sm:bottom-24">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#73BFA1] text-xs font-semibold text-white shadow-md ring-2 ring-white sm:h-8 sm:w-8 sm:text-sm">
                1
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start sm:mt-0 sm:items-center sm:text-center">
            <p className="mb-3 truncate text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg">
              Ciao {displayName}
            </p>

            <button
              type="button"
              onClick={openProfilePage}
              className="w-full max-w-xs rounded-full bg-[#73BFA1] px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#5aa687] sm:px-6 sm:py-3 sm:text-base"
            >
              Il tuo profilo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
