import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DetailRow = ({ label, value, emptyValue }) => (
  <div className="min-w-0 border-b border-gray-50 pb-3 last:border-0 last:pb-0 sm:grid sm:grid-cols-[130px_1fr] sm:gap-3 sm:border-0 sm:pb-0">
    <dt className="mb-0.5 text-xs font-medium text-gray-500 sm:mb-0 sm:text-sm">
      {label}
    </dt>
    <dd className="text-sm break-words whitespace-pre-wrap text-gray-900">
      {value || emptyValue}
    </dd>
  </div>
);

export default function InquiryDetailModal({ isOpen, onClose, title, fields = [] }) {
  const { t } = useTranslation();
  const emptyValue = t('platformAdmin.inquiries.detail.emptyValue');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="min-w-0 text-base font-semibold text-gray-900 sm:text-lg">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Chiudi"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <dl className="space-y-3 sm:space-y-4">
            {fields.map((field) => (
              <DetailRow
                key={field.key || field.label}
                label={field.label}
                value={field.value}
                emptyValue={emptyValue}
              />
            ))}
          </dl>
        </div>

        <div className="shrink-0 border-t border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-full items-center justify-center rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:px-6"
          >
            {t('platformAdmin.inquiries.detail.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
