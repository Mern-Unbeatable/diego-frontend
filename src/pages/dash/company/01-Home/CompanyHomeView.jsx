import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BellRing,
  BookOpen,
  CircleAlert,
  CircleCheck,
  Download,
  Send,
  UsersRound,
} from 'lucide-react';
import Loading from '../../../../components/ui/Utilities/Loading';
import Pagination from '../../../../components/ui/Utilities/Pagination';
import {
  getCompanyCoursesService,
  getCompanyDashboardService,
  getCompanyEmployeesService,
} from '../../../../features/company/companyService';
import {
  formatProgressDate,
  PROGRESS_BADGE_TONE,
  PROGRESS_PAGE_SIZE,
} from '../../../../features/company/companyProgressUtils';
import { useCompanyProgressReport } from '../../../../features/company/hooks/useCompanyProgressReport';

const ActionButton = ({ row, actionId, onDownload, onReminder }) => {
  if (row.canDownload) {
    return (
      <button
        type="button"
        disabled={actionId === row.enrollmentId}
        onClick={() => onDownload(row)}
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#73bfa1] px-4 text-sm font-medium text-white hover:bg-[#63a88c] disabled:opacity-60 sm:w-auto"
      >
        <Download size={13} /> Download
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
      <Send size={13} /> Invia un promemoria
    </button>
  );
};

const CompanyHomeView = () => {
  const [dashboard, setDashboard] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [participantFilter, setParticipantFilter] = useState('');

  const loadDashboard = useCallback(async () => {
    setDashboardLoading(true);
    try {
      const data = await getCompanyDashboardService();
      setDashboard(data);
    } catch {
      setDashboard(null);
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  const loadFilters = useCallback(async () => {
    try {
      const [coursesData, employeesData] = await Promise.all([
        getCompanyCoursesService(),
        getCompanyEmployeesService({ limit: 100 }),
      ]);
      setCourses(coursesData?.courses ?? []);
      setEmployees(employeesData?.employees ?? []);
    } catch {
      setCourses([]);
      setEmployees([]);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
    loadFilters();
  }, [loadDashboard, loadFilters]);

  const {
    rows,
    meta,
    loading: reportLoading,
    actionId,
    page,
    setPage,
    handleReminder,
    handleDownload,
  } = useCompanyProgressReport({
    courseId: courseFilter || undefined,
    employeeName: employeeSearch,
    userId: participantFilter || undefined,
  });

  const overviewCards = useMemo(() => {
    const cards = dashboard?.cards ?? {};
    return [
      {
        title: 'Totale utenti',
        value: cards.totalUsers ?? 0,
        icon: <UsersRound size={17} />,
        iconBg: 'bg-[#73bfa1]',
        textColor: 'text-[#73bfa1]',
      },
      {
        title: 'Corsi attivi',
        value: cards.activeCourses ?? 0,
        icon: <BookOpen size={17} />,
        iconBg: 'bg-[#73bfa1]',
        textColor: 'text-[#73bfa1]',
      },
      {
        title: 'In scadenza',
        value: cards.expiringSoon ?? 0,
        icon: <CircleAlert size={17} />,
        iconBg: 'bg-[#f39b10]',
        textColor: 'text-[#f39b10]',
      },
      {
        title: 'Corsi completati',
        value: cards.completedCourses ?? 0,
        icon: <CircleCheck size={17} />,
        iconBg: 'bg-[#73bfa1]',
        textColor: 'text-[#73bfa1]',
      },
      {
        title: 'I miei tickets',
        value: cards.myTickets ?? 0,
        icon: <BellRing size={17} />,
        iconBg: 'bg-[#73bfa1]',
        textColor: 'text-[#73bfa1]',
      },
    ];
  }, [dashboard?.cards]);

  const adminName = dashboard?.greeting?.fullName || 'Admin';
  const selectedCourseTitle =
    courses.find((course) => course.courseId === courseFilter)?.courseTitle ||
    'Tutti i corsi';

  const handleResetFilters = () => {
    setEmployeeSearch('');
    setCourseFilter('');
    setParticipantFilter('');
  };

  const total = meta?.total ?? 0;
  const totalPages = Math.max(1, meta?.totalPages ?? 1);

  return (
    <section className="min-w-0 space-y-5 sm:space-y-7">
      <div className="rounded-lg bg-[#73bfa1] px-4 py-5 text-white sm:px-6 sm:py-7">
        <p className="mb-1 text-sm text-[#e8fff5]">Ciao!</p>
        {dashboardLoading ? (
          <Loading size="sm" className="min-h-10" />
        ) : (
          <h2 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
            {adminName}
          </h2>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-base font-semibold text-[#202020] sm:mb-4 sm:text-lg md:text-xl">
          Panoramica
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3">
          {overviewCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-[#ececec] bg-white p-3 shadow-sm sm:p-5"
            >
              <div className="mb-2 flex justify-center sm:mb-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-white sm:h-9 sm:w-9 ${card.iconBg}`}
                >
                  {card.icon}
                </div>
              </div>
              <p className="text-center text-xs font-semibold text-[#2d2d2d] sm:text-sm">
                {card.title}
              </p>
              <p
                className={`mt-1 text-center text-sm font-medium ${card.textColor}`}
              >
                {card.value}
              </p>
            </article>
          ))}

          <article className="col-span-2 flex flex-col items-center justify-center rounded-xl border border-[#ececec] bg-white p-4 shadow-sm sm:col-span-2 sm:p-5 lg:col-span-1">
            <p className="text-center text-sm font-semibold text-[#202020] sm:text-base">
              Acquista nuovi corsi
            </p>
            <div className="mt-3 flex w-full justify-center sm:mt-4">
              <Link
                to="/"
                className="inline-flex h-10 w-full max-w-[200px] items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white transition hover:bg-[#63a88c]"
              >
                Vai al catalogo
              </Link>
            </div>
          </article>
        </div>
      </div>

      <section className="min-w-0 overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
        <header className="border-b border-[#ececec] px-4 py-4 sm:px-5 sm:py-5">
          <h4 className="text-base font-semibold text-[#1f1f1f] sm:text-lg md:text-xl">
            Stato di avanzamento — {selectedCourseTitle}
          </h4>
        </header>

        <div className="grid grid-cols-1 gap-3 border-b border-[#ececec] px-4 py-4 sm:px-5 sm:py-4 lg:grid-cols-4">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium text-[#868686] sm:text-sm">
              Cerca dipendente
            </p>
            <input
              value={employeeSearch}
              onChange={(event) => setEmployeeSearch(event.target.value)}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm outline-none placeholder:text-[#a3a3a3]"
              placeholder="Cerca per nome"
            />
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium text-[#868686] sm:text-sm">
              Corso
            </p>
            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none"
            >
              <option value="">Tutti i corsi</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium text-[#868686] sm:text-sm">
              Cerca partecipante
            </p>
            <select
              value={participantFilter}
              onChange={(event) => setParticipantFilter(event.target.value)}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm text-[#555555] outline-none"
            >
              <option value="">Tutti i partecipanti</option>
              {employees.map((employee) => (
                <option key={employee.userId} value={employee.userId}>
                  {`${employee.firstName || ''} ${employee.lastName || ''}`.trim() ||
                    employee.email}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-5 text-sm font-medium text-[#4f4f4f] hover:bg-[#f8f8f8] lg:w-auto"
            >
              Reset
            </button>
          </div>
        </div>

        {reportLoading ? (
          <Loading size="md" className="min-h-40" />
        ) : rows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500 sm:px-5">
            Nessun risultato trovato.
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
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#2f2f2f]">
                        {row.courseTitle}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {row.employeeName}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${PROGRESS_BADGE_TONE[row.statusLabel] || PROGRESS_BADGE_TONE['Non iniziato']}`}
                    >
                      {row.statusLabel}
                    </span>
                  </div>

                  <dl className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-xs text-gray-600">
                    <div className="flex items-center justify-between gap-2">
                      <dt>Avanzamento</dt>
                      <dd className="flex min-w-0 items-center gap-2 font-medium text-gray-800">
                        <div className="h-1.5 w-16 rounded-full bg-[#e5f2ec] sm:w-20">
                          <div
                            className="h-full rounded-full bg-[#73bfa1]"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                        <span>{String(row.progress).padStart(2, '0')}%</span>
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>Ultimo accesso</dt>
                      <dd className="font-medium text-gray-800">
                        {formatProgressDate(row.lastAccess)}
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
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-[#ececec] bg-[#fafafa]">
                  <tr className="text-xs text-[#3d3d3d] sm:text-sm">
                    <th className="px-4 py-3 font-semibold lg:px-5">Corso</th>
                    <th className="px-3 py-3 font-semibold">Corsisti iscritti</th>
                    <th className="px-3 py-3 font-semibold">Stato</th>
                    <th className="px-3 py-3 font-semibold">Avanzamento</th>
                    <th className="px-3 py-3 font-semibold">Ultimo accesso</th>
                    <th className="px-3 py-3 font-semibold">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.enrollmentId}
                      className="border-b border-[#f0f0f0] text-sm"
                    >
                      <td className="max-w-[180px] truncate px-4 py-3 text-[#404040] lg:px-5">
                        {row.courseTitle}
                      </td>
                      <td className="max-w-[140px] truncate px-3 py-3 text-[#404040]">
                        {row.employeeName}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-semibold ${PROGRESS_BADGE_TONE[row.statusLabel] || PROGRESS_BADGE_TONE['Non iniziato']}`}
                        >
                          {row.statusLabel}
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
                        {formatProgressDate(row.lastAccess)}
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
                ? 'Mostra 0 di 0 studenti'
                : `Mostra ${Math.min((page - 1) * PROGRESS_PAGE_SIZE + 1, total)}-${Math.min(page * PROGRESS_PAGE_SIZE, total)} di ${total} studenti`
            }
          />
        </div>
      </section>
    </section>
  );
};

export default CompanyHomeView;
