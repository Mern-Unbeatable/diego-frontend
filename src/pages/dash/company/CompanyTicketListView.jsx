import { BellRing, ChevronRight, CircleAlert, CircleCheck, Search, TicketPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const tickets = [
    {
        id: 1234,
        title: 'Access Issue - "Functionality Is Restricted" Message On Login',
        requester: 'Jane Cooper',
        priority: 'Critical',
        status: 'Aperto',
        updatedAt: 'GG/MM/AAAA 13:32:49',
        badgeTone: 'bg-[#fce8e6] text-[#d9534f]',
    },
    {
        id: 1235,
        title: 'Invoice not found in account area',
        requester: 'Franco Rossi',
        priority: 'Medium',
        status: 'In lavorazione',
        updatedAt: 'GG/MM/AAAA 10:14:31',
        badgeTone: 'bg-[#fdf2df] text-[#e59a2b]',
    },
    {
        id: 1236,
        title: 'Request certificate reissue',
        requester: 'Mario Bianchi',
        priority: 'Low',
        status: 'Chiuso',
        updatedAt: 'GG/MM/AAAA 08:42:18',
        badgeTone: 'bg-[#e6f6ef] text-[#57a080]',
    },
];

const CompanyTicketListView = () => {
    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-[#7d7d7d]">Area ticket</p>
                    <h2 className="text-[42px] font-semibold text-[#1f1f1f]">Elenco ticket</h2>
                </div>

                <Link
                    to="/dashboard/company-admin/ticket/nuovo"
                    className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
                >
                    <TicketPlus size={16} /> Nuovo ticket
                </Link>
            </div>

            <section className="rounded-xl border border-[#e8e8e8] bg-white p-5">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end">
                    <label className="block">
                        <span className="mb-1 block text-xs font-medium text-[#868686]">Cerca ticket</span>
                        <div className="flex h-10 items-center rounded-full border border-[#e5e5e5] bg-white px-4">
                            <Search size={16} className="text-[#9ca3af]" />
                            <input
                                className="ml-2 w-full text-sm outline-none placeholder:text-[#a3a3a3]"
                                placeholder="Cerca per oggetto, ID o nominativo"
                            />
                        </div>
                    </label>

                    <label className="block">
                        <span className="mb-1 block text-xs font-medium text-[#868686]">Stato</span>
                        <select className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none">
                            <option>Tutti</option>
                            <option>Aperto</option>
                            <option>In lavorazione</option>
                            <option>Chiuso</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="mb-1 block text-xs font-medium text-[#868686]">Priorità</span>
                        <select className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none">
                            <option>Tutte</option>
                            <option>Critical</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </label>

                    <button type="button" className="h-10 rounded-full border border-[#e5e5e5] px-5 text-sm font-medium text-[#4f4f4f] hover:bg-[#f8f8f8]">
                        Reset
                    </button>
                </div>
            </section>

            <section className="space-y-4">
                {tickets.map((ticket) => (
                    <Link
                        key={ticket.id}
                        to={`/dashboard/company-admin/ticket/${ticket.id}`}
                        className="block rounded-xl border border-[#e8e8e8] bg-white p-5 transition hover:border-[#73bfa1] hover:shadow-sm"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[#1f1f1f]">
                                    <BellRing size={18} className="text-[#73bfa1]" />
                                    <p className="text-[30px] font-semibold">#{ticket.id}</p>
                                </div>
                                <p className="max-w-[960px] text-[18px] font-medium text-[#3a3a3a]">{ticket.title}</p>
                                <p className="text-sm text-[#7d7d7d]">Richiedente: {ticket.requester}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ticket.badgeTone}`}>{ticket.status}</span>
                                <ChevronRight size={20} className="text-[#b5b5b5]" />
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#666666]">
                            <span className="inline-flex items-center gap-2">
                                <CircleAlert size={14} className="text-[#e59a2b]" /> Priorità: {ticket.priority}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CircleCheck size={14} className="text-[#57a080]" /> Aggiornato: {ticket.updatedAt}
                            </span>
                        </div>
                    </Link>
                ))}
            </section>
        </section>
    );
};

export default CompanyTicketListView;