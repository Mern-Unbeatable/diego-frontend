import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_MIN_READ_SECS,
  MIN_WATCH_PERCENT,
  VIDEO_PROGRESS_SAVE_INTERVAL_MS,
} from '../features/learning/trackingConstants';

export const DOCUMENT_CONTENT_TYPES = ['PDF', 'FILE', 'WORD', 'EXCEL'];

export const useDocumentProgress = ({
  enabled = true,
  durationSecs,
  initialWatchPercent = 0,
  initialLastPositionSecs = 0,
  onSaveProgress,
}) => {
  const [watchPercent, setWatchPercent] = useState(initialWatchPercent);
  const activeTimeRef = useRef(initialLastPositionSecs);
  const lastTickRef = useRef(Date.now());
  const isVisibleRef = useRef(!document.hidden);
  const saveTimerRef = useRef(null);
  const completedRef = useRef(initialWatchPercent >= MIN_WATCH_PERCENT);

  const requiredSecs = durationSecs && durationSecs > 0
    ? durationSecs
    : DEFAULT_MIN_READ_SECS;

  const computePercent = useCallback(() => {
    const spent = Math.round(activeTimeRef.current);
    return Math.min(100, Math.round((spent / requiredSecs) * 100));
  }, [requiredSecs]);

  const persistProgress = useCallback(
    async (forceComplete = false) => {
      if (!enabled || !onSaveProgress) return;

      const percent = computePercent();
      setWatchPercent((prev) => Math.max(prev, percent));
      const shouldComplete = forceComplete || percent >= MIN_WATCH_PERCENT;

      await onSaveProgress({
        watchPercent: percent,
        lastPositionSecs: Math.round(activeTimeRef.current),
        timeSpentSecs: Math.round(activeTimeRef.current),
        completed: shouldComplete,
      });

      if (shouldComplete) {
        completedRef.current = true;
      }
    },
    [enabled, onSaveProgress, computePercent],
  );

  useEffect(() => {
    completedRef.current = initialWatchPercent >= MIN_WATCH_PERCENT;
    setWatchPercent(initialWatchPercent);
    if (initialLastPositionSecs > 0) {
      activeTimeRef.current = initialLastPositionSecs;
    }
  }, [initialWatchPercent, initialLastPositionSecs]);

  useEffect(() => {
    if (!enabled) return undefined;

    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
      lastTickRef.current = Date.now();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const tickTimer = setInterval(() => {
      if (!isVisibleRef.current || completedRef.current) return;
      const now = Date.now();
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      if (delta > 0 && delta < 5) {
        activeTimeRef.current += delta;
        const percent = computePercent();
        setWatchPercent((prev) => Math.max(prev, percent));
        if (percent >= MIN_WATCH_PERCENT && !completedRef.current) {
          persistProgress(true);
        }
      }
    }, 1000);

    saveTimerRef.current = setInterval(() => {
      persistProgress();
    }, VIDEO_PROGRESS_SAVE_INTERVAL_MS);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(tickTimer);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
      persistProgress();
    };
  }, [enabled, computePercent, persistProgress]);

  return {
    watchPercent,
    minWatchPercent: MIN_WATCH_PERCENT,
    requiredSecs,
    persistProgress,
  };
};
