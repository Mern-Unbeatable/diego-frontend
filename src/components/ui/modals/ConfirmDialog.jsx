import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ANIMATION_MS = 220;

const ConfirmDialog = ({
  title = 'Conferma',
  message = 'Sei sicuro?',
  confirmLabel = 'Conferma',
  cancelLabel = 'Annulla',
  variant = 'danger',
  onResolve,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const close = (result) => {
    setVisible(false);
    window.setTimeout(() => onResolve?.(result), ANIMATION_MS);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <button
        type="button"
        aria-label={cancelLabel}
        onClick={() => close(false)}
        className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`relative z-10 w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10 transition-all duration-200 sm:p-6 ${
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-3 scale-95 opacity-0'
        }`}
      >
        <p
          id="confirm-dialog-title"
          className="text-base font-semibold text-gray-900 sm:text-lg"
        >
          {title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => close(false)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => close(true)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors ${
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmDialog;
export { ANIMATION_MS };
