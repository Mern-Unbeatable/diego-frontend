import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ANTI_CHEAT_EVENTS,
  MOUSE_IDLE_MS,
  getAntiCheatBlockMessage,
} from '../features/learning/trackingConstants';

export const useAntiCheatGuard = ({
  enabled = true,
  enrollmentId,
  lessonId,
  onLogEvent,
}) => {
  const [blocked, setBlocked] = useState(false);
  const [blockReason, setBlockReason] = useState(null);
  const lastActivityRef = useRef(Date.now());
  const idleTimerRef = useRef(null);
  const blockedRef = useRef(false);
  const lessonIdRef = useRef(lessonId);

  const triggerBlock = useCallback(
    (eventType, metadata = {}) => {
      if (!enabled || blockedRef.current) return;
      blockedRef.current = true;

      window.requestAnimationFrame(() => {
        setBlocked(true);
        setBlockReason(getAntiCheatBlockMessage(eventType));
      });

      if (enrollmentId && onLogEvent) {
        onLogEvent({
          enrollmentId,
          lessonId: lessonIdRef.current,
          eventType,
          metadata: {
            ...metadata,
            occurredAt: new Date().toISOString(),
          },
        }).catch(() => {});
      }
    },
    [enabled, enrollmentId, onLogEvent],
  );

  const resume = useCallback(() => {
    blockedRef.current = false;
    setBlocked(false);
    setBlockReason(null);
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    blockedRef.current = blocked;
  }, [blocked]);

  useEffect(() => {
    lessonIdRef.current = lessonId;
    blockedRef.current = false;
    setBlocked(false);
    setBlockReason(null);
    lastActivityRef.current = Date.now();
  }, [lessonId]);

  useEffect(() => {
    if (!enabled) return undefined;

    const markActivity = () => {
      if (!blockedRef.current) {
        lastActivityRef.current = Date.now();
      }
    };

    const checkIdle = () => {
      if (blockedRef.current) return;
      const idleFor = Date.now() - lastActivityRef.current;
      if (idleFor >= MOUSE_IDLE_MS) {
        triggerBlock(ANTI_CHEAT_EVENTS.MOUSE_IDLE, { idleMs: idleFor });
      }
    };

    idleTimerRef.current = setInterval(checkIdle, 30000);

    const handleVisibility = () => {
      if (document.hidden) {
        window.setTimeout(() => {
          if (document.hidden) {
            triggerBlock(ANTI_CHEAT_EVENTS.TAB_CHANGE, { hidden: true });
          }
        }, 0);
      } else {
        lastActivityRef.current = Date.now();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        triggerBlock(ANTI_CHEAT_EVENTS.FULLSCREEN_EXIT);
      }
    };

    window.addEventListener('mousemove', markActivity);
    window.addEventListener('mousedown', markActivity);
    window.addEventListener('keydown', markActivity);
    window.addEventListener('scroll', markActivity, true);
    window.addEventListener('touchstart', markActivity);
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      window.removeEventListener('mousemove', markActivity);
      window.removeEventListener('mousedown', markActivity);
      window.removeEventListener('keydown', markActivity);
      window.removeEventListener('scroll', markActivity, true);
      window.removeEventListener('touchstart', markActivity);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [enabled, triggerBlock]);

  return {
    blocked,
    blockReason,
    resume,
  };
};
