import { Download, Eye } from 'lucide-react';
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
  const [page, setPage] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const { data, isLoading, isError, error } = useGetLicenseeStudentsQuery({
    page,
    limit: PAGE_SIZE,
  });

  const students = data?.students ?? [];
  const meta = data?.meta ?? {};
  const total = meta.total ?? students.length;
  const totalPages = meta.totalPages || Math.max(1, Math.ceil(total / PAGE_SIZE));

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
        <div className="border-b border-[#e6e6e6] px-8 py-6">
          <h2 className="text-2xl font-semibold text-[#111111]">{title}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-[#f1f1f1] text-left">
                <th className="px-8 py-4 text-base font-semibold text-[#232323]">Corsista</th>
                <th className="px-6 py-4 text-base font-semibold text-[#232323]">Data di inizio</th>
                <th className="px-6 py-4 text-base font-semibold text-[#232323]">E-mail utilizzata</th>
                <th className="px-6 py-4 text-base font-semibold text-[#232323]">Avanzamento</th>
                <th className="px-6 py-4 text-base font-semibold text-[#232323]">Azioni</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-sm text-[#6b7471]">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b border-[#dddddd]">
                    <td className="px-8 py-5 text-sm font-medium text-[#2e2e2e]">{student.name}</td>
                    <td className="px-6 py-5 text-sm font-medium text-[#2e2e2e]">{student.startDate}</td>
                    <td className="px-6 py-5 text-sm font-medium text-[#2e2e2e]">{student.email}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="h-[6px] w-[130px] rounded-full bg-[#dce9e5]">
                          <div
                            className="h-[6px] rounded-full bg-[#74bfa2]"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-[#2f2f2f]">
                          {student.progress === 0 ? '00%' : `${student.progress}%`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => downloadById(student.certificate)}
                          disabled={!canDownloadCertificate(student.certificate) || isDownloading}
                          className="inline-flex h-[44px] w-[72px] items-center justify-center rounded-full bg-[#ececec] text-[#363636] disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Download certificato"
                        >
                          <Download size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openDetails(student)}
                          className="inline-flex h-[44px] w-[72px] items-center justify-center rounded-full bg-[#73bfa1] text-white"
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

        <footer className="flex flex-wrap items-center justify-between border-t border-[#e6e6e6] px-8 py-5">
          <p className="text-sm font-medium text-[#7a7a7a]">{paginationLabel}</p>
          <div className="flex items-center gap-4 text-sm font-medium text-[#6d6d6d]">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="disabled:opacity-40"
            >
              Precedente
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-md px-2 ${
                  pageNumber === page ? 'bg-[#73bfa1] text-white' : ''
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="disabled:opacity-40"
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
        onOpenTraining={(enrollment) => openTraining(enrollment, selectedStudentId)}
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
