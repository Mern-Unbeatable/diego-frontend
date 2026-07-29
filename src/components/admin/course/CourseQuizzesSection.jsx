import React, { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  useGetCourseByIdQuery,
  useDeleteQuizMutation,
} from '../../../features/api/courseApi';
import {
  canAddQuizType,
  getQuizDisplayTitle,
  getSuggestedQuizType,
} from '../../../features/admin/adminMappers';
import { getQuizTypeLabel } from '../../../features/course/quizFormConstants';
import {
  showSuccessToast,
  showErrorToast,
  showRtkErrorToast,
} from '../../../utils/toast/toastAlerts';
import QuizBuilderModal from './QuizBuilderModal';

const QUIZ_TYPE_ORDER = {
  PRE_TEST: 0,
  POST_TEST: 1,
  FINAL_TEST: 2,
};

const sortQuizzes = (quizzes = []) =>
  [...quizzes].sort((a, b) => {
    const typeDiff =
      (QUIZ_TYPE_ORDER[a.quizType] ?? 9) - (QUIZ_TYPE_ORDER[b.quizType] ?? 9);
    if (typeDiff !== 0) return typeDiff;
    return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
  });

export default function CourseQuizzesSection({ courseId }) {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [defaultQuizType, setDefaultQuizType] = useState('PRE_TEST');

  const {
    data: courseResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
    refetchOnMountOrArgChange: true,
  });

  const [deleteQuiz, { isLoading: deleting }] = useDeleteQuizMutation();

  const quizzes = useMemo(() => {
    const course = courseResponse?.course || courseResponse;
    return sortQuizzes(course?.quizzes ?? []);
  }, [courseResponse]);

  const hasFinalTest = quizzes.some((quiz) => quiz.quizType === 'FINAL_TEST');

  const openCreateModal = () => {
    if (!courseId) {
      showErrorToast('Salva prima il corso con il pulsante "Salva corso"');
      return;
    }

    const suggestedType = getSuggestedQuizType(quizzes);
    if (!canAddQuizType(quizzes, suggestedType) && suggestedType === 'FINAL_TEST') {
      showErrorToast('Esiste già un Test Finale per questo corso');
      return;
    }

    setEditingQuizId(null);
    setDefaultQuizType(suggestedType);
    setIsQuizModalOpen(true);
  };

  const openEditModal = (quiz) => {
    setEditingQuizId(quiz.id);
    setDefaultQuizType(quiz.quizType || 'POST_TEST');
    setIsQuizModalOpen(true);
  };

  const closeQuizModal = () => {
    setIsQuizModalOpen(false);
    setEditingQuizId(null);
  };

  const handleQuizSaved = () => {
    refetch();
    closeQuizModal();
  };

  const handleDeleteQuiz = async (quiz) => {
    if (!quiz?.id) return;

    const confirmed = window.confirm(
      `Eliminare il quiz "${getQuizDisplayTitle(quiz)}"?`,
    );
    if (!confirmed) return;

    try {
      await deleteQuiz(quiz.id).unwrap();
      showSuccessToast('Quiz eliminato con successo');
      refetch();
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  return (
    <>
      <div className="rounded-xl bg-[#e8efec] p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <label className="text-[13px] font-medium text-[#222]">Quiz del corso</label>
            {courseId ? (
              <p className="mt-1 text-xs text-[#5a8f74]">
                Puoi aggiungere Test Iniziale, Intermedio e Finale (max 1 finale)
              </p>
            ) : (
              <p className="mt-1 text-xs text-[#b35a3c]">
                Salva prima il corso per abilitare i quiz
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            disabled={!courseId}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[#71c2a3] px-4 text-sm font-medium text-white disabled:opacity-50"
          >
            <Plus size={14} />
            Aggiungi quiz
          </button>
        </div>

        {isLoading || isFetching ? (
          <p className="text-sm text-[#6b7471]">Caricamento quiz...</p>
        ) : quizzes.length === 0 ? (
          <p className="text-sm text-[#6b7471]">
            Nessun quiz configurato. Aggiungi prima un Test Iniziale, poi eventuali test
            intermedi e infine il Test Finale.
          </p>
        ) : (
          <div className="space-y-2">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#222]">
                    {index + 1}. {getQuizDisplayTitle(quiz)}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5a6a64]">
                    <span className="rounded-full bg-[#eef5f2] px-2 py-0.5">
                      {getQuizTypeLabel(quiz.quizType)}
                    </span>
                    <span>Min. {quiz.passScorePercent ?? 70}%</span>
                    <span
                      className={
                        quiz.isPublished
                          ? 'text-[#4f8f74]'
                          : 'text-[#b35a3c]'
                      }
                    >
                      {quiz.isPublished ? 'Pubblicato' : 'Bozza'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(quiz)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef5f2] text-[#4f8f74]"
                    aria-label="Modifica quiz"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuiz(quiz)}
                    disabled={deleting}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7e8e5] text-[#d35237] disabled:opacity-50"
                    aria-label="Elimina quiz"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasFinalTest ? (
          <p className="mt-3 text-xs text-[#5a6a64]">
            Test Finale già presente. Puoi aggiungere altri Test Iniziali o Intermedi.
          </p>
        ) : null}
      </div>

      {isQuizModalOpen ? (
        <QuizBuilderModal
          isOpen={isQuizModalOpen}
          onClose={closeQuizModal}
          onBack={closeQuizModal}
          courseId={courseId}
          savedQuizId={editingQuizId}
          defaultQuizType={defaultQuizType}
          existingQuizzes={quizzes}
          onQuizSaved={handleQuizSaved}
          onSave={handleQuizSaved}
        />
      ) : null}
    </>
  );
}
