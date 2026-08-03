import React, { useEffect, useId, useMemo, useRef } from 'react';
import { getVariantClasses } from './formVariants';

const getFileDisplayLabel = (file, existingUrl) => {
  if (file?.name) return file.name;
  if (existingUrl) {
    try {
      const pathname = new URL(existingUrl, window.location.origin).pathname;
      const fileName = decodeURIComponent(pathname.split('/').pop() || '');
      return fileName || 'File esistente';
    } catch {
      return 'File esistente';
    }
  }
  return 'Nessun file selezionato';
};

const FileInput = ({
  label,
  required,
  accept,
  file,
  existingUrl = '',
  onChange,
  variant = 'course',
  icon: Icon,
  buttonLabel = 'Carica',
  className = '',
  disabled = false,
  layout = 'default',
  dropzoneTitle = 'Allega dei file',
  dropzoneHint = 'Trascina e rilascia oppure clicca qui per caricare i file',
}) => {
  const styles = getVariantClasses(variant);
  const inputRef = useRef(null);
  const inputId = useId();

  const handleFileChange = (event) => {
    onChange(event.target.files?.[0] || null);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (disabled) return;
    onChange(event.dataTransfer.files?.[0] || null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  if (layout === 'dropzone') {
    return (
      <div className={className}>
        <div
          className={`rounded-md border border-dashed border-[#c7d9d2] bg-white px-4 py-12 text-center ${
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => {
            if (!disabled) inputRef.current?.click();
          }}
          onKeyDown={(event) => {
            if (disabled) return;
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={disabled ? -1 : 0}
        >
          {Icon ? <Icon className="mx-auto text-[#73bfa1]" size={35} /> : null}
          <p className="mt-3 text-lg font-semibold text-[#222222]">{dropzoneTitle}</p>
          <p className="mt-1 text-sm text-[#7d7d7d]">{dropzoneHint}</p>
          {file ? <p className="mt-2 text-sm text-[#4f4f4f]">{file.name}</p> : null}
        </div>
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          disabled={disabled}
          onChange={handleFileChange}
        />
      </div>
    );
  }

  const previewUrl = useMemo(() => {
    if (file && file.type?.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    if (!file && existingUrl) return existingUrl;
    return '';
  }, [file, existingUrl]);

  useEffect(() => {
    if (!file || !file.type?.startsWith('image/') || !previewUrl) return undefined;
    return () => URL.revokeObjectURL(previewUrl);
  }, [file, previewUrl]);

  const displayLabel = getFileDisplayLabel(file, existingUrl);

  return (
    <div className={className}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className="text-[#f04c42]">*</span>}
        </label>
      )}
      {previewUrl && variant === 'course' ? (
        <div className="mb-3 overflow-hidden rounded-xl border border-[#d5e3dc] bg-white">
          <img
            src={previewUrl}
            alt={displayLabel}
            className="h-40 w-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-2">
        <div className={styles.helper.replace('mt-1 ', '')}>{displayLabel}</div>
        <label
          className={`flex cursor-pointer items-center justify-center rounded-lg bg-[#dfe8e4] text-[#6b7471] ${
            Icon ? 'h-14 w-14' : 'h-10 rounded-full px-4 text-sm text-[#4a4a4a]'
          } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        >
          {Icon ? <Icon size={18} /> : buttonLabel}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={disabled}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default FileInput;
