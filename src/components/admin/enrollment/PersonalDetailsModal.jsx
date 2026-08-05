import { ArrowLeft, Calendar, Download, Mail, Phone, UsersRound } from 'lucide-react';
import { useGetLicenseeStudentDetailQuery } from '../../../features/api/enrollmentApi';
import {
  canDownloadCertificate,
  useCertificateDownload,
} from '../../../features/api/certificateHelpers';
import { getRtkErrorMessage } from '../../../features/api/utils';
import Loading from '../../../components/ui/Utilities/Loading';

const PersonalDetailsModal = ({ open, onClose, studentId, onOpenTraining }) => {
  const { downloadById, isDownloading } = useCertificateDownload();
  const { data, isLoading, isError, error } = useGetLicenseeStudentDetailQuery(studentId, {
    skip: !open || !studentId,
  });

  if (!open || !studentId) return null;

  const student = data?.student;
  const courses = data?.courses ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <section className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl">
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#2f2f2f] hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="min-w-0 flex-1 text-center text-base font-semibold text-[#202020] sm:text-lg md:text-xl">
            Dettagli personali
          </h2>
          <div className="w-9" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 md:p-6">
          {isLoading ? (
            <Loading size="md" className="min-h-40" />
          ) : isError ? (
            <p className="text-sm text-red-600">{getRtkErrorMessage(error)}</p>
          ) : (
            <>
              <section className="rounded-xl bg-[#f6f6f6] p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <p className="flex items-center gap-2 text-sm font-semibold text-[#2b2b2b] sm:text-base">
                      <UsersRound size={15} className="shrink-0 text-[#73bfa1]" />
                      <span className="truncate">{student?.fullName}</span>
                    </p>
                    <p className="flex min-w-0 items-center gap-2 text-sm text-[#555555]">
                      <Mail size={14} className="shrink-0" />
                      <span className="truncate">{student?.email}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm text-[#555555]">
                      <Phone size={14} className="shrink-0" />
                      {student?.phone}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-[#555555]">
                      <Calendar size={14} className="shrink-0" />
                      Iscritto dal: {student?.hireDate}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-[#73bfa1] px-3 py-1 text-xs font-semibold text-white sm:text-sm">
                    Attivo
                  </span>
                </div>
              </section>

              {/* Mobile course cards */}
              <div className="mt-4 space-y-3 md:hidden">
                {courses.length === 0 ? (
                  <p className="rounded-xl bg-gray-50 p-6 text-center text-sm text-[#6b7471]">
                    Nessun corso per questo studente.
                  </p>
                ) : (
                  courses.map((row) => (
                    <div
                      key={row.enrollmentId}
                      className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-[#2f2f2f]">
                        {row.courseName}
                      </p>
                      <dl className="mt-2 space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between gap-2">
                          <dt>Inizio</dt>
                          <dd className="font-medium text-gray-800">{row.startDate}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt>Fine</dt>
                          <dd className="font-medium text-gray-800">{row.endDate}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt>Tempo</dt>
                          <dd className="font-medium text-gray-800">{row.totalTime}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt>Punteggio</dt>
                          <dd className="font-medium text-gray-800">{row.score}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt>Trainer</dt>
                          <dd className="font-medium text-gray-800">{row.trainer}</dd>
                        </div>
                      </dl>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenTraining?.(row)}
                          className="h-9 flex-1 rounded-full border border-[#87cab0] text-xs font-semibold text-[#73bfa1]"
                        >
                          Vedi dettagli
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadById(row.certificate)}
                          disabled={
                            !canDownloadCertificate(row.certificate) ||
                            isDownloading(row.certificate)
                          }
                          className="inline-flex h-9 w-10 items-center justify-center rounded-full bg-[#73bfa1] text-white disabled:opacity-40"
                          aria-label="Download certificato"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop table */}
              <section className="mt-4 hidden overflow-x-auto md:block">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="bg-[#f1f1f1] text-left">
                      {[
                        'Nome del Corso',
                        'Data di Inizio',
                        'Data di Fine',
                        'Tempo Totale',
                        'Punteggio',
                        'Trainer',
                        'Azione',
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-3 py-3 text-xs font-semibold tracking-wide text-[#262626] uppercase lg:px-4"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-8 text-center text-sm text-[#6b7471]"
                        >
                          Nessun corso per questo studente.
                        </td>
                      </tr>
                    ) : (
                      courses.map((row) => (
                        <tr
                          key={row.enrollmentId}
                          className="border-b border-[#dddddd]"
                        >
                          <td className="max-w-[180px] truncate px-3 py-3 text-sm text-[#2f2f2f] lg:px-4">
                            {row.courseName}
                          </td>
                          <td className="px-3 py-3 text-sm whitespace-nowrap text-[#2f2f2f] lg:px-4">
                            {row.startDate}
                          </td>
                          <td className="px-3 py-3 text-sm whitespace-nowrap text-[#2f2f2f] lg:px-4">
                            {row.endDate}
                          </td>
                          <td className="px-3 py-3 text-sm text-[#2f2f2f] lg:px-4">
                            {row.totalTime}
                          </td>
                          <td className="px-3 py-3 text-sm text-[#2f2f2f] lg:px-4">
                            {row.score}
                          </td>
                          <td className="px-3 py-3 text-sm text-[#2f2f2f] lg:px-4">
                            {row.trainer}
                          </td>
                          <td className="px-3 py-3 lg:px-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onOpenTraining?.(row)}
                                className="rounded-full border border-[#87cab0] px-3 py-1.5 text-xs font-semibold text-[#73bfa1]"
                              >
                                Vedi dettagli
                              </button>
                              <button
                                type="button"
                                onClick={() => downloadById(row.certificate)}
                                disabled={
                                  !canDownloadCertificate(row.certificate) ||
                                  isDownloading(row.certificate)
                                }
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#73bfa1] text-white disabled:opacity-40"
                                aria-label="Download certificato"
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </section>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PersonalDetailsModal;
