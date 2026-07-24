import { useEffect, useRef, useState } from 'react';
import ScormPlayer from './ScormPlayer';

const getYoutubeEmbedUrl = (url) => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`;
    }
    const videoId = parsed.searchParams.get('v');
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return url;
  } catch {
    return url;
  }
};

const LessonContent = ({
  course,
  lesson,
  moduleItem,
  scormSession,
  lessonLoading,
  onCompleteLesson,
  onLaunchScorm,
  onFinishScorm,
  finishingScorm = false,
}) => {
  const videoRef = useRef(null);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    if (!lesson?.id) return undefined;
    if (['SCORM', 'SCORM_12'].includes(lesson.contentType) && !scormSession) {
      onLaunchScorm?.(lesson.id);
    }
    return undefined;
  }, [lesson?.id, lesson?.contentType, onLaunchScorm, scormSession]);

  if (lessonLoading && !lesson) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl bg-gray-50 text-gray-500">
        Caricamento lezione...
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="space-y-4">
        <div className="aspect-video overflow-hidden rounded-2xl bg-gray-100">
          {course?.thumbnailUrl ? (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div>
          <h2 className="text-[22px] font-semibold text-[#1d1d1d]">{course?.title}</h2>
          <p className="mt-3 text-base leading-relaxed text-[#5a5a5a]">
            {course?.description}
          </p>
        </div>
      </div>
    );
  }

  const contentType = lesson.contentType;
  const title = lesson.title || moduleItem?.title || course?.title;

  const handleComplete = () => {
    const elapsedSecs = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
    onCompleteLesson?.(lesson.id, elapsedSecs);
  };

  let body = null;

  if (['SCORM', 'SCORM_12'].includes(contentType)) {
    body = (
      <ScormPlayer
        session={scormSession}
        finishing={finishingScorm}
        onFinish={(sessionId) => onFinishScorm?.(sessionId, 'completed')}
      />
    );
  } else if (contentType === 'VIDEO_YOUTUBE') {
    body = (
      <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
        <iframe
          title={title}
          src={getYoutubeEmbedUrl(lesson.youtubeUrl)}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else if (contentType === 'VIDEO_UPLOAD') {
    body = (
      <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
        <video
          ref={videoRef}
          src={lesson.contentUrl}
          controls
          className="h-full w-full bg-black"
        >
          <track kind="captions" />
        </video>
      </div>
    );
  } else if (['PDF', 'FILE', 'WORD', 'EXCEL'].includes(contentType)) {
    body = (
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lg">
        <iframe
          title={title}
          src={lesson.contentUrl}
          className="h-full w-full border-0"
        />
      </div>
    );
  } else {
    body = (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
        Formato lezione non supportato: {contentType}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {body}

      {!['SCORM', 'SCORM_12'].includes(contentType) ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleComplete}
            className="rounded-full bg-[#55B18D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#439678]"
          >
            Segna come completata
          </button>
        </div>
      ) : null}

      <div>
        <h2 className="text-[22px] font-semibold text-[#1d1d1d]">{title}</h2>
        {course?.description ? (
          <p className="mt-3 text-base leading-relaxed text-[#5a5a5a]">
            {course.description}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default LessonContent;
