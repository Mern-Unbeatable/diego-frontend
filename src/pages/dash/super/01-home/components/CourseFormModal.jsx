import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Form } from '../../../../../Forms';
import { Modal } from '../../../../../components/ui';
import Loading from '../../../../../components/ui/Utilities/Loading';
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  usePublishQuizMutation,
} from '../../../../../features/api/courseApi';
import {
  buildCourseFormData,
  getCreatedCourseId,
  saveQuizForCourse,
} from '../../../../../features/api/courseHelpers';
import {
  buildCourseFormDefaults,
  getEmptyCourseFormValues,
} from '../../../../../features/admin/adminMappers';
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
  showRtkErrorToast,
} from '../../../../../utils/toast/toastAlerts';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import CourseForm from './CourseForm';
import QuizBuilderModal from './QuizBuilderModal';

const getCourseFromResponse = (response) => response?.course || response;

const mapFormDataToCourseFiles = (formData) => ({
  thumbnail: formData.thumbnailFile || null,
});

const stripCourseFormPayload = (formData) => {
  const { thumbnailFile, thumbnailUrl, ...courseFields } = formData;
  return courseFields;
};

const validatePackages = (formData) => {
  if (!formData.singleUserPackageId || !formData.companyPackageId) {
    showErrorToast('Seleziona sia il pacchetto privato sia quello aziendale per il corso');
    return false;
  }
  return true;
};

