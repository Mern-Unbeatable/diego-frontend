import React, { useMemo, useState } from 'react';
import {
  Search,
  Download,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronDown,
} from 'lucide-react';
import EditLicenseModal from '../components/EditLicenseModal';
import AddLicenseModal from '../components/AddLicenseModal';
import LicenseDetailsModal from '../components/LicenseDetailsModal';
import PersonalDetailsModal from '../components/PersonalDetailsModal';

const euro = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const StatusPill = ({ value }) => {
  const map = {
    Attivo: 'bg-emerald-50 text-emerald-700',
    'In attesa': 'bg-rose-50 text-rose-600',
    Inattivo: 'bg-red-600/10 text-red-600',
  };
  const cls = map[value] || map.Attivo;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${cls}`}
    >
      {value}
    </span>
  );
};

const Progress = ({ current, max }) => {
  const pct = Math.min(100, Math.round((current / max) * 100));
  return (
    <div className="flex min-w-[180px] items-center gap-3">
      <div className="h-2 w-40 rounded-full bg-emerald-100">
        <div
          className="h-2 rounded-full bg-emerald-400"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-gray-700">
        {current}/{max}
      </span>
    </div>
  );
};

export default function LicenseManagementView({
  initialRows = [
    {
      azienda: 'TechCorp Training',
      fatturato: 45230,
      used: 145,
      cap: 200,
      stato: 'Attivo',
    },
    {
      azienda: 'Healthcare Academy',
      fatturato: 32150,
      used: 190,
      cap: 200,
      stato: 'Attivo',
    },
    {
      azienda: 'Digital Marketing Hub',
      fatturato: 18950,
      used: 120,
      cap: 150,
      stato: 'Attivo',
    },
    {
      azienda: 'Legal Learning Group',
      fatturato: 0,
      used: 250,
      cap: 300,
      stato: 'In attesa',
    },
    {
      azienda: 'Manufacturing Skills',
      fatturato: 28750,
      used: 45,
      cap: 50,
      stato: 'Inattivo',
    },
  ],
  pageSize = 5,
  onExport = () => alert('Esporta rapporto'),
  onDelete = (row) => alert('Elimina: ' + row.azienda),
}) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] =
    useState(false);

  const onAdd = () => setIsAddModalOpen(true);
  const onEdit = (row) => {
    setEditingLicense(row);
    setIsEditModalOpen(true);
  };

  const onViewDetails = (row) => {
    setSelectedLicense(row);
    setIsPersonalDetailsModalOpen(true);
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return initialRows;
    return initialRows.filter((r) => r.azienda.toLowerCase().includes(needle));
  }, [q, initialRows]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  return (
    <div className="m-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 md:m-8 md:p-8">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-2 md:gap-4">
        <h2 className="flex-1 text-[26px] font-semibold text-gray-900 md:text-[28px]">
          Gestione delle licenze
        </h2>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Cerca"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            className="min-w-[160px] bg-transparent text-sm outline-none"
          />
        </div>

        {/* Export */}
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400 px-5 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
        >
          <Download className="h-5 w-5" />
          Esporta rapporto
        </button>

        {/* Add license */}
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
        >
          <Plus className="h-5 w-5" />
          Aggiungi licenza
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
                <td className="max-w-[220px] truncate px-4 py-5">
                  <button
                    onClick={() => onViewDetails(r)}
                    className="cursor-pointer text-left font-medium text-gray-900 transition-colors duration-200 hover:text-emerald-600"
                    title="Visualizza dettagli licenza"
                  >
                    {r.azienda}
                  </button>
                </td>
                <td className="px-4 py-5 whitespace-nowrap text-gray-900">
                  {euro.format(r.fatturato)}
                </td>
                <td className="px-4 py-5">
                  <Progress current={r.used} max={r.cap} />
                </td>
                <td className="px-4 py-5">
                  <StatusPill value={r.stato} />
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onEdit(r)}
                      className="text-gray-700 hover:text-gray-900"
                      title="Modifica"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(r)}
                      className="text-red-600 hover:text-red-700"
                      title="Elimina"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  Nessun risultato trovato.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: count + pagination */}
      <div className="flex flex-col items-center justify-between gap-4 px-2 py-4 md:flex-row">
        <p className="text-sm text-gray-500">
          Showing {rows.length} of {filtered.length} licensees
        </p>

        <nav className="flex items-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            className="text-gray-700 disabled:text-gray-300"
          >
            Precedente
          </button>

          {/* Pages (simple demo: show first 2 pages explicitly like screenshot) */}
          <button
            onClick={() => setPage(1)}
            className={`h-8 w-8 rounded-md text-sm ${
              clampedPage === 1
                ? 'bg-emerald-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            1
          </button>
          <button
            onClick={() => setPage(2)}
            className={`h-8 w-8 rounded-md text-sm ${
              clampedPage === 2
                ? 'bg-emerald-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            2
          </button>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages}
            className="text-gray-700 disabled:text-gray-300"
          >
            Prossimo
          </button>
        </nav>
      </div>

      {/* Edit License Modal */}
      <EditLicenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        license={editingLicense}
        onSave={(updatedLicense) => {
          // Handle save logic here
          console.log('Saving license:', updatedLicense);
          setIsEditModalOpen(false);
        }}
      />

      {/* Add License Modal */}
      <AddLicenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(newLicense) => {
          // Handle add license logic here
          console.log('Adding new license:', newLicense);
          setIsAddModalOpen(false);
        }}
      />

      {/* License Details Modal */}
      <LicenseDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        license={selectedLicense}
        onEdit={(license) => {
          setSelectedLicense(license);
          setEditingLicense(license);
          setIsDetailsModalOpen(false);
          setIsEditModalOpen(true);
        }}
        onDelete={(license) => {
          if (
            confirm(
              `Sei sicuro di voler eliminare la licenza di ${license.azienda}?`,
            )
          ) {
            console.log('Deleting license:', license);
            setIsDetailsModalOpen(false);
          }
        }}
      />

      {/* Personal Details Modal */}
      <PersonalDetailsModal
        isOpen={isPersonalDetailsModalOpen}
        onClose={() => setIsPersonalDetailsModalOpen(false)}
        company={selectedLicense}
        onBack={() => {
          setIsPersonalDetailsModalOpen(false);
          setIsDetailsModalOpen(true);
        }}
      />
    </div>
  );
}
