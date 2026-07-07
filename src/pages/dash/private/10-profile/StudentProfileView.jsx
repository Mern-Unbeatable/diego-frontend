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
import StudentInfoModal from './components/modal/StudentInfoModal';
import ProfileBanner from './components/ProfileBanner';

const StudentProfileView = () => {
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
      <ProfileBanner onEditClick={() => setShowInfoModal(true)} />

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
                <div className="flex h-6 w-6 items-center justify-center text-lg text-gray-600">
                  {item.icon}
                </div>
                <span className="text-base font-medium text-[#252525] ">
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

export default StudentProfileView;
