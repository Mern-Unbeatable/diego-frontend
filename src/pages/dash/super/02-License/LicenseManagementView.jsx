import React, { useState } from 'react';
import {
  Search,
  Download,
  Plus,
  Pencil,
  Trash2,
  Users,
  Layers,
} from 'lucide-react';
import LicenseFormModal from './components/LicenseFormModal';
import LicenseDetailsModal from './components/LicenseDetailsModal';
import LicensePlansPanel from './components/LicensePlansPanel';
import PersonalDetailsModal from '../07-Report/components/PersonalDetailsModal';
import Loading from '../../../../components/ui/Utilities/Loading';
import {
  useGetLicensesQuery,
  useDeleteLicenseMutation,
} from '../../../../features/api/licenseApi';
import {
  showSuccessToast,
  showInfoToast,
  showRtkErrorToast,
  showConfirmToast,
} from '../../../../utils/toast/toastAlerts';

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
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${cls}`}
    >
      {value}
    </span>
  );
};

const Progress = ({ current, max }) => {
  const pct = Math.min(100, Math.round((current / Math.max(max, 1)) * 100));
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

export default function LicenseManagementView({ pageSize = 5 }) {
  const [activeTab, setActiveTab] = useState('licenses');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [licenseModalMode, setLicenseModalMode] = useState('create');
  const [editingUserId, setEditingUserId] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] =
    useState(false);

  const {
    data: licensesData,
    isLoading: licensesLoading,
    isFetching: licensesFetching,
  } = useGetLicensesQuery({
    page,
    limit: pageSize,
    search: q || undefined,
  });

  const [deleteLicense, { isLoading: deleteLicenseLoading }] =
    useDeleteLicenseMutation();

  const licensesMeta = licensesData?.meta ?? {
    page: 1,
    limit: pageSize,
    total: 0,
    totalPages: 1,
  };
  const totalPages = Math.max(1, licensesMeta?.totalPages ?? 1);
  const clampedPage = Math.min(page, totalPages);
  const rows = licensesData?.licenses ?? [];

  const openCreateLicenseModal = () => {
    setLicenseModalMode('create');
    setEditingUserId(null);
    setIsLicenseModalOpen(true);
  };

  const openEditLicenseModal = (userId) => {
    setLicenseModalMode('edit');
    setEditingUserId(userId);
    setIsLicenseModalOpen(true);
  };

  const closeLicenseModal = () => {
    setIsLicenseModalOpen(false);
    setEditingUserId(null);
    setLicenseModalMode('create');
  };

  const handleExport = () => {
    showInfoToast('Esporta rapporto');
  };

  const handleDelete = async (row) => {
    const confirmed = await showConfirmToast({
      title: 'Elimina licenza',
      message: `Sei sicuro di voler eliminare la licenza di ${row.azienda}? L'operazione non può essere annullata.`,
      confirmLabel: 'Elimina',
      cancelLabel: 'Annulla',
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      await deleteLicense(row.userId).unwrap();
      showSuccessToast('Licenza eliminata');
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const listLoading = licensesLoading || licensesFetching;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[#e3ece8] pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('licenses')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'licenses'
              ? 'border-emerald-500 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Users size={16} />
          Licenze
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('plans')}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'plans'
              ? 'border-emerald-500 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Layers size={16} />
          Piani licenza
        </button>
      </div>

      {activeTab === 'plans' ? (
        <LicensePlansPanel />
      ) : (
        <>
      <div className="flex flex-wrap items-center gap-3 px-2 md:gap-4">
        <h2 className="flex-1 text-[26px] font-semibold text-gray-900 md:text-[28px]">
          Gestione delle licenze
        </h2>

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

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400 px-5 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
        >
          <Download className="h-5 w-5" />
          Esporta rapporto
        </button>

        <button
          onClick={openCreateLicenseModal}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
        >
          <Plus className="h-5 w-5" />
          Aggiungi licenza
        </button>
      </div>

      {listLoading && rows.length === 0 ? (
        <Loading size="md" className="min-h-60" />
      ) : (
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
              {rows.map((r) => (
                <tr key={r.id || r.userId} className="border-b border-gray-200">
                  <td className="max-w-[220px] truncate px-4 py-5">
                    <button
                      onClick={() => {
                        setSelectedLicense(r);
                        setIsPersonalDetailsModalOpen(true);
                      }}
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
                    <Progress current={r.used ?? 0} max={r.cap || 1} />
                  </td>
                  <td className="px-4 py-5">
                    <StatusPill value={r.stato} />
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => openEditLicenseModal(r.userId)}
                        className="text-gray-700 hover:text-gray-900"
                        title="Modifica"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r)}
                        disabled={deleteLicenseLoading}
                        className="text-red-600 hover:text-red-700 disabled:opacity-50"
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
      )}

      <div className="flex flex-col items-center justify-between gap-4 px-2 py-4 md:flex-row">
        <p className="text-sm text-gray-500">
          Showing {rows.length} of {licensesMeta?.total ?? rows.length} licensees
        </p>

        <nav className="flex items-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            className="text-gray-700 disabled:text-gray-300"
          >
            Precedente
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(0, 5)
            .map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`h-8 w-8 rounded-md text-sm ${
                  clampedPage === pageNumber
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNumber}
              </button>
            ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages}
            className="text-gray-700 disabled:text-gray-300"
          >
            Prossimo
          </button>
        </nav>
      </div>

      <LicenseFormModal
        isOpen={isLicenseModalOpen}
        mode={licenseModalMode}
        userId={editingUserId}
        onClose={closeLicenseModal}
        onSuccess={() => {
          if (licenseModalMode === 'create') setPage(1);
        }}
      />

      <LicenseDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        license={selectedLicense}
        onEdit={(license) => {
          setSelectedLicense(license);
          setIsDetailsModalOpen(false);
          openEditLicenseModal(license.userId);
        }}
        onDelete={(license) => handleDelete(license)}
      />

      <PersonalDetailsModal
        isOpen={isPersonalDetailsModalOpen}
        onClose={() => setIsPersonalDetailsModalOpen(false)}
        company={selectedLicense}
        onBack={() => {
          setIsPersonalDetailsModalOpen(false);
          setIsDetailsModalOpen(true);
        }}
      />
        </>
      )}
    </div>
  );
}
