import toast from 'react-hot-toast';
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
}) =>
  new Promise((resolve) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } pointer-events-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/10`}
        >
          <p className="text-base font-semibold text-gray-900">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{message}</p>
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
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
      ),
      { duration: Infinity, position: 'top-center' },
    );
  });
