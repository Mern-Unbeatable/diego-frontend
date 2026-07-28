import { ArrowLeft, Download, Send } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../../components/ui/Utilities/Loading';
import { ROUTES } from '../../../../config/routes';
import { getCompanyCoursesService } from '../../../../features/company/companyService';
import {
  formatProgressDate,
  PROGRESS_BADGE_TONE,
} from '../../../../features/company/companyProgressUtils';
import { useCompanyProgressReport } from '../../../../features/company/hooks/useCompanyProgressReport';

const CompanyCourseRosterView = () => {
  const { courseId } = useParams();
  const [courseTitle, setCourseTitle] = useState('');

  const loadCourseTitle = useCallback(async () => {
    if (!courseId) return;
    try {
      const data = await getCompanyCoursesService();
      const course = (data?.courses ?? []).find((item) => item.courseId === courseId);
      setCourseTitle(course?.courseTitle || 'Corso');
    } catch {
      setCourseTitle('Corso');
    }
  }, [courseId]);

  useEffect(() => {
    loadCourseTitle();
  }, [loadCourseTitle]);

  const {
    rows,
    meta,
    loading,
    actionId,
    page,
    setPage,
    handleReminder,
    handleDownload,
    from,
    to,
  } = useCompanyProgressReport({
    courseId,
    enabled: Boolean(courseId),
  });

  return (
    <section className="space-y-5">
      <Link
        to={ROUTES.COMPANY_ADMIN.TRAINING}
        className="inline-flex text-[#2c2c2c]"
      >
        <ArrowLeft size={20} />
      </Link>

      <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ececec] px-5 py-4">
          <h2 className="text-[30px] font-semibold text-[#202020]">
            Elenco di chi svolge il corso: {courseTitle}
          </h2>
        </header>

        {loading ? (
          <Loading size="md" className="min-h-40" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-left">
              <thead className="border-b border-[#ececec] bg-[#fafafa]">
                <tr className="text-sm text-[#3d3d3d]">
                  <th className="px-5 py-3 font-semibold">Corsisti iscritti</th>
                  <th className="px-3 py-3 font-semibold">Stato</th>
                  <th className="px-3 py-3 font-semibold">Avanzamento</th>
                  <th className="px-3 py-3 font-semibold">Data di iscrizione</th>
                  <th className="px-3 py-3 font-semibold">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-sm text-gray-500">
                      Nessun dipendente iscritto a questo corso.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.enrollmentId} className="border-b border-[#f0f0f0] text-sm">
                      <td className="px-5 py-3 text-[#404040]">{row.employeeName}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-semibold ${PROGRESS_BADGE_TONE[row.statusLabel] || PROGRESS_BADGE_TONE['Non iniziato']}`}
                        >
                          {row.statusLabel}
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
                      <td className="px-3 py-3 text-[#404040]">
                        {formatProgressDate(row.enrolledAt)}
                      </td>
                      <td className="px-3 py-3">
                        {row.canDownload ? (
                          <button
                            type="button"
                            disabled={actionId === row.enrollmentId}
                            onClick={() => handleDownload(row)}
                            className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-60 hover:bg-[#63a88c]"
                          >
                            <Download size={13} /> Download
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={!row.canSendReminder || actionId === row.enrollmentId}
                            onClick={() => handleReminder(row)}
                            className="inline-flex items-center gap-2 rounded-full bg-[#e6f6ef] px-4 py-1.5 text-sm font-semibold text-[#57a080] disabled:opacity-60 hover:bg-[#d9f1e7]"
                          >
                            <Send size={13} /> Invia un promemoria
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-[#7d7d7d]">
          <p>
            Mostra {from}-{to} di {meta.total} corsisti
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage(page - 1)}
              className="disabled:cursor-not-allowed disabled:opacity-40"
            >
              Precedente
            </button>
            {Array.from({ length: meta.totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={
                    pageNumber === page
                      ? 'h-6 w-6 rounded bg-[#73bfa1] text-sm font-semibold text-white'
                      : 'h-6 w-6 rounded text-sm font-semibold text-[#7d7d7d] hover:bg-[#f0f0f0]'
                  }
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              type="button"
              disabled={page >= meta.totalPages || loading}
              onClick={() => setPage(page + 1)}
              className="disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prossimo
            </button>
          </div>
        </footer>
      </section>
    </section>
  );
};

export default CompanyCourseRosterView;
