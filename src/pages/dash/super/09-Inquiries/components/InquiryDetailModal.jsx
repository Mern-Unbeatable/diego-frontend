import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../../components/ui';

const DetailRow = ({ label, value, emptyValue }) => (
  <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm whitespace-pre-wrap text-gray-900">{value || emptyValue}</dd>
  </div>
);

export default function InquiryDetailModal({ isOpen, onClose, title, fields = [] }) {
  const { t } = useTranslation();
  const emptyValue = t('platformAdmin.inquiries.detail.emptyValue');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      closeOnBackdrop
      zIndex={100}
    >
      <dl className="space-y-4">
        {fields.map((field) => (
          <DetailRow
            key={field.key || field.label}
            label={field.label}
            value={field.value}
            emptyValue={emptyValue}
          />
        ))}
      </dl>
    </Modal>
  );
}
