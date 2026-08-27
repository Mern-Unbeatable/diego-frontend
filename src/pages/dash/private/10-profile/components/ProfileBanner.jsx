import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Camera, Loader2 } from 'lucide-react';
import { FaUser } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import rightDownSideBg from '/image/student/ciao.png';
import { usePrivate } from '../../../../../features/private/privateHooks';
import { COOKIE_STORAGE } from '../../../../../utils/cookies/cookieStorage';

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

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
  const { t } = useTranslation();
  const { updateMyAvatar, avatarUploadLoading } = usePrivate();
  const [localAvatarUrl, setLocalAvatarUrl] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const avatarBlobRef = useRef(null);
  const localAvatarRef = useRef(null);
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

      if (localAvatarRef.current) {
        URL.revokeObjectURL(localAvatarRef.current);
        localAvatarRef.current = null;
      }
    },
    [],
  );

  const clearLocalAvatar = () => {
    if (localAvatarRef.current) {
      URL.revokeObjectURL(localAvatarRef.current);
      localAvatarRef.current = null;
    }

    setLocalAvatarUrl(null);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(t('privateProfile.avatarInvalidType'));
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      toast.error(t('privateProfile.avatarTooLarge'));
      return;
    }

    clearLocalAvatar();

    const previewUrl = URL.createObjectURL(file);
    localAvatarRef.current = previewUrl;
    setLocalAvatarUrl(previewUrl);
    setAvatarError(false);

    try {
      const response = await updateMyAvatar(file);
      clearLocalAvatar();
      toast.success(response?.message || t('privateProfile.avatarUploadSuccess'));
    } catch (error) {
      clearLocalAvatar();
      toast.error(error || t('privateProfile.avatarUploadError'));
    }
  };

  const showAvatarImage = Boolean(avatarPreviewUrl) && !avatarError;
  const isUploading = avatarUploadLoading;

  return (
    <div className="relative mb-4 h-auto min-h-36 w-full overflow-hidden rounded-xl bg-[#73BFA1] text-white sm:mb-6 sm:min-h-40 sm:rounded-2xl md:mb-8 md:min-h-44">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />

      <div className="relative z-10 flex h-full items-center gap-3 px-3 py-4 sm:gap-5 sm:px-6 sm:py-5 md:gap-6 md:px-10 md:py-6">
        <div className="relative shrink-0">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-[#5fad91] sm:h-24 sm:w-24 md:h-32 md:w-32">
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

            {isUploading ? (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/35">
                <Loader2 className="h-5 w-5 animate-spin text-white sm:h-6 sm:w-6" />
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            aria-label={t('privateProfile.changeAvatar')}
            title={t('privateProfile.changeAvatar')}
            className="absolute -right-0.5 -bottom-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-white text-[#4b5563] shadow-md transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:-right-1 sm:-bottom-1 sm:h-7 sm:w-7 md:h-8 md:w-8"
          >
            <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" strokeWidth={2.25} />
          </button>
        </div>

        <div className="min-w-0 flex-1 pr-8 sm:pr-10">
          <h2 className="truncate text-base font-semibold text-white sm:text-xl md:text-2xl lg:text-3xl">
            {profile?.fullName || t('privateProfile.profileFallback')}
          </h2>
          <p className="mt-0.5 truncate text-xs text-white/90 sm:text-sm md:text-base">
            {profile?.email || ''}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEditClick}
        aria-label={t('privateProfile.editProfile')}
        title={t('privateProfile.editProfile')}
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
