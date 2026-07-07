import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react';

const StudentInfoModal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    document.addEventListener('keydown', onKey);
    // focus the dialog when mounted
    const prev = document.activeElement;
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose && onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log('Student info submit', data);
    onClose && onClose();
  };

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2"
      aria-modal="true"
      role="dialog"
      aria-label="Informazioni personali"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#d7ebe4] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] outline-none"
      >
        {/* Sticky Header */}
        <div className="z-10 flex items-center gap-4 border-b border-[#edf2ef] bg-white p-2">
          <button
            onClick={() => onClose && onClose()}
            aria-label="Indietro"
            className="rounded-full p-2 text-[#2c2c2c] hover:bg-black/5"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <h3 className="text-xl font-semibold text-[#171717] md:text-2xl">
            Informazioni personali
          </h3>
        </div>
        {/* Form wraps everything to allow submission */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          {/* Scrollable middle content */}
          <div className="flex-1 overflow-y-auto p-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#73BFA1] [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="mx-auto w-full max-w-[800px] space-y-2">
              <div className="mb-2">
                <h4 className="text-xl font-semibold text-[#171717] ">
                  Informazioni
                </h4>
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  placeholder="Inserisci il nome"
                  required
                  className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                  Cognome <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  placeholder="Inserisci il cognome"
                  required
                  className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                  Data di nascita <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="date"
                    name="birthDate"
                    required
                    className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 pr-11 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px] [&::-webkit-calendar-picker-indicator]:hidden"
                    onClick={() => dateInputRef.current?.showPicker()}
                  />
                  <Calendar
                    className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#555] cursor-pointer hover:text-black transition-colors"
                    onClick={() => dateInputRef.current?.showPicker()}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                    Città <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="city"
                    placeholder="Inserisci il luogo di nascita"
                    required
                    className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                    Paese <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      required
                      className="h-11 w-full appearance-none rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 pr-10 text-[13px] text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Seleziona il Paese
                      </option>
                      <option value="it">Italia</option>
                      <option value="fr">Francia</option>
                      <option value="es">Spagna</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#555]" />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                  Indirizzo di residenza <span className="text-red-500">*</span>
                </label>
                <input
                  name="address"
                  placeholder="Via, numero civico, CAP, città, sigla provincia, paese"
                  required
                  className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                  Nome azienda <span className="text-red-500">*</span>
                </label>
                <input
                  name="companyName"
                  placeholder="Inserisci il nome dell'azienda"
                  required
                  className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                  Sede legale <span className="text-red-500">*</span>
                </label>
                <input
                  name="legalOffice"
                  placeholder="Inserisci sede legale (Via, numero civico, CAP, città, sigla provincia, paese)"
                  required
                  className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                  Partita IVA <span className="text-red-500">*</span>
                </label>
                <input
                  name="vatNumber"
                  placeholder="Inserisci la Partita IVA"
                  required
                  className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-base">
                  Codice fiscale (se diverso da partita IVA){' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="taxCode"
                  placeholder="Inserisci il codice fiscale"
                  required
                  className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
                />
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="z-10 flex justify-end border-t border-[#edf2ef] bg-white p-2">
            <div className="mx-auto flex w-full max-w-[800px] justify-end">
              <button
                type="submit"
                className="rounded-full bg-[#73BFA1] px-6 py-2.5 text-[13px] font-semibold text-white shadow-md hover:opacity-95 md:px-8 md:py-3 md:text-sm"
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentInfoModal;
