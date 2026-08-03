import React from 'react';
import {
  ArrowLeft,
  CircleCheckBig,
  Clock3,
  Download,
  PencilLine,
  Save,
} from 'lucide-react';

const topInfoRows = [
  ['Titolo del Corso', 'Titolo', 'Azienda', 'azienda'],
  ['Nome', 'Nome', 'Cognome', 'Cognome'],
  ['CIG', 'ZGE3C9B2A1', 'CUP', 'J5122000210007'],
];

const structureFields = [
  ['Titolo Piano Formativo', 'Titolo Piano Formativo'],
  ['ID Piano Formativo', 'ID Piano Formativo'],
  ['ID Azione Formativa', 'ID Azione Formativa'],
  ['Titolo Intervento Formativo', 'course title'],
  ['Azienda di Appartenenza', 'Azienda di Appartenenza'],
  ['Cognome', 'Cognome'],
  ['Nome', 'Nome'],
  ['Codice Fiscale', 'Codice Fiscale'],
  ['Data di Nascita', 'Data di Nascita'],
  ['Data Inizio Corso', 'Data Inizio Corso'],
  ['Data Fine Corso', 'Data Fine Corso'],
  ['Data Fine Corso', 'Data Fine Corso'],
  ['CIG* (Codice Identificativo Gara)', 'CIG* (Codice Identificativo Gara)'],
  ['CUP* (Codice Unico di Progetto)', 'CUP* (Codice Unico di Progetto)'],
  ['Tipologia* (Autorizzato/FAD)', 'Tipologia* (Autorizzato/FAD)'],
  ['Durata (minuti)', 'Durata (minuti)'],
  ['Sede del Corso', 'Sede del Corso'],
  ['Settore', 'Settore'],
  ['Fondo', 'Fondo'],
  ['Metodologia', 'Metodologia'],
];

