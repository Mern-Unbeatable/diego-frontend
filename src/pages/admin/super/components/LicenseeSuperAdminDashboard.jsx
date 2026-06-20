import React from 'react';
import { Search, Download, Pencil, Trash2, Edit } from 'lucide-react';

const StatusPill = ({ status }) => {
  const map = {
    Attivo: { cls: 'bg-emerald-50 text-emerald-700', label: 'Attivo' },
    'In attesa di': { cls: 'bg-rose-50 text-rose-600', label: 'In attesa di' },
    Inattivo: { cls: 'bg-red-600/10 text-red-600', label: 'Inattivo' },
  };
  const s = map[status] ?? map.Attivo;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${s.cls}`}
    >
      {s.label}
    </span>
  );
};

const ProgressBar = ({ value, max }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex min-w-[180px] items-center gap-3">
      <div className="h-2 w-40 rounded-full bg-emerald-100">
        <div
          className="h-2 rounded-full bg-emerald-400"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-gray-700">
        {value}/{max}
      </span>
    </div>
  );
};

export default function LicenziatariTable({
  rows = [
    {
      azienda: 'TechCorp Training',
      fatturato: 45230,
      users: 145,
      cap: 200,
      stato: 'Attivo',
    },
    {
      azienda: 'Healthcare Academy',
      fatturato: 32150,
      users: 190,
      cap: 200,
      stato: 'Attivo',
    },
    {
      azienda: 'Digital Marketing Hub',
      fatturato: 18950,
      users: 120,
      cap: 150,
      stato: 'Attivo',
    },
    {
      azienda: 'Legal Learning Group',
      fatturato: 0,
      users: 250,
      cap: 300,
      stato: 'In attesa di',
    },
    {
      azienda: 'Manufacturing Skills',
      fatturato: 28750,
      users: 45,
      cap: 50,
      stato: 'Inattivo',
    },
  ],
  onExport = () => alert('Esporta rapporto'),
  onEditGlobal = () => alert('Modifica licenziatario'),
  onEditRow = (row) => alert('Modifica: ' + row.azienda),
  onDeleteRow = (row) => alert('Elimina: ' + row.azienda),
}) {
  const euro = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 md:p-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-2 md:gap-4">
        <h2 className="flex-1 text-2xl font-semibold text-gray-900 md:text-[28px]">
          Gestione dei licenziatari
        </h2>

        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Cerca"
            className="bg-transparent text-sm outline-none"
            onChange={() => {}}
          />
        </div>

        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
        >
          <Download className="h-5 w-5" />
          Esporta rapporto
        </button>

        <button
          onClick={onEditGlobal}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
        >
          <Edit className="h-5 w-5" />
          Modifica licenziatario
        </button>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="sticky top-0 z-[1] rounded-tl-2xl px-4 py-4 text-sm font-semibold text-gray-800">
                Azienda
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-gray-800">
                Fatturato 30 giorni
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-gray-800">
                Utenti attivi
              </th>
              <th className="px-4 py-4 text-sm font-semibold text-gray-800">
                Stato
              </th>
              <th className="rounded-tr-2xl px-4 py-4 text-sm font-semibold text-gray-800">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="max-w-[220px] truncate px-4 py-5 text-gray-900">
                  {r.azienda}
                </td>
                <td className="px-4 py-5 whitespace-nowrap text-gray-900">
                  {euro.format(r.fatturato)}
                </td>
                <td className="px-4 py-5">
                  <ProgressBar value={r.users} max={r.cap} />
                </td>
                <td className="px-4 py-5">
                  <StatusPill status={r.stato} />
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onEditRow(r)}
                      className="text-gray-700 hover:text-gray-900"
                      title="Modifica"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDeleteRow(r)}
                      className="text-red-600 hover:text-red-700"
                      title="Elimina"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
