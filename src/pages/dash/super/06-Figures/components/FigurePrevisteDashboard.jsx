import React from 'react';
import { Check } from 'lucide-react';

export default function FigurePrevisteDashboard() {
  return (
    <div className="w-full min-w-0 space-y-3 rounded-2xl bg-[#f3f3f3] p-3 sm:space-y-4 sm:rounded-3xl sm:p-4 md:p-6">
      {/* Header Section */}
      <div className="rounded-xl bg-[#ebebeb] p-4 sm:rounded-2xl sm:p-5 md:p-6">
        <h1 className="text-lg leading-tight font-semibold break-words text-[#141414] sm:text-2xl lg:text-3xl ">
          Figure previste LMS CSR 59
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-[#323232] sm:text-sm md:text-lg">
          Organigramma e Sistema di Gestione Documentale
          <br className="hidden sm:block" />
          Documentazione Interna del Personale e di Conformita
        </p>
      </div>

      {/* Access Mode Banner */}
      <div className="rounded-xl border border-[#94ceb7] bg-[#edf7f2] px-3 py-3 sm:rounded-2xl sm:px-4 md:px-6 md:py-4">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm bg-[#71c2a3] sm:h-6 sm:w-6">
            <Check className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" strokeWidth={3} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-tight font-semibold break-words text-[#171717] sm:text-base lg:text-2xl ">
              Modalita di accesso completo - amministratore master
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#4b4b4b] sm:text-sm md:text-base">
              Puoi visualizzare, caricare, modificare ed eliminare tutti i
              documenti e le informazioni del personale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
