import { Eye, Plus, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import AddTicketModal from './components/AddTicketModal';
import TicketDetailsModal from './components/TicketDetailsModal';
import { useGetMyTicketsQuery } from '../../../../features/api/licenseUserApi';
import { getRtkErrorMessage } from '../../../../features/api/utils';
import Loading from '../../../../components/ui/Utilities/Loading';

const normalizeSearchText = (value) =>
  String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[#_\-./\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const matchesTicketSearch = (ticket, rawQuery) => {
  const query = normalizeSearchText(rawQuery);
  if (!query) return true;

  const haystack = normalizeSearchText(
    [
      ticket.displayId,
      ticket.ticketNumber,
      ticket.subject,
      ticket.message,
      ticket.userName,
      ticket.userEmail,
      ticket.status,
      ticket.rawStatus,
    ]
      .filter((value) => value != null && value !== '')
      .join(' '),
  );

  const tokens = query.split(' ').filter(Boolean);
  return tokens.every((token) => haystack.includes(token));
};

const LicenseTicketView = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState(null);

  const { data, isLoading, isError, error, refetch } = useGetMyTicketsQuery({
    page: 1,
    limit: 50,
  });

  const allTickets = data?.tickets ?? [];

  const tickets = useMemo(
    () => allTickets.filter((ticket) => matchesTicketSearch(ticket, searchInput)),
    [allTickets, searchInput],
  );

  const getStatusClass = (status) => {
    if (status === 'Aperto') return 'bg-[#fce8e6] text-[#d9534f]';
    if (status === 'In lavorazione') return 'bg-[#fdf2df] text-[#e59a2b]';
    return 'bg-[#e6f6ef] text-[#57a080]';
  };

  const openTicketDetails = (ticketId) => {
    setActiveTicketId(ticketId);
    setIsDetailsModalOpen(true);
  };

  if (isLoading && !data) {
    return <Loading size="md" className="min-h-60" />;
  }

  return (
    <section className="min-w-0 space-y-4 sm:space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs text-[#7a7a7a] sm:text-sm">Area ticket</p>
          <h2 className="text-base font-semibold text-[#202020] sm:text-lg">
            Elenco ticket
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white hover:bg-[#63a88c] sm:w-auto"
        >
          <Plus size={16} /> Apri un ticket
        </button>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {getRtkErrorMessage(error)}
          <button
            type="button"
            onClick={refetch}
            className="ml-3 font-semibold underline"
          >
            Riprova
          </button>
        </div>
      )}

      <div className="min-w-0 overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
        <div className="border-b border-gray-100 px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex h-10 w-full items-center rounded-full border border-[#e5e5e5] bg-white px-3 sm:h-11 sm:max-w-md sm:px-4">
            <Search size={16} className="pointer-events-none shrink-0 text-[#9ca3af]" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              autoComplete="off"
              className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a3a3a3]"
              placeholder="Cerca per ID, oggetto o nominativo"
            />
            {searchInput ? (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Pulisci ricerca"
              >
                {/* <X size={14} /> */}
              </button>
            ) : null}
          </div>
          {searchInput.trim() ? (
            <p className="mt-2 text-xs text-gray-500">
              {tickets.length} risultat{tickets.length === 1 ? 'o' : 'i'} per &quot;
              {searchInput.trim()}&quot;
            </p>
          ) : null}
        </div>

        {tickets.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[#7a7a7a]">
            {searchInput.trim()
              ? 'Nessun ticket corrisponde alla ricerca'
              : 'Nessun ticket trovato'}
          </p>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 p-3 md:hidden">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-xl border border-[#ececec] bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-[#73bfa1]">
                          {ticket.displayId}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(ticket.status)}`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm font-medium text-[#2f2f2f]">
                        {ticket.subject}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {ticket.userName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openTicketDetails(ticket.id)}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf4f0] text-[#73bfa1]"
                      aria-label="Visualizza ticket"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] border-collapse">
                <thead>
                  <tr className="bg-[#f1f1f1] text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-[#242424] lg:px-5 lg:text-sm">
                      ID
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-[#242424] lg:text-sm">
                      Oggetto
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-[#242424] lg:text-sm">
                      Nominativo
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-[#242424] lg:text-sm">
                      Stato
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-[#242424] lg:text-sm">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-[#e4e4e4]">
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-[#2f2f2f] lg:px-5">
                        {ticket.displayId}
                      </td>
                      <td className="max-w-[220px] truncate px-4 py-4 text-sm text-[#2f2f2f]">
                        {ticket.subject}
                      </td>
                      <td className="max-w-[160px] truncate px-4 py-4 text-sm text-[#2f2f2f]">
                        {ticket.userName}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(ticket.status)}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => openTicketDetails(ticket.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf4f0] text-[#73bfa1]"
                          aria-label="Visualizza ticket"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <AddTicketModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          refetch();
        }}
      />

      <TicketDetailsModal
        open={isDetailsModalOpen}
        ticketId={activeTicketId}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setActiveTicketId(null);
        }}
      />
    </section>
  );
};

export default LicenseTicketView;
