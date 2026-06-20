import { ArrowLeft, Calendar, Download, Mail, Pencil, Phone, Trash2, UsersRound } from 'lucide-react';

const detailRows = [
    {
        id: 1,
        course: 'Formazion...',
        startDate: 'GG/MM/AAAA',
        endDate: 'GG/MM/AAAA',
        totalTime: '19:04:09',
        score: '90%',
        trainer: 'Trainer name',
        feedback: 'Corso molto utile, facili da seguire.',
    },
    {
        id: 2,
        course: 'Formazion...',
        startDate: 'GG/MM/AAAA',
        endDate: 'GG/MM/AAAA',
        totalTime: '19:04:09',
        score: '90%',
        trainer: 'Trainer name',
        feedback: 'Eccellente! Test finale molto chiaro e utile.',
    },
    {
        id: 3,
        course: 'Cyber Secu...',
        startDate: 'GG/MM/AAAA',
        endDate: 'GG/MM/AAAA',
        totalTime: '19:04:09',
        score: '90%',
        trainer: 'Trainer name',
        feedback: 'Buon corso, ma alcune lezioni erano troppo lunghe.',
    },
    {
        id: 4,
        course: 'Formazion...',
        startDate: 'GG/MM/AAAA',
        endDate: 'GG/MM/AAAA',
        totalTime: '19:04:09',
        score: '90%',
        trainer: 'Trainer name',
        feedback: 'Alcuni materiali non erano aggiornati, ma utile nel complesso.',
    },
];

const PersonalDetailsModal = ({ open, onClose, student, onOpenTraining }) => {
    if (!open || !student) return null;

    return (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-[#173f31]/75 p-3 sm:p-6">
            <section className="mx-auto max-w-[1380px] rounded-2xl bg-white p-5 sm:p-8">
                <button type="button" onClick={onClose} className="inline-flex text-[#2f2f2f]">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="-mt-4 text-center text-2xl md:text-3xl font-semibold text-[#202020]">Personal details</h2>

                <section className="mt-5 rounded-xl bg-[#f6f6f6] p-5">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[#2b2b2b]"><UsersRound size={15} className="text-[#73bfa1]" /> Franco rossi</p>
                            <p className="flex items-center gap-2 text-sm md:text-base text-[#555555]"><Mail size={16} /> kenzi.lawson@example.com</p>
                            <p className="flex items-center gap-2 text-sm md:text-base text-[#555555]"><Phone size={16} /> +39 123 456 7890</p>
                            <p className="flex items-center gap-2 text-sm md:text-base text-[#555555]"><Calendar size={16} /> Assunzione: 15/03/2022</p>
                        </div>
                        <span className="rounded-full bg-[#73bfa1] px-3 py-1 text-xs font-semibold text-white">Attivo</span>
                    </div>

                    <div className="flex gap-3">
                        <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-[#8ecfb5] px-6 py-2 text-sm font-semibold text-[#6ab292]"><Pencil size={15} /> Modifica</button>
                        <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-[#ef6b5a] px-6 py-2 text-sm font-semibold text-[#e15241]"><Trash2 size={15} /> Elimina</button>
                    </div>
                </section>

                <section className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[1280px] border-collapse">
                        <thead>
                            <tr className="bg-[#f1f1f1] text-left">
                                <th className="px-4 py-3 text-sm md:text-base font-semibold text-[#262626]">Nome del Corso</th>
                                <th className="px-4 py-3 text-sm md:text-base font-semibold text-[#262626]">Data di Inizio</th>
                                <th className="px-4 py-3 text-sm md:text-base font-semibold text-[#262626]">Data di Fine</th>
                                <th className="px-4 py-3 text-sm md:text-base font-semibold text-[#262626]">Tempo Totale</th>
                                <th className="px-4 py-3 text-sm md:text-base font-semibold text-[#262626]">Punteggi Totali</th>
                                <th className="px-4 py-3 text-sm md:text-base font-semibold text-[#262626]">Trainer</th>
                                <th className="px-4 py-3 text-sm md:text-base font-semibold text-[#262626]">Sondaggio di Feedback</th>
                                <th className="px-4 py-3 text-sm md:text-base font-semibold text-[#262626]">Azione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailRows.map((row) => (
                                <tr key={row.id} className="border-b border-[#dddddd]">
                                    <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.course}</td>
                                    <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.startDate}</td>
                                    <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.endDate}</td>
                                    <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.totalTime}</td>
                                    <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.score}</td>
                                    <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.trainer}</td>
                                    <td className="max-w-[250px] px-4 py-3 text-sm text-[#2f2f2f]">{row.feedback}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ececec] text-[#414141]"><Pencil size={14} /></button>
                                            <button type="button" onClick={onOpenTraining} className="rounded-full border border-[#87cab0] px-5 py-1.5 text-sm font-semibold text-[#73bfa1]">See Details</button>
                                            <button type="button" className="inline-flex h-9 w-[54px] items-center justify-center rounded-full bg-[#73bfa1] text-white"><Download size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </section>
            </section>
        </div>
    );
};

export default PersonalDetailsModal;