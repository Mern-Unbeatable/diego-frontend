import { Eye, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import AddTicketModal from './AddTicketModal';
import TicketDetailsModal from './TicketDetailsModal';

const ticketsSeed = [
    {
        id: 1234,
        subject: 'Access Issue - "Functionality Is Restricted" Message On Login',
        requester: 'Jane Cooper',
        requesterLevel: 'Livello 1',
        priority: 'Critical',
        createdAt: 'Aug 06, 2025 20:44:58',
        status: 'Aperto',
        message:
            'I am experiencing an issue when logging into my hosting account using the email address example@gmail.com. Upon logging in, I receive the following message: "Functionality is restricted." Could you please investigate and resolve this issue as soon as possible?',
    },
    {
        id: 1235,
        subject: 'Unable to download certificate',
        requester: 'Mario Rossi',
        requesterLevel: 'Livello 2',
        priority: 'Medio',
        createdAt: 'Aug 04, 2025 11:10:18',
        status: 'In lavorazione',
        message: 'Cannot download certificate after course completion. The page keeps loading.',
    },
    {
        id: 1236,
        subject: 'Question about lesson tracking',
        requester: 'Kristin Watson',
        requesterLevel: 'Livello 1',
        priority: 'Basso',
        createdAt: 'Aug 02, 2025 09:36:00',
        status: 'Chiuso',
        message: 'Need clarification regarding progress tracking between modules.',
    },
];

const FreelancerTicket = () => {
    const [tickets] = useState(ticketsSeed);
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [activeTicket, setActiveTicket] = useState(null);

    const filteredTickets = useMemo(() => {
        if (!search.trim()) return tickets;
        return tickets.filter((ticket) => {
            const haystack = `${ticket.id} ${ticket.subject} ${ticket.requester}`.toLowerCase();
            return haystack.includes(search.toLowerCase());
        });
    }, [search, tickets]);

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
                    <table className="min-w-[980px] w-full border-collapse">
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
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b border-[#e4e4e4]">
                                    <td className="px-5 py-4 text-sm text-[#2f2f2f]">{ticket.id}</td>
                                    <td className="px-4 py-4 text-sm text-[#2f2f2f]">{ticket.subject}</td>
                                    <td className="px-4 py-4 text-sm text-[#2f2f2f]">{ticket.requester}</td>
                                    <td className="px-4 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ticket.status === 'Aperto' ? 'bg-[#fce8e6] text-[#d9534f]' : ticket.status === 'In lavorazione' ? 'bg-[#fdf2df] text-[#e59a2b]' : 'bg-[#e6f6ef] text-[#57a080]'}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setActiveTicket(ticket);
                                                setIsDetailsModalOpen(true);
                                            }}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf4f0] text-[#73bfa1]"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddTicketModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <TicketDetailsModal open={isDetailsModalOpen} ticket={activeTicket} onClose={() => setIsDetailsModalOpen(false)} />
        </section>
    );
};

export default FreelancerTicket;