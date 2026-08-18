import { createRoot } from 'react-dom/client';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../components/ui/modals/ConfirmDialog';
import { getRtkErrorMessage } from '../../features/api/utils';

const toastStyle = { whiteSpace: 'pre-line', maxWidth: 520 };

export const showSuccessToast = (message) => toast.success(message);

export const showInfoToast = (message) => toast(message);

export const showErrorToast = (message) => toast.error(message, { style: toastStyle });

export const showRtkErrorToast = (error) => {
  toast.error(getRtkErrorMessage(error), { style: toastStyle });
};

export const showWarningToast = (message) =>
  toast(message, { icon: '⚠️', style: toastStyle });

export const showConfirmToast = ({
  message,
  title = 'Conferma',
  confirmLabel = 'Conferma',
  cancelLabel = 'Annulla',
  variant = 'danger',
} = {}) =>
  new Promise((resolve) => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const root = createRoot(host);

    const finish = (result) => {
      resolve(result);
      root.unmount();
      host.remove();
    };

    root.render(
      <ConfirmDialog
        title={title}
        message={message}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        variant={variant}
        onResolve={finish}
      />,
    );
  });
