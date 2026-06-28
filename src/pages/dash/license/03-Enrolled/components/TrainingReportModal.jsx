import { ArrowLeft, Clock3 } from 'lucide-react';

const InfoField = ({ label, value }) => (
  <label className="block">
    <span className="mb-1 block text-sm font-semibold text-[#313131]">
      {label}
    </span>
    <input
      value={value}
      readOnly
      className="h-12 w-full rounded-lg border border-transparent bg-[#edf6f2] px-4 text-sm text-[#66706d]"
    />
  </label>
);

const TrainingReportModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#143428]/60 p-3 sm:p-6">
      <section className="mx-auto max-w-[1360px] rounded-xl bg-white p-4 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex text-[#2c2c2c]"
        >
          <ArrowLeft size={18} />
        </button>

        <header className="-mt-4 text-center">
          <h2 className="text-2xl font-semibold text-[#1f1f1f] md:text-3xl">
            Rapporto di Formazione Completo
          </h2>
          <p className="mt-1 text-sm text-[#4f4f4f]">
            Rapporto di Formazione Completo
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            className="rounded-full border border-[#9fd9c1] px-5 py-2 text-sm font-semibold text-[#73bfa1]"
          >
            Override Manuale
          </button>
          <button
            type="button"
            className="rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white"
          >
            Salva e conferma
          </button>
          <button
            type="button"
            className="rounded-full border border-[#9fd9c1] px-6 py-2 text-sm font-semibold text-[#73bfa1]"
          >
            Scarica
          </button>
        </div>

        <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoField label="" value="Titolo" />
          <InfoField label="Azienda" value="azienda" />
          <InfoField label="Nome" value="Nome" />
          <InfoField label="Cognome" value="Cognome" />
          <InfoField label="CIG" value="Z9E3C9B2A1" />
          <InfoField label="CUP" value="J5122000210007" />
          <div className="md:col-span-2">
            <InfoField label="CIP" value="FSE-SICURO1" />
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
          <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
            Struttura del Corso
          </h3>
          <p className="mt-3 rounded-lg bg-[#f6ecdd] px-4 py-3 text-lg font-medium text-[#d48c21] md:text-xl">
            Struttura del Corso
          </p>
          <p className="mt-3 rounded-lg bg-[#e6ece9] px-4 py-3 text-sm text-[#4e4e4e]">
            Oggetto: Figure nel Sistema di Prevenzione Aziendale
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
            <InfoField
              label="Titolo Piano Formativo"
              value="Titolo Piano Formativo"
            />
            <InfoField label="ID Piano Formativo" value="ID Piano Formativo" />
            <InfoField
              label="ID Azione Formativa"
              value="ID Azione Formativa"
            />
            <InfoField
              label="Titolo Intervento Forma..."
              value="course title"
            />
            <InfoField
              label="Azienda di Appartenenza"
              value="Azienda di Appartenenza"
            />

            <InfoField label="Cognome" value="Cognome" />
            <InfoField label="Nome" value="Nome" />
            <InfoField label="Codice Fiscale" value="Codice Fiscale" />
            <InfoField label="Data di Nascita" value="Data di Nascita" />
            <InfoField label="Data Inizio Corso" value="Data Inizio Corso" />

            <InfoField label="Data Fine Corso" value="Data Fine Corso" />
            <InfoField label="Data Fine Corso" value="Data Fine Corso" />
            <InfoField
              label="CIG* (Codice Identifica..."
              value="CIG* (Codice Identificativ...)"
            />
            <InfoField
              label="CUP* (Codice Unico di..."
              value="CUP* (Codice Unico di P...)"
            />
            <InfoField
              label="Tipologia* (Autorizzato..."
              value="Tipologia* (Autorizzato /...)"
            />

            <InfoField label="Durata (minuti)" value="Durata (minuti)" />
            <InfoField label="Sede del Corso" value="Sede del Corso" />
            <InfoField label="Settore" value="Settore" />
            <InfoField label="Fondo" value="Fondo" />
            <InfoField label="Metodologia" value="Metodologia" />
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <InfoField
              label="Responsabile Progetto Formativo"
              value="Responsabile Progetto Formativo"
            />
            <InfoField label="Tutor" value="Tutor" />
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
          <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
            Risultati del Test
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <InfoField label="Nome del Test" value="Test a Scelta Multipla" />
            <InfoField label="Data di Accesso" value="18/03/2024 19:04:09" />
            <div className="hidden lg:block" />
            <InfoField label="Punteggio" value="90%" />
            <InfoField label="Risultato" value="Superato" />
            <InfoField label="Tempo totale" value="00:07:21" />
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
          <div className="flex flex-wrap items-center gap-6">
            <div className="relative h-[90px] w-[90px]">
              <div className="absolute inset-0 rounded-full border-[9px] border-[#e3ebe8]" />
              <div className="absolute inset-0 rounded-full border-[9px] border-transparent border-t-[#73bfa1] border-r-[#73bfa1] border-b-[#73bfa1]" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-[#2f2f2f]">
                85%
              </div>
            </div>
            <div className="space-y-1 text-sm text-[#444444]">
              <p>
                Data di Accesso:{' '}
                <span className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                  18/03/2024
                </span>
              </p>
              <p>
                Tempo Trascorso:{' '}
                <span className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                  00:05:42
                </span>
              </p>
              <p className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                Soddisfazione del Partecipante
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
          <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
            Certificati e Documenti
          </h3>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-[#f6ecdd] px-4 py-3">
              <div>
                <p className="text-lg font-semibold text-[#2d2d2d] md:text-xl">
                  Certificato
                </p>
                <p className="text-xs text-[#5f5f5f]">
                  Scaricato il: 21/03/2024 11:24:58
                </p>
              </div>
              <button
                type="button"
                className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
              >
                Download
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#f6ecdd] px-4 py-3">
              <div>
                <p className="text-lg font-semibold text-[#2d2d2d] md:text-xl">
                  Report del corso
                </p>
                <p className="text-xs text-[#5f5f5f]">
                  Scaricato il: 21/03/2024 11:24:58
                </p>
              </div>
              <button
                type="button"
                className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
              >
                Download
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-[#f3f7f5] p-5">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-[#252525] md:text-2xl">
            <Clock3 size={20} /> Tempo totale di apprendimento
          </h3>
          <div className="mt-3 rounded-lg bg-[#f6ecdd] px-4 py-3">
            <p className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
              09:22:10{' '}
              <span className="text-base font-normal text-[#3f3f3f] md:text-lg">
                Ore totali trascorse nel corso
              </span>
            </p>
            <div className="mt-2 h-[6px] w-full rounded-full bg-[#d9d1c4]">
              <div className="h-[6px] w-[96%] rounded-full bg-[#73bfa1]" />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-dashed border-[#8f8f8f] p-5">
          <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
            Firma del Partecipante
          </h3>
          <div className="mx-auto mt-4 max-w-[620px] rounded-lg bg-[#f6ecdd] p-5 text-center">
            <p className="text-sm text-[#2f2f2f]">
              "Il partecipante (per accettazione e conferma)
            </p>
            <button
              type="button"
              className="mt-4 rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white"
            >
              Carica Firma
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default TrainingReportModal;
