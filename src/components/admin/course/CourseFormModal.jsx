import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Form } from '../../../Forms';
import { Modal } from '../../../components/ui';
import Loading from '../../../components/ui/Utilities/Loading';
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
} from '../../../features/api/courseApi';
import { buildCourseFormData, getCreatedCourseId, resolveCourseTenantId } from '../../../features/api/courseHelpers';
import {
  buildCourseFormDefaults,
  getEmptyCourseFormValues,
} from '../../../features/admin/adminMappers';
import {
  showSuccessToast,
  showErrorToast,
  showRtkErrorToast,
} from '../../../utils/toast/toastAlerts';
import { getRtkErrorMessage } from '../../../features/api/utils';
import CourseForm from './CourseForm';

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
  const [savedCourseId, setSavedCourseId] = useState(null);
  const authUser = useSelector((state) => state.auth.user);
  const courseTenantId = useMemo(() => resolveCourseTenantId(authUser), [authUser]);

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

  const formKey = isEdit
    ? `course-edit-${courseId}-${course?.updatedAt || course?.id || 'loading'}`
    : 'course-create';

  useEffect(() => {
    if (!isOpen) return;
    setSavedCourseId(isEdit ? courseId : null);
  }, [isOpen, isEdit, courseId]);

  useEffect(() => {
    if (!course?.id) return;
    setSavedCourseId(course.id);
  }, [course]);

  const persistCourse = async (formData) => {
    const currentCourseId = savedCourseId || courseId;
    const courseFields = stripCourseFormPayload(formData);
    const files = mapFormDataToCourseFiles(formData);

    if (currentCourseId) {
      const response = await updateCourse({
        courseId: currentCourseId,
        formData: buildCourseFormData(courseFields, files, courseTenantId),
      }).unwrap();
      return getCreatedCourseId(response) || currentCourseId;
    }

    const response = await createCourse(
      buildCourseFormData(courseFields, files, courseTenantId),
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
      finishAndClose(
        isEdit ? 'Corso aggiornato con successo' : 'Corso creato con successo',
      );
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
            savedCourseId={savedCourseId}
            onSaveCourse={handleSaveCourse}
            onSaveAll={handleSaveAll}
            savingCourse={savingCourse}
            onClose={onClose}
            isEdit={isEdit}
          />
        </Form>
      )}
    </Modal>
  );
}
