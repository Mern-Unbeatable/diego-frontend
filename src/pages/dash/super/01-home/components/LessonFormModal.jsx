import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form, Input, Select, Checkbox, FileInput } from '../../../../../Forms';
import { Modal } from '../../../../../components/ui';
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useLazyGetLessonByIdQuery,
} from '../../../../../features/api/courseApi';
import { buildLessonFormData } from '../../../../../features/api/courseHelpers';
import {
  getEmptyLessonFormValues,
  mapApiLessonToFormValues,
} from '../../../../../features/admin/adminMappers';
import {
  showSuccessToast,
  showRtkErrorToast,
} from '../../../../../utils/toast/toastAlerts';

const LESSON_CONTENT_OPTIONS = [
  { value: 'VIDEO_YOUTUBE', label: 'Video YouTube' },
  { value: 'PDF', label: 'PDF' },
  { value: 'SCORM_12', label: 'SCORM 1.2' },
  { value: 'FILE', label: 'File' },
];

function LessonFileField({ name, accept, buttonLabel, required }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? 'File lezione obbligatorio' : false,
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div>
          <FileInput
            accept={accept}
            file={value}
            onChange={onChange}
            buttonLabel={buttonLabel}
            variant="course"
            required={required}
          />
          {error?.message ? (
            <p className="mt-1 text-xs text-[#d35237]">{error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}

function LessonFormFields({ isEdit, onClose, onSubmit, saving }) {
  const { watch, setValue, handleSubmit } = useFormContext();
  const contentType = watch('contentType') || 'VIDEO_YOUTUBE';

  const handleContentTypeChange = (value) => {
    setValue('file', null);
    setValue('youtubeUrl', '');
    setValue(
      'scormEntryPoint',
      value === 'SCORM' || value === 'SCORM_12' ? 'index_lms.html' : '',
    );
  };

  const requiresFile =
    !isEdit &&
    contentType !== 'VIDEO_YOUTUBE';

  return (
    <>
      <Input
        name="titleIt"
        label="TITOLO (IT)"
        placeholder="Modulo 1: Cos'è lo sviluppo web?"
        required
        variant="course"
      />
      <Input
        name="titleEn"
        label="TITOLO (EN)"
        placeholder="Module 1: What is Web Development?"
        required
        variant="course"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Select
          name="contentType"
          label="TIPO CONTENUTO"
          options={LESSON_CONTENT_OPTIONS}
          variant="course"
          onChange={handleContentTypeChange}
        />
        <Input
          name="durationSecs"
          label="DURATA (SECONDI)"
          type="number"
          min={1}
          placeholder="600"
          variant="course"
        />
        <Input
          name="orderIndex"
          label="ORDINE"
          type="number"
          min={0}
          variant="course"
        />
      </div>

      {contentType === 'VIDEO_YOUTUBE' ? (
        <Input
          name="youtubeUrl"
          label="URL YOUTUBE"
          placeholder="https://www.youtube.com/watch?v=..."
          required
          variant="course"
        />
      ) : null}

      {(contentType === 'SCORM' || contentType === 'SCORM_12') && (
        <>
          <Input
            name="scormEntryPoint"
            label="ENTRY POINT SCORM"
            placeholder="index_lms.html"
            variant="course"
          />
          <LessonFileField
            name="file"
            accept=".zip,application/zip"
            buttonLabel="Pacchetto SCORM (.zip)"
            required={requiresFile}
          />
        </>
      )}

      {contentType !== 'VIDEO_YOUTUBE' &&
      contentType !== 'SCORM' &&
      contentType !== 'SCORM_12' ? (
        <LessonFileField
          name="file"
          accept=".pdf,.doc,.docx,.zip,application/pdf,application/zip"
          buttonLabel="File lezione"
          required={requiresFile}
        />
      ) : null}

      <div className="flex flex-wrap gap-4">
        <Checkbox name="isRequired" label="Obbligatoria" layout="inline" />
        <Checkbox name="isLocked" label="Bloccata" layout="inline" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pb-1">
        <button
          type="button"
          onClick={onClose}
          className="h-10 rounded-full border border-[#9bb5aa] px-5 text-sm font-medium text-[#5a6a64]"
        >
          Annulla
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="h-10 rounded-full bg-[#71c2a3] px-6 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? 'Salvataggio...' : isEdit ? 'Aggiorna lezione' : 'Salva lezione'}
        </button>
      </div>
    </>
  );
}

const getLessonFromResponse = (response) => response?.lesson || response;

export default function LessonFormModal({
  isOpen,
  onClose,
  courseId,
  lessonId = null,
  defaultOrderIndex = 0,
  onSuccess,
}) {
  const isEdit = Boolean(lessonId);

  const [createLesson, { isLoading: creating }] = useCreateLessonMutation();
  const [updateLesson, { isLoading: updating }] = useUpdateLessonMutation();
  const [fetchLessonById, { data: lessonResponse, isFetching: loadingLesson }] =
    useLazyGetLessonByIdQuery();

  const saving = creating || updating || loadingLesson;

  const loadedLesson = useMemo(() => {
    if (!lessonResponse) return null;
    return getLessonFromResponse(lessonResponse);
  }, [lessonResponse]);

  const defaultValues = useMemo(() => {
    if (loadedLesson) {
      return mapApiLessonToFormValues(loadedLesson, loadedLesson.orderIndex ?? defaultOrderIndex);
    }
    return getEmptyLessonFormValues(defaultOrderIndex);
  }, [loadedLesson, defaultOrderIndex, isOpen, lessonId]);

  useEffect(() => {
    if (!isOpen || !lessonId || !courseId) return;
    fetchLessonById({ courseId, lessonId });
  }, [isOpen, lessonId, courseId, fetchLessonById]);

  const handleSubmit = async (formData) => {
    if (!courseId) return;

    try {
      const formDataPayload = buildLessonFormData(formData, formData.orderIndex ?? defaultOrderIndex, {
        isUpdate: isEdit,
      });

      if (!formDataPayload) {
        showRtkErrorToast({ data: { message: 'Compila tutti i campi obbligatori della lezione' } });
        return;
      }

      if (isEdit) {
        await updateLesson({
          courseId,
          lessonId,
          formData: formDataPayload,
        }).unwrap();
        showSuccessToast('Lezione aggiornata con successo');
      } else {
        await createLesson({
          courseId,
          formData: formDataPayload,
        }).unwrap();
        showSuccessToast('Lezione creata con successo');
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  if (!isOpen) return null;

  const title = isEdit ? 'Modifica lezione' : 'Aggiungi lezione';

  const modalContent = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      zIndex={110}
      showCloseButton={false}
      panelClassName="max-w-[760px] rounded-2xl bg-[#f3f3f3] p-6 md:p-10"
      className="bg-[#33584d]/78 p-3 md:p-6"
    >
      <div className="items-center">
        <button type="button" onClick={onClose} className="text-[#2a2a2a]" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-center text-[32px] font-semibold text-[#141414]">{title}</h2>
      </div>

      {loadingLesson && isEdit ? (
        <p className="mt-8 text-center text-sm text-[#5a6a64]">Caricamento lezione...</p>
      ) : (
        <Form
          key={`lesson-form-${isOpen}-${lessonId || 'new'}-${loadedLesson?.id || 'create'}`}
          defaultValues={defaultValues}
          onSubmit={() => {}}
          className="mx-auto mt-8 w-full max-w-[640px] space-y-4"
        >
          <LessonFormFields
            isEdit={isEdit}
            onClose={onClose}
            onSubmit={handleSubmit}
            saving={saving}
          />
        </Form>
      )}
    </Modal>
  );

  return createPortal(modalContent, document.body);
}
