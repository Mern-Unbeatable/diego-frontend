import { Download, Eye, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useGetLicenseeStudentsQuery } from '../../../features/api/enrollmentApi';
import {
  canDownloadCertificate,
  useCertificateDownload,
} from '../../../features/api/certificateHelpers';
import { getRtkErrorMessage } from '../../../features/api/utils';
import Loading from '../../ui/Utilities/Loading';
import StudentPersonalDetailsModal from './PersonalDetailsModal';
import TrainingReportModal from './TrainingReportModal';

const PAGE_SIZE = 10;

const EnrolledStudentsPanel = ({
  title = 'Studenti iscritti',
  emptyMessage = 'Nessuno studente iscritto ai corsi.',
}) => {
  const { downloadById, isDownloading } = useCertificateDownload();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const { data, isLoading, isError, error } = useGetLicenseeStudentsQuery({
    page,
    limit: PAGE_SIZE,
    ...(searchTerm.trim() ? { search: searchTerm.trim() } : {}),
  });

  const students = data?.students ?? [];
  const meta = data?.meta ?? {};
  const total = meta.total ?? students.length;
  const totalPages =
    meta.totalPages || Math.max(1, Math.ceil(total / PAGE_SIZE));

  const paginationLabel = useMemo(() => {
    const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const to = Math.min(page * PAGE_SIZE, total);
    return `Mostra ${from}-${to} di ${total} corsisti`;
  }, [page, total]);

  const openDetails = (student) => {
    setSelectedStudentId(student.id);
    setDetailsOpen(true);
  };

  const openTraining = (enrollment, studentId) => {
    setSelectedStudentId(studentId);
    setSelectedEnrollment(enrollment);
    setTrainingOpen(true);
  };

  if (isLoading) {
    return <Loading size="md" className="min-h-64" />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {getRtkErrorMessage(error)}
      </div>
    );
  }

  return (
    <>
      <section className="w-full rounded-lg border border-[#e6e6e6] bg-white">
        {/* Header */}
        <div className="flex flex-col items-stretch justify-between gap-4 border-b border-[#e6e6e6] px-4 py-5 sm:flex-row sm:items-center sm:px-8 sm:py-6">
          <h2 className="text-xl font-semibold text-[#111111] sm:text-2xl">
            {title}
          </h2>

          <div className="relative flex w-full items-center sm:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder=""
              className="h-10 w-full rounded-full border border-gray-200 bg-[#f4f4f4] pr-11 pl-4 text-sm text-gray-700 transition-all outline-none focus:border-[#73bfa1] focus:bg-white sm:w-64"
            />
            <div className="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#ebebeb] text-gray-600">
              <Search size={16} />
            </div>
          </div>
        </div>

        {/* Mobile Cards View (< sm) */}
        <div className="space-y-3 p-4 sm:hidden">
          {students.length === 0 ? (
            <div className="rounded-lg border border-[#e6e6e6] bg-white p-6 text-center text-sm text-[#6b7471]">
              {emptyMessage}
            </div>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="flex flex-col gap-3 rounded-xl border border-[#e6e6e6] bg-white p-4 shadow-xs"
              >
                {/* Header: Name & Email */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-base font-semibold text-[#2e2e2e]">
                    {student.name}
                  </h3>
                  <p className="text-xs font-normal text-gray-500">
                    {student.email}
                  </p>
                </div>

                {/* Info: Start Date */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 text-xs text-gray-600">
                  <span className="font-medium text-gray-500">
                    Data di inizio:
                  </span>
                  <span className="font-semibold text-gray-800">
                    {student.startDate}
                  </span>
                </div>

                {/* Info: Progress */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 text-xs text-gray-600">
                  <span className="font-medium text-gray-500">
                    Avanzamento:
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-25 rounded-full bg-[#dce9e5]">
                      <div
                        className="h-1.5 rounded-full bg-[#74bfa2]"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#2f2f2f]">
                      {student.progress === 0 ? '00%' : `${student.progress}%`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                  <button
                    type="button"
                    onClick={() => downloadById(student.certificate)}
                    disabled={
                      !canDownloadCertificate(student.certificate) ||
                      isDownloading
                    }
                    className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#ececec] text-xs font-medium text-[#363636] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Download certificato"
                  >
                    <Download size={15} />
                    <span>Certificato</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openDetails(student)}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#73bfa1] text-xs font-medium text-white transition-colors hover:bg-[#5fa889]"
                    aria-label="Dettagli studente"
                  >
                    <Eye size={15} />
                    <span>Dettagli</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View (>= sm) */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full min-w-225 border-collapse">
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
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-10 text-center text-sm text-[#6b7471]"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                students.map((student) => (
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
                        <div className="h-1.5 w-32.5 rounded-full bg-[#dce9e5]">
                          <div
                            className="h-1.5 rounded-full bg-[#74bfa2]"
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
                          onClick={() => downloadById(student.certificate)}
                          disabled={
                            !canDownloadCertificate(student.certificate) ||
                            isDownloading
                          }
                          className="inline-flex h-11 w-18 items-center justify-center rounded-full bg-[#ececec] text-[#363636] disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Download certificato"
                        >
                          <Download size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openDetails(student)}
                          className="inline-flex h-11 w-18 items-center justify-center rounded-full bg-[#73bfa1] text-white"
                          aria-label="Dettagli studente"
                        >
                          <Eye size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#e6e6e6] px-4 py-4 sm:flex-row sm:px-8 sm:py-5">
          <p className="text-xs font-medium text-[#7a7a7a] sm:text-sm">
            {paginationLabel}
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-[#6d6d6d] sm:gap-4 sm:text-sm">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="transition-colors hover:text-gray-900 disabled:opacity-40"
            >
              Precedente
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`inline-flex h-8.5 min-w-8.5 items-center justify-center rounded-md px-2 ${
                    pageNumber === page
                      ? 'bg-[#73bfa1] font-semibold text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="transition-colors hover:text-gray-900 disabled:opacity-40"
            >
              Prossimo
            </button>
          </div>
        </footer>
      </section>

      <StudentPersonalDetailsModal
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedStudentId(null);
        }}
        studentId={selectedStudentId}
        onOpenTraining={(enrollment) =>
          openTraining(enrollment, selectedStudentId)
        }
      />

      <TrainingReportModal
        open={trainingOpen}
        onClose={() => {
          setTrainingOpen(false);
          setSelectedEnrollment(null);
        }}
        studentId={selectedStudentId}
        enrollment={selectedEnrollment}
      />
    </>
  );
};

export default EnrolledStudentsPanel;
