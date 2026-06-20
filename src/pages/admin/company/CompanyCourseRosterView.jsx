import { ArrowLeft, Download, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const rows = [
    { id: 1, student: 'Kristin Watson', status: 'Completato', progress: 100, date: 'GG/MM/AAAA', action: 'download' },
    { id: 2, student: 'Leslie Alexander', status: 'In corso', progress: 75, date: 'GG/MM/AAAA', action: 'reminder' },
    { id: 3, student: 'Cody Fisher', status: 'In corso', progress: 25, date: 'GG/MM/AAAA', action: 'reminder' },
    { id: 4, student: 'Guy Hawkins', status: 'In corso', progress: 25, date: 'GG/MM/AAAA', action: 'reminder' },
    { id: 5, student: 'Savannah Nguyen', status: 'In corso', progress: 25, date: 'GG/MM/AAAA', action: 'reminder' },
    { id: 6, student: 'Theresa Webb', status: 'Non iniziato', progress: 0, date: 'GG/MM/AAAA', action: 'reminder' },
];

const badgeByStatus = {
    Completato: 'bg-[#e6f6ef] text-[#57a080]',
    'In corso': 'bg-[#fdf2df] text-[#e59a2b]',
    'Non iniziato': 'bg-[#fce8e6] text-[#d9534f]',
};

const CompanyCourseRosterView = () => {
    return (
        <section className="space-y-5">
            <Link to="/dashboard/company-admin/gestisci-formazione" className="inline-flex text-[#2c2c2c]">
                <ArrowLeft size={20} />
            </Link>

            <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ececec] px-5 py-4">
                    <h2 className="text-[30px] font-semibold text-[#202020]">Elenco di chi svolge il corso: Formazione SEVESO</h2>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
                    >
                        <Download size={14} /> Download
                    </button>
                </header>

                <div className="overflow-x-auto">
                    <table className="min-w-[980px] w-full text-left">
                        <thead className="border-b border-[#ececec] bg-[#fafafa]">
                            <tr className="text-sm text-[#3d3d3d]">
                                <th className="px-5 py-3 font-semibold">Corsisti iscritti</th>
                                <th className="px-3 py-3 font-semibold">Stato</th>
                                <th className="px-3 py-3 font-semibold">Avanzamento</th>
                                <th className="px-3 py-3 font-semibold">Data di iscrizione</th>
                                <th className="px-3 py-3 font-semibold">Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id} className="border-b border-[#f0f0f0] text-sm">
                                    <td className="px-5 py-3 text-[#404040]">{row.student}</td>
                                    <td className="px-3 py-3">
                                        <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${badgeByStatus[row.status]}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 text-[#404040]">
                                        <div className="flex items-center gap-2">
                                            <div className="h-[6px] w-[110px] rounded-full bg-[#e5f2ec]">
                                                <div className="h-full rounded-full bg-[#73bfa1]" style={{ width: `${row.progress}%` }} />
                                            </div>
                                            <span>{String(row.progress).padStart(2, '0')}%</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-[#404040]">{row.date}</td>
                                    <td className="px-3 py-3">
                                        {row.action === 'download' ? (
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#63a88c]"
                                            >
                                                <Download size={13} /> Download
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-full bg-[#e6f6ef] px-4 py-1.5 text-xs font-semibold text-[#57a080] hover:bg-[#d9f1e7]"
                                            >
                                                <Send size={13} /> Invia un promemoria
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-[#7d7d7d]">
                    <p>Mostra 6 di 20 corsisti</p>
                    <div className="flex items-center gap-4">
                        <button type="button">Precedente</button>
                        <button type="button" className="h-6 w-6 rounded bg-[#73bfa1] text-xs font-semibold text-white">
                            1
                        </button>
                        <button type="button">2</button>
                        <button type="button">Prossimo</button>
                    </div>
                </footer>
            </section>
        </section>
    );
};

export default CompanyCourseRosterView;
