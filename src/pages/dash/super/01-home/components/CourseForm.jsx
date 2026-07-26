import React, { useEffect, useMemo } from 'react';
import { ImagePlus, Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, TextArea, FileInput, Select, Checkbox } from '../../../../../Forms';
import {
  COURSE_CATEGORY_OPTIONS,
  COURSE_FORMAT_OPTIONS,
  NAVIGATION_MODE_OPTIONS,
} from '../../../../../features/course/courseFormOptions';
import { showErrorToast } from '../../../../../utils/toast/toastAlerts';
import CourseLessonsSection from './CourseLessonsSection';
import CoursePackagesSection from './CoursePackagesSection';
import CoursePricingSection from './CoursePricingSection';

const getTodayDateString = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
};

function CourseFileField({ name, label, required, accept, icon: Icon, buttonLabel }) {
  const { control, watch } = useFormContext();
  const existingUrl = watch('thumbnailUrl');

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) => {
          if (!required) return true;
          if (value) return true;
          if (existingUrl) return true;
          return `${label} è obbligatorio`;
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div>
          <FileInput
            label={label}
            required={required}
            accept={accept}
            file={value}
            existingUrl={existingUrl}
            onChange={onChange}
            icon={Icon}
            buttonLabel={buttonLabel}
            variant="course"
          />
          {error?.message ? (
            <p className="mt-1 text-xs text-[#d35237]">{error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}

export default function CourseForm({
  quizData,
  savedCourseId,
  setShowQuizBuilder,
  onSaveCourse,
  onSaveAll,
  savingCourse,
  onClose,
  isEdit,
}) {
  const { watch, setValue, handleSubmit } = useFormContext();
  const inManutenzione = watch('inManutenzione');
  const dataInizio = watch('dataInizio');
  const dataFine = watch('dataFine');
  const today = useMemo(() => getTodayDateString(), []);
  const minEndDate = dataInizio && dataInizio >= today ? dataInizio : today;

  useEffect(() => {
    if (dataInizio && dataFine && dataFine < dataInizio) {
      setValue('dataFine', '');
    }
  }, [dataInizio, dataFine, setValue]);

  const submitCourse = handleSubmit((formData) => onSaveCourse(formData));
  const submitAll = handleSubmit((formData) => onSaveAll(formData));

  return (
    <>
      <Input
        name="titoloPianoFormativo"
        label="TITOLO PIANO FORMATIVO"
        placeholder="Titolo"
        required
        variant="course"
      />

      <Input
        name="idPianoFormativo"
        label="ID PIANO FORMATIVO"
        placeholder="Identificativo piano formativo"
        variant="course"
      />

      <TextArea
        name="descrizione"
        label="DESCRIZIONE"
        placeholder="Aggiungi una breve descrizione del corso oppure riferimenti legislativi"
        variant="course"
        rows={3}
      />

      <Input
        name="idAzioneFormativa"
        label="ID AZIONE FORMATIVA"
        placeholder="Genera automaticamente"
        variant="course"
      />
      <Input
        name="titoloIntervento"
        label="TITOLO DEL CORSO / TITOLO INTERVENTO FORMATIVO"
        placeholder="Titolo del corso"
        required
        variant="course"
      />

      <Input
        name="codiceCorso"
        label="CODICE CORSO"
        placeholder="Codice identificativo"
        variant="course"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Select
          name="category"
          label="CATEGORIA"
          options={COURSE_CATEGORY_OPTIONS}
          variant="course"
        />
        <Select
          name="format"
          label="FORMATO"
          options={COURSE_FORMAT_OPTIONS}
          variant="course"
        />
        <Select
          name="modalitaNavigazione"
          label="MODALITÀ NAVIGAZIONE"
          options={NAVIGATION_MODE_OPTIONS}
          variant="course"
        />
      </div>

      <Input
        name="aziendaFormazione"
        label="AZIENDA DI APPARTENENZA PER FORMAZIONE FINANZIATA"
        variant="course"
      />
      <Input
        name="dataInizio"
        label="DATA INIZIO CORSO"
        type="date"
        min={today}
        variant="course"
      />
      <Input
        name="dataFine"
        label="DATA FINE CORSO"
        type="date"
        min={minEndDate}
        variant="course"
      />
      <Input name="cig" label="CIG" variant="course" />
      <Input name="cup" label="CUP" variant="course" />
      <Input name="cip" label="CIP" variant="course" />
      <Input name="tipologia" label="TIPOLOGIA" variant="course" />
      <Input
        name="durata"
        label="DURATA (minuti)"
        type="number"
        min={1}
        placeholder="60"
        variant="course"
      />
      <Input
        name="durataOre"
        label="DURATA (ore)"
        type="number"
        min={1}
        placeholder="8"
        variant="course"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          name="validityDays"
          label="VALIDITÀ (giorni)"
          type="number"
          min={1}
          placeholder="90"
          variant="course"
        />
        <Input
          name="passScorePercent"
          label="PUNTEGGIO MINIMO (%)"
          type="number"
          min={0}
          max={100}
          placeholder="80"
          variant="course"
        />
      </div>
      <Input name="sedeCorso" label="SEDE DEL CORSO" variant="course" />
      <Input name="selezionaTipologia" label="SELEZIONA TIPOLOGIA" variant="course" />
      <Input
        name="settore"
        label="SETTORE"
        placeholder="SICUREZZA SUL LAVORO"
        variant="course"
      />
      <Input name="fondo" label="FONDO" variant="course" />
      <Input name="metodologia" label="METODOLOGIA" variant="course" />
      <Input
        name="responsabileProgetto"
        label="RESPONSABILE PROGETTO FORMATIVO"
        variant="course"
      />
      <Input name="tutor" label="TUTOR" variant="course" />

      <CoursePricingSection />

      <Checkbox
        name="soloB2B"
        label="Solo B2B (corso riservato alle aziende)"
        layout="inline"
      />

      <CoursePackagesSection />

      <CourseFileField
        name="thumbnailFile"
        label="Include Thumbnail Images"
        required={!isEdit}
        accept="image/*"
        icon={ImagePlus}
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={submitCourse}
          disabled={savingCourse}
          className="inline-flex h-10 items-center rounded-full bg-[#4f8f74] px-6 text-sm font-semibold text-white disabled:opacity-60"
        >
          {savingCourse ? 'Salvataggio...' : isEdit ? 'Aggiorna corso' : 'Salva corso'}
        </button>
      </div>

      <CourseLessonsSection courseId={savedCourseId} />

      <div className="rounded-xl bg-[#e8efec] p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <label className="text-[13px] font-medium text-[#222]">Quiz del corso</label>
            {quizData ? (
              <p className="mt-1 text-sm text-[#5a6a64]">
                {quizData.title} ({quizData.questions?.length || 0} domande)
              </p>
            ) : (
              <p className="mt-1 text-sm text-[#6b7471]">Nessun quiz configurato</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              if (!savedCourseId) {
                showErrorToast('Salva prima il corso per configurare il quiz');
                return;
              }
              setShowQuizBuilder(true);
            }}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[#71c2a3] px-4 text-sm font-medium text-white"
          >
            <Plus size={14} />
            {quizData ? 'Modifica quiz' : 'Aggiungi quiz'}
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pb-1">
        <button
          type="button"
          onClick={onClose}
          className="h-10 rounded-full border border-[#9bb5aa] px-5 text-sm font-medium text-[#5a6a64]"
        >
          Chiudi
        </button>
        <button
          type="button"
          onClick={() => setValue('inManutenzione', !inManutenzione)}
          className={`h-10 rounded-full border px-5 text-sm font-medium ${
            inManutenzione
              ? 'border-[#d35237] bg-[#f7e8e5] text-[#d35237]'
              : 'border-[#7fc4ab] text-[#71c2a3]'
          }`}
        >
          In manutenzione
        </button>
        <button
          type="button"
          onClick={submitAll}
          disabled={savingCourse}
          className="h-10 rounded-full bg-[#71c2a3] px-6 text-sm font-semibold text-white disabled:opacity-60"
        >
          {savingCourse ? 'Salvataggio...' : 'Salva tutto e chiudi'}
        </button>
      </div>
    </>
  );
}
