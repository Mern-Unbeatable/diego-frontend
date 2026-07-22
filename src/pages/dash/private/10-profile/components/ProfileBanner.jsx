import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import rightDownSideBg from '/image/student/ciao.png';
import { COOKIE_STORAGE } from '../../../../../utils/cookies/cookieStorage';

const fetchAvatarBlobUrl = async (avatarUrl) => {
  const token = COOKIE_STORAGE.getToken();
  const response = await fetch(avatarUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error('Failed to load avatar');
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

const ProfileBanner = ({ profile, onEditClick }) => {
  const [localAvatarUrl, setLocalAvatarUrl] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const avatarBlobRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const loadAvatar = async () => {
      if (localAvatarUrl) {
        setAvatarPreviewUrl(localAvatarUrl);
        setAvatarError(false);
        return;
      }

      if (!profile?.avatar) {
        setAvatarPreviewUrl(null);
        setAvatarError(false);
        return;
      }

      try {
        const blobUrl = await fetchAvatarBlobUrl(profile.avatar);

        if (cancelled) {
          URL.revokeObjectURL(blobUrl);
          return;
        }

        if (avatarBlobRef.current) {
          URL.revokeObjectURL(avatarBlobRef.current);
        }

        avatarBlobRef.current = blobUrl;
        setAvatarPreviewUrl(blobUrl);
        setAvatarError(false);
      } catch {
        if (!cancelled) {
          setAvatarPreviewUrl(profile.avatar);
          setAvatarError(false);
        }
      }
    };

    loadAvatar();

    return () => {
      cancelled = true;
    };
  }, [profile?.avatar, localAvatarUrl]);

  useEffect(
    () => () => {
      if (avatarBlobRef.current) {
        URL.revokeObjectURL(avatarBlobRef.current);
        avatarBlobRef.current = null;
      }
    },
    [],
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLocalAvatarUrl(URL.createObjectURL(file));
      setAvatarError(false);
    }
  };

  const showAvatarImage = Boolean(avatarPreviewUrl) && !avatarError;

  return (
    <div className="relative mb-10 h-44 w-full overflow-hidden rounded-2xl bg-[#73BFA1] text-white md:h-48">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex h-full items-center gap-6 px-6 md:px-10">
        <div className="flex items-center gap-6">
          <div className="relative flex">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/30 bg-[#73BFA1] transition-all duration-300 hover:scale-102 md:h-36 md:w-36"
            >
              {showAvatarImage ? (
                <img
                  src={avatarPreviewUrl}
                  alt={profile?.fullName ?? 'Profile avatar'}
                  className="h-full w-full rounded-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full md:h-24 md:w-24">
                  <FaUser className="h-12 w-12 text-white md:h-16 md:w-16" />
                </div>
              )}
            </div>
          </div>

          <div className="ml-4">
            <h2 className="mb-0 text-2xl font-semibold text-white md:text-4xl">
              {profile?.fullName}
            </h2>
            <p className="text-sm text-white md:text-xl">{profile?.email}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onEditClick}
        aria-label="Edit profile"
        title="Edit profile"
        className="absolute top-4 right-8 z-10 flex h-8 w-8 items-center justify-center md:top-6 md:right-38 md:h-9 md:w-9"
      >
        <FiEdit className="text-3xl text-white" />
      </button>

      <div className="absolute top-9 -right-20 z-0">
        <img src={rightDownSideBg} alt="circleBg" />
      </div>
    </div>
  );
};

export default ProfileBanner;
