import React, { useEffect, useMemo, useState } from 'react';
import { X, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Modal } from '../../../components/ui';
import Loading from '../../../components/ui/Utilities/Loading';
import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
  usePublishQuizMutation,
  useGetQuizByIdQuery,
} from '../../../features/api/courseApi';
import { saveQuizForCourse } from '../../../features/api/courseHelpers';
import {
  mapApiQuizToFormData,
  validateQuizFormData,
  canAddQuizType,
} from '../../../features/admin/adminMappers';
import {
  QUIZ_TYPE_OPTIONS,
  QUESTION_TYPE_OPTIONS,
  getQuizTypeLabel,
  getQuestionTypeLabel,
  hasSelectableOptions,
  isFreeTextQuestion,
  isMultipleChoiceQuestion,
  isTrueFalseQuestion,
} from '../../../features/course/quizFormConstants';
import {
  showSuccessToast,
  showErrorToast,
  showRtkErrorToast,
} from '../../../utils/toast/toastAlerts';

const createUniqueId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const buildDefaultOptions = (questionType) => {
  if (questionType === 'TRUE_FALSE') {
    return [
      { id: createUniqueId('option'), text: 'Vero', correct: true },
      { id: createUniqueId('option'), text: 'Falso', correct: false },
    ];
  }

  if (questionType === 'FREE_TEXT') {
    return [];
  }

  return [
    { id: createUniqueId('option'), text: 'Opzione 1', correct: true },
    { id: createUniqueId('option'), text: 'Opzione 2', correct: false },
    { id: createUniqueId('option'), text: 'Opzione 3', correct: false },
    { id: createUniqueId('option'), text: 'Opzione 4', correct: false },
  ];
};

const buildDefaultQuestion = (index = 1, questionType = 'SINGLE') => ({
  id: createUniqueId('question'),
  title: `Domanda ${index}`,
  text: '',
  questionType,
  options: buildDefaultOptions(questionType),
  feedback: {
    correct: '',
    incorrect: '',
  },
});

const QUIZ_DEFAULT_TITLES = {
  PRE_TEST: 'Test Iniziale',
  POST_TEST: 'Test Intermedio',
  FINAL_TEST: 'Test Finale',
};

const buildDefaultQuiz = (quizType = 'POST_TEST') => ({
  title: QUIZ_DEFAULT_TITLES[quizType] || 'Quiz',
  type: quizType,
  minScore: 70,
  questions: [buildDefaultQuestion(1, 'SINGLE')],
  feedback: {
    passed: 'Superato',
    notPassed: 'Non superato',
  },
  questionsCount: 1,
  publishStatus: 'PUBLISHED',
  isPublished: true,
});

