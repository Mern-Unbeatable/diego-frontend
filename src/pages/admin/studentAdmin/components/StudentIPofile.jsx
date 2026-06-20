import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUser,
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
import { FiEdit } from 'react-icons/fi';
import StudentInfoModal from './modal/StudentInfoModal';
import rightDownSideBg from '/image/student/ciao.png';

const StudentIPofile = () => {
  const menu = [
    { id: 1, icon: <FaHome />, label: 'Home' },
    {
      id: 2,
      icon: <IoSettingsSharp />,
      label: 'Modifica informazioni personali',
    },
    { id: 3, icon: <FaKey />, label: 'Nuove credenziali ricevute' },
    { id: 4, icon: <FaShieldAlt />, label: 'Privacy & policy' },
    { id: 5, icon: <FaDownload />, label: 'I tuoi attestati' },
    { id: 6, icon: <FaListAlt />, label: 'Elenco dei certificati' },
    { id: 7, icon: <LuArrowLeftToLine />, label: 'Anteprima / Dettagli' },
    { id: 8, icon: <FaBell />, label: 'Notifiche' },
  ];

  const navigate = useNavigate();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleBack = () => {
    // navigate back to previous page in history
    navigate(-1);
  };

  return (
    <div className="">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          aria-label="Go back"
          title="Go back"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F9F6] shadow-sm hover:bg-gray-50"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
      </div>
      {/* Banner */}
      <div className="relative mb-10 h-44 w-full overflow-hidden rounded-2xl bg-[#73BFA1] text-white md:h-48">
        {/* Content layer - tightened spacing to match design */}
        <div className="flex h-full items-center gap-6 px-6 md:px-10">
          <div className="flex items-center gap-6">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/30 bg-[#73BFA1] md:h-36 md:w-36">
              <div className="flex h-20 w-20 items-center justify-center rounded-full md:h-24 md:w-24">
                <span className="sr-only">User avatar</span>
                <FaUser
                  className="h-12 w-12 text-[#17342e] md:h-16 md:w-16"
                  aria-hidden="true"
                />
              </div>

              {/* small notification badge overlapping bottom-right - scaled for tighter layout */}
              <div className="absolute right-3 bottom-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#73BFA1] md:h-10 md:w-10">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#17342e] text-xs font-semibold text-white md:h-9 md:w-9 md:text-xl">
                    1
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-4">
              <h2 className="mb-0 text-2xl font-semibold text-white md:text-4xl">
                Starriz.Clo
              </h2>
              <p className="text-sm text-white md:text-xl">starriz.clo</p>
            </div>
          </div>
        </div>
        {/* Edit icon (top-right) - green outlined square matching design; opens StudentInfoModal */}
        <button
          onClick={() => setShowInfoModal(true)}
          aria-label="Edit profile"
          title="Edit profile"
          className="absolute top-4 right-8 z-10 flex h-8 w-8 items-center justify-center md:top-6 md:right-38 md:h-9 md:w-9"
        >
          <FiEdit className="text-3xl text-white" />
        </button>

        {/* Background layer */}
        <div className="absolute top-9 -right-20 z-0">
          <img src={rightDownSideBg} alt="circleBg" />
        </div>
      </div>

      {/* Options list card */}
      <div className="rounded-xl border border-[#E6E6E6] bg-white p-4 shadow md:p-6">
        <div className="space-y-3">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                // go home dashboard
                if (item.id === 1) {
                  navigate('/dashboard/private-user');
                  return;
                }

                // open the user's StudentInfoModal when the second menu item is clicked
                if (item.id === 2) {
                  setShowInfoModal(true);
                  return;
                }

                // open the 'Nuove credenziali ricevute' page
                if (item.id === 3) {
                  navigate('/dashboard/private-user/credentials');
                  return;
                }

                // privacy and policy page
                if (item.id === 4) {
                  navigate('/dashboard/private-user/privacy-policy');
                  return;
                }

                // navigate to certificate page
                if (item.id === 5) {
                  navigate('/dashboard/private-user/attestati');
                  return;
                }

                // navigate to certificate page
                if (item.id === 6) {
                  navigate('/dashboard/private-user/attestati');
                  return;
                }

                // navigate to ticket details / conversation
                if (item.id === 7) {
                  navigate('/dashboard/private-user/ticket-feedback');
                  return;
                }

                // navigate to notifications
                if (item.id === 8) {
                  navigate('/dashboard/private-user/notifications');
                  return;
                }

                // fallback: for other items, we could navigate or perform actions
              }}
              className="flex w-full items-center justify-between rounded-lg border border-[#E6E6E6] px-4 py-3 transition hover:shadow-sm"
              aria-label={item.label}
            >
              <div className="flex items-center gap-3 text-gray-700">
                <div className="flex h-8 w-8 items-center justify-center text-lg text-gray-600">
                  {item.icon}
                </div>
                <span className="text-base font-medium text-[#252525] md:text-lg">
                  {item.label}
                </span>
              </div>

              <FaChevronRight className="text-sm text-[#1A1A1A]" />
            </button>
          ))}

          <div className="mt-4">
            <button className="flex w-full items-center rounded-lg border border-[#E6E6E6] px-5 py-2 text-left text-lg text-red-600">
              <IoIosLogOut className="mr-3 inline-block h-5 w-5" />
              Esci
            </button>
          </div>
        </div>
      </div>
      {/* Render user's StudentInfoModal when requested */}
      {showInfoModal && (
        <StudentInfoModal onClose={() => setShowInfoModal(false)} />
      )}
    </div>
  );
};

export default StudentIPofile;
