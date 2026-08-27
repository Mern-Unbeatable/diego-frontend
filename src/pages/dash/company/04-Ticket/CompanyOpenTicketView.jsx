import { ArrowLeft, CloudUpload } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, FileInput, Input } from '../../../../Forms';
import { Toast, useToast } from '../../../../components/ui';
import { useCreateTicketMutation } from '../../../../features/api/ticketApi';
import { getRtkErrorMessage } from '../../../../features/api/utils';
import { ROUTES } from '../../../../config/routes';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_FILE_SIZE_MB = 20;

const defaultValues = {
  subject: '',
  message: '',
};

const TicketFormFields = ({ attachment, onAttachmentChange, disabled }) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const message = watch('message') || '';

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-[24px] font-medium text-[#202020]">
          {t('companyAdmin.tickets.form.subject')}<span className="text-[#e34f4f]">*</span>
        </span>
        <Input
          name="subject"
          placeholder={t('companyAdmin.tickets.form.subjectPlaceholder')}
          required
          variant="ticket"
          inputClassName="h-12"
          disabled={disabled}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[24px] font-medium text-[#202020]">
          {t('companyAdmin.tickets.form.description')}<span className="text-[#e34f4f]">*</span>
        </span>
        <Input
          name="message"
          placeholder={t('companyAdmin.tickets.form.descriptionPlaceholder')}
          required
          multiline
          rows={5}
          variant="ticket"
          disabled={disabled}
        />
        <p className="mt-2 text-right text-sm text-[#7f7f7f]">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </p>
      </label>

      <div className="rounded-lg bg-[#edf5f2] p-4">
        <FileInput
          accept="image/*,.pdf,.doc,.docx"
          file={attachment}
          onChange={onAttachmentChange}
          layout="dropzone"
          icon={CloudUpload}
          disabled={disabled}
        />
        <p className="mt-3 text-sm text-[#7e7e7e]">
          {t('companyAdmin.tickets.form.maxFileSize', { max: MAX_FILE_SIZE_MB })}
        </p>
      </div>
    </div>
  );
};

const CompanyOpenTicketView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [attachment, setAttachment] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const { toasts, addToast, removeToast } = useToast();
  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const handleAttachmentChange = (file) => {
    if (!file) {
      setAttachment(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      addToast(t('companyAdmin.tickets.toasts.fileTooLarge', { max: MAX_FILE_SIZE_MB }), 'error');
      return;
    }

    setAttachment(file);
  };

  const handleSubmit = async (data) => {
    const subject = data.subject?.trim();
    const message = data.message?.trim();

    if (!subject || !message) {
      addToast(t('companyAdmin.tickets.toasts.requiredFields'), 'error');
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      addToast(t('companyAdmin.tickets.toasts.messageTooLong', { max: MAX_MESSAGE_LENGTH }), 'error');
      return;
    }

    try {
      await createTicket({ subject, message, attachment }).unwrap();
      addToast(t('companyAdmin.tickets.toasts.sent'), 'success');
      setAttachment(null);
      setFormKey((prev) => prev + 1);
      navigate(ROUTES.COMPANY_ADMIN.TICKETS);
    } catch (error) {
      addToast(getRtkErrorMessage(error), 'error');
    }
  };

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <section className="mx-auto max-w-[980px] rounded-xl border border-[#ebebeb] bg-white p-5 sm:p-7">
        <Link
          to={ROUTES.COMPANY_ADMIN.TICKETS}
          className="inline-flex text-[#2c2c2c]"
        >
          <ArrowLeft size={20} />
        </Link>

        <h2 className="mb-7 mt-2 text-center text-[38px] font-semibold text-[#1f1f1f]">
          {t('companyAdmin.tickets.openTitle')}
        </h2>

        <Form
          key={formKey}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <TicketFormFields
            attachment={attachment}
            onAttachmentChange={handleAttachmentChange}
            disabled={isLoading}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(ROUTES.COMPANY_ADMIN.TICKETS)}
              disabled={isLoading}
              className="rounded-full border border-[#ef6a59] px-6 py-2 text-sm font-semibold text-[#e14f3f] hover:bg-[#fff3f1] disabled:opacity-50"
            >
              {t('companyAdmin.common.cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full bg-[#73bfa1] px-7 py-2 text-sm font-semibold text-white hover:bg-[#63a88c] disabled:opacity-50"
            >
              {isLoading ? t('companyAdmin.tickets.sending') : t('companyAdmin.common.send')}
            </button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default CompanyOpenTicketView;