function SectionCard({ title, icon: Icon, children }) {
  return (
    <section className="rounded-xl bg-[#edf1ef] p-4 sm:rounded-2xl sm:p-5 md:p-6">
      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-[#1f1f1f] sm:mb-4 sm:text-lg md:text-xl">
        {Icon ? <Icon size={18} className="shrink-0" /> : null}
        <span className="min-w-0 break-words">{title}</span>
      </h3>
      {children}
    </section>
  );
}

function LabelValue({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-xs font-medium text-[#383838] sm:text-sm">{label}</p>
      <div className="rounded-lg bg-[#dfe8e4] px-3 py-2.5 text-sm break-words text-[#5a6660] sm:px-4">
        {value}
      </div>
    </div>
  );
}

export default function FullTrainingReportModal({ isOpen, onClose, onBack }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Rapporto di Formazione Completo"
    >
      <div
        className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-[#f5f5f5] shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="shrink-0 border-b border-gray-200 bg-white px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack || onClose}
              className="rounded-lg p-2 text-[#222] hover:bg-gray-100"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="min-w-0 flex-1 text-center">
              <h2 className="text-base font-semibold text-[#141414] sm:text-lg md:text-xl">
                Rapporto di Formazione Completo
              </h2>
              <p className="text-xs text-[#6b6b6b] sm:text-sm">
                Dettaglio formazione e risultati
              </p>
            </div>
            <div className="w-9" />
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:flex-wrap sm:justify-end">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#8dc8b0] px-4 text-sm font-medium text-[#72bf9f] sm:h-10"
            >
              <PencilLine size={14} />
              Override Manuale
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#71c2a3] px-4 text-sm font-medium text-white sm:h-10"
            >
              <Save size={14} />
              Salva e conferma
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#8dc8b0] px-4 text-sm font-medium text-[#72bf9f] sm:h-10"
            >
              <Download size={14} />
              Scarica
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 md:p-6">
          <section className="mb-4 grid grid-cols-1 gap-3 sm:mb-5 sm:grid-cols-2 sm:gap-4">
            {topInfoRows.map(
              ([leftLabel, leftValue, rightLabel, rightValue], index) => (
                <React.Fragment key={index}>
                  <LabelValue label={leftLabel} value={leftValue} />
                  <LabelValue label={rightLabel} value={rightValue} />
                </React.Fragment>
              ),
            )}
            <div className="sm:col-span-2">
              <LabelValue label="CIP" value="FSE-SICURO1" />
            </div>
          </section>

          <div className="space-y-4 sm:space-y-5">
            <SectionCard title="Struttura del Corso">
              <div className="mb-3 rounded-lg bg-[#efe5d7] px-3 py-2 text-sm font-medium text-[#c47a12] sm:px-4 sm:text-base">
                Struttura del Corso
              </div>
              <div className="mb-4 rounded-lg bg-[#dfe4e2] px-3 py-2 text-sm text-[#3d3d3d] sm:px-4">
                Oggetto: Figure nel Sistema di Prevenzione Aziendale
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {structureFields.map(([label, value], index) => (
                  <LabelValue key={index} label={label} value={value} />
                ))}
                <div className="sm:col-span-2">
                  <LabelValue
                    label="Responsabile Progetto Formativo"
                    value="Responsabile Progetto Formativo"
                  />
                </div>
                <div className="sm:col-span-2">
                  <LabelValue label="Tutor" value="Tutor" />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Risultati del Test" icon={CircleCheckBig}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <LabelValue label="Nome del Test" value="Test a Scelta Multipla" />
                <LabelValue label="Data di Accesso" value="18/03/2024 19:04:09" />
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <LabelValue label="Punteggio" value="90%" />
                <LabelValue label="Risultato" value="Superato" />
                <LabelValue label="Tempo totale" value="00:07:21" />
              </div>
            </SectionCard>

            <SectionCard title="Valutazione della Soddisfazione">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[6px] border-[#71c2a3] border-t-[#d9dedb] text-sm font-semibold text-[#1d1d1d] sm:h-24 sm:w-24 sm:text-base">
                  85%
                </div>
                <div className="space-y-1 text-sm text-[#2e2e2e] sm:text-base">
                  <p>
                    Data di Accesso:{' '}
                    <span className="font-semibold">18/03/2024</span>
                  </p>
                  <p>
                    Tempo Trascorso:{' '}
                    <span className="font-semibold">00:05:42</span>
                  </p>
                  <p className="font-medium text-[#161616]">
                    Soddisfazione del Partecipante
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Certificati e Documenti">
              {['Certificato', 'Report del corso'].map((doc) => (
                <div
                  key={doc}
                  className="mb-2 flex flex-col gap-3 rounded-xl bg-[#efe5d7] px-3 py-3 last:mb-0 sm:mb-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#151515] sm:text-base">
                      {doc}
                    </p>
                    <p className="text-xs text-[#2f2f2f] sm:text-sm">
                      Scaricato il: 21/03/2024 11:24:58
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#71c2a3] px-4 text-sm font-medium text-white sm:h-10 sm:w-auto"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              ))}
            </SectionCard>

            <SectionCard title="Tempo totale di apprendimento" icon={Clock3}>
              <div className="rounded-xl bg-[#efe5d7] px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-sm text-[#222]">
                  <span className="font-semibold">09:22:10</span> Ore totali
                  trascorse nel corso
                </p>
                <div className="mt-3 h-2 rounded-full bg-[#d6d0c7]">
                  <div className="h-full w-full rounded-full bg-[#71c2a3]" />
                </div>
              </div>
            </SectionCard>

            <section className="rounded-xl border-2 border-dashed border-[#8f8f8f] p-4 sm:rounded-2xl sm:p-6">
              <h3 className="mb-3 text-base font-semibold text-[#1f1f1f] sm:mb-4 sm:text-lg">
                Firma del Partecipante
              </h3>
              <div className="mx-auto max-w-md rounded-xl bg-[#efe5d7] px-4 py-6 text-center">
                <p className="mb-3 text-sm text-[#2a2a2a]">
                  Il partecipante (per accettazione e conferma)
                </p>
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-[#71c2a3] px-6 text-sm font-medium text-white sm:h-10"
                >
                  Carica Firma
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
