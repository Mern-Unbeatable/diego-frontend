import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import CourseMain from '../components/course/CourseMain';
import CourseProgram from '../components/course/CourseProgram';

const quizQuestions = [
  {
    id: 1,
    text: 'What is 2 + 2?',
    options: ['1', '3', '4', '5'],
    answer: '4',
  },
  {
    id: 2,
    text: 'Which color is the sky on a clear day?',
    options: ['Blue', 'Red', 'Yellow', 'Pink'],
    answer: 'Blue',
  },
  {
    id: 3,
    text: 'How many days are in one week?',
    options: ['5', '6', '7', '8'],
    answer: '7',
  },
  {
    id: 4,
    text: 'Which is a safety device?',
    options: ['Helmet', 'Notebook', 'Spoon', 'Pillow'],
    answer: 'Helmet',
  },
  {
    id: 5,
    text: 'Fire extinguisher is used to?',
    options: ['Cook', 'Wash', 'Put out fires', 'Open doors'],
    answer: 'Put out fires',
  },
  {
    id: 6,
    text: 'PPE means?',
    options: [
      'Personal Protective Equipment',
      'Public Policy Element',
      'Private Program Entry',
      'Power Plant Energy',
    ],
    answer: 'Personal Protective Equipment',
  },
  {
    id: 7,
    text: 'Emergency number in most EU countries is?',
    options: ['111', '112', '118', '120'],
    answer: '112',
  },
  {
    id: 8,
    text: 'A wet floor sign helps to?',
    options: ['Decorate room', 'Prevent slips', 'Increase heat', 'Block exits'],
    answer: 'Prevent slips',
  },
  {
    id: 9,
    text: 'Before using equipment, you should?',
    options: [
      'Ignore instructions',
      'Read instructions',
      'Run quickly',
      'Switch off lights',
    ],
    answer: 'Read instructions',
  },
  {
    id: 10,
    text: 'Best action if you see a hazard?',
    options: ['Do nothing', 'Report it', 'Hide it', 'Wait one week'],
    answer: 'Report it',
  },
];

const CourseContentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  // TODO: fetch course details by id (use API or redux)
  const course = {
    id,
    title: 'Formazione SEVESO',
    video: '/image/mandatory_courses/image1.jpg',
    description:
      "Il D. lgs. 105/2015 art. 14 all'Appendice I dell'Allegato B, precisa al gestore come ottemperare in maniera organica e programmata agli obblighi di informazione, formazione, addestramento ed equipaggiamento ai fini della sicurezza...",
  };

  const totalQuestions = quizQuestions.length;

  const selectedAnswer = answers[currentQuestion];
  const currentItem = quizQuestions[currentQuestion];

  const correctCount = useMemo(
    () =>
      quizQuestions.reduce((acc, q, idx) => {
        if (answers[idx] === q.answer) return acc + 1;
        return acc;
      }, 0),
    [answers],
  );

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const didPass = scorePercentage >= 70;

  const openQuiz = () => {
    setIsQuizOpen(true);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const submitQuiz = () => {
    setResult({
      score: scorePercentage,
      correct: correctCount,
      total: totalQuestions,
      time: '10 min',
      passed: didPass,
    });
  };

  const closeQuizFlow = () => {
    setIsQuizOpen(false);
    setResult(null);
  };

  const retryQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex h-8 w-8 items-center justify-center"
        aria-label="Back"
      >
        <FaChevronLeft />
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CourseMain course={course} />

        <CourseProgram
          modules={[
            { id: 1, title: 'Class-1', time: '3 minuti', status: 'done' },
            { id: 2, title: 'Class-2', time: '10 minuti', status: 'done' },
            { id: 3, title: 'Class-3', time: '20 minuti', status: 'current' },
            { id: 4, title: 'Class-4', time: '30 minuti', status: 'upcoming' },
            { id: 5, title: 'Class-5', time: '30 minuti', status: 'upcoming' },
            {
              id: 6,
              title: 'Quiz-1',
              time: 'Start',
              status: 'upcoming',
              type: 'quiz',
            },
          ]}
          progress={28}
          onStartQuiz={openQuiz}
        />
      </div>

      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          {!result ? (
            <div className="w-full max-w-[980px] rounded-2xl bg-[#eff8f4] p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-[#1d1d1d] md:text-[42px]">
                Anteprima quiz
              </h2>
              <p className="mt-2 mb-5 text-sm text-[#5a5a5a] md:text-base">
                You must score at least{' '}
                <span className="font-semibold">70%</span> to pass this quiz.
              </p>

              <div className="rounded-xl border border-[#8cd4b6] bg-white p-5 md:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm text-gray-500 md:text-base">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </h3>
                  <span className="rounded-full bg-[#edf6f1] px-3 py-1 text-xs text-[#2f2f2f]">
                    Single choice
                  </span>
                </div>

                <p className="mb-4 text-base text-[#2a2a2a] md:text-xl">
                  {currentItem.text}
                </p>

                <div className="space-y-3">
                  {currentItem.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 text-sm text-[#222] md:text-base"
                    >
                      <input
                        type="radio"
                        name={`question-${currentItem.id}`}
                        checked={selectedAnswer === option}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentQuestion]: option,
                          }))
                        }
                        className="h-4 w-4 accent-[#73BFA1]"
                      />
                      {option}
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentQuestion((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentQuestion === 0}
                    className="rounded-full border border-[#cce9dc] px-5 py-2 text-sm text-[#79bea3] disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {currentQuestion === totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={submitQuiz}
                      className="rounded-full bg-[#73BFA1] px-6 py-2 text-sm font-medium text-white"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentQuestion((prev) =>
                          Math.min(totalQuestions - 1, prev + 1),
                        )
                      }
                      className="rounded-full bg-[#73BFA1] px-6 py-2 text-sm font-medium text-white"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[#8cd4b6] bg-[#edf8f3] px-4 py-3 text-sm text-[#69ab93] md:text-base">
                <span className="font-semibold">Tip:</span> Navigate using
                Previous/Next. On the last question press Submit to finish.
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={closeQuizFlow}
                  className="rounded-full border border-[#bddfd0] px-5 py-2 text-sm text-[#5a8f79]"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[760px] rounded-2xl bg-[#eff8f4] p-6 md:p-10">
              <h2 className="text-center text-[34px] font-semibold text-[#70be9f] md:text-[52px]">
                Risultati del quiz
              </h2>
              {result.passed ? (
                <p className="mt-3 text-center text-[28px] text-[#70be9f] md:text-[40px]">
                  Congratulazioni. Hai superato il test!
                </p>
              ) : (
                <p className="mx-auto mt-3 max-w-[580px] text-center text-[24px] leading-snug text-[#ff5b5b] md:text-[40px]">
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
                    className="rounded-full bg-[#73BFA1] px-10 py-3 text-sm font-semibold text-white md:px-16 md:text-base"
                  >
                    Riprova
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeQuizFlow}
                  className="rounded-full border border-[#bcded0] px-8 py-3 text-sm font-semibold text-[#5f9d84] md:text-base"
                >
                  Chiudi
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseContentView;
