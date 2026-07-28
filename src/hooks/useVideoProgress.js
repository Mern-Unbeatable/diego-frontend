import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MIN_WATCH_PERCENT,
  VIDEO_PROGRESS_SAVE_INTERVAL_MS,
} from '../features/learning/trackingConstants';

export const useVideoProgress = ({
  enabled = true,
  videoRef,
  initialWatchPercent = 0,
  initialLastPositionSecs = 0,
  onSaveProgress,
}) => {
  const [watchPercent, setWatchPercent] = useState(initialWatchPercent);
  const [lastPositionSecs, setLastPositionSecs] = useState(initialLastPositionSecs);
  const activeTimeRef = useRef(0);
  const completedRef = useRef(initialWatchPercent >= MIN_WATCH_PERCENT);
  const watchPercentRef = useRef(initialWatchPercent);

  const persistProgress = useCallback(
    async (payload) => {
      if (!enabled || !onSaveProgress) return;
      await onSaveProgress(payload);
      if (payload?.completed) {
        completedRef.current = true;
      }
    },
    [enabled, onSaveProgress],
  );

  useEffect(() => {
    completedRef.current = initialWatchPercent >= MIN_WATCH_PERCENT;
    watchPercentRef.current = initialWatchPercent;
    setWatchPercent(initialWatchPercent);
    setLastPositionSecs(initialLastPositionSecs);
    if (initialLastPositionSecs > 0) {
      activeTimeRef.current = initialLastPositionSecs;
    }
  }, [initialWatchPercent, initialLastPositionSecs]);

  useEffect(() => {
    if (!enabled || !videoRef?.current) return undefined;

    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (!video.duration || video.duration <= 0) return;
      const current = Math.floor(video.currentTime);
      const percent = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
      setLastPositionSecs(current);
      setWatchPercent((prev) => {
        const next = Math.max(prev, percent);
        watchPercentRef.current = next;
        return next;
      });
      activeTimeRef.current = Math.max(activeTimeRef.current, current);

      if (percent >= MIN_WATCH_PERCENT && !completedRef.current) {
        persistProgress({
          watchPercent: percent,
          lastPositionSecs: current,
          timeSpentSecs: current,
          completed: true,
        });
      }
    };

    const savePeriodic = () => {
      if (!video.duration || video.duration <= 0 || completedRef.current) return;
      const current = Math.floor(video.currentTime);
      const percent = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
      activeTimeRef.current = Math.max(activeTimeRef.current, current);
      persistProgress({
        watchPercent: percent,
        lastPositionSecs: current,
        timeSpentSecs: activeTimeRef.current,
        completed: false,
      });
    };

    const handleLoaded = () => {
      if (initialLastPositionSecs > 0 && video.duration > initialLastPositionSecs) {
        video.currentTime = initialLastPositionSecs;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoaded);

    const saveTimer = setInterval(savePeriodic, VIDEO_PROGRESS_SAVE_INTERVAL_MS);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoaded);
      clearInterval(saveTimer);
      if (activeTimeRef.current > 0 || video.currentTime > 0) {
        persistProgress({
          watchPercent: watchPercentRef.current,
          lastPositionSecs: Math.floor(video.currentTime || 0),
          timeSpentSecs: activeTimeRef.current,
          completed: completedRef.current,
        });
      }
    };
  }, [enabled, videoRef, initialLastPositionSecs, persistProgress]);

  return {
    watchPercent,
    lastPositionSecs,
    minWatchPercent: MIN_WATCH_PERCENT,
    persistProgress,
  };
};
