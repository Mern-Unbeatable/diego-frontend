import Button from '../buttons/Buttons';
import Modal from './Modal';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Conferma',
  message = 'Sei sicuro?',
  confirmLabel = 'Conferma',
  cancelLabel = 'Annulla',
  variant = 'default',
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="sm"
    showCloseButton={false}
    closeOnBackdrop
    footer={
      <div className="flex justify-end gap-3">
        <Button type="button" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          className={
            variant === 'danger'
              ? 'bg-red-600 text-white hover:bg-red-700'
              : undefined
          }
        >
          {confirmLabel}
        </Button>
      </div>
    }
  >
    <p className="text-sm text-gray-600">{message}</p>
  </Modal>
);

export default ConfirmModal;
