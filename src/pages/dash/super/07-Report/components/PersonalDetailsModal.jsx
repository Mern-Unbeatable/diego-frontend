import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Mail,
  Pencil,
  Phone,
  Trash2,
  User,
} from 'lucide-react';
import FullTrainingReportModal from './FullTrainingReportModal';

const fallbackProfile = {
  name: 'Franco rossi',
  email: 'kenzi.lawson@example.com',
  phone: '+39 123 456 7890',
  hireDate: '15/03/2022',
  status: 'Attivo',
  courses: [
    {
      id: 1,
      name: 'Formazione Sicurezza Lavoro Base',
      startDate: 'GG/MM/AAAA',
      endDate: 'GG/MM/AAAA',
      totalTime: '19:04:09',
      score: '90%',
      trainer: 'Trainer name',
      feedback: 'Corso molto utile, facile da seguire.',
    },
    {
      id: 2,
      name: 'Formazione Sicurezza Avanzata',
      startDate: 'GG/MM/AAAA',
      endDate: 'GG/MM/AAAA',
      totalTime: '19:04:09',
      score: '90%',
      trainer: 'Trainer name',
      feedback: 'Eccellente! Test fruibile e utile.',
    },
    {
      id: 3,
      name: 'Cyber Security Fundamentals',
      startDate: 'GG/MM/AAAA',
      endDate: 'GG/MM/AAAA',
      totalTime: '19:04:09',
      score: '90%',
      trainer: 'Trainer name',
      feedback: 'Buon corso, ma alcuni moduli troppo lunghi.',
    },
    {
      id: 4,
      name: 'Formazione Primo Soccorso',
      startDate: 'GG/MM/AAAA',
      endDate: 'GG/MM/AAAA',
      totalTime: '19:04:09',
      score: '90%',
      trainer: 'Trainer name',
      feedback: 'Alcuni materiali non molto utili nel complesso.',
    },
  ],
};

export default function PersonalDetailsModal({
  isOpen,
  onClose,
  student,
  company,
  onBack,
}) {
  const [isTrainingReportOpen, setIsTrainingReportOpen] = useState(false);

  if (!isOpen) return null;

  const profile = {
    ...fallbackProfile,
    ...(company || {}),
    ...(student || {}),
    courses: student?.courses || company?.courses || fallbackProfile.courses,
  };

  const handleBack = onBack || onClose;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#33584d]/70 p-3 md:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Personal details modal"
      >
        <div
          className="max-h-[96vh] w-full max-w-[1250px] overflow-y-auto rounded-2xl bg-[#f3f3f3] p-5 md:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-6 grid grid-cols-[40px_1fr_40px] items-center md:mb-8">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back"
              className="text-[#222222]"
            >
              <ArrowLeft size={21} strokeWidth={2.2} />
            </button>
            <h2 className="text-center text-[30px] font-semibold text-[#111111]">
              Personal details
            </h2>
            <div />
          </div>

          <div className="mb-5 rounded-xl bg-[#e9e9e9] p-5 md:mb-7 md:p-8">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-lg text-[#222222]">
                  <User size={18} className="text-[#71c2a3]" />
                  <span>{profile.name}</span>
                </div>
                <div className="space-y-2 text-lg text-[#5c5c5c]">
                  <div className="flex items-center gap-2">
                    <Mail size={17} className="text-[#373737]" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={17} className="text-[#373737]" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={17} className="text-[#373737]" />
                    <span>Assunzione: {profile.hireDate}</span>
                  </div>
                </div>
              </div>

              <span className="rounded-full bg-[#71c2a3] px-3 py-1 text-xs font-medium text-white">
                {profile.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-lg border border-[#9ecab8] px-4 text-lg text-[#71c2a3]"
              >
                <Pencil size={16} />
                Modifica
              </button>
              <button
                type="button"
                className="inline-flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-lg border border-[#e66952] px-4 text-lg text-[#dc4a33]"
              >
                <Trash2 size={16} />
                Elimina
              </button>
              <button
                type="button"
                onClick={() => setIsTrainingReportOpen(true)}
                className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-lg bg-[#71c2a3] px-5 text-lg font-medium text-white"
              >
                Apri Rapporto
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-[#d8d8d8] bg-[#f3f3f3]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1220px] border-collapse">
                <thead>
                  <tr className="border-b border-[#d8d8d8] bg-[#e9e9e9]">
                    <th className="px-7 py-5 text-left text-lg font-semibold text-[#1e1e1e]">
                      Nome del Corso
                    </th>
                    <th className="px-7 py-5 text-left text-lg font-semibold text-[#1e1e1e]">
                      Data di Inizio
                    </th>
                    <th className="px-7 py-5 text-left text-lg font-semibold text-[#1e1e1e]">
                      Data di Fine
                    </th>
                    <th className="px-7 py-5 text-left text-lg font-semibold text-[#1e1e1e]">
                      Tempo Totale
                    </th>
                    <th className="px-7 py-5 text-left text-lg font-semibold text-[#1e1e1e]">
                      Punteggi Totali
                    </th>
                    <th className="px-7 py-5 text-left text-lg font-semibold text-[#1e1e1e]">
                      Trainer
                    </th>
                    <th className="px-7 py-5 text-left text-lg font-semibold text-[#1e1e1e]">
                      Sondaggio di Fine Corso
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {profile.courses.map((course) => (
                    <tr key={course.id} className="border-b border-[#d8d8d8]">
                      <td className="max-w-[200px] truncate px-7 py-4 text-lg text-[#202020]">
                        {course.name}
                      </td>
                      <td className="px-7 py-4 text-lg text-[#202020]">
                        {course.startDate}
                      </td>
                      <td className="px-7 py-4 text-lg text-[#202020]">
                        {course.endDate}
                      </td>
                      <td className="px-7 py-4 text-lg text-[#202020]">
                        {course.totalTime}
                      </td>
                      <td className="px-7 py-4 text-lg text-[#202020]">
                        {course.score}
                      </td>
                      <td className="px-7 py-4 text-lg text-[#202020]">
                        {course.trainer}
                      </td>
                      <td className="max-w-[250px] truncate px-7 py-4 text-lg text-[#202020]">
                        {course.feedback}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-7 py-4">
              <div className="h-[7px] w-full rounded-full bg-[#d9d9d9]">
                <div className="h-full w-[16%] rounded-full bg-[#5a5a5a]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FullTrainingReportModal
        isOpen={isTrainingReportOpen}
        onClose={() => setIsTrainingReportOpen(false)}
        onBack={() => setIsTrainingReportOpen(false)}
      />
    </>
  );
}
