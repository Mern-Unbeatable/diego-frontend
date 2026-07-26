import React, { useMemo, useState } from 'react';
import { Eye, Trash2, Search } from 'lucide-react';
import Loading from '../../../../../components/ui/Utilities/Loading';
import {
  useGetTicketsQuery,
  useDeleteTicketMutation,
} from '../../../../../features/api/ticketApi';
import {
  showSuccessToast,
  showRtkErrorToast,
  showConfirmToast,
} from '../../../../../utils/toast/toastAlerts';
import TicketDetailModal from './TicketDetailModal';

const TAB_STATUS = {
  aperti: 'OPEN',
  attesa: 'IN_PROGRESS',
};

const getStatusBadgeClass = (rawStatus) => {
  switch (rawStatus) {
    case 'OPEN':
      return 'bg-teal-100 text-teal-800';
    case 'IN_PROGRESS':
      return 'bg-amber-100 text-amber-800';
    case 'RESOLVED':
      return 'bg-blue-100 text-blue-800';
    case 'CLOSED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function TicketSection({ activeTab = 'panoramica' }) {
  const [search, setSearch] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const queryArgs = useMemo(() => {
    const base = {
      page: 1,
      limit: activeTab === 'panoramica' ? 5 : 50,
      search: search.trim() || undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (TAB_STATUS[activeTab]) {
      return { ...base, status: TAB_STATUS[activeTab] };
    }

    return base;
  }, [activeTab, search]);

  const { data, isLoading, isFetching } = useGetTicketsQuery(queryArgs);
  const [deleteTicket, { isLoading: deleting }] = useDeleteTicketMutation();

  const tickets = useMemo(() => {
    const rows = data?.tickets ?? [];
    if (activeTab === 'chiusi') {
      return rows.filter((ticket) =>
        ['CLOSED', 'RESOLVED'].includes(ticket.rawStatus),
      );
    }
    return rows;
  }, [data?.tickets, activeTab]);

  const openTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    setIsDetailOpen(true);
  };

  const handleDelete = async (ticket) => {
    const confirmed = await showConfirmToast({
      title: 'Elimina ticket',
      message: `Eliminare il ticket "${ticket.subject}"? L'operazione non può essere annullata.`,
      confirmLabel: 'Elimina',
      cancelLabel: 'Annulla',
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      await deleteTicket(ticket.id).unwrap();
      showSuccessToast('Ticket eliminato');
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'aperti':
        return 'Ticket aperti';
      case 'chiusi':
        return 'Ticket chiusi';
      case 'attesa':
        return 'In lavorazione';
      case 'panoramica':
        return 'Azioni richieste';
      default:
        return 'Ticket';
    }
  };

  const listLoading = isLoading || isFetching;

  if (activeTab === 'panoramica') {
    return (
      <div>
        <div className="my-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-medium text-gray-800">{getTabTitle()}</h2>
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Cerca ticket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-[180px] bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {listLoading ? (
          <Loading size="md" className="min-h-40" />
        ) : tickets.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            Nessun ticket aperto al momento.
          </div>
        ) : (
          <div className="rounded-lg bg-white shadow-sm">
            <div className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => openTicket(ticket.id)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-xs font-semibold text-emerald-700">
                        {ticket.displayId}
                      </span>
                      <span className="truncate font-medium text-gray-900">
                        {ticket.subject}
                      </span>
                    </div>
                    <p className="truncate text-sm text-gray-600">
                      {ticket.userName} · {ticket.userLevelLabel}
                      {ticket.tenantName !== '—' ? ` · ${ticket.tenantName}` : ''}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(ticket.rawStatus)}`}
                  >
                    {ticket.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <TicketDetailModal
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedTicketId(null);
          }}
          ticketId={selectedTicketId}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-gray-900">
          {getTabTitle()} ({tickets.length})
        </h2>
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Cerca ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[180px] bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        {listLoading ? (
          <Loading size="md" className="min-h-48" />
        ) : tickets.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-lg font-medium text-gray-900">Nessun ticket trovato</h3>
            <p className="mt-2 text-sm text-gray-500">
              I ticket inviati da utenti privati, licenziatari e aziende appariranno qui.
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Oggetto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Utente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-gray-900">
                    {ticket.displayId}
                  </td>
                  <td className="max-w-[220px] truncate px-6 py-4 text-sm font-medium text-gray-900">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>{ticket.userName}</div>
                    <div className="text-xs text-gray-500">{ticket.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket.userLevelLabel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(ticket.rawStatus)}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {ticket.createdAtFormatted}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                        title="Visualizza"
                        onClick={() => openTicket(ticket.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-600 disabled:opacity-50"
                        title="Elimina"
                        disabled={deleting}
                        onClick={() => handleDelete(ticket)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TicketDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedTicketId(null);
        }}
        ticketId={selectedTicketId}
      />
    </div>
  );
}
