import React from 'react';
import { Input } from '../../../../../Forms';

export default function CoursePricingSection() {
  return (
    <div className="space-y-4 rounded-xl border border-[#d5e3dc] bg-[#f7faf8] p-4">
      <div>
        <h3 className="text-sm font-semibold text-[#222]">Prezzi corso (utente privato)</h3>
        <p className="mt-1 text-xs text-[#6b7471]">
          Prezzo per il singolo utente. Per le aziende si usa il pacchetto aziendale selezionato
          sopra.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          name="prezzoBase"
          label="PREZZO BASE (€)"
          type="text"
          inputMode="decimal"
          placeholder="75.00"
          variant="course"
        />
        <Input
          name="prezzoVendita"
          label="PREZZO DI VENDITA (€)"
          type="text"
          inputMode="decimal"
          placeholder="59.00"
          variant="course"
        />
        <Input
          name="iva"
          label="IVA (%)"
          type="text"
          placeholder="22"
          variant="course"
        />
      </div>

      <p className="text-xs text-[#6b7471]">
        Usa il punto per i decimali (es. 75.20). Il prezzo base è il listino; il prezzo di vendita
        è quello pagato dall&apos;utente privato.
      </p>
    </div>
  );
}
