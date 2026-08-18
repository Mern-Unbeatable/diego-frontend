import { useCallback, useEffect, useRef, useState } from 'react';
import {
  computePlayedWatchPercent,
  MAX_CONTINUOUS_PLAY_DELTA_SECS,
  MIN_WATCH_PERCENT,
  VIDEO_PROGRESS_SAVE_INTERVAL_MS,
} from '../features/learning/trackingConstants';

/**
 * Tracks real watch time (anti-seek). Seeking ahead does not count as watched.
 * Lesson completes only when played time reaches MIN_WATCH_PERCENT of duration.
 */
export const useVideoProgress = ({
  enabled = true,
  videoRef,
  resetKey = null,
  mediaReady = false,
  initialWatchPercent = 0,
  initialLastPositionSecs = 0,
  onSaveProgress,
}) => {
  const [watchPercent, setWatchPercent] = useState(initialWatchPercent);
  const [lastPositionSecs, setLastPositionSecs] = useState(initialLastPositionSecs);
  const playedSecsRef = useRef(0);
  const lastMediaTimeRef = useRef(0);
  const completedRef = useRef(initialWatchPercent >= MIN_WATCH_PERCENT);
  const watchPercentRef = useRef(initialWatchPercent);
  const savingRef = useRef(false);
  const mountedRef = useRef(true);
  const onSaveProgressRef = useRef(onSaveProgress);
  const initialWatchRef = useRef(initialWatchPercent);
  const initialPositionRef = useRef(initialLastPositionSecs);
  const seekAppliedRef = useRef(false);

  useEffect(() => {
    onSaveProgressRef.current = onSaveProgress;
  }, [onSaveProgress]);

  const persistProgress = useCallback(async (payload) => {
    if (!enabled || !mountedRef.current || !onSaveProgressRef.current) {
      return;
    }
    if (completedRef.current && !payload?.completed) {
      return;
    }
    if (savingRef.current) return;

    if (payload?.completed) {
      completedRef.current = true;
    }

    savingRef.current = true;
    try {
      await onSaveProgressRef.current(payload);
    } catch (error) {
      if (!payload?.completed) {
        console.warn('Video progress save failed:', error?.message || error);
      } else {
        completedRef.current = false;
      }
    } finally {
      savingRef.current = false;
    }
  }, [enabled]);

  useEffect(() => {
    initialWatchRef.current = initialWatchPercent;
    initialPositionRef.current = initialLastPositionSecs;
    completedRef.current = initialWatchPercent >= MIN_WATCH_PERCENT;
    watchPercentRef.current = initialWatchPercent;
    setWatchPercent(initialWatchPercent);
    setLastPositionSecs(initialLastPositionSecs);
    playedSecsRef.current = 0;
    lastMediaTimeRef.current = initialLastPositionSecs;
    seekAppliedRef.current = false;
    // Seed only when the lesson changes — progress saves must not reset playback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    mountedRef.current = true;

    if (!enabled || !videoRef?.current) {
      return () => {
        mountedRef.current = false;
      };
    }

    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (!mountedRef.current || !video.duration || video.duration <= 0) return;

      const current = video.currentTime;
      const duration = video.duration;
      const delta = current - lastMediaTimeRef.current;

      // Count only continuous playback; big jumps = seek (not watched).
      if (
        !video.paused
        && !video.seeking
        && delta > 0
        && delta <= MAX_CONTINUOUS_PLAY_DELTA_SECS
      ) {
        playedSecsRef.current += delta;
      }

      lastMediaTimeRef.current = current;

      const currentFloor = Math.floor(current);
      const percentFromPlayed = computePlayedWatchPercent(
        playedSecsRef.current,
        duration,
      );
      // Also honor server-restored progress so UI does not regress.
      const percent = Math.max(watchPercentRef.current, percentFromPlayed);

      setLastPositionSecs(currentFloor);
      setWatchPercent(percent);
      watchPercentRef.current = percent;

      if (percent >= MIN_WATCH_PERCENT && !completedRef.current) {
        persistProgress({
          watchPercent: Math.max(percent, MIN_WATCH_PERCENT),
          lastPositionSecs: currentFloor,
          timeSpentSecs: Math.round(playedSecsRef.current),
          completed: true,
        });
      }
    };

    const handleSeeking = () => {
      lastMediaTimeRef.current = video.currentTime;
    };

    const savePeriodic = () => {
      if (!mountedRef.current || !video.duration || video.duration <= 0 || completedRef.current) {
        return;
      }
      const current = Math.floor(video.currentTime);
      const percent = Math.max(
        watchPercentRef.current,
        computePlayedWatchPercent(playedSecsRef.current, video.duration),
      );
      persistProgress({
        watchPercent: percent,
        lastPositionSecs: current,
        timeSpentSecs: Math.round(playedSecsRef.current),
        completed: false,
      });
    };

    const handleLoaded = () => {
      const resumeAt = initialPositionRef.current;
      if (!seekAppliedRef.current && resumeAt > 0 && video.duration > resumeAt) {
        video.currentTime = resumeAt;
        lastMediaTimeRef.current = resumeAt;
        seekAppliedRef.current = true;
      }
      const restoredPercent = initialWatchRef.current;
      if (restoredPercent > 0 && playedSecsRef.current === 0) {
        playedSecsRef.current = (restoredPercent / 100) * video.duration;
      }
    };

    const handleEnded = () => {
      if (!video.duration || video.duration <= 0) return;
      // Ending the video only completes if enough real play time was accumulated.
      const percent = Math.max(
        watchPercentRef.current,
        computePlayedWatchPercent(playedSecsRef.current, video.duration),
      );
      setWatchPercent(percent);
      watchPercentRef.current = percent;

      if (percent >= MIN_WATCH_PERCENT && !completedRef.current) {
        persistProgress({
          watchPercent: Math.max(percent, MIN_WATCH_PERCENT),
          lastPositionSecs: Math.floor(video.duration),
          timeSpentSecs: Math.round(playedSecsRef.current),
          completed: true,
        });
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('ended', handleEnded);

    const saveTimer = setInterval(savePeriodic, VIDEO_PROGRESS_SAVE_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('ended', handleEnded);
      clearInterval(saveTimer);
    };
  }, [enabled, resetKey, mediaReady, persistProgress, videoRef]);

  return {
    watchPercent,
    lastPositionSecs,
    minWatchPercent: MIN_WATCH_PERCENT,
    persistProgress,
  };
};
