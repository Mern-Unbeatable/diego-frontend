import React from 'react';
import { Search, Plus, Eye } from 'lucide-react';
import Pagination from './Pagination';

const TicketTable = ({
  filteredTickets = [],
  search,
  setSearch,
  onViewTicket,
  onCreateClick,
}) => {
  return (
    <section className="space-y-5">
      {/* Header and Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#7a7a7a]">Area ticket</p>
          <h2 className="text-lg font-semibold text-[#202020]">
            Elenco ticket di supporto
          </h2>
        </div>

        <button
          type="button"
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#5fa488]"
        >
          <Plus size={16} /> Apri un ticket
        </button>
      </div>

      {/* Search and Table Container */}
      <div className="rounded-xl border border-[#e8e8e8] bg-white pt-4 sm:pt-5 pb-0 px-0 overflow-hidden">
        {/* Search input container with horizontal padding */}
        <div className="px-4 sm:px-5 pb-4">
          <label className="flex h-11 max-w-[460px] items-center rounded-full border border-[#e5e5e5] px-4">
            <Search size={16} className="text-[#9ca3af]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="ml-2 w-full text-sm outline-none placeholder:text-[#a3a3a3]"
              placeholder="Cerca ticket per ID, oggetto o stato"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-[#f1f1f1] text-left">
                <th className="pl-6 pr-4 py-3 text-sm font-semibold text-[#242424]">
                  ID
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-[#242424]">
                  Oggetto
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-[#242424]">
                  Data Creazione
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-[#242424]">
                  Stato
                </th>
                <th className="pl-4 pr-6 py-3 text-sm font-semibold text-[#242424] text-right">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-[#e4e4e4] last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="pl-6 pr-4 py-4 text-sm text-[#2f2f2f]">
                    {ticket.displayId}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#2f2f2f]">
                    {ticket.subject}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#2f2f2f]">
                    {ticket.createdAt}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        ticket.status === 'Aperto'
                          ? 'bg-[#fce8e6] text-[#d9534f]'
                          : ticket.status === 'In lavorazione'
                          ? 'bg-[#fdf2df] text-[#e59a2b]'
                          : 'bg-[#e6f6ef] text-[#57a080]'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="pl-4 pr-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onViewTicket(ticket)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf4f0] text-[#73bfa1] transition hover:bg-[#d5eae1]"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-gray-500">
                    Nessun ticket trovato
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info & Controls */}
        <Pagination
          totalItems={filteredTickets.length}
          itemsPerPage={filteredTickets.length}
          currentPage={1}
        />
      </div>
    </section>
  );
};

export default TicketTable;
