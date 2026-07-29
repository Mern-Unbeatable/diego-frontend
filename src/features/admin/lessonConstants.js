export const LESSON_CONTENT_TYPES = {
  SCORM: 'SCORM',
  SCORM_12: 'SCORM_12',
  PDF: 'PDF',
  WORD: 'WORD',
  EXCEL: 'EXCEL',
  VIDEO_UPLOAD: 'VIDEO_UPLOAD',
  VIDEO_YOUTUBE: 'VIDEO_YOUTUBE',
  FILE: 'FILE',
};

export const LESSON_CONTENT_OPTIONS = [
  { value: LESSON_CONTENT_TYPES.VIDEO_YOUTUBE, label: 'Video YouTube' },
  { value: LESSON_CONTENT_TYPES.VIDEO_UPLOAD, label: 'Video caricato' },
  { value: LESSON_CONTENT_TYPES.PDF, label: 'PDF' },
  { value: LESSON_CONTENT_TYPES.WORD, label: 'Word' },
  { value: LESSON_CONTENT_TYPES.EXCEL, label: 'Excel' },
  { value: LESSON_CONTENT_TYPES.SCORM_12, label: 'SCORM 1.2' },
  { value: LESSON_CONTENT_TYPES.SCORM, label: 'SCORM 2004' },
  { value: LESSON_CONTENT_TYPES.FILE, label: 'File generico' },
];

export const LESSON_CONTENT_TYPE_LABELS = LESSON_CONTENT_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});

export const SCORM_CONTENT_TYPES = [
  LESSON_CONTENT_TYPES.SCORM,
  LESSON_CONTENT_TYPES.SCORM_12,
];

export const FILE_UPLOAD_CONTENT_TYPES = [
  LESSON_CONTENT_TYPES.PDF,
  LESSON_CONTENT_TYPES.WORD,
  LESSON_CONTENT_TYPES.EXCEL,
  LESSON_CONTENT_TYPES.VIDEO_UPLOAD,
  LESSON_CONTENT_TYPES.FILE,
];

export const LESSON_FILE_CONFIG = {
  [LESSON_CONTENT_TYPES.PDF]: {
    accept: '.pdf,application/pdf',
    buttonLabel: 'Carica PDF',
  },
  [LESSON_CONTENT_TYPES.WORD]: {
    accept: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    buttonLabel: 'Carica documento Word',
  },
  [LESSON_CONTENT_TYPES.EXCEL]: {
    accept: '.xls,.xlsx,.xlsm,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    buttonLabel: 'Carica foglio Excel',
  },
  [LESSON_CONTENT_TYPES.VIDEO_UPLOAD]: {
    accept: 'video/*,.mp4,.webm,.mov,.m4v',
    buttonLabel: 'Carica video',
  },
  [LESSON_CONTENT_TYPES.FILE]: {
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.zip,.ppt,.pptx,application/pdf,application/zip',
    buttonLabel: 'Carica file',
  },
  [LESSON_CONTENT_TYPES.SCORM]: {
    accept: '.zip,application/zip',
    buttonLabel: 'Pacchetto SCORM (.zip)',
  },
  [LESSON_CONTENT_TYPES.SCORM_12]: {
    accept: '.zip,application/zip',
    buttonLabel: 'Pacchetto SCORM 1.2 (.zip)',
  },
};

export const isScormLessonType = (contentType) => SCORM_CONTENT_TYPES.includes(contentType);

export const isFileUploadLessonType = (contentType) => FILE_UPLOAD_CONTENT_TYPES.includes(contentType);

export const getLessonFileConfig = (contentType) => LESSON_FILE_CONFIG[contentType] ?? null;
