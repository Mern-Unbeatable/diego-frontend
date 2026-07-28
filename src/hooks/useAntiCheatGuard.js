import { useCallback, useEffect, useRef, useState } from 'react';
import { ANTI_CHEAT_EVENTS, MOUSE_IDLE_MS } from '../features/learning/trackingConstants';

const BLOCK_MESSAGES = {
  [ANTI_CHEAT_EVENTS.MOUSE_IDLE]: 'La sessione è stata sospesa perché non è stato rilevato movimento del mouse per 5 minuti.',
  [ANTI_CHEAT_EVENTS.TAB_CHANGE]: 'La sessione è stata sospesa perché hai cambiato scheda o applicazione.',
  [ANTI_CHEAT_EVENTS.WINDOW_BLUR]: 'La sessione è stata sospesa perché hai lasciato la piattaforma.',
  [ANTI_CHEAT_EVENTS.FULLSCREEN_EXIT]: 'La sessione è stata sospesa perché hai chiuso la modalità schermo intero.',
};

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

  const triggerBlock = useCallback(
    (eventType, metadata = {}) => {
      if (!enabled || blockedRef.current) return;
      blockedRef.current = true;
      setBlocked(true);
      setBlockReason(BLOCK_MESSAGES[eventType] ?? 'La sessione è stata sospesa.');

      if (enrollmentId && onLogEvent) {
        onLogEvent({
          enrollmentId,
          lessonId,
          eventType,
          metadata: {
            ...metadata,
            occurredAt: new Date().toISOString(),
          },
        }).catch(() => {});
      }
    },
    [enabled, enrollmentId, lessonId, onLogEvent],
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
        triggerBlock(ANTI_CHEAT_EVENTS.TAB_CHANGE, { hidden: true });
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
