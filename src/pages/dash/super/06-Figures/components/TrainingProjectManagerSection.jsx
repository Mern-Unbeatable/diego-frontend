import React, { useEffect, useRef, useState } from 'react';
import { Check, Download, UploadCloud } from 'lucide-react';

const DEFAULT_DOCS = [
  'Curriculum',
  "Carta d'identita e Codice Fiscale",
  'Certificati/Prova di Esperienza in Salute e Sicurezza',
  'Certificati di Competenze Digitali',
];

const inputClassName =
  'h-10 w-full min-w-0 rounded-lg border border-[#cdcdcd] bg-transparent px-3 text-xs text-[#555] outline-none sm:h-11 sm:px-4 sm:text-sm';

export default function TrainingProjectManagerSection({
  title = 'Responsabile del progetto di formazione',
  subtitle = 'Responsabile Progetto Formativo',
  documentLabels = DEFAULT_DOCS,
  showPersonFields = true,
  companyLabel = 'Societa',
  initial,
  onFormChange,
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

  useEffect(() => {
    if (!initial) return;
    setForm({
      nome: initial.nome ?? '',
      cognome: initial.cognome ?? '',
      societa: initial.societa ?? '',
    });
    setFiles(initial.files ?? {});
  }, [initial]);

  const updateForm = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (typeof onFormChange === 'function') {
        onFormChange(next);
      }
      return next;
    });
  };

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
    <section className="min-w-0 overflow-hidden rounded-2xl bg-[#f7f7f7] shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-[#ececec] sm:rounded-3xl">
      <div className="bg-[#73BFA1] px-3 py-3 text-white sm:px-5 sm:py-4 md:px-6">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm bg-[#71c2a3] sm:h-6 sm:w-6">
            <Check className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" strokeWidth={3} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base leading-tight font-semibold break-words sm:text-xl lg:text-2xl ">
              {title}
            </h2>
            <p className="mt-1 text-xs break-words text-white/80 sm:text-sm md:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-3 sm:space-y-5 sm:p-5 md:space-y-6 md:p-6">
        {showPersonFields ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            <Field label="Cognome">
              <input
                value={form.cognome}
                onChange={(event) => updateForm('cognome', event.target.value)}
                placeholder="first name"
                className={inputClassName}
              />
            </Field>
            <Field label="Nome">
              <input
                value={form.nome}
                onChange={(event) => updateForm('nome', event.target.value)}
                placeholder="last name"
                className={inputClassName}
              />
            </Field>
          </div>
        ) : (
          <Field label={companyLabel}>
            <input
              value={form.societa}
              onChange={(event) => updateForm('societa', event.target.value)}
              placeholder={companyLabel}
              className={inputClassName}
            />
          </Field>
        )}

        <div className="min-w-0">
          <h3 className="mb-2 text-base font-semibold break-words text-[#171717] sm:mb-3 sm:text-xl lg:text-2xl">
            Documenti richiesti
          </h3>

          <div className="space-y-3 sm:space-y-4">
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
          <div className="rounded-xl bg-[#e6efec] p-3 sm:rounded-2xl sm:p-4">
            <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={onConfirm}
                className="h-10 w-full rounded-full bg-[#71c2a3] text-sm font-medium text-white sm:h-11"
              >
                Conferma
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="h-10 w-full rounded-full bg-[#d64545] text-sm font-medium text-white sm:h-11"
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
    <div className="min-w-0">
      <label className="mb-1.5 block text-sm font-medium text-[#1f1f1f] sm:mb-2 sm:text-base lg:text-2xl xl:text-[28px]">
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
    <div className="min-w-0 rounded-xl bg-[#efefef] p-3 sm:rounded-2xl sm:p-4 md:p-5">
      <p className="mb-2 text-xs font-medium break-words text-[#2f2f2f] sm:text-sm md:text-base lg:text-xl">
        {label}
      </p>

      <div
        className="h-10 truncate rounded-lg border border-[#cbcbcb] bg-transparent px-3 text-center text-xs leading-10 text-[#3a3a3a] sm:px-4 sm:text-sm md:text-base"
        title={statusText}
      >
        {statusText}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          onClick={() => inputRef.current && inputRef.current.click()}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#71c2a3] text-xs font-medium text-white sm:h-11 sm:text-sm md:text-base"
        >
          <UploadCloud size={14} className="shrink-0" />
          <span className="truncate">Carica file</span>
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[#71c2a3] bg-transparent text-xs font-medium text-[#71c2a3] sm:h-11 sm:text-sm md:text-base"
        >
          <Download size={14} className="shrink-0" />
          <span className="truncate">Scarica file</span>
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
