import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUser } from 'react-icons/fa';
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

const ProfileSidebar = ({ userName = '', avatar = null }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const displayName = userName || t('privateHome.profileTitle');
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const avatarBlobRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const loadAvatar = async () => {
      if (!avatar) {
        setAvatarPreviewUrl(null);
        setAvatarError(false);
        return;
      }

      try {
        const blobUrl = await fetchAvatarBlobUrl(avatar);

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
          setAvatarPreviewUrl(avatar);
          setAvatarError(false);
        }
      }
    };

    loadAvatar();

    return () => {
      cancelled = true;
    };
  }, [avatar]);

  useEffect(
    () => () => {
      if (avatarBlobRef.current) {
        URL.revokeObjectURL(avatarBlobRef.current);
        avatarBlobRef.current = null;
      }
    },
    [],
  );

  const showAvatarImage = Boolean(avatarPreviewUrl) && !avatarError;

  const openProfilePage = () => {
    navigate('/dashboard/private-user/profile');
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center rounded-xl bg-white p-4 shadow-md sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex w-full justify-between gap-2 sm:mb-6">
          <h3 className="text-sm font-medium text-gray-700 sm:text-base">
            {t('privateHome.profileTitle')}
          </h3>
        </div>

        <div className="flex w-full flex-row items-center gap-4 sm:flex-col sm:gap-0">
          <div className="relative shrink-0">
            {showAvatarImage ? (
              <div className="flex h-24 w-24 items-center justify-center sm:h-40 sm:w-40">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm sm:h-32 sm:w-32">
                  <img
                    src={avatarPreviewUrl}
                    alt={displayName}
                    className="h-full w-full rounded-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                </div>
              </div>
            ) : (
              <>
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
                  <div className="flex h-14 w-14 items-center justify-center sm:h-24 sm:w-24">
                    <FaUser className="h-8 w-8 text-[#73BFA1] sm:h-16 sm:w-16" />
                  </div>
                </div>

                <div className="absolute top-1/2 right-2 bottom-auto z-10 -translate-y-1/2 transform sm:right-8 sm:bottom-24">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#73BFA1] text-xs font-semibold text-white shadow-md ring-2 ring-white sm:h-8 sm:w-8 sm:text-sm">
                    1
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start sm:mt-0 sm:items-center sm:text-center">
            <p className="mb-3 truncate text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg">
              {t('privateHome.hello', { name: displayName })}
            </p>

            <button
              type="button"
              onClick={openProfilePage}
              className="w-full max-w-xs rounded-full bg-[#73BFA1] px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#5aa687] sm:px-6 sm:py-3 sm:text-base"
            >
              {t('privateHome.yourProfile')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