export default function QuizBuilderModal({
  isOpen,
  onClose,
  onSave,
  onBack,
  initialData,
  courseId = null,
  savedQuizId = null,
  defaultQuizType = 'POST_TEST',
  existingQuizzes = [],
  onQuizSaved,
}) {
  const [quizData, setQuizData] = useState(() => buildDefaultQuiz(defaultQuizType));
  const [createQuiz] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();
  const [publishQuiz] = usePublishQuizMutation();
  const [saving, setSaving] = useState(false);

  const {
    data: apiQuiz,
    isLoading: loadingQuiz,
    isFetching: fetchingQuiz,
  } = useGetQuizByIdQuery(savedQuizId, {
    skip: !isOpen || !savedQuizId,
    refetchOnMountOrArgChange: true,
  });

  const isLoadingQuiz = Boolean(savedQuizId) && (loadingQuiz || (fetchingQuiz && !apiQuiz));

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setQuizData(initialData);
      return;
    }

    if (apiQuiz) {
      setQuizData(mapApiQuizToFormData(apiQuiz));
      return;
    }

    if (!savedQuizId) {
      setQuizData(buildDefaultQuiz(defaultQuizType));
    }
  }, [isOpen, initialData, apiQuiz, savedQuizId, defaultQuizType]);

  const availableQuizTypes = useMemo(() => {
    const currentType = quizData?.type;
    return QUIZ_TYPE_OPTIONS.filter((option) => {
      if (option.value === currentType) return true;
      return canAddQuizType(existingQuizzes, option.value);
    });
  }, [existingQuizzes, quizData?.type]);

  const updateQuizField = (field, value) => {
    setQuizData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateQuestion = (questionId, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question;

        const nextQuestion = { ...question, [field]: value };

        if (field === 'questionType') {
          nextQuestion.options = buildDefaultOptions(value);
        }

        return nextQuestion;
      }),
      questionsCount: prev.questions.length,
    }));
  };

  const updateQuestionOption = (questionId, optionId, text) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId ? { ...option, text } : option,
              ),
            }
          : question,
      ),
    }));
  };

  const updateOptionCorrect = (questionId, optionId) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question;

        const isMultiple = isMultipleChoiceQuestion(question.questionType);

        return {
          ...question,
          options: question.options.map((option) => {
            if (option.id !== optionId) {
              return isMultiple ? option : { ...option, correct: false };
            }
            return { ...option, correct: isMultiple ? !option.correct : true };
          }),
        };
      }),
    }));
  };

  const addQuestionOption = (questionId) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question;

        return {
          ...question,
          options: [
            ...(question.options || []),
            {
              id: createUniqueId('option'),
              text: `Opzione ${(question.options?.length || 0) + 1}`,
              correct: false,
            },
          ],
        };
      }),
    }));
  };

  const removeQuestionOption = (questionId, optionId) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question;
        const nextOptions = (question.options || []).filter((option) => option.id !== optionId);
        return {
          ...question,
          options: nextOptions.length ? nextOptions : buildDefaultOptions(question.questionType),
        };
      }),
    }));
  };

  const addQuestion = () => {
    const newQuestion = buildDefaultQuestion(quizData.questions.length + 1, 'SINGLE');

    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      questionsCount: prev.questions.length + 1,
    }));
  };

  const removeQuestion = (questionId) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((question) => question.id !== questionId),
      questionsCount: Math.max(prev.questions.length - 1, 0),
    }));
  };

  const handleSave = async (publishOverride) => {
    const validationError = validateQuizFormData(quizData);
    if (validationError) {
      showErrorToast(validationError);
      return;
    }

    const publishStatus = publishOverride === true
      ? 'PUBLISHED'
      : publishOverride === false
        ? 'DRAFT'
        : quizData.publishStatus || 'PUBLISHED';

    if (!savedQuizId && !canAddQuizType(existingQuizzes, quizData.type)) {
      showErrorToast('Esiste già un Test Finale per questo corso');
      return;
    }

    const payload = {
      ...quizData,
      publishStatus,
      isPublished: publishStatus === 'PUBLISHED',
      publish: publishStatus === 'PUBLISHED',
      savedQuizId: savedQuizId || quizData.savedQuizId || null,
    };

    if (!courseId) {
      onSave?.(payload, { publish: payload.publish });
      return;
    }

    setSaving(true);
    try {
      const result = await saveQuizForCourse({
        courseId,
        quizData: payload,
        createQuiz,
        updateQuiz,
        publishQuiz,
      });

      if (result.quizId) onQuizSaved?.(result.quizId);

      showSuccessToast(
        result.isUpdate
          ? result.published
            ? 'Quiz aggiornato e pubblicato con successo'
            : 'Quiz salvato come bozza'
          : result.published
            ? 'Quiz creato e pubblicato con successo'
            : 'Quiz creato come bozza',
      );

      onSave?.({ ...payload, savedQuizId: result.quizId }, { publish: result.published, saved: true });
      onClose?.();
    } catch (error) {
      showRtkErrorToast(error);
    } finally {
      setSaving(false);
    }
  };

  const summaryQuestions = useMemo(
    () =>
      (quizData?.questions || []).map((question, index) => ({
        id: question.id,
        index: index + 1,
        text: question.text || `Domanda ${index + 1}`,
        typeLabel: getQuestionTypeLabel(question.questionType),
        optionsCount: question.options?.length || 0,
      })),
    [quizData?.questions],
  );

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      zIndex={120}
      showCloseButton={false}
      panelClassName="max-h-[92vh] overflow-y-auto p-0"
    >
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              {savedQuizId ? 'Modifica Quiz' : 'Crea Quiz'}
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isLoadingQuiz ? (
        <Loading size="md" className="min-h-60" />
      ) : (
        <div className="p-6">
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Titolo del quiz
                </label>
                <input
                  type="text"
                  value={quizData.title}
                  onChange={(e) => updateQuizField('title', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tipo di quiz
                </label>
                <select
                  value={quizData.type}
                  onChange={(e) => {
                    const nextType = e.target.value;
                    updateQuizField('type', nextType);
                    if (!savedQuizId && QUIZ_DEFAULT_TITLES[nextType]) {
                      updateQuizField('title', QUIZ_DEFAULT_TITLES[nextType]);
                    }
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                >
                  {availableQuizTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Test Iniziale → all&apos;inizio · Intermedio → durante il corso · Finale → dopo
                  tutte le lezioni (blocca attestato se non superato)
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Punteggio minimo (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={quizData.minScore}
                  onChange={(e) =>
                    updateQuizField('minScore', Number(e.target.value) || 0)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Stato pubblicazione
                </label>
                <select
                  value={quizData.publishStatus || (quizData.isPublished === false ? 'DRAFT' : 'PUBLISHED')}
                  onChange={(e) => {
                    const nextStatus = e.target.value;
                    setQuizData((prev) => ({
                      ...prev,
                      publishStatus: nextStatus,
                      isPublished: nextStatus === 'PUBLISHED',
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                >
                  <option value="PUBLISHED">Pubblicato (visibile agli studenti)</option>
                  <option value="DRAFT">Bozza (non visibile)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Feedback - Superato
                </label>
                <input
                  type="text"
                  value={quizData.feedback.passed}
                  onChange={(e) =>
                    updateQuizField('feedback', {
                      ...quizData.feedback,
                      passed: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Feedback - Non superato
                </label>
                <input
                  type="text"
                  value={quizData.feedback.notPassed}
                  onChange={(e) =>
                    updateQuizField('feedback', {
                      ...quizData.feedback,
                      notPassed: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Anteprima e Riepilogo
                </h3>
                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-600">Titolo</span>
                    <span className="text-sm font-medium text-right">{quizData.title}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-600">Tipo</span>
                    <span className="text-sm font-medium">{getQuizTypeLabel(quizData.type)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-600">Punteggio minimo</span>
                    <span className="text-sm font-medium">{quizData.minScore}%</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-600">Stato</span>
                    <span className="text-sm font-medium">
                      {(quizData.publishStatus || (quizData.isPublished === false ? 'DRAFT' : 'PUBLISHED')) === 'PUBLISHED'
                        ? 'Pubblicato'
                        : 'Bozza'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-600">Domande</span>
                    <span className="text-sm font-medium">{quizData.questions.length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">Elenco domande</h4>
                <div className="max-h-56 space-y-2 overflow-y-auto">
                  {summaryQuestions.map((question) => (
                    <div
                      key={question.id}
                      className="rounded-lg border border-emerald-200 bg-emerald-50 p-3"
                    >
                      <span className="text-sm font-medium text-emerald-800">
                        {question.index}. {question.text}
                      </span>
                      <p className="text-sm text-emerald-600">Tipo: {question.typeLabel}</p>
                      {!isFreeTextQuestion(
                        quizData.questions.find((item) => item.id === question.id)?.questionType,
                      ) ? (
                        <p className="text-sm text-emerald-600">
                          Opzioni: {question.optionsCount}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleSave()}
                    disabled={saving}
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
                  >
                    {saving ? 'Salvataggio...' : 'Salva quiz'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave(true)}
                    disabled={saving}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-60"
                  >
                    Pubblica ora
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Domande</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center space-x-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              >
                <Plus className="h-4 w-4" />
                <span>Aggiungi domanda</span>
              </button>
            </div>

            <div className="space-y-6">
              {quizData.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-lg border border-gray-200 bg-white p-6"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h4 className="text-lg font-medium text-gray-900">
                      Domanda {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      disabled={quizData.questions.length <= 1}
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Testo della domanda
                        </label>
                        <textarea
                          value={question.text}
                          onChange={(e) =>
                            updateQuestion(question.id, 'text', e.target.value)
                          }
                          placeholder="Inserisci la domanda"
                          rows={3}
                          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Tipo di domanda
                        </label>
                        <select
                          value={question.questionType}
                          onChange={(e) =>
                            updateQuestion(question.id, 'questionType', e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                        >
                          {QUESTION_TYPE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Opzioni
                        </label>
                        {isFreeTextQuestion(question.questionType) ? (
                          <p className="text-sm text-gray-500">
                            Domanda a testo libero — valutazione manuale dal tutor.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={option.id}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type={
                                    isMultipleChoiceQuestion(question.questionType)
                                      ? 'checkbox'
                                      : 'radio'
                                  }
                                  name={`correct-q${question.id}`}
                                  checked={Boolean(option.correct)}
                                  onChange={() =>
                                    updateOptionCorrect(question.id, option.id)
                                  }
                                  className="text-emerald-500 focus:ring-emerald-500"
                                />
                                <span className="w-4 text-sm font-medium text-gray-600">
                                  {optIndex + 1}.
                                </span>
                                <input
                                  type="text"
                                  value={option.text}
                                  onChange={(e) =>
                                    updateQuestionOption(
                                      question.id,
                                      option.id,
                                      e.target.value,
                                    )
                                  }
                                  placeholder={`Opzione ${optIndex + 1}`}
                                  disabled={isTrueFalseQuestion(question.questionType)}
                                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:bg-gray-100"
                                />
                                {!isTrueFalseQuestion(question.questionType) ? (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeQuestionOption(question.id, option.id)
                                    }
                                    className="rounded p-1 text-gray-400 hover:text-red-500"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {hasSelectableOptions(question.questionType) &&
                      !isTrueFalseQuestion(question.questionType) ? (
                        <button
                          type="button"
                          onClick={() => addQuestionOption(question.id)}
                          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          + Aggiungi opzione
                        </button>
                      ) : null}

                      {isMultipleChoiceQuestion(question.questionType) ? (
                        <p className="text-xs text-gray-500">
                          Seleziona tutte le risposte corrette (almeno una).
                        </p>
                      ) : null}
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <h5 className="mb-3 text-sm font-medium text-gray-700">Anteprima</h5>
                      <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <h6 className="mb-3 font-medium text-gray-900">
                          {question.text || 'Testo della domanda'}
                        </h6>
                        {isFreeTextQuestion(question.questionType) ? (
                          <textarea
                            readOnly
                            rows={3}
                            placeholder="Risposta aperta"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                          />
                        ) : (
                          <div className="space-y-2">
                            {question.options.map((option) => (
                              <label
                                key={option.id}
                                className="flex items-center gap-2 text-sm text-gray-700"
                              >
                                <input
                                  type={
                                    isMultipleChoiceQuestion(question.questionType)
                                      ? 'checkbox'
                                      : 'radio'
                                  }
                                  readOnly
                                  checked={Boolean(option.correct)}
                                  className="text-emerald-500"
                                />
                                <span>{option.text}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="rounded-lg bg-emerald-500 px-8 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
            >
              {saving ? 'Salvataggio...' : 'Salva quiz'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
