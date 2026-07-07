import { Download, Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import PersonalDetailsModal from './components/PersonalDetailsModal';
import TrainingReportModal from './components/TrainingReportModal';

const students = [
  {
    id: 1,
    name: 'Jerome Bell',
    startDate: 'GG/MM/AAAA',
    email: 'tanya.hill@example.com',
    progress: 100,
    firstAction: 'external',
  },
  {
    id: 2,
    name: 'Kristin Watson',
    startDate: 'GG/MM/AAAA',
    email: 'tim.jennings@example....',
    progress: 75,
    firstAction: 'send',
  },
  {
    id: 3,
    name: 'Esther Howard',
    startDate: 'GG/MM/AAAA',
    email: 'debra.holt@example.c...',
    progress: 25,
    firstAction: 'send',
  },
  {
    id: 4,
    name: 'Theresa Webb',
    startDate: 'GG/MM/AAAA',
    email: 'nathan.roberts@examp...',
    progress: 0,
    firstAction: 'send',
  },
];

const EnrolledView = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const rows = useMemo(() => students, []);

  const openDetails = (student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const openTraining = () => {
    setTrainingOpen(true);
  };

  return (
    <>
      <section className="w-full rounded-lg border border-[#e6e6e6] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-[#f1f1f1] text-left">
                <th className="px-8 py-4 text-base font-semibold text-[#232323]">
                  Corsista
                </th>
                <th className="px-6 py-4 text-base font-semibold text-[#232323]">
                  Data di inizio
                </th>
                <th className="px-6 py-4 text-base font-semibold text-[#232323]">
                  E-mail utilizzata
                </th>
                <th className="px-6 py-4 text-base font-semibold text-[#232323]">
                  Avanzamento
                </th>
                <th className="px-6 py-4 text-base font-semibold text-[#232323]">
                  Azioni
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((student) => (
                <tr key={student.id} className="border-b border-[#dddddd]">
                  <td className="px-8 py-5 text-sm font-medium text-[#2e2e2e]">
                    {student.name}
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[#2e2e2e]">
                    {student.startDate}
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[#2e2e2e]">
                    {student.email}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="h-[6px] w-[130px] rounded-full bg-[#dce9e5]">
                        <div
                          className="h-[6px] rounded-full bg-[#74bfa2]"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-[#2f2f2f]">
                        {student.progress === 0
                          ? '00%'
                          : `${student.progress}%`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="inline-flex h-[44px] w-[72px] items-center justify-center rounded-full bg-[#ececec] text-[#363636]"
                        aria-label="Download"
                      >
                        <Download size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDetails(student)}
                        className="inline-flex h-[44px] w-[72px] items-center justify-center rounded-full bg-[#73bfa1] text-white"
                        aria-label="View details"
                      >
                        <Eye size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-wrap items-center justify-between border-t border-[#e6e6e6] px-8 py-5">
          <p className="text-sm font-medium text-[#7a7a7a]">
            Mostra 6 di 16 corsisti
          </p>
          <div className="flex items-center gap-7 text-sm font-medium text-[#6d6d6d]">
            <button type="button">Precedente</button>
            <button
              type="button"
              className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-md bg-[#73bfa1] text-sm text-white"
            >
              1
            </button>
            <button type="button">2</button>
            <button type="button">Prossimo</button>
          </div>
        </footer>
      </section>
      <PersonalDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        student={selectedStudent}
        onOpenTraining={openTraining}
      />
      <TrainingReportModal
        open={trainingOpen}
        onClose={() => setTrainingOpen(false)}
      />
    </>
  );
};

export default EnrolledView;
