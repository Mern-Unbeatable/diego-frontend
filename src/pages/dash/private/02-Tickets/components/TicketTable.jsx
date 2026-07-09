import React from 'react';
import { Search, Plus, Eye } from 'lucide-react';

const TicketTable = ({
  filteredTickets,
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
      <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 sm:p-5">
        <label className="flex h-11 max-w-[460px] items-center rounded-full border border-[#e5e5e5] px-4">
          <Search size={16} className="text-[#9ca3af]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="ml-2 w-full text-sm outline-none placeholder:text-[#a3a3a3]"
            placeholder="Cerca ticket per ID, oggetto o stato"
          />
        </label>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-[#f1f1f1] text-left">
                <th className="px-5 py-3 text-sm font-semibold text-[#242424]">
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
                <th className="px-4 py-3 text-sm font-semibold text-[#242424]">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-[#e4e4e4]">
                  <td className="px-5 py-4 text-sm text-[#2f2f2f]">
                    {ticket.id}
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
                  <td className="px-4 py-4">
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
      </div>
    </section>
  );
};

export default TicketTable;
