import { Eye, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import AddTicketModal from './components/AddTicketModal';
import TicketDetailsModal from './components/TicketDetailsModal';
import { useGetMyTicketsQuery } from '../../../../features/api/licenseUserApi';
import { getRtkErrorMessage } from '../../../../features/api/utils';
import Loading from '../../../../components/ui/Utilities/Loading';

const LicenseTicketView = () => {
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState(null);

  const { data, isLoading, isError, error, refetch } = useGetMyTicketsQuery({
    limit: 50,
    search: search.trim() || undefined,
  });

  const tickets = data?.tickets ?? [];

  const getStatusClass = (status) => {
    if (status === 'Aperto') return 'bg-[#fce8e6] text-[#d9534f]';
    if (status === 'In lavorazione') return 'bg-[#fdf2df] text-[#e59a2b]';
    return 'bg-[#e6f6ef] text-[#57a080]';
  };

  if (isLoading) {
    return <Loading size="md" className="min-h-60" />;
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#7a7a7a]">Area ticket</p>
          <h2 className="text-lg font-semibold text-[#202020]">Elenco ticket</h2>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
        >
          <Plus size={16} /> Apri un ticket
        </button>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {getRtkErrorMessage(error)}
          <button type="button" onClick={refetch} className="ml-3 font-semibold underline">
            Riprova
          </button>
        </div>
      )}

      <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 sm:p-5">
        <label className="flex h-11 max-w-[460px] items-center rounded-full border border-[#e5e5e5] px-4">
          <Search size={16} className="text-[#9ca3af]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="ml-2 w-full text-sm outline-none placeholder:text-[#a3a3a3]"
            placeholder="Cerca ticket per ID, oggetto o nominativo"
          />
        </label>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="bg-[#f1f1f1] text-left">
                <th className="px-5 py-3 text-sm font-semibold text-[#242424]">ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-[#242424]">Oggetto</th>
                <th className="px-4 py-3 text-sm font-semibold text-[#242424]">Nominativo</th>
                <th className="px-4 py-3 text-sm font-semibold text-[#242424]">Stato</th>
                <th className="px-4 py-3 text-sm font-semibold text-[#242424]">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-[#e4e4e4]">
                    <td className="px-5 py-4 text-sm text-[#2f2f2f]">
                      {ticket.displayId}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#2f2f2f]">{ticket.subject}</td>
                    <td className="px-4 py-4 text-sm text-[#2f2f2f]">{ticket.userName}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTicketId(ticket.id);
                          setIsDetailsModalOpen(true);
                        }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf4f0] text-[#73bfa1]"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-[#7a7a7a]">
                    Nessun ticket trovato
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
