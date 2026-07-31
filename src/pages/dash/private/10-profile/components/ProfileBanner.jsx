import { useEffect, useRef, useState } from 'react';
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
    <div className="relative mb-4 h-auto min-h-36 w-full overflow-hidden rounded-xl bg-[#73BFA1] text-white sm:mb-6 sm:min-h-40 sm:rounded-2xl md:mb-8 md:min-h-44">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="relative z-10 flex h-full items-center gap-3 px-3 py-4 sm:gap-5 sm:px-6 sm:py-5 md:gap-6 md:px-10 md:py-6">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/30 bg-[#5fad91] transition hover:scale-[1.02] sm:h-24 sm:w-24 md:h-32 md:w-32"
          aria-label="Cambia avatar"
        >
          {showAvatarImage ? (
            <img
              src={avatarPreviewUrl}
              alt={profile?.fullName ?? 'Profile avatar'}
              className="h-full w-full rounded-full object-cover"
              onError={() => setAvatarError(true)}
            />
          ) : (
            <FaUser className="h-7 w-7 text-white sm:h-10 sm:w-10 md:h-14 md:w-14" />
          )}
        </button>

        <div className="min-w-0 flex-1 pr-8 sm:pr-10">
          <h2 className="truncate text-base font-semibold text-white sm:text-xl md:text-2xl lg:text-3xl">
            {profile?.fullName || 'Profilo'}
          </h2>
          <p className="mt-0.5 truncate text-xs text-white/90 sm:text-sm md:text-base">
            {profile?.email || ''}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEditClick}
        aria-label="Modifica profilo"
        title="Modifica profilo"
        className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 sm:top-4 sm:right-4 sm:h-9 sm:w-9 md:right-6"
      >
        <FiEdit className="text-base sm:text-lg" />
      </button>

      <div className="pointer-events-none absolute top-6 -right-16 z-0 hidden opacity-80 sm:block md:-right-12 lg:right-0">
        <img
          src={rightDownSideBg}
          alt=""
          className="h-28 w-auto md:h-36"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ProfileBanner;
