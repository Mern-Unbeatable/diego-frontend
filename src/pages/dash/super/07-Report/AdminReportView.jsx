import React, { useState } from 'react';
import { Download, Pencil, Search, Send } from 'lucide-react';
import PersonalDetailsModal from '../components/PersonalDetailsModal';

const enrolledStudents = [
  {
    id: 1,
    name: 'Jerome Bell',
    startDate: 'GG/MM/AAAA',
    email: 'tanya.hill@example.com',
    progress: 100,
    action: 'download',
  },
  {
    id: 2,
    name: 'Kristin Watson',
    startDate: 'GG/MM/AAAA',
    email: 'tim.jennings@example.com',
    progress: 75,
    action: 'send',
  },
  {
    id: 3,
    name: 'Esther Howard',
    startDate: 'GG/MM/AAAA',
    email: 'debra.holt@example.com',
    progress: 25,
    action: 'send',
  },
  {
    id: 4,
    name: 'Theresa Webb',
    startDate: 'GG/MM/AAAA',
    email: 'nathan.roberts@example.com',
    progress: 0,
    action: 'send',
  },
];

function ProgressCell({ value }) {
  return (
    <div className="flex min-w-[220px] items-center gap-3">
      <div className="h-[7px] w-[136px] overflow-hidden rounded-full bg-[#eaf3ef]">
        <div
          className="h-full rounded-full bg-[#71c2a3] transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-lg leading-none text-[#202020]">%</span>
      <span className="text-lg leading-none font-medium text-[#202020]">
        {String(value).padStart(2, '0')}
      </span>
    </div>
  );
}

function ActionPills({ type, onEdit }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Edit"
        onClick={onEdit}
        className="flex h-10 w-[88px] items-center justify-center rounded-full bg-[#ebebeb] text-[#343434]"
      >
        <Pencil size={16} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        aria-label={type === 'download' ? 'Download' : 'Send'}
        className="flex h-10 w-[88px] items-center justify-center rounded-full bg-[#71c2a3] text-white"
      >
        {type === 'download' ? (
          <Download size={16} strokeWidth={2.2} />
        ) : (
          <Send size={16} strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
}

export default function AdminReportView() {
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] =
    useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpenPersonalDetails = (student) => {
    setSelectedStudent(student);
    setIsPersonalDetailsModalOpen(true);
  };

  return (
    <section className="w-full bg-[#f6f6f6] p-6 md:p-8">
      <div className="mx-auto w-full">
        <div className="mb-11 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#111111]">
            Studenti iscritti
          </h2>
          <button
            type="button"
            aria-label="Search"
            className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#ececec] text-[#202020]"
          >
            <Search size={30} strokeWidth={2.2} />
          </button>
        </div>

        <div className="overflow-x-auto rounded-none border border-[#d6d6d6] bg-transparent">
          <table className="w-full min-w-[980px] table-auto border-collapse">
            <thead>
              <tr className="border-b border-[#d6d6d6] bg-[#e9e9e9]">
                <th className="px-10 py-6 text-left text-xl font-semibold text-[#1f1f1f]">
                  Corsista
                </th>
                <th className="px-10 py-6 text-left text-xl font-semibold text-[#1f1f1f]">
                  Data di inizio
                </th>
                <th className="px-10 py-6 text-left text-xl font-semibold text-[#1f1f1f]">
                  E-mail utilizzata
                </th>
                <th className="px-10 py-6 text-left text-xl font-semibold text-[#1f1f1f]">
                  Avanzamento
                </th>
                <th className="px-10 py-6 text-left text-xl font-semibold text-[#1f1f1f]">
                  Azioni
                </th>
              </tr>
            </thead>

            <tbody>
              {enrolledStudents.map((student) => (
                <tr key={student.id} className="border-b border-[#d6d6d6]">
                  <td className="px-10 py-7 text-lg font-normal text-[#2a2a2a]">
                    {student.name}
                  </td>
                  <td className="px-10 py-7 text-lg font-normal text-[#2a2a2a]">
                    {student.startDate}
                  </td>
                  <td className="max-w-[400px] truncate px-10 py-7 text-lg font-normal text-[#2a2a2a]">
                    {student.email}
                  </td>
                  <td className="px-10 py-7">
                    <ProgressCell value={student.progress} />
                  </td>
                  <td className="px-10 py-7">
                    <ActionPills
                      type={student.action}
                      onEdit={() => handleOpenPersonalDetails(student)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-10 py-5">
            <p className="text-lg text-[#777777]">Mostra 6 di 16 corsisti</p>

            <div className="flex items-center gap-8 text-lg text-[#7a7a7a]">
              <button type="button" className="text-[#7a7a7a]">
                Precedente
              </button>
              <button
                type="button"
                className="flex h-[48px] w-[48px] items-center justify-center rounded-md bg-[#71c2a3] text-white"
              >
                1
              </button>
              <button type="button" className="text-[#2b2b2b]">
                2
              </button>
              <button type="button" className="text-[#7a7a7a]">
                Prossimo
              </button>
            </div>
          </div>
        </div>
      </div>

      <PersonalDetailsModal
        isOpen={isPersonalDetailsModalOpen}
        onClose={() => setIsPersonalDetailsModalOpen(false)}
        onBack={() => setIsPersonalDetailsModalOpen(false)}
        student={selectedStudent}
      />
    </section>
  );
}
