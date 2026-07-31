import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Trash2, Search } from 'lucide-react';
import Loading from '../../../../../components/ui/Utilities/Loading';
import Pagination from '../../../../../components/ui/Utilities/Pagination';
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

const PAGE_SIZE = 10;

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

const matchesSearch = (ticket, query) => {
  if (!query) return true;
  const haystack = [
    ticket.displayId,
    ticket.subject,
    ticket.userName,
    ticket.userEmail,
    ticket.userLevelLabel,
    ticket.tenantName,
    ticket.status,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
};

export default function TicketSection({ activeTab = 'panoramica' }) {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const queryArgs = useMemo(() => {
    const base = {
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (TAB_STATUS[activeTab]) {
      return { ...base, status: TAB_STATUS[activeTab] };
    }

    if (activeTab === 'chiusi') {
      return { ...base, status: 'CLOSED' };
    }

    return base;
  }, [activeTab, search, page]);

  const { data, isLoading, isFetching } = useGetTicketsQuery(queryArgs);
  const [deleteTicket, { isLoading: deleting }] = useDeleteTicketMutation();

  const tickets = useMemo(() => {
    let rows = data?.tickets ?? [];

    if (activeTab === 'chiusi') {
      rows = rows.filter((ticket) =>
        ['CLOSED', 'RESOLVED'].includes(ticket.rawStatus),
      );
    }

    if (search) {
      const query = search.toLowerCase();
      rows = rows.filter((ticket) => matchesSearch(ticket, query));
    }

    return rows;
  }, [data?.tickets, activeTab, search]);

  const meta = data?.meta ?? {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  const total = meta.total ?? tickets.length;
  const totalPages = Math.max(1, meta.totalPages ?? 1);
  const clampedPage = Math.min(page, totalPages);

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

  const searchField = (
    <div className="flex w-full items-center gap-2 rounded-full bg-gray-100 px-3 py-2 sm:w-auto sm:min-w-[220px]">
      <Search className="h-4 w-4 shrink-0 text-gray-500" />
      <input
        type="search"
        placeholder="Cerca ticket..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
      />
    </div>
  );

  const renderMobileCards = () => (
    <div className="space-y-3 md:hidden">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={() => openTicket(ticket.id)}
              className="min-w-0 flex-1 text-left"
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                <span className="text-xs font-semibold text-emerald-700">
                  {ticket.displayId}
                </span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(ticket.rawStatus)}`}
                >
                  {ticket.status}
                </span>
              </div>
              <p className="line-clamp-2 text-sm font-medium text-gray-900">
                {ticket.subject}
              </p>
              <p className="mt-1 truncate text-xs text-gray-600">
                {ticket.userName} · {ticket.userLevelLabel}
                {ticket.tenantName !== '—' ? ` · ${ticket.tenantName}` : ''}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {ticket.createdAtFormatted}
              </p>
            </button>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                title="Visualizza"
                onClick={() => openTicket(ticket.id)}
              >
                <Eye className="h-4 w-4" />
              </button>
              {activeTab !== 'panoramica' && (
                <button
                  type="button"
                  className="rounded-lg p-2 text-gray-400 hover:bg-rose-50 hover:text-red-600 disabled:opacity-50"
                  title="Elimina"
                  disabled={deleting}
                  onClick={() => handleDelete(ticket)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDesktopTable = () => (
    <div className="-mx-1 hidden overflow-x-auto md:mx-0 md:block">
      <table className="min-w-[720px] w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6">
              Oggetto
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6">
              Utente
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6">
              Tipo
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6">
              Stato
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6">
              Data
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6">
              Azioni
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 text-sm font-semibold whitespace-nowrap text-gray-900 lg:px-6">
                {ticket.displayId}
              </td>
              <td className="max-w-[200px] truncate px-4 py-4 text-sm font-medium text-gray-900 lg:px-6">
                {ticket.subject}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 lg:px-6">
                <div className="truncate">{ticket.userName}</div>
                <div className="truncate text-xs text-gray-500">
                  {ticket.userEmail}
                </div>
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-700 lg:px-6">
                {ticket.userLevelLabel}
              </td>
              <td className="px-4 py-4 whitespace-nowrap lg:px-6">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(ticket.rawStatus)}`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 lg:px-6">
                {ticket.createdAtFormatted}
              </td>
              <td className="px-4 py-4 text-right text-sm font-medium whitespace-nowrap lg:px-6">
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
    </div>
  );

  const emptyState = (
    <div className="rounded-lg bg-white px-4 py-16 text-center shadow-sm sm:py-24">
      <h3 className="text-base font-medium text-gray-900 sm:text-lg">
        Nessun ticket trovato
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        {search
          ? 'Nessun risultato per la ricerca effettuata.'
          : 'I ticket inviati da utenti privati, licenziatari e aziende appariranno qui.'}
      </p>
    </div>
  );

  const detailModal = (
    <TicketDetailModal
      isOpen={isDetailOpen}
      onClose={() => {
        setIsDetailOpen(false);
        setSelectedTicketId(null);
      }}
      ticketId={selectedTicketId}
    />
  );

  if (activeTab === 'panoramica') {
    return (
      <div className="min-w-0 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-medium text-gray-800 sm:text-lg">
            {getTabTitle()}
          </h2>
          {searchField}
        </div>

        {listLoading ? (
          <Loading size="md" className="min-h-40" />
        ) : tickets.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-500 shadow-sm sm:p-8">
            Nessun ticket aperto al momento.
          </div>
        ) : (
          <>
            {renderMobileCards()}
            <div className="hidden rounded-lg bg-white shadow-sm md:block">
              <div className="divide-y divide-gray-100">
                {tickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => openTicket(ticket.id)}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex min-w-0 items-center gap-2">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                        <span className="shrink-0 text-xs font-semibold text-emerald-700">
                          {ticket.displayId}
                        </span>
                        <span className="truncate font-medium text-gray-900">
                          {ticket.subject}
                        </span>
                      </div>
                      <p className="truncate text-sm text-gray-600">
                        {ticket.userName} · {ticket.userLevelLabel}
                        {ticket.tenantName !== '—'
                          ? ` · ${ticket.tenantName}`
                          : ''}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(ticket.rawStatus)}`}
                    >
                      {ticket.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <Pagination
              page={clampedPage}
              totalPages={totalPages}
              total={total}
              limit={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}

        {detailModal}
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-medium text-gray-900 sm:text-lg">
          {getTabTitle()}{' '}
          <span className="font-normal text-gray-500">({total})</span>
        </h2>
        {searchField}
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        {listLoading ? (
          <Loading size="md" className="min-h-48" />
        ) : tickets.length === 0 ? (
          emptyState
        ) : (
          <div className="p-3 sm:p-0">
            {renderMobileCards()}
            {renderDesktopTable()}
          </div>
        )}
      </div>

      {!listLoading && tickets.length > 0 && (
        <Pagination
          page={clampedPage}
          totalPages={totalPages}
          total={total}
          limit={PAGE_SIZE}
          onPageChange={setPage}
          className="px-1 sm:px-2"
        />
      )}

      {detailModal}
    </div>
  );
}
