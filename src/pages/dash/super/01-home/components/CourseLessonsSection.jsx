import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  useGetCourseLessonsQuery,
  useDeleteLessonMutation,
} from '../../../../../features/api/courseApi';
import { getLessonDisplayTitle } from '../../../../../features/admin/adminMappers';
import {
  showSuccessToast,
  showErrorToast,
  showRtkErrorToast,
} from '../../../../../utils/toast/toastAlerts';
import LessonFormModal from './LessonFormModal';

const CONTENT_TYPE_LABELS = {
  VIDEO_YOUTUBE: 'Video YouTube',
  PDF: 'PDF',
  SCORM_12: 'SCORM 1.2',
  SCORM: 'SCORM',
  FILE: 'File',
};

export default function CourseLessonsSection({ courseId }) {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState(null);

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetCourseLessonsQuery(
    { courseId, limit: 100 },
    { skip: !courseId },
  );

  const [deleteLesson, { isLoading: deleting }] = useDeleteLessonMutation();

  const lessons = data?.lessons ?? [];

  const openCreateModal = () => {
    if (!courseId) {
      showErrorToast('Salva prima il corso con il pulsante "Salva corso"');
      return;
    }
    setEditingLessonId(null);
    setIsLessonModalOpen(true);
  };

  const openEditModal = (lesson) => {
    setEditingLessonId(lesson.id);
    setIsLessonModalOpen(true);
  };

  const closeLessonModal = () => {
    setIsLessonModalOpen(false);
    setEditingLessonId(null);
  };

  const handleDeleteLesson = async (lesson) => {
    if (!courseId || !lesson?.id) return;

    const confirmed = window.confirm(
      `Eliminare la lezione "${getLessonDisplayTitle(lesson)}"?`,
    );
    if (!confirmed) return;

    try {
      await deleteLesson({ courseId, lessonId: lesson.id }).unwrap();
      showSuccessToast('Lezione eliminata con successo');
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
            <label className="text-[13px] font-medium text-[#222]">Lezioni del corso</label>
            {courseId ? (
              <p className="mt-1 text-xs text-[#5a8f74]">
                Gestisci le lezioni del corso
              </p>
            ) : (
              <p className="mt-1 text-xs text-[#b35a3c]">
                Salva prima il corso per abilitare le lezioni
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
            Aggiungi lezione
          </button>
        </div>

        {isLoading || isFetching ? (
          <p className="text-sm text-[#6b7471]">Caricamento lezioni...</p>
        ) : lessons.length === 0 ? (
          <p className="text-sm text-[#6b7471]">
            Nessuna lezione aggiunta. Clicca &quot;Aggiungi lezione&quot; per crearne una.
          </p>
        ) : (
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#222]">
                    {index + 1}. {getLessonDisplayTitle(lesson)}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5a6a64]">
                    <span className="rounded-full bg-[#eef5f2] px-2 py-0.5">
                      {CONTENT_TYPE_LABELS[lesson.contentType] || lesson.contentType}
                    </span>
                    {lesson.durationSecs ? (
                      <span>{lesson.durationSecs}s</span>
                    ) : null}
                    {lesson.isRequired ? (
                      <span className="text-[#4f8f74]">Obbligatoria</span>
                    ) : null}
                    {lesson.isLocked ? (
                      <span className="text-[#b35a3c]">Bloccata</span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(lesson)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef5f2] text-[#4f8f74]"
                    aria-label="Modifica lezione"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteLesson(lesson)}
                    disabled={deleting}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7e8e5] text-[#d35237] disabled:opacity-50"
                    aria-label="Elimina lezione"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isLessonModalOpen && (
        <LessonFormModal
          isOpen={isLessonModalOpen}
          onClose={closeLessonModal}
          courseId={courseId}
          lessonId={editingLessonId}
          defaultOrderIndex={lessons.length}
          onSuccess={refetch}
        />
      )}
    </>
  );
}
