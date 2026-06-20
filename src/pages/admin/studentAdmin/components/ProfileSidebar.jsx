import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaUser } from 'react-icons/fa';

const ProfileSidebar = () => {
  const navigate = useNavigate();

  const openProfilePage = () => {
    // navigate to the student profile page registered at /private-user/profile
    navigate('/dashboard/private-user/profile');
  };

  return (
    <div className="top-6 flex h-full">
      <div className="flex h-full w-full flex-col items-center rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-6 flex w-full justify-between gap-2">
          <h3 className="text-base font-medium text-gray-700">
            Il tuo profilo
          </h3>
          <button type="button" className="rounded p-1 hover:bg-gray-100">
            <FaEdit className="text-sm text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <svg className="h-40 w-40 -rotate-90 transform">
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
              <div className="flex h-24 w-24 items-center justify-center text-[#73BFA1]">
                <FaUser className="h-16 w-16" />
              </div>
            </div>

            <div className="absolute top-1/2 right-8 bottom-24 z-20 -translate-y-1/2 transform">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#73BFA1] text-sm font-semibold text-white shadow-md ring-2 ring-white">
                1
              </div>
            </div>
          </div>

          <p className="mb-4 text-lg font-semibold text-gray-800">
            Ciao Prashant
          </p>

          <button
            type="button"
            onClick={openProfilePage}
            className="w-full transform rounded-full bg-[#73BFA1] px-6 py-3 font-medium text-white shadow-md transition hover:scale-105 hover:bg-[#5aa687]"
          >
            Il tuo profilo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
