import { Link } from 'react-router-dom';
import {
  BellRing,
  BookOpen,
  CircleAlert,
  CircleCheck,
  Download,
  Send,
  UsersRound,
} from 'lucide-react';

const overviewCards = [
  {
    title: 'Totale utenti',
    value: 16,
    icon: <UsersRound size={17} />,
    iconBg: 'bg-[#73bfa1]',
    textColor: 'text-[#73bfa1]',
  },
  {
    title: 'Corsi attivi',
    value: 3,
    icon: <BookOpen size={17} />,
    iconBg: 'bg-[#73bfa1]',
    textColor: 'text-[#73bfa1]',
  },
  {
    title: 'In scadenza',
    value: 1,
    icon: <CircleAlert size={17} />,
    iconBg: 'bg-[#f39b10]',
    textColor: 'text-[#f39b10]',
  },
  {
    title: 'Corsi completati',
    value: 8,
    icon: <CircleCheck size={17} />,
    iconBg: 'bg-[#73bfa1]',
    textColor: 'text-[#73bfa1]',
  },
  {
    title: 'I miei tickets',
    value: 1,
    icon: <BellRing size={17} />,
    iconBg: 'bg-[#73bfa1]',
    textColor: 'text-[#73bfa1]',
  },
];

const rows = [
  {
    id: 1,
    course: 'Formazione generale',
    student: 'Franco Rossi',
    status: 'completato',
    progress: 100,
    date: 'GG/MM/AAAA',
    action: 'download',
  },
  {
    id: 2,
    course: 'Formazione rischio medio',
    student: 'Franco Rossi',
    status: 'in corso',
    progress: 75,
    date: 'GG/MM/AAAA',
    action: 'reminder',
  },
  {
    id: 3,
    course: 'Formazione Seveso',
    student: 'Franco Rossi',
    status: 'in corso',
    progress: 25,
    date: 'GG/MM/AAAA',
    action: 'reminder',
  },
  {
    id: 4,
    course: 'Aggiornamento RSPP',
    student: 'Franco Rossi',
    status: 'non iniziato',
    progress: 0,
    date: 'GG/MM/AAAA',
    action: 'reminder',
  },
];

const statusTone = {
  completato: 'bg-[#e6f6ef] text-[#57a080]',
  'in corso': 'bg-[#fdf2df] text-[#e59a2b]',
  'non iniziato': 'bg-[#fce8e6] text-[#d9534f]',
};

const CompanyHomeView = () => {
  return (
    <section className="space-y-7">
      <div className="rounded-lg bg-[#73bfa1] px-6 py-7 text-white">
        <p className="mb-1 text-sm text-[#e8fff5]">Ciao!</p>
        <h2 className="text-[38px] font-semibold text-white">Jhon Smith</h2>
      </div>

      <div>
        <h3 className="mb-4 text-[24px] font-semibold text-[#202020]">
          Panoramica
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {overviewCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-[#ececec] bg-white p-5 shadow-[0_1px_0_#f3f3f3]"
            >
              <div className="mb-3 flex justify-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-md ${card.iconBg} text-white`}
                >
                  {card.icon}
                </div>
              </div>
              <p className="text-center text-[15px] font-semibold text-[#2d2d2d]">
                {card.title}
              </p>
              <p
                className={`mt-1 text-center text-sm font-medium ${card.textColor}`}
              >
                {card.value}
              </p>
            </article>
          ))}

          <article className="rounded-xl border border-[#ececec] bg-white p-5 shadow-[0_1px_0_#f3f3f3]">
            <p className="text-center text-[30px] font-semibold text-[#202020]">
              Acquista nuovi corsi
            </p>
            <div className="mt-5 flex justify-center">
              <Link
                to="/"
                className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#63a88c]"
              >
                Vai al catalogo
              </Link>
            </div>
          </article>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
        <header className="border-b border-[#ececec] px-5 py-5">
          <h4 className="text-[30px] font-semibold text-[#1f1f1f]">
            Stato di avanzamento - Seveso Training
          </h4>
        </header>

        <div className="grid grid-cols-1 gap-3 border-b border-[#ececec] px-5 py-4 lg:grid-cols-4">
          <div>
            <p className="mb-1 text-xs font-medium text-[#868686]">
              Tutte le aziende
            </p>
            <input
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm outline-none placeholder:text-[#a3a3a3]"
              placeholder="Cerca per nome"
            />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-[#868686]">Corso</p>
            <select className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none">
              <option>Tutti i corsi</option>
            </select>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-[#868686]">
              Cerca partecipante
            </p>
            <select className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none">
              <option>cerca per nome...</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="h-10 rounded-full border border-[#e5e5e5] px-5 text-sm font-medium text-[#4f4f4f] hover:bg-[#f8f8f8]"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="border-b border-[#ececec] bg-[#fafafa]">
              <tr className="text-sm text-[#3d3d3d]">
                <th className="px-5 py-3 font-semibold">Corso</th>
                <th className="px-3 py-3 font-semibold">Corsisti iscritti</th>
                <th className="px-3 py-3 font-semibold">Stato</th>
                <th className="px-3 py-3 font-semibold">Avanzamento</th>
                <th className="px-3 py-3 font-semibold">Ultimo accesso</th>
                <th className="px-3 py-3 font-semibold">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-[#f0f0f0] text-sm">
                  <td className="px-5 py-3 text-[#404040]">{row.course}</td>
                  <td className="px-3 py-3 text-[#404040]">{row.student}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statusTone[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[#404040]">
                    <div className="flex items-center gap-2">
                      <div className="h-[6px] w-[110px] rounded-full bg-[#e5f2ec]">
                        <div
                          className="h-full rounded-full bg-[#73bfa1]"
                          style={{ width: `${row.progress}%` }}
                        />
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
          <p>Showing 6 of 16 students</p>
          <div className="flex items-center gap-4">
            <button type="button">Precedente</button>
            <button
              type="button"
              className="h-6 w-6 rounded bg-[#73bfa1] text-xs font-semibold text-white"
            >
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

export default CompanyHomeView;
