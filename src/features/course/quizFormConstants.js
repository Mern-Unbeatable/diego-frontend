export const QUIZ_TYPE_DESCRIPTIONS = {
  PRE_TEST: 'Valutazione iniziale — lo studente lo vede dopo le prime lezioni.',
  POST_TEST: 'Test intermedio — verifica parziale durante il corso.',
  FINAL_TEST: 'Test finale — richiede tutte le lezioni completate. Necessario per attestato.',
};

export const QUIZ_TYPE_OPTIONS = [
  { value: 'PRE_TEST', label: 'Test Iniziale' },
  { value: 'POST_TEST', label: 'Test Intermedio' },
  { value: 'FINAL_TEST', label: 'Test Finale' },
];

export const QUESTION_TYPE_OPTIONS = [
  { value: 'SINGLE', label: 'Scelta singola' },
  { value: 'MULTIPLE', label: 'Scelta multipla' },
  { value: 'TRUE_FALSE', label: 'Vero/Falso' },
  { value: 'FREE_TEXT', label: 'Testo libero' },
];

export const getQuizTypeLabel = (value) =>
  QUIZ_TYPE_OPTIONS.find((option) => option.value === value)?.label || value;

export const getQuestionTypeLabel = (value) =>
  QUESTION_TYPE_OPTIONS.find((option) => option.value === value)?.label || value;

export const isFreeTextQuestion = (type) => type === 'FREE_TEXT';

export const isMultipleChoiceQuestion = (type) => type === 'MULTIPLE';

export const isTrueFalseQuestion = (type) => type === 'TRUE_FALSE';

export const hasSelectableOptions = (type) => !isFreeTextQuestion(type);
