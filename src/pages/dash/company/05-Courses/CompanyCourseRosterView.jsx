import { ArrowLeft, Download, Send } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../components/ui/Utilities/Loading';
import Pagination from '../../../../components/ui/Utilities/Pagination';
import { ROUTES } from '../../../../config/routes';
import { getCompanyCoursesService } from '../../../../features/company/companyService';
import {
  formatProgressDate,
  PROGRESS_PAGE_SIZE,
} from '../../../../features/company/companyProgressUtils';
import {
  getProgressBadgeTone,
  getProgressStatusLabel,
} from '../../../../features/company/companyI18nHelpers';
import { useCompanyProgressReport } from '../../../../features/company/hooks/useCompanyProgressReport';

const ActionButton = ({ row, actionId, onDownload, onReminder }) => {
  const { t } = useTranslation();

  if (row.canDownload) {
    return (
      <button
        type="button"
        disabled={actionId === row.enrollmentId}
        onClick={() => onDownload(row)}
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#73bfa1] px-4 text-sm font-medium text-white hover:bg-[#63a88c] disabled:opacity-60 sm:w-auto"
      >
        <Download size={13} /> {t('companyAdmin.common.download')}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={!row.canSendReminder || actionId === row.enrollmentId}
      onClick={() => onReminder(row)}
      className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#e6f6ef] px-4 text-sm font-medium text-[#57a080] hover:bg-[#d9f1e7] disabled:opacity-60 sm:w-auto"
    >
      <Send size={13} /> {t('companyAdmin.common.sendReminder')}
    </button>
  );
};

const CompanyCourseRosterView = () => {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const [courseTitle, setCourseTitle] = useState('');

  const loadCourseTitle = useCallback(async () => {
    if (!courseId) return;
    try {
      const data = await getCompanyCoursesService();
      const course = (data?.courses ?? []).find(
        (item) => item.courseId === courseId,
      );
      setCourseTitle(course?.courseTitle || t('companyAdmin.common.courseFallback'));
    } catch {
      setCourseTitle(t('companyAdmin.common.courseFallback'));
    }
  }, [courseId, t]);

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
  } = useCompanyProgressReport({
    courseId,
    enabled: Boolean(courseId),
  });

  const total = meta?.total ?? 0;
  const totalPages = Math.max(1, meta?.totalPages ?? 1);

  return (
    <section className="min-w-0 space-y-4 sm:space-y-5">
      <Link
        to={ROUTES.COMPANY_ADMIN.TRAINING}
        className="inline-flex items-center gap-2 text-sm text-[#2c2c2c] hover:text-[#73bfa1]"
      >
        <ArrowLeft size={18} />
        {t('companyAdmin.common.back')}
      </Link>

      <section className="min-w-0 overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
        <header className="border-b border-[#ececec] px-4 py-4 sm:px-5 sm:py-4">
          <h2 className="text-base font-semibold leading-snug text-[#202020] sm:text-lg md:text-xl">
            {t('companyAdmin.courses.rosterTitlePrefix')}{' '}
            <span className="font-medium text-[#404040]">{courseTitle}</span>
          </h2>
        </header>

        {loading ? (
          <Loading size="md" className="min-h-40" />
        ) : rows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500 sm:px-5">
            {t('companyAdmin.courses.noEnrolled')}
          </p>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 p-3 md:hidden">
              {rows.map((row) => (
                <div
                  key={row.enrollmentId}
                  className="rounded-xl border border-[#ececec] bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 flex-1 truncate text-sm font-semibold text-[#2f2f2f]">
                      {row.employeeName}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${getProgressBadgeTone(row.statusLabel)}`}
                    >
                      {getProgressStatusLabel(t, row.statusLabel)}
                    </span>
                  </div>

                  <dl className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-xs text-gray-600">
                    <div className="flex items-center justify-between gap-2">
                      <dt>{t('companyAdmin.common.progress')}</dt>
                      <dd className="flex min-w-0 items-center gap-2 font-medium text-gray-800">
                        <div className="h-1.5 w-16 rounded-full bg-[#e5f2ec]">
                          <div
                            className="h-full rounded-full bg-[#73bfa1]"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                        <span>{String(row.progress).padStart(2, '0')}%</span>
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>{t('companyAdmin.common.table.enrollmentDate')}</dt>
                      <dd className="font-medium text-gray-800">
                        {formatProgressDate(row.enrolledAt)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <ActionButton
                      row={row}
                      actionId={actionId}
                      onDownload={handleDownload}
                      onReminder={handleReminder}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] text-left">
                <thead className="border-b border-[#ececec] bg-[#fafafa]">
                  <tr className="text-xs text-[#3d3d3d] sm:text-sm">
                    <th className="px-4 py-3 font-semibold lg:px-5">
                      {t('companyAdmin.common.table.enrolledStudents')}
                    </th>
                    <th className="px-3 py-3 font-semibold">{t('companyAdmin.common.table.status')}</th>
                    <th className="px-3 py-3 font-semibold">{t('companyAdmin.common.table.progress')}</th>
                    <th className="px-3 py-3 font-semibold">{t('companyAdmin.common.table.enrollmentDate')}</th>
                    <th className="px-3 py-3 font-semibold">{t('companyAdmin.common.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.enrollmentId}
                      className="border-b border-[#f0f0f0] text-sm"
                    >
                      <td className="max-w-[180px] truncate px-4 py-3 text-[#404040] lg:px-5">
                        {row.employeeName}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-semibold ${getProgressBadgeTone(row.statusLabel)}`}
                        >
                          {getProgressStatusLabel(t, row.statusLabel)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#404040]">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 rounded-full bg-[#e5f2ec] lg:w-[110px]">
                            <div
                              className="h-full rounded-full bg-[#73bfa1]"
                              style={{ width: `${row.progress}%` }}
                            />
                          </div>
                          <span>{String(row.progress).padStart(2, '0')}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-[#404040]">
                        {formatProgressDate(row.enrolledAt)}
                      </td>
                      <td className="px-3 py-3">
                        <ActionButton
                          row={row}
                          actionId={actionId}
                          onDownload={handleDownload}
                          onReminder={handleReminder}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="px-3 sm:px-5">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={PROGRESS_PAGE_SIZE}
            onPageChange={setPage}
            showingLabel={
              total === 0
                ? t('companyAdmin.courses.pagination.showingZero')
                : t('companyAdmin.courses.pagination.showing', {
                    from: Math.min((page - 1) * PROGRESS_PAGE_SIZE + 1, total),
                    to: Math.min(page * PROGRESS_PAGE_SIZE, total),
                    total,
                  })
            }
          />
        </div>
      </section>
    </section>
  );
};

export default CompanyCourseRosterView;
