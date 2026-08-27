import { ArrowLeft, Download, Send } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Toast, useToast } from '../../../../components/ui';
import { ENV_CONFIG } from '../../../../config/env.config';
import {
  addCompanyEmployeeService,
  downloadEmployeeCertificateService,
  getCompanyCoursesService,
  getCompanyProgressReportService,
  sendEnrollmentReminderService,
} from '../../../../features/company/companyService';
import {
  getProgressBadgeTone,
  getProgressStatusLabel,
} from '../../../../features/company/companyI18nHelpers';
import { useEmployees } from '../../../../features/company/employee/employeeHooks';
import EmployeeModal from '../EmployeeModal';

const PAGE_SIZE = 6;

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('it-IT');
};

const resolveAssetUrl = (path) => {
  if (!path) return '/images/course/course.png';
  if (path.startsWith('http')) return path;
  const base = ENV_CONFIG.API_BASE_URL.replace(/\/api\/v1\/?$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

const StudentTrackingModal = ({ course, open, onClose }) => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);

  const loadReport = useCallback(
    async (page = 1) => {
      if (!course?.courseId) return;
      setLoading(true);
      try {
        const data = await getCompanyProgressReportService({
          courseId: course.courseId,
          page,
          limit: PAGE_SIZE,
        });
        setRows(data?.report ?? []);
        setMeta(data?.meta ?? { page, total: 0, totalPages: 1 });
      } catch (error) {
        toast.error(error?.message || t('companyAdmin.courses.toasts.loadStudentsFailed'));
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [course?.courseId, t],
  );

  useEffect(() => {
    if (open && course?.courseId) {
      loadReport(1);
    }
  }, [open, course?.courseId, loadReport]);

  const handleReminder = async (row) => {
    try {
      setActionId(row.enrollmentId);
      await sendEnrollmentReminderService(row.enrollmentId);
      toast.success(t('companyAdmin.courses.toasts.reminderSent', { name: row.employeeName }));
    } catch (error) {
      toast.error(error?.message || t('companyAdmin.courses.toasts.reminderFailed'));
    } finally {
      setActionId(null);
    }
  };

  const handleDownload = async (row) => {
    if (!row.certificateId) return;
    try {
      setActionId(row.enrollmentId);
      const data = await downloadEmployeeCertificateService(
        row.employeeUserId,
        row.certificateId,
      );
      const pdfUrl = resolveAssetUrl(data?.pdfUrl);
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      toast.error(error?.message || t('companyAdmin.courses.toasts.downloadFailed'));
    } finally {
      setActionId(null);
    }
  };

  if (!open || !course) return null;

  const from = meta.total === 0 ? 0 : (meta.page - 1) * PAGE_SIZE + 1;
  const to = Math.min(meta.page * PAGE_SIZE, meta.total);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#12382b]/65 p-3 sm:p-6">
      <section className="mx-auto max-w-[1460px] rounded-2xl bg-white p-5 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex text-[#2c2c2c]"
        >
          <ArrowLeft size={20} />
        </button>

        <section className="mt-6 overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ececec] px-5 py-5">
            <h2 className="text-[34px] font-semibold text-[#202020]">
              {t('companyAdmin.courses.rosterTitle', { title: course.courseTitle })}
            </h2>
          </header>

          {loading ? (
            <p className="px-5 py-8 text-sm text-gray-500">
              {t('companyAdmin.courses.loadingStudents')}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left">
                <thead className="border-b border-[#ececec] bg-[#f1f1f1]">
                  <tr className="text-sm text-[#3d3d3d]">
                    <th className="px-5 py-3 font-semibold">
                      {t('companyAdmin.common.table.enrolledStudents')}
                    </th>
                    <th className="px-3 py-3 font-semibold">{t('companyAdmin.common.table.status')}</th>
                    <th className="px-3 py-3 font-semibold">{t('companyAdmin.common.table.progress')}</th>
                    <th className="px-3 py-3 font-semibold">
                      {t('companyAdmin.common.table.enrollmentDate')}
                    </th>
                    <th className="px-3 py-3 font-semibold">{t('companyAdmin.common.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-8 text-sm text-gray-500"
                      >
                        {t('companyAdmin.courses.noEnrolled')}
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr
                        key={row.enrollmentId}
                        className="border-b border-[#f0f0f0] text-sm"
                      >
                        <td className="px-5 py-3 text-[#404040]">
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
                            <div className="h-[6px] w-[110px] rounded-full bg-[#e5f2ec]">
                              <div
                                className="h-full rounded-full bg-[#73bfa1]"
                                style={{ width: `${row.progress}%` }}
                              />
                            </div>
                            <span>
                              {String(row.progress).padStart(2, '0')}%
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-[#404040]">
                          {formatDate(row.enrolledAt)}
                        </td>
                        <td className="px-3 py-3">
                          {row.canDownload ? (
                            <button
                              type="button"
                              disabled={actionId === row.enrollmentId}
                              onClick={() => handleDownload(row)}
                              className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-60"
                            >
                              <Download size={13} /> {t('companyAdmin.common.download')}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={
                                !row.canSendReminder ||
                                actionId === row.enrollmentId
                              }
                              onClick={() => handleReminder(row)}
                              className="inline-flex items-center gap-2 rounded-full bg-[#e6f6ef] px-4 py-1.5 text-sm font-semibold text-[#57a080] disabled:opacity-60"
                            >
                              <Send size={13} /> {t('companyAdmin.common.sendReminder')}
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
              {t('companyAdmin.courses.pagination.showing', { from, to, total: meta.total })}
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                disabled={meta.page <= 1 || loading}
                onClick={() => loadReport(meta.page - 1)}
              >
                {t('companyAdmin.common.pagination.previous')}
              </button>
              <span className="h-6 min-w-6 rounded bg-[#73bfa1] px-2 text-center text-sm leading-6 font-semibold text-white">
                {meta.page}
              </span>
              <button
                type="button"
                disabled={meta.page >= meta.totalPages || loading}
                onClick={() => loadReport(meta.page + 1)}
              >
                {t('companyAdmin.common.pagination.next')}
              </button>
            </div>
          </footer>
        </section>
      </section>
    </div>
  );
};

const CompanyCourseList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createEmployee } = useEmployees();
  const { toasts, addToast, removeToast } = useToast();
  const [assignOpen, setAssignOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCompanyCoursesService();
      setCourses(data?.courses ?? []);
      setAdminName(data?.adminName || '');
    } catch (error) {
      toast.error(error?.message || t('companyAdmin.courses.toasts.loadCoursesFailed'));
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleAssignSubmit = async (payload) => {
    await createEmployee(payload);
    addToast(t('companyAdmin.courses.toasts.assignedSuccess'), 'success');
  };

  const openAssign = (course) => {
    setSelectedCourse(course);
    setAssignOpen(true);
  };

  const openTracking = (course) => {
    setSelectedCourse(course);
    setTrackingOpen(true);
  };

  const handleAssignEmployee = async (form) => {
    if (!selectedCourse) return;
    setSaving(true);
    try {
      await addCompanyEmployeeService({
        firstName: form.name,
        lastName: form.surname,
        email: form.email,
        contactNumber: form.phone,
        role: 'Operatore',
        employmentDate: new Date().toISOString(),
        birthDate: form.birthDate || undefined,
        city: form.birthPlace || undefined,
        traineeTaxCode: form.taxCode || undefined,
        password: form.password || undefined,
        courseIds: [selectedCourse.courseId],
        companyCoursePurchaseId:
          selectedCourse.companyCoursePurchaseId || undefined,
      });
      toast.success(t('companyAdmin.courses.toasts.addedAndAssigned'));
      setAssignOpen(false);
      await loadCourses();
    } catch (error) {
      toast.error(error?.message || t('companyAdmin.courses.toasts.assignFailed'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {toasts.map((toastItem) => (
        <Toast
          key={toastItem.id}
          type={toastItem.type}
          message={toastItem.message}
          duration={toastItem.duration}
          onClose={() => removeToast(toastItem.id)}
        />
      ))}
      <section className="space-y-7">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex text-[#2c2c2c]"
        >
          <ArrowLeft size={20} />
        </button>

        <section className="relative overflow-hidden rounded-lg bg-[#73bfa1] px-6 py-8 text-white">
          <p className="mb-1 text-sm text-[#ecfff7]">{t('companyAdmin.common.hello')}</p>
          <h1 className="text-[38px] font-semibold text-white">
            {adminName || t('companyAdmin.courses.administrator')}
          </h1>
          <div className="pointer-events-none absolute right-[-10px] bottom-[-20px] h-[170px] w-[170px] rounded-full border-[10px] border-[#4a9e7f]/20" />
          <div className="pointer-events-none absolute right-[10px] bottom-[-30px] h-[150px] w-[150px] rounded-full border-[10px] border-[#4a9e7f]/20" />
          <div className="pointer-events-none absolute right-[30px] bottom-[-40px] h-[130px] w-[130px] rounded-full border-[10px] border-[#4a9e7f]/20" />
        </section>

        {loading ? (
          <p className="text-sm text-gray-500">{t('companyAdmin.courses.loading')}</p>
        ) : courses.length === 0 ? (
          <p className="rounded-xl border border-[#ececec] bg-white p-6 text-sm text-gray-600">
            {t('companyAdmin.courses.noPurchasedCompany')}
          </p>
        ) : (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.courseId}
                className="rounded-xl border border-[#ececec] bg-white p-4 shadow-[0_1px_0_#f3f3f3]"
              >
                <img
                  src={resolveAssetUrl(course.thumbnailUrl)}
                  alt={course.courseTitle}
                  className="h-[180px] w-full rounded-xl object-cover"
                />
                <h3 className="mt-4 text-[30px] font-semibold text-[#1f1f1f]">
                  {course.courseTitle}
                </h3>
                <div className="mt-2 flex items-center justify-between text-[16px] text-[#4d4d4d]">
                  <span>{t('companyAdmin.courses.enrolledCount')}</span>
                  <span>{course.enrolledEmployees}</span>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => openTracking(course)}
                    className="rounded-full bg-[#73bfa1] px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    {t('companyAdmin.courses.viewDetails')}
                  </button>
                  <button
                    type="button"
                    onClick={() => openAssign(course)}
                    className="rounded-full border border-[#86c8ad] px-5 py-2.5 text-sm font-semibold text-[#73bfa1]"
                  >
                    {t('companyAdmin.courses.assignEmployee')}
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>

      {assignOpen ? (
        <EmployeeModal
          mode="add"
          saving={saving}
          employee={
            selectedCourse
              ? {
                  name: '',
                  email: '',
                  phone: '',
                  courseName: selectedCourse.courseTitle,
                }
              : null
          }
          onSubmit={handleAssignEmployee}
          onClose={() => !saving && setAssignOpen(false)}
        />
      ) : null}

      <StudentTrackingModal
        course={selectedCourse}
        open={trackingOpen}
        onClose={() => setTrackingOpen(false)}
      />
    </>
  );
};

export default CompanyCourseList;
