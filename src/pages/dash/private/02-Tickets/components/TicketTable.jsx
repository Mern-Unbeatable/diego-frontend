import { useEffect, useMemo, useState } from 'react';
import { Eye, Plus, Search, X } from 'lucide-react';
import Pagination from '../../../../../components/ui/Utilities/Pagination';

const PAGE_SIZE = 10;

const getStatusClass = (status) => {
  if (status === 'Aperto') return 'bg-[#fce8e6] text-[#d9534f]';
  if (status === 'In lavorazione') return 'bg-[#fdf2df] text-[#e59a2b]';
  return 'bg-[#e6f6ef] text-[#57a080]';
};

const TicketTable = ({
  filteredTickets = [],
  search,
  setSearch,
  onViewTicket,
  onCreateClick,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, filteredTickets.length]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageTickets = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTickets.slice(start, start + PAGE_SIZE);
  }, [filteredTickets, currentPage]);

  return (
    <section className="min-w-0 space-y-4 sm:space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs text-[#7a7a7a] sm:text-sm">Area ticket</p>
          <h2 className="text-base font-semibold text-[#202020] sm:text-lg">
            Elenco ticket di supporto
          </h2>
        </div>

        <button
          type="button"
          onClick={onCreateClick}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white hover:bg-[#63a88c] sm:w-auto"
        >
          <Plus size={16} /> Apri un ticket
        </button>
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
        <div className="border-b border-gray-100 px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex h-10 w-full items-center rounded-full border border-[#e5e5e5] bg-white px-3 sm:h-11 sm:max-w-md sm:px-4">
            <Search size={16} className="pointer-events-none shrink-0 text-[#9ca3af]" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoComplete="off"
              className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a3a3a3]"
              placeholder="Cerca per ID, oggetto o stato"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Pulisci ricerca"
              >
                <X size={14} />
              </button>
            ) : null}
          </div>
          {search.trim() ? (
            <p className="mt-2 text-xs text-gray-500">
              {filteredTickets.length} risultat
              {filteredTickets.length === 1 ? 'o' : 'i'} per &quot;{search.trim()}&quot;
            </p>
          ) : null}
        </div>

        {filteredTickets.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[#7a7a7a]">
            {search.trim()
              ? 'Nessun ticket corrisponde alla ricerca'
              : 'Nessun ticket trovato'}
          </p>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 p-3 md:hidden">
              {pageTickets.map((ticket) => (
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
                      <p className="mt-1 text-xs text-gray-500">{ticket.createdAt}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onViewTicket(ticket)}
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
                      Data Creazione
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-[#242424] lg:text-sm">
                      Stato
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#242424] lg:px-5 lg:text-sm">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-b border-[#e4e4e4] last:border-b-0 hover:bg-gray-50/50"
                    >
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-[#2f2f2f] lg:px-5">
                        {ticket.displayId}
                      </td>
                      <td className="max-w-[260px] truncate px-4 py-4 text-sm text-[#2f2f2f]">
                        {ticket.subject}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-[#2f2f2f]">
                        {ticket.createdAt}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(ticket.status)}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right lg:px-5">
                        <button
                          type="button"
                          onClick={() => onViewTicket(ticket)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf4f0] text-[#73bfa1] hover:bg-[#d5eae1]"
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

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              total={filteredTickets.length}
              limit={PAGE_SIZE}
              onPageChange={setPage}
              className="px-3 sm:px-5"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default TicketTable;
