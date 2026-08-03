import {
  FALLBACK_COURSE_IMAGE,
  isVideoUrl,
  resolveImageUrl,
} from '../../utils/courseMedia';

export default function CourseMedia({
  thumbnailUrl,
  videoUrl,
  alt = '',
  className = 'h-full w-full object-cover',
  showVideoControls = true,
}) {
  const resolvedImage = resolveImageUrl(thumbnailUrl);
  const hasVideo = isVideoUrl(videoUrl);
  const shouldShowVideo = hasVideo && (!thumbnailUrl || showVideoControls);

  if (shouldShowVideo) {
    return (
      <video
        src={videoUrl}
        poster={thumbnailUrl ? resolvedImage : undefined}
        controls={showVideoControls}
        className={className}
        playsInline
      >
        <track kind="captions" />
      </video>
    );
  }

  return (
    <img
      src={thumbnailUrl ? resolvedImage : FALLBACK_COURSE_IMAGE}
      alt={alt}
      className={className}
      onError={(event) => {
        const failedSrc =
          event.currentTarget.currentSrc || event.currentTarget.src;
        if (failedSrc === FALLBACK_COURSE_IMAGE) return;
        event.currentTarget.src = FALLBACK_COURSE_IMAGE;
      }}
    />
  );
}
