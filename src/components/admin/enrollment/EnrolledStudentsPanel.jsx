import { Download, Eye, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGetLicenseeStudentsQuery } from '../../../features/api/enrollmentApi';
import {
  canDownloadCertificate,
  useCertificateDownload,
} from '../../../features/api/certificateHelpers';
import { getRtkErrorMessage } from '../../../features/api/utils';
import Loading from '../../ui/Utilities/Loading';
import Pagination from '../../ui/Utilities/Pagination';
import StudentPersonalDetailsModal from './PersonalDetailsModal';
import TrainingReportModal from './TrainingReportModal';

const PAGE_SIZE = 10;

const EnrolledStudentsPanel = ({
  title = 'Studenti iscritti',
  emptyMessage = 'Nessuno studente iscritto ai corsi.',
}) => {
  const { downloadById, isDownloading } = useCertificateDownload();
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useGetLicenseeStudentsQuery({
    page,
    limit: PAGE_SIZE,
    ...(searchTerm ? { search: searchTerm } : {}),
  });

  const students = data?.students ?? [];
  const meta = data?.meta ?? {};
  const total = meta.total ?? students.length;
  const totalPages =
    meta.totalPages || Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);

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
      <section className="min-w-0 w-full overflow-hidden rounded-xl border border-[#e6e6e6] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#e6e6e6] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5 lg:px-8">
          <h2 className="text-base font-semibold text-[#111111] sm:text-lg md:text-xl">
            {title}
          </h2>

          <div className="relative w-full sm:max-w-xs sm:w-72">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cerca studente..."
              className="h-10 w-full rounded-full border border-gray-200 bg-[#f4f4f4] pr-11 pl-4 text-sm text-gray-700 outline-none transition-all focus:border-[#73bfa1] focus:bg-white"
            />
            <div className="pointer-events-none absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#ebebeb] text-gray-600">
              <Search size={14} />
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 p-3 md:hidden">
          {students.length === 0 ? (
            <div className="rounded-lg border border-[#e6e6e6] bg-white p-6 text-center text-sm text-[#6b7471]">
              {emptyMessage}
            </div>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="flex flex-col gap-3 rounded-xl border border-[#e6e6e6] bg-white p-4"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#2e2e2e]">
                    {student.name}
                  </h3>
                  <p className="truncate text-xs text-gray-500">{student.email}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-600">
                  <span className="text-gray-500">Data di inizio</span>
                  <span className="font-medium text-gray-800">{student.startDate}</span>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-2 text-xs">
                  <span className="text-gray-500">Avanzamento</span>
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-[#dce9e5]">
                      <div
                        className="h-1.5 rounded-full bg-[#74bfa2]"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="shrink-0 font-semibold text-[#2f2f2f]">
                      {student.progress}%
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-gray-100 pt-3">
                  <button
                    type="button"
                    onClick={() => downloadById(student.certificate)}
                    disabled={
                      !canDownloadCertificate(student.certificate) || isDownloading
                    }
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#ececec] text-xs font-medium text-[#363636] disabled:opacity-40"
                  >
                    <Download size={14} />
                    Certificato
                  </button>
                  <button
                    type="button"
                    onClick={() => openDetails(student)}
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#73bfa1] text-xs font-medium text-white hover:bg-[#5fa889]"
                  >
                    <Eye size={14} />
                    Dettagli
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="bg-[#f1f1f1] text-left">
                <th className="px-4 py-3 text-sm font-semibold text-[#232323] lg:px-6">
                  Corsista
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-[#232323] lg:px-6">
                  Data di inizio
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-[#232323] lg:px-6">
                  E-mail
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-[#232323] lg:px-6">
                  Avanzamento
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-[#232323] lg:px-6">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-sm text-[#6b7471]"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b border-[#dddddd]">
                    <td className="max-w-[180px] truncate px-4 py-4 text-sm font-medium text-[#2e2e2e] lg:px-6">
                      {student.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#2e2e2e] lg:px-6">
                      {student.startDate}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-4 text-sm text-[#2e2e2e] lg:px-6">
                      {student.email}
                    </td>
                    <td className="px-4 py-4 lg:px-6">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-[#dce9e5] lg:w-32">
                          <div
                            className="h-1.5 rounded-full bg-[#74bfa2]"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-[#2f2f2f]">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 lg:px-6">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => downloadById(student.certificate)}
                          disabled={
                            !canDownloadCertificate(student.certificate) ||
                            isDownloading
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ececec] text-[#363636] disabled:opacity-40"
                          aria-label="Download certificato"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDetails(student)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#73bfa1] text-white hover:bg-[#5fa889]"
                          aria-label="Dettagli studente"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-3 sm:px-6 lg:px-8">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
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
