import React, { useState } from 'react';
import { X, ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function QuizBuilderModal({ isOpen, onClose, onSave, onBack }) {
  const [quizData, setQuizData] = useState({
    title: 'Valutazione del Modulo 1',
    type: 'Test Intermedio',
    score: 'MinRPG',
    minScore: 70,
    questions: [
      {
        id: 1,
        title: 'Domanda 1',
        text: 'Testo della domanda',
        type: 'Nuova domanda',
        questionType: 'Scelta singola',
        options: [
          { id: 1, text: 'Opzione 1', correct: false },
          { id: 2, text: 'Opzione 2', correct: false },
          { id: 3, text: 'Opzione 3', correct: false },
          { id: 4, text: 'Opzione 4', correct: false },
        ],
        feedback: {
          correct: '',
          incorrect: '',
        },
      },
      {
        id: 2,
        title: 'Domanda 2',
        text: 'Testo della domanda',
        type: 'Nuova domanda',
        questionType: 'Scelta singola',
        options: [
          { id: 1, text: 'Opzione 1', correct: false },
          { id: 2, text: 'Opzione 2', correct: false },
          { id: 3, text: 'Opzione 3', correct: false },
          { id: 4, text: 'Opzione 4', correct: false },
        ],
        feedback: {
          correct: '',
          incorrect: '',
        },
      },
    ],
    feedback: {
      passed: 'Superato',
      notPassed: 'Non superato',
    },
    questionsCount: 30,
  });

  const updateQuizField = (field, value) => {
    setQuizData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateQuestion = (questionId, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const updateQuestionOption = (questionId, optionId, text) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, text } : opt,
              ),
            }
          : q,
      ),
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: quizData.questions.length + 1,
      title: `Domanda ${quizData.questions.length + 1}`,
      text: 'Testo della domanda',
      type: 'Nuova domanda',
      questionType: 'Scelta singola',
      options: [
        { id: 1, text: 'Opzione 1', correct: false },
        { id: 2, text: 'Opzione 2', correct: false },
        { id: 3, text: 'Opzione 3', correct: false },
        { id: 4, text: 'Opzione 4', correct: false },
      ],
      feedback: {
        correct: '',
        incorrect: '',
      },
    };

    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const removeQuestion = (questionId) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleSave = () => {
    onSave(quizData);
    onBack(); // Return to the main Add Course modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Crea Quiz</h1>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Quiz Settings - Left Side */}
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Quiz Settings */}
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
                  onChange={(e) => updateQuizField('type', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                >
                  <option value="Test o Finale">Test o Finale</option>
                  <option value="Test Intermedio">Test Intermedio</option>
                  <option value="Test Iniziale">Test Iniziale</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Punteggio minimo (%)
                </label>
                <input
                  type="number"
                  value={quizData.minScore}
                  onChange={(e) =>
                    updateQuizField('minScore', parseInt(e.target.value))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                />
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

            {/* Right Column - Quiz Preview/Settings */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Anteprima e Riepilgo
                </h3>
                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Titolo/Valutazione Modulo 1
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tipo:</span>
                    <span className="text-sm font-medium">{quizData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Punteggio:</span>
                    <span className="text-sm font-medium">MinRPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Domande:</span>
                    <span className="text-sm font-medium">
                      {quizData.questionsCount}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Elenco Domande
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                    <div>
                      <span className="text-sm font-medium text-emerald-800">
                        1. Nuova domanda
                      </span>
                      <p className="text-xs text-emerald-600">
                        Tipo: Scelta singola
                      </p>
                      <p className="text-xs text-emerald-600">Opzioni: 4</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                    <div>
                      <span className="text-sm font-medium text-emerald-800">
                        2. Nuova domanda
                      </span>
                      <p className="text-xs text-emerald-600">
                        Tipo: Scelta singola
                      </p>
                      <p className="text-xs text-emerald-600">Opzioni: 4</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => console.log('Save Quiz')}
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-600"
                  >
                    Salva Quiz
                  </button>
                  <button
                    onClick={() => console.log('Publish')}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600"
                  >
                    Pubblica
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="border-t pt-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Domande</h3>
              <button
                onClick={addQuestion}
                className="flex items-center space-x-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-600"
              >
                <Plus className="h-4 w-4" />
                <span>Aggiungi Domanda</span>
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
                      <span className="ml-2 text-sm text-red-500">11 min</span>
                    </h4>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Question Details */}
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
                          placeholder="Nuova domanda"
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
                            updateQuestion(
                              question.id,
                              'questionType',
                              e.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                        >
                          <option value="Scelta singola">Scelta singola</option>
                          <option value="Scelta multipla">
                            Scelta multipla
                          </option>
                          <option value="Vero/Falso">Vero/Falso</option>
                          <option value="Testo libero">Testo libero</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Opzioni (Q&A)
                        </label>
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={option.id}
                              className="flex items-center space-x-2"
                            >
                              <span className="w-2 text-sm font-medium text-gray-600">
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
                                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Aggiungi opzione
                        </label>
                        <button
                          onClick={() => {
                            // Add new option logic here
                          }}
                          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          + Aggiungi opzione
                        </button>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Feedback per domanda (opzionale)
                        </label>
                        <textarea
                          placeholder="Feedback per risposta corretta"
                          rows={2}
                          className="mb-2 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                        />
                        <textarea
                          placeholder="Feedback per risposta sbagliata"
                          rows={2}
                          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Question Preview */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h5 className="mb-3 text-sm font-medium text-gray-700">
                        Anteprima | Fai il quiz?
                      </h5>
                      <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <h6 className="mb-3 font-medium text-gray-900">
                          {question.text}
                        </h6>
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <label
                              key={option.id}
                              className="flex cursor-pointer items-center space-x-2"
                            >
                              <input
                                type="radio"
                                name={`preview-q${question.id}`}
                                className="text-emerald-500 focus:ring-emerald-500"
                              />
                              <span className="text-sm text-gray-700">
                                {option.text}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end space-x-3 border-t border-gray-200 pt-6">
            <button
              onClick={onBack}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-emerald-500 px-8 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-600 hover:shadow-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
            >
              Aggiungi Domande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
