import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react';

const StudentInfoModal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 md:p-6"
      aria-modal="true"
      role="dialog"
      aria-label="Informazioni personali"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative max-h-[96vh] w-full max-w-[980px] overflow-y-auto rounded-xl border border-[#d7ebe4] bg-white p-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] outline-none md:p-10"
      >
        <div className="mb-8 flex items-center gap-4 md:mb-10">
          <button
            onClick={() => onClose && onClose()}
            aria-label="Indietro"
            className="rounded-full p-2 text-[#2c2c2c] hover:bg-black/5"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <h3 className="text-[24px] font-semibold text-[#171717] md:text-[28px]">
            Informazioni personali
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[800px] space-y-6 pb-6 md:pb-8">
          <div className="mb-2">
            <h4 className="text-[22px] font-semibold text-[#171717] md:text-[30px]">
              Informazioni
            </h4>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
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
            <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
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
            <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
              Data di nascita <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                name="birthDate"
                placeholder="GG/MM/AAAA"
                required
                className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 pr-11 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
              />
              <Calendar className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#555]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
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
              <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
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
            <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
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
            <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
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
            <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
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
            <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
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
            <label className="mb-2 block text-[13px] font-medium text-[#222] md:text-[20px]">
              Codice fiscale (se diverso da partita IVA) <span className="text-red-500">*</span>
            </label>
            <input
              name="taxCode"
              placeholder="Inserisci il codice fiscale"
              required
              className="h-11 w-full rounded-xl border border-[#edf2ef] bg-[#edf6f1] px-4 text-[13px] text-[#3a3a3a] placeholder:text-[#9aa39d] focus:border-[#cfe6da] focus:outline-none md:h-12 md:text-[16px]"
            />
          </div>

          <div className="flex justify-end pt-2 md:pt-4">
            <button
              type="submit"
              className="rounded-full bg-[#73BFA1] px-5 py-2.5 text-[13px] font-semibold text-white shadow-md hover:opacity-95 md:px-6 md:py-3 md:text-[16px]"
            >
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentInfoModal;
