import { useCallback, useEffect, useRef, useState } from 'react';
import ScormPlayer from './ScormPlayer';
import CoursePlayerErrorBoundary from './CoursePlayerErrorBoundary';
import AntiCheatOverlay from './AntiCheatOverlay';
import YoutubePlayer from './YoutubePlayer';
import DocumentViewer from './DocumentViewer';
import { useAntiCheatGuard } from '../../hooks/useAntiCheatGuard';
import { useVideoProgress } from '../../hooks/useVideoProgress';
import { DOCUMENT_CONTENT_TYPES, useDocumentProgress } from '../../hooks/useDocumentProgress';

const LessonContent = ({
  course,
  lesson,
  moduleItem,
  enrollmentId,
  scormSession,
  lessonLoading,
  onTrackVideoProgress,
  onLaunchScorm,
  onScormComplete,
  onFinishScorm,
  onPollScormProgress,
  onLogAntiCheat,
  finishingScorm = false,
  scormHasNext = false,
  onScormGoNext,
}) => {
  const videoRef = useRef(null);
  const isLessonComplete = Boolean(moduleItem?.status === 'done');

  const { blocked, blockReason, resume } = useAntiCheatGuard({
    enabled: Boolean(enrollmentId && lesson?.id && !isLessonComplete),
    enrollmentId,
    lessonId: lesson?.id,
    onLogEvent: onLogAntiCheat,
  });

  const initialWatchPercent = moduleItem?.watchPercent ?? 0;
  const initialLastPositionSecs = moduleItem?.lastPositionSecs ?? 0;
  const durationSecs = lesson?.durationSecs ?? moduleItem?.durationSecs ?? null;

  const [youtubeWatchPercent, setYoutubeWatchPercent] = useState(initialWatchPercent);

  useEffect(() => {
    setYoutubeWatchPercent(initialWatchPercent);
  }, [lesson?.id, initialWatchPercent]);

  const handleTrackedProgress = useCallback(async (trackingLessonId, payload) => {
    if (!trackingLessonId) return null;
    if (payload?.watchPercent != null) {
      setYoutubeWatchPercent((prev) => Math.max(prev, payload.watchPercent));
    }
    return onTrackVideoProgress?.(trackingLessonId, payload);
  }, [onTrackVideoProgress]);

  const saveLessonProgress = useCallback(
    (payload) => handleTrackedProgress(lesson?.id, payload),
    [handleTrackedProgress, lesson?.id],
  );

  const { watchPercent: uploadWatchPercent, minWatchPercent } = useVideoProgress({
    enabled: Boolean(
      lesson?.id
      && enrollmentId
      && !isLessonComplete
      && lesson?.contentType === 'VIDEO_UPLOAD',
    ),
    videoRef,
    initialWatchPercent,
    initialLastPositionSecs,
    onSaveProgress: saveLessonProgress,
  });

  const {
    watchPercent: documentWatchPercent,
    elapsedSecs: documentElapsedSecs,
    minWatchPercent: documentMinPercent,
    requiredSecs: documentRequiredSecs,
  } = useDocumentProgress({
    enabled: Boolean(
      lesson?.id
      && enrollmentId
      && !isLessonComplete
      && DOCUMENT_CONTENT_TYPES.includes(lesson?.contentType),
    ),
    lessonId: lesson?.id ?? null,
    durationSecs,
    initialWatchPercent,
    initialLastPositionSecs,
    paused: blocked,
    onSaveProgress: handleTrackedProgress,
  });

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
  const isVideoLesson = ['VIDEO_UPLOAD', 'VIDEO_YOUTUBE'].includes(contentType);
  const isDocumentLesson = DOCUMENT_CONTENT_TYPES.includes(contentType);
  const isScormLesson = ['SCORM', 'SCORM_12'].includes(contentType);

  let body = null;

  if (isScormLesson) {
    body = (
      <ScormPlayer
        key={`scorm-${lesson.id}`}
        session={scormSession}
        enrollmentId={enrollmentId}
        lessonId={lesson.id}
        finishing={finishingScorm}
        hasNext={scormHasNext}
        onComplete={onScormComplete}
        onFinish={onFinishScorm}
        onGoNext={onScormGoNext}
        onPollProgress={onPollScormProgress}
      />
    );
  } else if (contentType === 'VIDEO_YOUTUBE') {
    body = (
      <YoutubePlayer
        key={`youtube-${lesson.id}`}
        lessonId={lesson.id}
        youtubeUrl={lesson.youtubeUrl}
        title={title}
        initialLastPositionSecs={initialLastPositionSecs}
        initialWatchPercent={initialWatchPercent}
        onProgressUpdate={handleTrackedProgress}
      />
    );
  } else if (contentType === 'VIDEO_UPLOAD') {
    body = (
      <div key={`video-${lesson.id}`} className="space-y-3">
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
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <div className="flex items-center justify-between gap-3">
            <span>Progresso visione</span>
            <span className="font-semibold text-[#1d1d1d]">{uploadWatchPercent}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[#55B18D] transition-all"
              style={{ width: `${uploadWatchPercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Guarda almeno il {minWatchPercent}% del video (senza saltare avanti) per
            completare la lezione. Se non completi la visione resta non vista.
          </p>
        </div>
      </div>
    );
  } else if (isDocumentLesson) {
    body = (
      <DocumentViewer
        key={`document-${lesson.id}`}
        title={title}
        contentUrl={lesson.contentUrl}
        contentType={contentType}
        watchPercent={documentWatchPercent}
        elapsedSecs={documentElapsedSecs}
        minWatchPercent={documentMinPercent}
        requiredSecs={documentRequiredSecs}
      />
    );
  } else {
    body = (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
        Formato lezione non supportato: {contentType}
      </div>
    );
  }

  return (
    <>
      <AntiCheatOverlay visible={blocked} message={blockReason} onResume={resume} />

      <CoursePlayerErrorBoundary resetKey={lesson?.id ?? 'empty'}>
        <div className="space-y-6">
          {body}

          <div>
            <h2 className="text-[22px] font-semibold text-[#1d1d1d]">{title}</h2>
            {course?.description ? (
              <p className="mt-3 text-base leading-relaxed text-[#5a5a5a]">
                {course.description}
              </p>
            ) : null}
          </div>
        </div>
      </CoursePlayerErrorBoundary>
    </>
  );
};

export default LessonContent;
