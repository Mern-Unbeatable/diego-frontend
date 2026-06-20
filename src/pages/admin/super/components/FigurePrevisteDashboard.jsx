import React from 'react';
import { Check } from 'lucide-react';

export default function FigurePrevisteDashboard() {
  return (
    <div className="w-full space-y-4 rounded-3xl bg-[#f3f3f3] p-3 md:p-4">
      <div className="rounded-2xl bg-[#ebebeb] p-5 md:p-6">
        <h1 className="text-[18px] font-semibold text-[#141414] md:text-[42px]">
          Figure previste LMS CSR 59
        </h1>
        <p className="mt-2 text-[12px] leading-relaxed text-[#323232] md:text-[20px]">
          Organigramma e Sistema di Gestione Documentale
          <br />
          Documentazione Interna del Personale e di Conformita
        </p>
      </div>

      <div className="rounded-2xl border border-[#94ceb7] bg-[#edf7f2] px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-sm bg-[#71c2a3]">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#171717] md:text-[30px]">
              Modalita di accesso completo - amministratore master
            </p>
            <p className="mt-1 text-[11px] text-[#4b4b4b] md:text-[16px]">
              Puoi visualizzare, caricare, modificare ed eliminare tutti i
              documenti e le informazioni del personale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
