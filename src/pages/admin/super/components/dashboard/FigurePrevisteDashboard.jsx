import React from 'react';
import { Check } from 'lucide-react';

export default function FigurePrevisteDashboard() {
  return (
    <div className="w-full space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      {/* Header Section */}
      <div className="rounded-2xl bg-gray-50 p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          figure previste LMS CSR 59
        </h1>
        <p className="mt-2 leading-relaxed text-gray-700">
          Organigramma e Sistema di Gestione Documentale <br />
          Documentazione Interna del Personale e di Conformità
        </p>
      </div>

      {/* Access Info Box */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              Modalità di accesso completo – amministratore master
            </p>
            <p className="mt-1 text-sm text-gray-700">
              Puoi visualizzare, caricare, modificare ed eliminare tutti i
              documenti e le informazioni del personale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
