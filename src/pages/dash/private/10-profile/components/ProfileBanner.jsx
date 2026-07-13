import React, { useState, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { FiEdit, FiCamera } from 'react-icons/fi';
import rightDownSideBg from '/image/student/ciao.png';

const ProfileBanner = ({ onEditClick }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  return (
    <div className="relative mb-10 h-44 w-full overflow-hidden rounded-2xl bg-[#73BFA1] text-white md:h-48">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Content layer */}
      <div className="flex h-full items-center gap-6 px-6 md:px-10">
        <div className="flex items-center gap-6">
          <div className="relative flex">
            {/* Avatar circle */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#73BFA1] md:h-36 md:w-36 overflow-hidden group transition-all duration-300 hover:scale-102"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar Preview"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full md:h-24 md:w-24">
                  <FaUser className="h-12 w-12 text-white md:h-16 md:w-16" />
                </div>
              )}
              {/* Optional hover overlay */}
           
            </div>

            {/* Camera badge overlapping bottom-right */}
            {/* <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#CCCCCC80] text-[#5C6E75] shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-[#EDE5FF] hover:text-black hover:scale-105 transition md:h-10 md:w-10"
            >
              <FiCamera className="text-sm md:text-base" />
            </button> */}
          </div>

          <div className="ml-4">
            <h2 className="mb-0 text-2xl font-semibold text-white md:text-4xl">
              Starriz.Clo
            </h2>
            <p className="text-sm text-white md:text-xl">starriz.clo</p>
          </div>
        </div>
      </div>

      {/* Edit icon (top-right) - opens modal */}
      <button
        onClick={onEditClick}
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
  );
};

export default ProfileBanner;
