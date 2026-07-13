import React, { useState, useMemo } from 'react';
import QuizResult from './QuizResult';

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
        <QuizResult result={result} onRetry={retryQuiz} onClose={onClose} />
      )}
    </div>
  );
};

export default QuizModal;
