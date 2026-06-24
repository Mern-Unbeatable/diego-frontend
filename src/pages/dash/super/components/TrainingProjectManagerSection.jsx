import React, { useRef, useState } from 'react';
import { Download, UploadCloud } from 'lucide-react';

const DEFAULT_DOCS = [
  'Curriculum',
  "Carta d'identita e Codice Fiscale",
  'Certificati/Prova di Esperienza in Salute e Sicurezza',
  'Certificati di Competenze Digitali',
];

export default function TrainingProjectManagerSection({
  title = 'Responsabile del progetto di formazione',
  subtitle = 'Responsabile Progetto Formativo',
  documentLabels = DEFAULT_DOCS,
  showPersonFields = true,
  companyLabel = 'Societa',
  initial,
  onUpload,
  onDownload,
  showFooterActions = false,
  onConfirm,
  onCancel,
}) {
  const safeInitial = initial || {
    nome: '',
    cognome: '',
    societa: '',
    files: {},
  };

  const [form, setForm] = useState({
    nome: safeInitial.nome,
    cognome: safeInitial.cognome,
    societa: safeInitial.societa,
  });

  const [files, setFiles] = useState(safeInitial.files || {});

  const handleUpload = async (key, file) => {
    setFiles((prev) => ({
      ...prev,
      [key]: { name: file.name },
    }));

    if (typeof onUpload === 'function') {
      try {
        const result = await onUpload(key, file);
        setFiles((prev) => ({
          ...prev,
          [key]: {
            name: (result && result.name) || file.name,
            url: result && result.url,
          },
        }));
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const handleDownload = (key) => {
    const meta = files[key];
    if (!meta || !meta.name) return;

    if (typeof onDownload === 'function') {
      onDownload(key, meta);
      return;
    }

    if (meta.url) {
      window.open(meta.url, '_blank');
    }
  };

  return (
    <section className="overflow-hidden rounded-3xl bg-[#f7f7f7] shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-[#ececec]">
      <div className="bg-[#73BFA1] px-5 py-4 text-white md:px-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-7 w-7 rounded-md bg-[linear-gradient(160deg,#dbe7f8,#9eb7db)]" />
          <div>
            <h2 className="text-[18px] font-semibold leading-tight md:text-[34px]">{title}</h2>
            <p className="mt-1 text-[12px] text-white/80 md:text-[16px]">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 md:space-y-6 md:p-6">
        {showPersonFields ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Cognome">
              <input
                value={form.cognome}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, cognome: event.target.value }))
                }
                placeholder="first name"
                className="h-11 w-full rounded-lg border border-[#cdcdcd] bg-transparent px-4 text-[12px] text-[#555] outline-none"
              />
            </Field>
            <Field label="Nome">
              <input
                value={form.nome}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, nome: event.target.value }))
                }
                placeholder="last name"
                className="h-11 w-full rounded-lg border border-[#cdcdcd] bg-transparent px-4 text-[12px] text-[#555] outline-none"
              />
            </Field>
          </div>
        ) : (
          <Field label={companyLabel}>
            <input
              value={form.societa}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, societa: event.target.value }))
              }
              placeholder={companyLabel}
              className="h-11 w-full rounded-lg border border-[#cdcdcd] bg-transparent px-4 text-[12px] text-[#555] outline-none"
            />
          </Field>
        )}

        <div>
          <h3 className="mb-3 text-[18px] font-semibold text-[#171717] md:text-[34px]">Documenti richiesti</h3>

          <div className="space-y-4">
            {documentLabels.map((label, index) => (
              <DocCard
                key={`${title}-${label}-${index}`}
                label={label}
                fileMeta={files[label]}
                onUpload={(file) => handleUpload(label, file)}
                onDownload={() => handleDownload(label)}
              />
            ))}
          </div>
        </div>

        {showFooterActions ? (
          <div className="rounded-2xl bg-[#e6efec] p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={onConfirm}
                className="h-11 rounded-full bg-[#71c2a3] text-sm font-medium text-white"
              >
                Conferma
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="h-11 rounded-full bg-[#d64545] text-sm font-medium text-white"
              >
                Annulla
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#1f1f1f] md:text-[28px]">
        {label}
      </label>
      {children}
    </div>
  );
}

function DocCard({ label, fileMeta, onUpload, onDownload }) {
  const inputRef = useRef(null);
  const hasFile = !!(fileMeta && fileMeta.name);
  const statusText = hasFile ? fileMeta.name : 'Nessun caricamento file';

  return (
    <div className="rounded-2xl bg-[#efefef] p-4 md:p-5">
      <p className="mb-2 text-[12px] font-medium text-[#2f2f2f] md:text-[20px]">{label}</p>

      <div className="h-10 rounded-lg border border-[#cbcbcb] bg-transparent px-4 text-center text-[12px] leading-10 text-[#3a3a3a] md:text-[16px]">
        {statusText}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
        <button
          type="button"
          onClick={() => inputRef.current && inputRef.current.click()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#71c2a3] text-[12px] font-medium text-white md:h-11 md:text-[16px]"
        >
          <UploadCloud size={14} />
          Carica file
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#71c2a3] bg-transparent text-[12px] font-medium text-[#71c2a3] md:h-11 md:text-[16px]"
        >
          <Download size={14} />
          Scarica file
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files && event.target.files[0];
          if (file) onUpload(file);
          event.target.value = '';
        }}
      />
    </div>
  );
}