export default function CourseFormModal({
  isOpen,
  onClose,
  onSuccess,
  mode = 'create',
  courseId = null,
}) {
  const isEdit = mode === 'edit' && Boolean(courseId);

  const [quizData, setQuizData] = useState(null);
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const [savedCourseId, setSavedCourseId] = useState(null);
  const [savedQuizId, setSavedQuizId] = useState(null);

  const {
    data: courseResponse,
    isLoading: loadingCourse,
    isFetching: fetchingCourse,
    isError: courseLoadError,
    error: courseError,
  } = useGetCourseByIdQuery(courseId, {
    skip: !isOpen || !isEdit || !courseId,
    refetchOnMountOrArgChange: true,
  });

  const [createCourse, { isLoading: creatingCourse }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: updatingCourse }] = useUpdateCourseMutation();
  const [createQuiz] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();
  const [publishQuiz] = usePublishQuizMutation();

  const course = useMemo(
    () => (isEdit ? getCourseFromResponse(courseResponse) : null),
    [courseResponse, isEdit],
  );

  const savingCourse = creatingCourse || updatingCourse;
  const isLoadingCourse = isEdit && (loadingCourse || (fetchingCourse && !course));

  const defaultValues = useMemo(() => {
    if (isEdit && course) {
      return buildCourseFormDefaults(course);
    }
    return getEmptyCourseFormValues();
  }, [course, isEdit]);

  const displayedQuiz = useMemo(() => {
    if (quizData) return quizData;
    const existingQuiz = course?.quizzes?.[0];
    if (!existingQuiz) return null;
    return {
      title:
        typeof existingQuiz.quizTitle === 'string'
          ? existingQuiz.quizTitle
          : existingQuiz.quizTitle?.it || existingQuiz.quizTitle?.en || 'Quiz esistente',
      questions: [],
    };
  }, [quizData, course?.quizzes]);

  const formKey = isEdit
    ? `course-edit-${courseId}-${course?.updatedAt || course?.id || 'loading'}`
    : 'course-create';

  useEffect(() => {
    if (!isOpen) return;

    setQuizData(null);
    setShowQuizBuilder(false);
    setSavedQuizId(null);
    setSavedCourseId(isEdit ? courseId : null);
  }, [isOpen, isEdit, courseId]);

  useEffect(() => {
    if (!course) return;

    setSavedCourseId(course.id);
    const activeQuiz = course.quizzes?.[0];
    if (activeQuiz?.id) {
      setSavedQuizId(activeQuiz.id);
    }
  }, [course]);

  const persistCourse = async (formData) => {
    const currentCourseId = savedCourseId || courseId;
    const courseFields = stripCourseFormPayload(formData);
    const files = mapFormDataToCourseFiles(formData);

    if (currentCourseId) {
      const response = await updateCourse({
        courseId: currentCourseId,
        formData: buildCourseFormData(courseFields, files),
      }).unwrap();
      return getCreatedCourseId(response) || currentCourseId;
    }

    const response = await createCourse(
      buildCourseFormData(courseFields, files),
    ).unwrap();
    const newCourseId = getCreatedCourseId(response);
    if (!newCourseId) throw new Error('Corso creato ma ID non ricevuto dal server');
    return newCourseId;
  };

  const finishAndClose = (message) => {
    showSuccessToast(message);
    onSuccess?.();
    onClose();
  };

  const handleSaveCourse = async (formData) => {
    if (!validatePackages(formData)) return;

    try {
      await persistCourse(formData);
      finishAndClose(
        isEdit ? 'Corso aggiornato con successo' : 'Corso creato con successo',
      );
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const handleSaveAll = async (formData) => {
    if (!validatePackages(formData)) return;

    try {
      const nextCourseId = await persistCourse(formData);
      setSavedCourseId(nextCourseId);

      let quizError = null;
      if (quizData) {
        try {
          const quizResult = await saveQuizForCourse({
            courseId: nextCourseId,
            quizData: {
              ...quizData,
              savedQuizId: savedQuizId || quizData.savedQuizId || null,
            },
            createQuiz,
            updateQuiz,
            publishQuiz,
          });
          if (quizResult.quizId) setSavedQuizId(quizResult.quizId);
        } catch (error) {
          quizError = error;
        }
      }

      const parts = [
        isEdit ? 'Corso aggiornato' : 'Corso creato con successo',
      ];
      if (!quizError && quizData) parts.push('quiz salvato');
      if (quizError) parts.push('quiz non salvato');

      if (quizError) {
        showWarningToast(parts.join('. '));
        showRtkErrorToast(quizError);
        return;
      }

      finishAndClose(parts.join('. '));
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const courseLoadMessage = useMemo(
    () => getRtkErrorMessage(courseError),
    [courseError],
  );

  const isNetworkError = courseError?.status === 'FETCH_ERROR';
  const isAuthError = courseError?.status === 401
    || courseLoadMessage.toLowerCase().includes('token')
    || courseLoadMessage.toLowerCase().includes('unauthorized');

  if (!isOpen) return null;

  const title = isEdit ? 'Modifica Corso' : 'Aggiungi nuovi corsi';

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        zIndex={100}
        showCloseButton={false}
        panelClassName="max-w-[1000px] rounded-2xl bg-[#f3f3f3] p-6 md:p-10"
        className="bg-[#33584d]/78 p-3 md:p-6"
      >
        <div className="items-center">
          <button type="button" onClick={onClose} className="text-[#2a2a2a]" aria-label="Back">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-center text-[40px] font-semibold text-[#141414]">{title}</h2>
        </div>

        {isLoadingCourse ? (
          <Loading size="md" className="mt-10 min-h-60" />
        ) : courseLoadError ? (
          <div className="mx-auto mt-10 max-w-[720px] rounded-2xl border border-[#f0d4cf] bg-[#fff7f5] px-6 py-10 text-center">
            <p className="text-lg font-medium text-[#b42318]">Impossibile caricare il corso</p>
            <p className="mt-2 text-sm text-[#7a4f47]">
              {isNetworkError
                ? 'Impossibile contattare il server API. Avvia il backend (porta 5000) e riavvia il frontend.'
                : isAuthError
                  ? 'Sessione scaduta o non valida. Esci, accedi di nuovo e riprova.'
                  : courseLoadMessage || 'Riprova più tardi o seleziona un altro corso.'}
            </p>
            {courseError?.status ? (
              <p className="mt-2 text-xs text-[#9a6f66]">Codice errore: {courseError.status}</p>
            ) : null}
          </div>
        ) : (
          <Form
            key={formKey}
            defaultValues={defaultValues}
            onSubmit={() => {}}
            className="mx-auto mt-10 w-full max-w-[720px] space-y-4"
          >
            <CourseForm
              quizData={displayedQuiz}
              savedCourseId={savedCourseId}
              setShowQuizBuilder={setShowQuizBuilder}
              onSaveCourse={handleSaveCourse}
              onSaveAll={handleSaveAll}
              savingCourse={savingCourse}
              onClose={onClose}
              isEdit={isEdit}
            />
          </Form>
        )}
      </Modal>

      {showQuizBuilder ? (
        <QuizBuilderModal
          isOpen={showQuizBuilder}
          onClose={() => setShowQuizBuilder(false)}
          onBack={() => setShowQuizBuilder(false)}
          initialData={quizData}
          courseId={savedCourseId}
          savedQuizId={savedQuizId}
          onQuizSaved={(quizId) => setSavedQuizId(quizId)}
          onSave={(data) => {
            setQuizData(data);
            setShowQuizBuilder(false);
          }}
        />
      ) : null}
    </>
  );
}
