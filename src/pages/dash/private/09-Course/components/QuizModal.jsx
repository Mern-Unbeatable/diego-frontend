import React, { useState, useMemo } from 'react';

const QuizModal = ({ isOpen, onClose, quizQuestions = [] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const totalQuestions = quizQuestions.length;
  const selectedAnswer = answers[currentQuestion];
  const currentItem = quizQuestions[currentQuestion];

  const correctCount = useMemo(
    () =>
      quizQuestions.reduce((acc, q, idx) => {
        if (answers[idx] === q.answer) return acc + 1;
        return acc;
      }, 0),
    [answers, quizQuestions]
  );

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const didPass = scorePercentage >= 70;

  if (!isOpen) return null;

  const submitQuiz = () => {
    setResult({
      score: scorePercentage,
      correct: correctCount,
      total: totalQuestions,
      time: '10 min',
      passed: didPass,
    });
  };

  const retryQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {!result ? (
        <div className="w-full max-w-2xl rounded-2xl bg-[#eff8f4] p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-[#1d1d1d]">
            Anteprima quiz
          </h2>
          <p className="mt-2 mb-5 text-sm text-[#5a5a5a] md:text-base">
            You must score at least{' '}
            <span className="font-semibold">70%</span> to pass this quiz.
          </p>

          <div className="rounded-xl border border-[#cbe8dd] bg-white p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm text-gray-500 md:text-base">
                Question {currentQuestion + 1} of {totalQuestions}
              </h3>
              <span className="rounded-full bg-[#edf6f1] px-3 py-1 text-xs text-[#2f2f2f]">
                Single choice
              </span>
            </div>

            <p className="mb-4 text-base text-[#2a2a2a] md:text-xl font-medium">
              {currentItem?.text}
            </p>

            <div className="space-y-3">
              {currentItem?.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 text-sm text-[#222] md:text-base cursor-pointer hover:text-black transition-colors"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion]: option,
                    }))
                  }
                >
                  {/* Custom Radio Button */}
                  <div className="relative flex items-center justify-center">
                    <div className={`h-[18px] w-[18px] rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedAnswer === option 
                        ? 'border-[#55B18D] bg-white' 
                        : 'border-gray-300 bg-white'
                    }`}>
                      {selectedAnswer === option && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#55B18D]" />
                      )}
                    </div>
                  </div>
                  {option}
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentQuestion === totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={submitQuiz}
                  className="rounded-full bg-[#55B18D] px-6 py-2 text-sm font-semibold text-white hover:bg-[#439678] transition-colors cursor-pointer"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentQuestion((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="rounded-full bg-[#55B18D] px-6 py-2 text-sm font-semibold text-white hover:bg-[#439678] transition-colors cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[#cbe8dd] bg-[#f2faf7] px-4 py-3 text-sm text-[#55B18D] md:text-base">
            <span className="font-semibold">Tip:</span> Navigate using
            Previous/Next. On the last question press Submit to finish.
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl rounded-2xl bg-[#eff8f4] p-6 md:p-10 shadow-2xl">
          <h2 className="text-center text-xl font-semibold text-[#70be9f] md:text-2xl">
            Risultati del quiz
          </h2>
          {result.passed ? (
            <p className="mt-3 text-center text-[28px] text-[#70be9f] md:text-xl">
              Congratulazioni. Hai superato il test!
            </p>
          ) : (
            <p className="mx-auto mt-3 max-w-[580px] text-center text-[24px] leading-snug text-[#ff5b5b] md:text-xl">
              Il tuo punteggio attuale e inferiore al 70%. Ti invitiamo a
              ripetere il test per migliorare il risultato e consolidare le
              competenze acquisite.
            </p>
          )}

          <div className="relative mx-auto mt-6 max-w-[460px] rounded-xl bg-white/70 p-5 md:p-7">
            <div className="absolute -top-3 -right-3 h-12 w-12 rounded-tr-xl rounded-bl-3xl bg-[#e7f2ec]" />
            <h3 className="mb-4 text-xl font-semibold text-[#303030] md:text-[42px]">
              Punteggi
            </h3>
            <div className="space-y-2 text-sm md:text-[24px]">
              <div className="flex items-center justify-between">
                <span className="text-[#444]">Punteggio ottenuto</span>
                <span
                  className={`font-semibold ${result.passed ? 'text-[#303030]' : 'text-[#ff5b5b]'}`}
                >
                  {result.score}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#444]">
                  Totale risposte corrette
                </span>
                <span className="font-semibold text-[#303030]">
                  {result.correct}/{result.total}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#444]">
                  Tempo totale impiegato nel test
                </span>
                <span className="font-semibold text-[#303030]">
                  {result.time}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {!result.passed && (
              <button
                type="button"
                onClick={retryQuiz}
                className="rounded-full bg-[#55B18D] px-10 py-3 text-sm font-semibold text-white md:px-16 md:text-base hover:bg-[#439678] transition-colors cursor-pointer"
              >
                Riprova
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-200 bg-white px-8 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer md:text-base"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizModal;
