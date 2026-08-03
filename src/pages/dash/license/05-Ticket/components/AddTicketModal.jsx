import { ArrowLeft, CloudUpload } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Toast, useToast } from '../../../../../components/ui';
import { Form, Input, FileInput } from '../../../../../Forms';
import { useCreateMyTicketMutation } from '../../../../../features/api/licenseUserApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_FILE_SIZE_MB = 5;

const defaultValues = {
  subject: '',
  message: '',
};

const TicketFormFields = ({ attachment, onAttachmentChange, disabled }) => {
  const { watch } = useFormContext();
  const message = watch('message') || '';

  return (
    <div className="space-y-5">
      <Input
        name="subject"
        label="Oggetto"
        placeholder="Inserisci una breve descrizione"
        required
        variant="ticket"
        inputClassName="h-12"
        disabled={disabled}
      />

      <div>
        <Input
          name="message"
          label="Descrizione"
          placeholder="Descrivici quale problema hai riscontrato"
          required
          multiline
          rows={5}
          variant="ticket"
          disabled={disabled}
        />
        <p className="mt-2 text-right text-sm text-[#7f7f7f]">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </p>
      </div>

      <section className="rounded-lg bg-[#edf6f2] p-4">
        <FileInput
          accept="image/*"
          file={attachment}
          onChange={onAttachmentChange}
          layout="dropzone"
          icon={CloudUpload}
          disabled={disabled}
        />
        <p className="mt-3 text-sm text-[#737373]">
          Dimensioni massime permesse: massimo {MAX_FILE_SIZE_MB} MB per allegato (solo immagini).
        </p>
      </section>
    </div>
  );
};

const AddTicketModal = ({ open, onClose, onSuccess }) => {
  const [attachment, setAttachment] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const { toasts, addToast, removeToast } = useToast();
  const [createTicket, { isLoading }] = useCreateMyTicketMutation();

  const resetForm = () => {
    setAttachment(null);
    setFormKey((prev) => prev + 1);
  };

  const handleClose = () => {
    if (isLoading) return;
    resetForm();
    onClose?.();
  };

  const handleAttachmentChange = (file) => {
    if (!file) {
      setAttachment(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      addToast('Sono consentiti solo file immagine', 'error');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      addToast(`Il file deve essere massimo ${MAX_FILE_SIZE_MB} MB`, 'error');
      return;
    }

    setAttachment(file);
  };

  const handleSubmit = async (data) => {
    const subject = data.subject?.trim();
    const message = data.message?.trim();

    if (!subject || !message) {
      addToast('Compilare tutti i campi obbligatori', 'error');
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      addToast(`La descrizione non può superare ${MAX_MESSAGE_LENGTH} caratteri`, 'error');
      return;
    }

    try {
      await createTicket({
        subject,
        message,
        attachment,
      }).unwrap();

      addToast('Ticket inviato con successo', 'success');
      resetForm();
      onSuccess?.();
    } catch (error) {
      addToast(getRtkErrorMessage(error), 'error');
    }
  };

  if (!open) return null;

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

      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#111111]/35 p-4 sm:p-8">
        <section className="w-full max-w-lg rounded-xl border border-[#e7e7e7] bg-white p-5 sm:p-8">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex text-[#2f2f2f]"
            disabled={isLoading}
          >
            <ArrowLeft size={20} />
          </button>

          <h2 className="mt-1 mb-7 text-center text-2xl font-semibold text-[#202020]">
            Apri un ticket
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

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="rounded-full border border-[#ed6f63] px-7 py-2 text-sm font-semibold text-[#e15241] hover:bg-[#fff5f4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-[#73bfa1] px-8 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? 'Invio in corso...' : 'Invia'}
              </button>
            </div>
          </Form>
        </section>
      </div>
    </>
  );
};

export default AddTicketModal;
