export const MIN_WATCH_PERCENT = 90;
export const DEFAULT_MIN_READ_SECS = 120;
export const VIDEO_PROGRESS_SAVE_INTERVAL_MS = 10000;
export const SCORM_POLL_INTERVAL_MS = 20000;
export const MOUSE_IDLE_MS = 5 * 60 * 1000;

export const ANTI_CHEAT_EVENTS = {
  MOUSE_IDLE: 'MOUSE_IDLE',
  TAB_CHANGE: 'TAB_CHANGE',
  WINDOW_BLUR: 'WINDOW_BLUR',
  FULLSCREEN_EXIT: 'FULLSCREEN_EXIT',
};

/** Short labels shown in admin training reports */
export const ANTI_CHEAT_EVENT_LABELS = {
  [ANTI_CHEAT_EVENTS.MOUSE_IDLE]: 'Inattività mouse (5+ minuti)',
  [ANTI_CHEAT_EVENTS.TAB_CHANGE]: 'Cambio scheda o applicazione',
  [ANTI_CHEAT_EVENTS.WINDOW_BLUR]: 'Uscita dalla piattaforma',
  [ANTI_CHEAT_EVENTS.FULLSCREEN_EXIT]: 'Uscita da schermo intero',
};

/** Full messages shown to students when a lesson session is blocked */
export const ANTI_CHEAT_BLOCK_MESSAGES = {
  [ANTI_CHEAT_EVENTS.MOUSE_IDLE]:
    'La sessione è stata sospesa perché non è stato rilevato movimento del mouse per 5 minuti.',
  [ANTI_CHEAT_EVENTS.TAB_CHANGE]:
    'La sessione è stata sospesa perché hai cambiato scheda o applicazione.',
  [ANTI_CHEAT_EVENTS.WINDOW_BLUR]:
    'La sessione è stata sospesa perché hai lasciato la piattaforma.',
  [ANTI_CHEAT_EVENTS.FULLSCREEN_EXIT]:
    'La sessione è stata sospesa perché hai chiuso la modalità schermo intero.',
};

export const getAntiCheatEventLabel = (eventType) =>
  ANTI_CHEAT_EVENT_LABELS[eventType] || eventType || 'Evento sconosciuto';

export const getAntiCheatBlockMessage = (eventType) =>
  ANTI_CHEAT_BLOCK_MESSAGES[eventType]
  || 'La sessione è stata sospesa per motivi di sicurezza del corso.';
