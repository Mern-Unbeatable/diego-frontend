import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_MIN_READ_SECS,
  MIN_WATCH_PERCENT,
  VIDEO_PROGRESS_SAVE_INTERVAL_MS,
} from '../features/learning/trackingConstants';

export const DOCUMENT_CONTENT_TYPES = ['PDF', 'FILE', 'WORD', 'EXCEL'];

export const useDocumentProgress = ({
  enabled = true,
  lessonId = null,
  durationSecs,
  initialWatchPercent = 0,
  initialLastPositionSecs = 0,
  paused = false,
  onSaveProgress,
}) => {
  const [watchPercent, setWatchPercent] = useState(initialWatchPercent);
  const [elapsedSecs, setElapsedSecs] = useState(initialLastPositionSecs);
  const activeTimeRef = useRef(initialLastPositionSecs);
  const lastTickRef = useRef(Date.now());
  const isVisibleRef = useRef(!document.hidden);
  const completedRef = useRef(initialWatchPercent >= MIN_WATCH_PERCENT);
  const savingRef = useRef(false);
  const mountedRef = useRef(true);
  const lessonIdRef = useRef(lessonId);
  const onSaveProgressRef = useRef(onSaveProgress);

  const requiredSecs = durationSecs && durationSecs > 0
    ? durationSecs
    : DEFAULT_MIN_READ_SECS;

  useEffect(() => {
    onSaveProgressRef.current = onSaveProgress;
  }, [onSaveProgress]);

  const computePercent = useCallback(() => {
    const spent = Math.round(activeTimeRef.current);
    return Math.min(100, Math.round((spent / requiredSecs) * 100));
  }, [requiredSecs]);

  const persistProgress = useCallback(async (forceComplete = false) => {
    if (!enabled || !mountedRef.current || !onSaveProgressRef.current || completedRef.current) {
      return;
    }
    if (savingRef.current || !lessonIdRef.current) return;

    const spent = Math.round(activeTimeRef.current);
    const percent = Math.min(100, Math.round((spent / requiredSecs) * 100));
    setElapsedSecs(spent);
    setWatchPercent((prev) => Math.max(prev, percent));

    const shouldComplete = forceComplete || percent >= MIN_WATCH_PERCENT;
    if (shouldComplete) {
      completedRef.current = true;
    }

    const trackingLessonId = lessonIdRef.current;
    savingRef.current = true;
    try {
      await onSaveProgressRef.current(trackingLessonId, {
        watchPercent: percent,
        lastPositionSecs: spent,
        timeSpentSecs: spent,
        completed: shouldComplete,
      });
    } catch (error) {
      if (!shouldComplete) {
        console.warn('Document progress save failed:', error?.message || error);
      }
    } finally {
      savingRef.current = false;
    }
  }, [enabled, requiredSecs]);

  useEffect(() => {
    const isNewLesson = lessonIdRef.current !== lessonId;
    lessonIdRef.current = lessonId;

    if (isNewLesson) {
      activeTimeRef.current = initialLastPositionSecs;
      completedRef.current = initialWatchPercent >= MIN_WATCH_PERCENT;
      setWatchPercent(initialWatchPercent);
      setElapsedSecs(initialLastPositionSecs);
    } else {
      activeTimeRef.current = Math.max(activeTimeRef.current, initialLastPositionSecs);
      completedRef.current = completedRef.current || initialWatchPercent >= MIN_WATCH_PERCENT;
      setWatchPercent((prev) => Math.max(prev, initialWatchPercent));
      setElapsedSecs((prev) => Math.max(prev, initialLastPositionSecs));
    }

    lastTickRef.current = Date.now();
  }, [lessonId, initialWatchPercent, initialLastPositionSecs]);

  useEffect(() => {
    mountedRef.current = true;

    if (!enabled) return () => {
      mountedRef.current = false;
    };

    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
      lastTickRef.current = Date.now();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const tickTimer = setInterval(() => {
      if (!mountedRef.current || !isVisibleRef.current || completedRef.current || paused) return;

      const now = Date.now();
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      if (delta > 0 && delta < 5) {
        activeTimeRef.current += delta;
        const percent = computePercent();
        setElapsedSecs(Math.round(activeTimeRef.current));
        setWatchPercent((prev) => Math.max(prev, percent));

        if (percent >= MIN_WATCH_PERCENT && !completedRef.current) {
          persistProgress(true);
        }
      }
    }, 1000);

    const saveTimer = setInterval(() => {
      persistProgress();
    }, VIDEO_PROGRESS_SAVE_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(tickTimer);
      clearInterval(saveTimer);
    };
  }, [enabled, paused, computePercent, persistProgress]);

  return {
    watchPercent,
    elapsedSecs,
    minWatchPercent: MIN_WATCH_PERCENT,
    requiredSecs,
    persistProgress,
  };
};
