import React from 'react';
import { Check } from 'lucide-react';

export default function FigurePrevisteDashboard() {
  return (
    <div className="w-full space-y-4 rounded-3xl bg-[#f3f3f3] p-4 md:p-6">
      {/* Header Section */}
      <div className="rounded-2xl bg-[#ebebeb] p-5 md:p-6">
        <h1 className="text-[18px] leading-tight font-semibold text-[#141414] md:text-[42px]">
          Figure previste LMS CSR 59
        </h1>
        <p className="mt-2 text-[12px] leading-relaxed text-[#323232] md:text-[20px]">
          Organigramma e Sistema di Gestione Documentale
          <br className="hidden sm:block" />
          Documentazione Interna del Personale e di Conformita
        </p>
      </div>

      {/* Access Mode Banner */}
      <div className="rounded-2xl border border-[#94ceb7] bg-[#edf7f2] px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm bg-[#71c2a3]">
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-tight font-semibold text-[#171717] md:text-[30px]">
              Modalita di accesso completo - amministratore master
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#4b4b4b] md:text-[16px]">
              Puoi visualizzare, caricare, modificare ed eliminare tutti i
              documenti e le informazioni del personale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
