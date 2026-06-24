import { ArrowLeft, Download, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import courseImage from '../../../assets/images/course/course.png';
import courseImage2 from '../../../assets/images/course/catalog4.png';
import courseImage3 from '../../../assets/images/course/course3.png';
import EmployeeModal from './EmployeeModal';

const courses = [
    {
        id: 'seveso',
        title: 'Formazione SEVESO',
        students: 20,
        image: courseImage,
    },
    {
        id: 'generale',
        title: 'Formazione generale',
        students: 15,
        image: courseImage2,
    },
    {
        id: 'password',
        title: 'Sicurezza della Password',
        students: 15,
        image: courseImage3,
    },
];

const trackingRows = [
    { id: 1, student: 'Kristin Watson', status: 'Completato', progress: 100, date: 'GG/MM/AAAA', action: 'download' },
    { id: 2, student: 'Leslie Alexander', status: 'In corso', progress: 75, date: 'GG/MM/AAAA', action: 'reminder' },
    { id: 3, student: 'Cody Fisher', status: 'In corso', progress: 25, date: 'GG/MM/AAAA', action: 'reminder' },
    { id: 4, student: 'Guy Hawkins', status: 'In corso', progress: 25, date: 'GG/MM/AAAA', action: 'reminder' },
    { id: 5, student: 'Savannah Nguyen', status: 'In corso', progress: 25, date: 'GG/MM/AAAA', action: 'reminder' },
    { id: 6, student: 'Theresa Webb', status: 'Non iniziato', progress: 0, date: 'GG/MM/AAAA', action: 'reminder' },
];

const badgeTone = {
    Completato: 'bg-[#e6f6ef] text-[#57a080]',
    'In corso': 'bg-[#fdf2df] text-[#e59a2b]',
    'Non iniziato': 'bg-[#fce8e6] text-[#d9534f]',
};

const StudentTrackingModal = ({ course, open, onClose }) => {
    if (!open || !course) return null;

    return (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-[#12382b]/65 p-3 sm:p-6">
            <section className="mx-auto max-w-[1460px] rounded-2xl bg-white p-5 sm:p-8">
                <button type="button" onClick={onClose} className="inline-flex text-[#2c2c2c]">
                    <ArrowLeft size={20} />
                </button>

                <section className="mt-6 overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
                    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ececec] px-5 py-5">
                        <h2 className="text-[34px] font-semibold text-[#202020]">
                            Elenco di chi svolge il corso: {course.title}
                        </h2>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-xs font-semibold text-white"
                        >
                            <Download size={13} /> Download
                        </button>
                    </header>

                    <div className="overflow-x-auto">
                        <table className="min-w-[980px] w-full text-left">
                            <thead className="border-b border-[#ececec] bg-[#f1f1f1]">
                                <tr className="text-sm text-[#3d3d3d]">
                                    <th className="px-5 py-3 font-semibold">Corsisti iscritti</th>
                                    <th className="px-3 py-3 font-semibold">Stato</th>
                                    <th className="px-3 py-3 font-semibold">Avanzamento</th>
                                    <th className="px-3 py-3 font-semibold">Data di iscrizione</th>
                                    <th className="px-3 py-3 font-semibold">Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackingRows.map((row) => (
                                    <tr key={row.id} className="border-b border-[#f0f0f0] text-sm">
                                        <td className="px-5 py-3 text-[#404040]">{row.student}</td>
                                        <td className="px-3 py-3">
                                            <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${badgeTone[row.status]}`}>
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
                                                <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-4 py-1.5 text-xs font-semibold text-white">
                                                    <Download size={13} /> Download
                                                </button>
                                            ) : (
                                                <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#e6f6ef] px-4 py-1.5 text-xs font-semibold text-[#57a080]">
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
        </div>
    );
};

const CompanyCourseList = () => {
    const navigate = useNavigate();
    const [assignOpen, setAssignOpen] = useState(false);
    const [trackingOpen, setTrackingOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const courseCards = useMemo(() => courses, []);

    const openAssign = (course) => {
        setSelectedCourse(course);
        setAssignOpen(true);
    };

    const openTracking = (course) => {
        setSelectedCourse(course);
        setTrackingOpen(true);
    };

    return (
        <>
            <section className="space-y-7">
                <button type="button" onClick={() => navigate(-1)} className="inline-flex text-[#2c2c2c]">
                    <ArrowLeft size={20} />
                </button>

                <section className="relative overflow-hidden rounded-lg bg-[#73bfa1] px-6 py-8 text-white">
                    <p className="mb-1 text-sm text-[#ecfff7]">Ciao!</p>
                    <h1 className="text-[38px] font-semibold text-white">Jhon Smith</h1>
                    <div className="pointer-events-none absolute bottom-[-20px] right-[-10px] h-[170px] w-[170px] rounded-full border-[10px] border-[#4a9e7f]/20" />
                    <div className="pointer-events-none absolute bottom-[-30px] right-[10px] h-[150px] w-[150px] rounded-full border-[10px] border-[#4a9e7f]/20" />
                    <div className="pointer-events-none absolute bottom-[-40px] right-[30px] h-[130px] w-[130px] rounded-full border-[10px] border-[#4a9e7f]/20" />
                </section>

                <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {courseCards.map((course) => (
                        <article key={course.id} className="rounded-xl border border-[#ececec] bg-white p-4 shadow-[0_1px_0_#f3f3f3]">
                            <img src={course.image} alt={course.title} className="h-[180px] w-full rounded-xl object-cover" />
                            <h3 className="mt-4 text-[30px] font-semibold text-[#1f1f1f]">{course.title}</h3>
                            <div className="mt-2 flex items-center justify-between text-[16px] text-[#4d4d4d]">
                                <span>Dipendenti iscritti:</span>
                                <span>{course.students}</span>
                            </div>
                            <div className="mt-5 flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={() => openTracking(course)}
                                    className="rounded-full bg-[#73bfa1] px-5 py-2.5 text-sm font-semibold text-white"
                                >
                                    Visualizza i dettagli
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openAssign(course)}
                                    className="rounded-full border border-[#86c8ad] px-5 py-2.5 text-sm font-semibold text-[#73bfa1]"
                                >
                                    Assegna dipendente
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </section>

            {assignOpen ? (
                <EmployeeModal
                    mode="add"
                    employee={selectedCourse ? { name: '', email: '', phone: '', courseName: selectedCourse.title } : null}
                    onClose={() => setAssignOpen(false)}
                />
            ) : null}

            <StudentTrackingModal
                course={selectedCourse}
                open={trackingOpen}
                onClose={() => setTrackingOpen(false)}
            />
        </>
    );
};

export default CompanyCourseList;
