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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#173f31]/75 p-3 sm:p-6">
      <section className="mx-auto max-w-[1380px] rounded-2xl bg-white p-5 sm:p-8">
        <button type="button" onClick={onClose} className="inline-flex text-[#2f2f2f]">
          <ArrowLeft size={20} />
        </button>
        <h2 className="-mt-4 text-center text-2xl font-semibold text-[#202020] md:text-3xl">
          Dettagli personali
        </h2>

        {isLoading ? (
          <Loading size="md" className="min-h-40" />
        ) : isError ? (
          <p className="mt-6 text-sm text-red-600">{getRtkErrorMessage(error)}</p>
        ) : (
          <>
            <section className="mt-5 rounded-xl bg-[#f6f6f6] p-5">
              <div className="mb-2 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-xl font-semibold text-[#2b2b2b] md:text-2xl">
                    <UsersRound size={15} className="text-[#73bfa1]" />
                    {student?.fullName}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-[#555555] md:text-base">
                    <Mail size={16} />
                    {student?.email}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-[#555555] md:text-base">
                    <Phone size={16} />
                    {student?.phone}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-[#555555] md:text-base">
                    <Calendar size={16} />
                    Iscritto dal: {student?.hireDate}
                  </p>
                </div>
                <span className="rounded-full bg-[#73bfa1] px-3 py-1 text-sm font-semibold text-white">
                  Attivo
                </span>
              </div>
            </section>

            <section className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse">
                <thead>
                  <tr className="bg-[#f1f1f1] text-left">
                    <th className="px-4 py-3 text-sm font-semibold text-[#262626] md:text-base">
                      Nome del Corso
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#262626] md:text-base">
                      Data di Inizio
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#262626] md:text-base">
                      Data di Fine
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#262626] md:text-base">
                      Tempo Totale
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#262626] md:text-base">
                      Punteggio
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#262626] md:text-base">
                      Trainer
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#262626] md:text-base">
                      Azione
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-sm text-[#6b7471]">
                        Nessun corso per questo studente.
                      </td>
                    </tr>
                  ) : (
                    courses.map((row) => (
                      <tr key={row.enrollmentId} className="border-b border-[#dddddd]">
                        <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.courseName}</td>
                        <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.startDate}</td>
                        <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.endDate}</td>
                        <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.totalTime}</td>
                        <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.score}</td>
                        <td className="px-4 py-3 text-sm text-[#2f2f2f]">{row.trainer}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onOpenTraining?.(row)}
                              className="rounded-full border border-[#87cab0] px-4 py-1.5 text-sm font-semibold text-[#73bfa1]"
                            >
                              Vedi dettagli
                            </button>
                            <button
                              type="button"
                              onClick={() => downloadById(row.certificate)}
                              disabled={!canDownloadCertificate(row.certificate) || isDownloading}
                              className="inline-flex h-9 w-[54px] items-center justify-center rounded-full bg-[#73bfa1] text-white disabled:opacity-40"
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
      </section>
    </div>
  );
};

export default PersonalDetailsModal;
