import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, ChevronDown, X } from 'lucide-react';
import { usePrivate } from '../../../../../../features/private/privateHooks';
import { mapProfileUpdatePayload } from '../../../../../../features/private/privateMappers';

const fieldClass =
  'h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-3 text-sm text-[#3a3a3a] placeholder:text-[#9aa39d] outline-none focus:border-[#cfe6da] focus:ring-2 focus:ring-[#73BFA1]/30 sm:px-4';

const labelClass = 'mb-1.5 block text-sm font-medium text-[#222]';

const StudentInfoModal = ({ profile, onClose }) => {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const dateInputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const { updateMyProfile } = usePrivate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !submitting) onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.activeElement;
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [onClose, submitting]);

  const handleOverlayClick = (e) => {
    if (submitting) return;
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formValues = Object.fromEntries(form.entries());
    const payload = mapProfileUpdatePayload(
      formValues,
      profile?.preferredLanguage,
    );

    try {
      setSubmitting(true);
      const response = await updateMyProfile(payload);
      toast.success(response?.message || 'Profilo aggiornato');
      onClose?.();
    } catch (error) {
      toast.error(error || 'Impossibile aggiornare il profilo');
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="student-info-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-[#d7ebe4] bg-white shadow-xl outline-none sm:rounded-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#edf2ef] bg-white px-3 py-3 sm:px-4 sm:py-3.5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => !submitting && onClose?.()}
              aria-label="Indietro"
              disabled={submitting}
              className="rounded-full p-2 text-[#2c2c2c] hover:bg-black/5 disabled:opacity-50 sm:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h3
              id="student-info-title"
              className="truncate text-base font-semibold text-[#171717] sm:text-lg"
            >
              Informazioni personali
            </h3>
          </div>
          <button
            type="button"
            onClick={() => !submitting && onClose?.()}
            aria-label="Chiudi"
            disabled={submitting}
            className="hidden rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 sm:inline-flex"
          >
            <X size={18} />
          </button>
        </div>

        <form
          key={profile?.id || 'profile-form'}
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5 sm:py-5">
            <div className="mx-auto w-full max-w-[800px] space-y-3 sm:space-y-4">
              <h4 className="text-sm font-semibold text-[#171717] sm:text-base">
                Informazioni
              </h4>

              <div>
                <label className={labelClass}>
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  placeholder="Inserisci il nome"
                  required
                  defaultValue={profile?.firstName ?? undefined}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Cognome <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  placeholder="Inserisci il cognome"
                  required
                  defaultValue={profile?.lastName ?? undefined}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Data di nascita <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="date"
                    name="birthDate"
                    required
                    defaultValue={profile?.birthDate ?? undefined}
                    className={`${fieldClass} pr-11 [&::-webkit-calendar-picker-indicator]:hidden`}
                    onClick={() => dateInputRef.current?.showPicker?.()}
                  />
                  <Calendar
                    className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer text-[#555] transition-colors hover:text-black sm:right-4"
                    onClick={() => dateInputRef.current?.showPicker?.()}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label className={labelClass}>
                    Città <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="city"
                    placeholder="Inserisci il luogo di nascita"
                    required
                    defaultValue={profile?.city ?? undefined}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Paese <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      required
                      defaultValue={profile?.country ?? ''}
                      className={`${fieldClass} appearance-none pr-10 text-[#3a3a3a]`}
                    >
                      <option value="" disabled>
                        Seleziona il Paese
                      </option>
                      <option value="Italy">Italia</option>
                      <option value="France">Francia</option>
                      <option value="Spain">Spagna</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#555] sm:right-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Indirizzo di residenza <span className="text-red-500">*</span>
                </label>
                <input
                  name="address"
                  placeholder="Via, numero civico, CAP, città..."
                  required
                  defaultValue={profile?.residenceAddress ?? undefined}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Nome azienda</label>
                <input
                  name="companyName"
                  placeholder="Inserisci il nome dell'azienda"
                  defaultValue={profile?.companyName ?? undefined}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Sede legale</label>
                <input
                  name="companyAddress"
                  placeholder="Inserisci sede legale"
                  defaultValue={profile?.companyAddress ?? undefined}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Partita IVA</label>
                <input
                  name="companyVatNumber"
                  placeholder="Inserisci la Partita IVA"
                  defaultValue={profile?.companyVatNumber ?? undefined}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Codice fiscale (se diverso da partita IVA)
                </label>
                <input
                  name="traineeTaxCode"
                  placeholder="Inserisci il codice fiscale"
                  defaultValue={profile?.traineeTaxCode ?? undefined}
                  className={fieldClass}
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-[#edf2ef] bg-white px-3 py-3 sm:px-5 sm:py-4">
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => !submitting && onClose?.()}
                disabled={submitting}
                className="inline-flex h-10 items-center justify-center rounded-full border border-gray-200 px-5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 sm:w-auto"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#73BFA1] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#5fa488] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Salvataggio...' : 'Salva'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default StudentInfoModal;
