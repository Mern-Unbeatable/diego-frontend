import React from 'react';
import { X } from 'lucide-react';

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-4xl',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  zIndex = 50,
  accentColor,
  headerIcon,
  showCloseButton = true,
  closeOnBackdrop = false,
  className = '',
  panelClassName = '',
}) {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdrop) onClose?.();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/10 p-4 backdrop-blur-sm ${className}`}
      style={{ zIndex }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`w-full ${SIZE_CLASSES[size] || SIZE_CLASSES.md} max-h-[92vh] overflow-y-auto rounded-xl border border-gray-100 bg-white p-4 shadow-2xl md:p-6 ${panelClassName}`}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || description || showCloseButton || headerIcon || accentColor) && (
          <div className="mb-6 flex items-start justify-between gap-4 md:mb-8">
            <div className="flex min-w-0 items-start gap-3">
              {headerIcon}
              {accentColor && (
                <span
                  className={`mt-2 h-3 w-3 shrink-0 rounded-full ${accentColor}`}
                />
              )}
              <div className="min-w-0">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
              </div>
            </div>

            {showCloseButton && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Chiudi"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        <div>{children}</div>

        {footer && <div className="mt-6 border-t border-gray-100 pt-6">{footer}</div>}
      </div>
    </div>
  );
}
