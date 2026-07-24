import { useMemo, useState } from 'react';
import QuizResult from './QuizResult';

const QuizModal = ({
  isOpen,
  onClose,
  quiz = null,
  submitting = false,
  onSubmit,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const quizQuestions = quiz?.uiQuestions ?? [];
  const totalQuestions = quizQuestions.length;
  const selectedAnswer = answers[currentQuestion];
  const currentItem = quizQuestions[currentQuestion];
  const passScore = quiz?.passScorePercent ?? 70;

  const resetState = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const handleClose = () => {
    resetState();
    onClose?.();
  };

  const toggleOption = (optionId) => {
    if (!currentItem) return;

    if (currentItem.type === 'MULTIPLE') {
      setAnswers((prev) => {
        const existing = prev[currentQuestion] ?? [];
        const next = existing.includes(optionId)
          ? existing.filter((id) => id !== optionId)
          : [...existing, optionId];
        return { ...prev, [currentQuestion]: next };
      });
      return;
    }

    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionId }));
  };

  const isOptionSelected = (optionId) => {
    if (currentItem?.type === 'MULTIPLE') {
      return (selectedAnswer ?? []).includes(optionId);
    }
    return selectedAnswer === optionId;
  };

  const canSubmit = useMemo(
    () =>
      quizQuestions.every((question, index) => {
        const answer = answers[index];
        if (question.type === 'FREE_TEXT') {
          return typeof answer === 'string' && answer.trim().length > 0;
        }
        if (question.type === 'MULTIPLE') {
          return Array.isArray(answer) && answer.length > 0;
        }
        return Boolean(answer);
      }),
    [answers, quizQuestions],
  );

  if (!isOpen) return null;

  const submitQuiz = async () => {
    const apiResult = await onSubmit?.(answers);
    if (!apiResult) return;

    setResult({
      score: apiResult.scorePercent ?? 0,
      correct: apiResult.correctCount ?? 0,
      total: apiResult.totalQuestions ?? totalQuestions,
      passed: apiResult.passed ?? false,
      pendingManualReview: apiResult.pendingManualReview ?? false,
      passScore,
    });
  };

  const retryQuiz = () => {
    resetState();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {!result ? (
        <div className="w-full max-w-2xl rounded-2xl bg-[#eff8f4] p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-[#1d1d1d]">
            {quiz?.moduleTitle || quiz?.quizTitle || 'Quiz'}
          </h2>
          <p className="mt-2 mb-5 text-sm text-[#5a5a5a] md:text-base">
            Devi ottenere almeno <span className="font-semibold">{passScore}%</span> per superare
            questo quiz.
          </p>

          {totalQuestions === 0 ? (
            <p className="text-sm text-gray-500">Nessuna domanda disponibile.</p>
          ) : (
            <div className="rounded-xl border border-[#cbe8dd] bg-white p-5 md:p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm text-gray-500 md:text-base">
                  Domanda {currentQuestion + 1} di {totalQuestions}
                </h3>
                <span className="rounded-full bg-[#edf6f1] px-3 py-1 text-xs text-[#2f2f2f]">
                  {currentItem?.type === 'MULTIPLE' ? 'Scelta multipla' : 'Scelta singola'}
                </span>
              </div>

              <p className="mb-4 text-base font-medium text-[#2a2a2a] md:text-xl">
                {currentItem?.text}
              </p>

              {currentItem?.type === 'FREE_TEXT' ? (
                <textarea
                  value={selectedAnswer || ''}
                  onChange={(event) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion]: event.target.value,
                    }))
                  }
                  className="min-h-28 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#55B18D]"
                  placeholder="Scrivi la tua risposta"
                />
              ) : (
                <div className="space-y-3">
                  {currentItem?.options?.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleOption(option.id)}
                      className="flex w-full items-center gap-3 rounded-lg px-1 py-1 text-left text-sm text-[#222] transition-colors hover:text-black md:text-base"
                    >
                      <div
                        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
                          isOptionSelected(option.id)
                            ? 'border-[#55B18D] bg-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isOptionSelected(option.id) ? (
                          <div className="h-2.5 w-2.5 rounded-full bg-[#55B18D]" />
                        ) : null}
                      </div>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Precedente
                </button>

                {currentQuestion === totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={submitQuiz}
                    disabled={!canSubmit || submitting}
                    className="rounded-full bg-[#55B18D] px-6 py-2 text-sm font-semibold text-white hover:bg-[#439678] disabled:opacity-60"
                  >
                    {submitting ? 'Invio...' : 'Invia'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentQuestion((prev) =>
                        Math.min(totalQuestions - 1, prev + 1),
                      )
                    }
                    className="rounded-full bg-[#55B18D] px-6 py-2 text-sm font-semibold text-white hover:bg-[#439678]"
                  >
                    Successiva
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Chiudi
            </button>
          </div>
        </div>
      ) : (
        <QuizResult result={result} onRetry={retryQuiz} onClose={handleClose} />
      )}
    </div>
  );
};

export default QuizModal;
