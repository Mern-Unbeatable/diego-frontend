import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  FileText,
  ImagePlus,
  Link2,
  Plus,
  X,
} from 'lucide-react';
import QuizBuilderModal from './QuizBuilderModal';

export default function AddCourseModal({ isOpen, onClose, onSave, courseData }) {
  const [formData, setFormData] = useState({
    titoloPianoFormativo: '',
    idPianoFormativo: '',
    idAzioneFormativa: '',
    titoloIntervento: '',
    aziendaFormazione: 'AUTORIZZATO',
    dataInizio: 'Sicurezza',
    dataFine: 'CIG (Testo)',
    cig: 'Codice IdenUnfcaUvo Gara',
    cup: 'Codice Unico di ProgeWo',
    cip: 'Codice IdenUnfcaUvo di ProgeWo',
    tipologia: 'Codice IdenUnfcaUvo di ProgeWo',
    durata: 'minuti',
    sedeCorso: 'minuti',
    selezionaTipologia: 'AUTORIZZATO',
    settore: 'SICUREZZA SUL LAVORO',
    fondo: 'FONDO',
    metodologia: 'METODOLOGIA',
    responsabileProgetto: 'RESPONSABILE PROGETTO FORMATIVO',
    tutor: 'TUTOR',
    prezzoVendita: 'PREZZO DI VENDITA (compreso di iva se dovuta)',
  });

  const [showQuizBuilder, setShowQuizBuilder] = useState(false);

  // Populate form data when editing
  useEffect(() => {
    if (courseData) {
      setFormData({
        titoloPianoFormativo: courseData.name || '',
        idPianoFormativo: courseData.description || '',
        idAzioneFormativa: courseData.id || '',
        titoloIntervento: courseData.name || '',
        aziendaFormazione: 'AUTORIZZATO',
        dataInizio: 'Sicurezza',
        dataFine: 'CIG (Testo)',
        cig: 'Codice IdenUnfcaUvo Gara',
        cup: 'Codice Unico di ProgeWo',
        cip: 'Codice IdenUnfcaUvo di ProgeWo',
        tipologia: 'Codice IdenUnfcaUvo di ProgeWo',
        durata: 'minuti',
        sedeCorso: 'minuti',
        selezionaTipologia: 'AUTORIZZATO',
        settore: 'SICUREZZA SUL LAVORO',
        fondo: 'FONDO',
        metodologia: 'METODOLOGIA',
        responsabileProgetto: 'RESPONSABILE PROGETTO FORMATIVO',
        tutor: 'TUTOR',
        prezzoVendita: 'PREZZO DI VENDITA (compreso di iva se dovuta)',
      });
    }
  }, [courseData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      titoloPianoFormativo: '',
      idPianoFormativo: '',
      idAzioneFormativa: '',
      titoloIntervento: '',
      aziendaFormazione: 'AUTORIZZATO',
      dataInizio: 'Sicurezza',
      dataFine: 'CIG (Testo)',
      cig: 'Codice IdenUnfcaUvo Gara',
      cup: 'Codice Unico di ProgeWo',
      cip: 'Codice IdenUnfcaUvo di ProgeWo',
      tipologia: 'Codice IdenUnfcaUvo di ProgeWo',
      durata: 'minuti',
      sedeCorso: 'minuti',
      selezionaTipologia: 'AUTORIZZATO',
      settore: 'SICUREZZA SUL LAVORO',
      fondo: 'FONDO',
      metodologia: 'METODOLOGIA',
      responsabileProgetto: 'RESPONSABILE PROGETTO FORMATIVO',
      tutor: 'TUTOR',
      prezzoVendita: 'PREZZO DI VENDITA (compreso di iva se dovuta)',
    });
  };

  const handleOpenQuizBuilder = () => {
    setShowQuizBuilder(true);
  };

  const handleQuizSave = (quizData) => {
    console.log('Quiz saved:', quizData);
    setShowQuizBuilder(false);
  };

  const handleQuizClose = () => {
    setShowQuizBuilder(false);
  };

  if (!isOpen) return null;

  const inputClass =
    'w-full rounded-xl bg-[#dfe8e4] px-4 py-3 text-sm text-[#222] placeholder:text-[#87938f] focus:outline-none';

  const selectClass =
    'w-full appearance-none rounded-xl bg-[#dfe8e4] px-4 py-3 pr-10 text-sm text-[#4a4a4a] focus:outline-none';

  const thumbCard = (key) => (
    <div
      key={key}
      className="relative h-14 w-14 overflow-hidden rounded-lg bg-[#d8e2de]"
    >
      <div className="h-full w-full bg-[linear-gradient(160deg,#dce8e4_0%,#bfd3cc_100%)]" />
      <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-bl-md bg-[#d35237] text-[10px] text-white">
        <X size={10} />
      </span>
    </div>
  );

  const docCard = (key, label) => (
    <div
      key={key}
      className="relative flex h-14 w-14 items-center justify-center rounded-lg border border-[#cfd9d4] bg-white"
    >
      <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-bl-md bg-[#d35237] text-[10px] text-white">
        <X size={10} />
      </span>
      <div className="flex flex-col items-center">
        <FileText size={20} className="text-[#4f8de4]" />
        <span className="mt-0.5 text-[10px] font-semibold text-[#e25647]">{label}</span>
      </div>
    </div>
  );

  const selectField = (label, field) => (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-[#222]">
        {label}
        <span className="text-[#f04c42]">*</span>
      </label>
      <div className="relative">
        <select
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={selectClass}
        >
          <option>{formData[field]}</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f6764]" />
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 z-[20] flex items-center justify-center bg-[#33584d]/78 p-3 md:p-6">
        <div className="max-h-[96vh] w-full max-w-[1000px] overflow-y-auto rounded-2xl bg-[#f3f3f3] p-6 md:p-10">
          <div className=" items-center">
            <button
              type="button"
              onClick={onClose}
              className="text-[#2a2a2a]"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-center text-[40px] font-semibold text-[#141414]">
              {courseData ? 'Modifica Corso' : 'Aggiungi nuovi corsi'}
            </h2>
            <div />
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-10 w-full max-w-[720px] space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#222]">
                TITOLO PIANO FORMATIVO
                <span className="text-[#f04c42]">*</span>
              </label>
              <input
                value={formData.titoloPianoFormativo}
                onChange={(e) => handleInputChange('titoloPianoFormativo', e.target.value)}
                placeholder="Titolo"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#222]">
                ID PIANO FORMATIVO
                <span className="text-[#f04c42]">*</span>
              </label>
              <textarea
                value={formData.idPianoFormativo}
                onChange={(e) => handleInputChange('idPianoFormativo', e.target.value)}
                placeholder="Aggiungi una breve descrizione del corso oppure riferimenti legislativi"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#222]">
                ID AZIONE FORMATIVA
                <span className="text-[#f04c42]">*</span>
              </label>
              <input
                value={formData.idAzioneFormativa}
                onChange={(e) => handleInputChange('idAzioneFormativa', e.target.value)}
                placeholder="Genera automaticamente"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#222]">
                TITOLO DEL CORSO / TITOLO INTERVENTO FORMATIVO
                <span className="text-[#f04c42]">*</span>
              </label>
              <input
                value={formData.titoloIntervento}
                onChange={(e) => handleInputChange('titoloIntervento', e.target.value)}
                placeholder="Genera automaticamente"
                className={inputClass}
              />
            </div>

            {selectField('AZIENDA DI APPARTENENZA PER FORMAZIONE FINANZIATA', 'aziendaFormazione')}
            {selectField('DATA INIZIO CORSO', 'dataInizio')}
            {selectField('DATA FINE CORSO', 'dataFine')}
            {selectField('CIG', 'cig')}
            {selectField('CUP', 'cup')}
            {selectField('CIP', 'cip')}
            {selectField('TIPOLOGIA', 'tipologia')}
            {selectField('DURATA', 'durata')}
            {selectField('SEDE DEL CORSO', 'sedeCorso')}
            {selectField('SELEZIONA TIPOLOGIA', 'selezionaTipologia')}
            {selectField('SETTORE', 'settore')}
            {selectField('FONDO', 'fondo')}
            {selectField('METODOLOGIA', 'metodologia')}
            {selectField('RESPONSABILE PROGETTO FORMATIVO', 'responsabileProgetto')}
            {selectField('TUTOR', 'tutor')}
            {selectField('PREZZO DI VENDITA (compreso di iva se dovuta)', 'prezzoVendita')}

            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#222]">
                Caricamento materiale
                <span className="text-[#f04c42]">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4].map((item) => thumbCard(item))}
                <button
                  type="button"
                  className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#dfe8e4] text-[#6b7471]"
                  aria-label="Add material"
                >
                  <ImagePlus size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#222]">
                Include Thumbnail Images
                <span className="text-[#f04c42]">*</span>
              </label>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">{thumbCard('single-thumb')}</div>
                <button
                  type="button"
                  className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#dfe8e4] text-[#6b7471]"
                  aria-label="Add thumbnail"
                >
                  <ImagePlus size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#222]">
                Aggiungi documenti al tuo corso
                <span className="text-[#f04c42]">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {docCard('doc-pdf-1', 'PDF')}
                {docCard('doc-doc-1', 'DOC')}
                {docCard('doc-pdf-2', 'PDF')}
                {docCard('doc-doc-2', 'DOC')}
                <button
                  type="button"
                  className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#dfe8e4] text-[#6b7471]"
                  aria-label="Attach file"
                >
                  <Link2 size={18} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenQuizBuilder}
              className="mt-1 inline-flex h-11 items-center gap-2 rounded-full bg-[#71c2a3] px-5 text-sm font-medium text-white"
            >
              <Plus size={16} />
              Aggiungi quiz
            </button>

            <div className="mt-6 flex items-center justify-end gap-3 pb-1">
              <button
                type="button"
                className="h-10 rounded-full border border-[#7fc4ab] px-5 text-sm font-medium text-[#71c2a3]"
              >
                In manutenzione
              </button>
              <button
                type="submit"
                className="h-10 rounded-full bg-[#71c2a3] px-6 text-sm font-semibold text-white"
              >
                {courseData ? 'Aggiorna' : 'Salva'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quiz Builder Modal */}
      <QuizBuilderModal
        isOpen={showQuizBuilder}
        onClose={handleQuizClose}
        onSave={handleQuizSave}
      />
    </>
  );
}