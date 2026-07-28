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
import {
  getCompanyCoursesService,
  getCompanyDashboardService,
  getCompanyEmployeesService,
} from '../../../../features/company/companyService';
import {
  formatProgressDate,
  PROGRESS_BADGE_TONE,
} from '../../../../features/company/companyProgressUtils';
import { useCompanyProgressReport } from '../../../../features/company/hooks/useCompanyProgressReport';

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
    from,
    to,
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

  return (
    <section className="space-y-7">
      <div className="rounded-lg bg-[#73bfa1] px-6 py-7 text-white">
        <p className="mb-1 text-sm text-[#e8fff5]">Ciao!</p>
        {dashboardLoading ? (
          <Loading size="sm" className="min-h-10" />
        ) : (
          <h2 className="text-[38px] font-semibold text-white">{adminName}</h2>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-[24px] font-semibold text-[#202020]">
          Panoramica
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {overviewCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-[#ececec] bg-white p-5 shadow-[0_1px_0_#f3f3f3]"
            >
              <div className="mb-3 flex justify-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-md ${card.iconBg} text-white`}
                >
                  {card.icon}
                </div>
              </div>
              <p className="text-center text-[15px] font-semibold text-[#2d2d2d]">
                {card.title}
              </p>
              <p
                className={`mt-1 text-center text-sm font-medium ${card.textColor}`}
              >
                {card.value}
              </p>
            </article>
          ))}

          <article className="rounded-xl border border-[#ececec] bg-white p-5 shadow-[0_1px_0_#f3f3f3]">
            <p className="text-center text-[30px] font-semibold text-[#202020]">
              Acquista nuovi corsi
            </p>
            <div className="mt-5 flex justify-center">
              <Link
                to="/"
                className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#63a88c]"
              >
                Vai al catalogo
              </Link>
            </div>
          </article>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
        <header className="border-b border-[#ececec] px-5 py-5">
          <h4 className="text-[30px] font-semibold text-[#1f1f1f]">
            Stato di avanzamento - {selectedCourseTitle}
          </h4>
        </header>

        <div className="grid grid-cols-1 gap-3 border-b border-[#ececec] px-5 py-4 lg:grid-cols-4">
          <div>
            <p className="mb-1 text-sm font-medium text-[#868686]">
              Cerca dipendente
            </p>
            <input
              value={employeeSearch}
              onChange={(event) => setEmployeeSearch(event.target.value)}
              className="h-10 w-full rounded-full border border-[#e5e5e5] px-4 text-sm outline-none placeholder:text-[#a3a3a3]"
              placeholder="Cerca per nome"
            />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-[#868686]">Corso</p>
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
          <div>
            <p className="mb-1 text-sm font-medium text-[#868686]">
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
              className="h-10 rounded-full border border-[#e5e5e5] px-5 text-sm font-medium text-[#4f4f4f] hover:bg-[#f8f8f8]"
            >
              Reset
            </button>
          </div>
        </div>

        {reportLoading ? (
          <Loading size="md" className="min-h-40" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="border-b border-[#ececec] bg-[#fafafa]">
                <tr className="text-sm text-[#3d3d3d]">
                  <th className="px-5 py-3 font-semibold">Corso</th>
                  <th className="px-3 py-3 font-semibold">Corsisti iscritti</th>
                  <th className="px-3 py-3 font-semibold">Stato</th>
                  <th className="px-3 py-3 font-semibold">Avanzamento</th>
                  <th className="px-3 py-3 font-semibold">Ultimo accesso</th>
                  <th className="px-3 py-3 font-semibold">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-sm text-gray-500">
                      Nessun risultato trovato.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.enrollmentId} className="border-b border-[#f0f0f0] text-sm">
                      <td className="px-5 py-3 text-[#404040]">{row.courseTitle}</td>
                      <td className="px-3 py-3 text-[#404040]">{row.employeeName}</td>
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
                        {formatProgressDate(row.lastAccess)}
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
            Showing {from}-{to} of {meta.total} students
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              disabled={page <= 1 || reportLoading}
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
              disabled={page >= meta.totalPages || reportLoading}
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

export default CompanyHomeView;
