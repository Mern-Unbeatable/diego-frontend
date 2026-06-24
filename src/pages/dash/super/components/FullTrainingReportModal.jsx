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
        <section className="rounded-3xl bg-[#edf1ef] p-6 md:p-8">
            <h3 className="mb-5 flex items-center gap-2 text-[34px] font-semibold text-[#1f1f1f]">
                {Icon ? <Icon size={24} /> : null}
                {title}
            </h3>
            {children}
        </section>
    );
}

function LabelValue({ label, value }) {
    return (
        <div>
            <p className="mb-2 text-[20px] font-medium text-[#383838]">{label}</p>
            <div className="rounded-xl bg-[#dfe8e4] px-4 py-3 text-[16px] text-[#7b8781]">
                {value}
            </div>
        </div>
    );
}

export default function FullTrainingReportModal({ isOpen, onClose, onBack }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#33584d]/78 p-3 md:p-6"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Rapporto di Formazione Completo"
        >
            <div
                className="max-h-[96vh] w-full max-w-[1520px] overflow-y-auto rounded-2xl bg-[#f5f5f5] p-6 md:p-10"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="mb-8">
                    <div className="grid grid-cols-[40px_1fr_40px] items-center">
                        <button
                            type="button"
                            onClick={onBack || onClose}
                            className="text-[#222]"
                            aria-label="Back"
                        >
                            <ArrowLeft size={22} />
                        </button>
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-[#141414] md:text-4xl">
                                Rapporto di Formazione Completo
                            </h2>
                            <p className="text-xl text-[#2f2f2f]">Rapporto di Formazione Completo</p>
                        </div>
                        <div />
                    </div>

                    <div className="mt-6 flex flex-wrap justify-end gap-3">
                        <button
                            type="button"
                            className="inline-flex h-[52px] items-center gap-2 rounded-full border border-[#8dc8b0] px-5 text-xl font-medium text-[#72bf9f]"
                        >
                            <PencilLine size={16} />
                            Override Manuale
                        </button>
                        <button
                            type="button"
                            className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#71c2a3] px-7 text-xl font-medium text-white"
                        >
                            <Save size={16} />
                            Salva e conferma
                        </button>
                        <button
                            type="button"
                            className="inline-flex h-[52px] items-center gap-2 rounded-full border border-[#8dc8b0] px-5 text-xl font-medium text-[#72bf9f]"
                        >
                            <Download size={16} />
                            Scarica
                        </button>
                    </div>
                </header>

                <section className="mb-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                    {topInfoRows.map(([leftLabel, leftValue, rightLabel, rightValue], index) => (
                        <React.Fragment key={index}>
                            <LabelValue label={leftLabel} value={leftValue} />
                            <LabelValue label={rightLabel} value={rightValue} />
                        </React.Fragment>
                    ))}
                    <div className="md:col-span-2">
                        <LabelValue label="CIP" value="FSE-SICURO1" />
                    </div>
                </section>

                <div className="space-y-7">
                    <SectionCard title="Struttura del Corso">
                        <div className="mb-4 rounded-lg bg-[#efe5d7] px-4 py-3 text-[36px] text-[#ec9b1e]">
                            Struttura del Corso
                        </div>
                        <div className="mb-5 rounded-lg bg-[#dfe4e2] px-4 py-3 text-[22px] text-[#3d3d3d]">
                            Oggetto: Figure nel Sistema di Prevenzione Aziendale
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                            {structureFields.map(([label, value], index) => (
                                <LabelValue key={index} label={label} value={value} />
                            ))}
                            <div className="lg:col-span-2">
                                <LabelValue
                                    label="Responsabile Progetto Formativo"
                                    value="Responsabile Progetto Formativo"
                                />
                            </div>
                            <div className="lg:col-span-3">
                                <LabelValue label="Tutor" value="Tutor" />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Risultati del Test" icon={CircleCheckBig}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <LabelValue label="Nome del Test" value="Test a Scelta Multipla" />
                            <LabelValue label="Data di Accesso" value="18/03/2024 19:04:09" />
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                            <LabelValue label="Punteggio" value="90%" />
                            <LabelValue label="Risultato" value="Superato" />
                            <LabelValue label="Tempo totale" value="00:07:21" />
                        </div>
                    </SectionCard>

                    <SectionCard title="Valutazione della Soddisfazione">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center">
                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-[#71c2a3] border-t-[#d9dedb] text-lg font-semibold text-[#1d1d1d]">
                                85%
                            </div>
                            <div className="space-y-2">
                                <p className="text-xl text-[#2e2e2e]">
                                    Data di Accesso: <span className="font-semibold">18/03/2024</span>
                                </p>
                                <p className="text-xl text-[#2e2e2e]">
                                    Tempo Trascorso: <span className="font-semibold">00:05:42</span>
                                </p>
                                <p className="text-xl font-medium text-[#161616]">Soddisfazione del Partecipante</p>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Certificati e Documenti">
                        {["Certificato", "Report del corso"].map((doc) => (
                            <div
                                key={doc}
                                className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#efe5d7] px-5 py-4 last:mb-0"
                            >
                                <div>
                                    <p className="text-2xl font-medium text-[#151515]">{doc}</p>
                                    <p className="text-xl text-[#2f2f2f]">Scaricato il: 21/03/2024 11:24:58</p>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex h-12 items-center gap-2 rounded-full bg-[#71c2a3] px-6 text-xl font-medium text-white"
                                >
                                    <Download size={16} />
                                    Download
                                </button>
                            </div>
                        ))}
                    </SectionCard>

                    <SectionCard title="Tempo totale di apprendimento" icon={Clock3}>
                        <div className="rounded-xl bg-[#efe5d7] px-5 py-4">
                            <p className="text-lg text-[#222]">
                                <span className="font-semibold">09:22:10</span> Ore totali trascorse nel corso
                            </p>
                            <div className="mt-3 h-[8px] rounded-full bg-[#d6d0c7]">
                                <div className="h-full w-full rounded-full bg-[#71c2a3]" />
                            </div>
                        </div>
                    </SectionCard>

                    <section className="rounded-3xl border-2 border-dashed border-[#8f8f8f] p-6 md:p-8">
                        <h3 className="mb-5 text-2xl font-semibold text-[#1f1f1f]">Firma del Partecipante</h3>
                        <div className="mx-auto max-w-[620px] rounded-xl bg-[#efe5d7] px-4 py-8 text-center">
                            <p className="mb-4 text-xl text-[#2a2a2a]">
                                Il partecipante (per accettazione e conferma)
                            </p>
                            <button
                                type="button"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-[#71c2a3] px-8 text-xl font-medium text-white"
                            >
                                Carica Firma
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
