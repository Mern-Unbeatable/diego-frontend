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
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Personal details modal"
      >
        <div
          className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-[#f7f7f7] shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back"
              className="rounded-lg p-2 text-[#222222] hover:bg-gray-100"
            >
              <ArrowLeft size={20} strokeWidth={2.2} />
            </button>
            <h2 className="min-w-0 flex-1 text-center text-base font-semibold text-[#111111] sm:text-lg md:text-xl">
              Personal details
            </h2>
            <div className="w-9" />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 md:p-6">
            <div className="mb-4 rounded-xl bg-white p-4 ring-1 ring-gray-100 sm:mb-5 sm:p-5">
              <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#222222] sm:text-base">
                    <User size={16} className="shrink-0 text-[#71c2a3]" />
                    <span className="truncate">{profile.name}</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-[#5c5c5c]">
                    <div className="flex min-w-0 items-center gap-2">
                      <Mail size={15} className="shrink-0 text-[#373737]" />
                      <span className="truncate">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={15} className="shrink-0 text-[#373737]" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={15} className="shrink-0 text-[#373737]" />
                      <span>Assunzione: {profile.hireDate}</span>
                    </div>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-[#71c2a3] px-3 py-1 text-xs font-medium text-white sm:text-sm">
                  {profile.status}
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#9ecab8] px-3 text-sm text-[#71c2a3] sm:h-10 sm:px-4"
                >
                  <Pencil size={14} />
                  Modifica
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#e66952] px-3 text-sm text-[#dc4a33] sm:h-10 sm:px-4"
                >
                  <Trash2 size={14} />
                  Elimina
                </button>
                <button
                  type="button"
                  onClick={() => setIsTrainingReportOpen(true)}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-[#71c2a3] px-4 text-sm font-medium text-white sm:h-10"
                >
                  Apri Rapporto
                </button>
              </div>
            </div>

            {/* Mobile course cards */}
            <div className="space-y-3 md:hidden">
              {profile.courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl bg-white p-4 ring-1 ring-gray-100"
                >
                  <p className="text-sm font-semibold text-[#1e1e1e]">{course.name}</p>
                  <dl className="mt-3 space-y-1.5 text-xs text-gray-600">
                    <div className="flex justify-between gap-2">
                      <dt>Inizio</dt>
                      <dd className="font-medium text-gray-800">{course.startDate}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>Fine</dt>
                      <dd className="font-medium text-gray-800">{course.endDate}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>Tempo</dt>
                      <dd className="font-medium text-gray-800">{course.totalTime}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>Punteggio</dt>
                      <dd className="font-medium text-gray-800">{course.score}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>Trainer</dt>
                      <dd className="font-medium text-gray-800">{course.trainer}</dd>
                    </div>
                    <p className="pt-1 text-xs leading-5 text-gray-600">{course.feedback}</p>
                  </dl>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-xl border border-[#d8d8d8] bg-white md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#d8d8d8] bg-[#f1f1f1]">
                      {[
                        'Nome del Corso',
                        'Data di Inizio',
                        'Data di Fine',
                        'Tempo Totale',
                        'Punteggi',
                        'Trainer',
                        'Feedback',
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#1e1e1e] uppercase lg:px-5"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {profile.courses.map((course) => (
                      <tr key={course.id} className="border-b border-[#e8e8e8]">
                        <td className="max-w-[180px] truncate px-4 py-3 text-sm text-[#202020] lg:px-5">
                          {course.name}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap text-[#202020] lg:px-5">
                          {course.startDate}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap text-[#202020] lg:px-5">
                          {course.endDate}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap text-[#202020] lg:px-5">
                          {course.totalTime}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#202020] lg:px-5">
                          {course.score}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#202020] lg:px-5">
                          {course.trainer}
                        </td>
                        <td className="max-w-[220px] truncate px-4 py-3 text-sm text-[#202020] lg:px-5">
                          {course.feedback}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
