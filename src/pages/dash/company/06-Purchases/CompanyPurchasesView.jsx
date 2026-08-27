import { ArrowLeft, Copy, Mail, Plus, Users, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import Loading from '../../../../components/ui/Utilities/Loading';
import {
  getCompanyPurchasesService,
  inviteEmployeeToPurchaseService,
  sendAccessLinkService,
} from '../../../../features/company/companyPurchaseService';

const getCourseTitle = (course, fallback) => {
  if (!course?.courseTitle) return fallback;
  if (typeof course.courseTitle === 'string') return course.courseTitle;
  return (
    course.courseTitle.it ||
    course.courseTitle.en ||
    Object.values(course.courseTitle)[0]
  );
};

const InviteModal = ({ open, purchase, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open || !purchase) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await inviteEmployeeToPurchaseService({
        companyCoursePurchaseId: purchase.id,
        email,
        firstName,
        lastName,
      });
      toast.success(t('companyAdmin.purchases.toasts.invited'));
      onSuccess?.();
      onClose();
      setEmail('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      toast.error(error?.message || t('companyAdmin.purchases.toasts.inviteFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('companyAdmin.purchases.assignStudent')}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-h-[90vh] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-[#1f1f1f] sm:text-lg">
              {t('companyAdmin.purchases.assignStudent')}
            </h3>
            <p className="mt-0.5 truncate text-sm text-[#666]">
              {getCourseTitle(purchase.course, t('companyAdmin.common.courseFallback'))}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100"
            aria-label={t('companyAdmin.common.close')}
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('companyAdmin.purchases.form.studentEmail')}
            className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#73bfa1]"
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t('companyAdmin.purchases.form.firstName')}
            className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#73bfa1]"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t('companyAdmin.purchases.form.lastName')}
            className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#73bfa1]"
          />
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-100 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-full border border-gray-300 px-5 text-sm font-medium"
          >
            {t('companyAdmin.common.cancel')}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? t('companyAdmin.purchases.sending') : t('companyAdmin.purchases.sendLink')}
          </button>
        </div>
      </form>
    </div>
  );
};

const StatusBadge = ({ used }) => {
  const { t } = useTranslation();

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        used ? 'bg-[#e6f6ef] text-[#57a080]' : 'bg-[#fdf2df] text-[#e59a2b]'
      }`}
    >
      {used ? t('companyAdmin.purchases.status.active') : t('companyAdmin.purchases.status.pending')}
    </span>
  );
};

const RowActions = ({ row, sendingId, onCopy, onSend }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onCopy(row.accessUrl)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9fd9c1] text-[#73bfa1]"
        aria-label={t('companyAdmin.purchases.aria.copyLink')}
      >
        <Copy size={14} />
      </button>
      <button
        type="button"
        onClick={() => onSend(row.enrollmentId)}
        disabled={sendingId === row.enrollmentId}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#73bfa1] text-white disabled:opacity-50"
        aria-label={t('companyAdmin.purchases.aria.sendEmail')}
      >
        <Mail size={14} />
      </button>
    </div>
  );
};

const CompanyPurchasesView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invitePurchase, setInvitePurchase] = useState(null);
  const [sendingId, setSendingId] = useState(null);

  const loadPurchases = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCompanyPurchasesService();
      setPurchases(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(error?.message || t('companyAdmin.purchases.errors.loadFailed'));
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadPurchases();
  }, [loadPurchases]);

  const handleCopyLink = async (url) => {
    if (!url) {
      toast.error(t('companyAdmin.purchases.toasts.linkUnavailable'));
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('companyAdmin.purchases.toasts.linkCopiedClipboard'));
    } catch {
      toast.error(t('companyAdmin.purchases.toasts.copyLinkFailed'));
    }
  };

  const handleSendEmail = async (enrollmentId) => {
    try {
      setSendingId(enrollmentId);
      await sendAccessLinkService(enrollmentId);
      toast.success(t('companyAdmin.purchases.toasts.emailSent'));
    } catch (error) {
      toast.error(error?.message || t('companyAdmin.purchases.toasts.emailFailed'));
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-3 inline-flex items-center gap-2 text-sm text-[#2f2f2f] sm:mb-4"
      >
        <ArrowLeft size={18} />
        {t('companyAdmin.common.back')}
      </button>

      <header className="mb-4 sm:mb-6">
        <h1 className="text-base font-semibold text-[#1f1f1f] sm:text-lg md:text-xl">
          {t('companyAdmin.purchases.title')}
        </h1>
        <p className="mt-1 text-xs text-[#666] sm:text-sm">
          {t('companyAdmin.purchases.subtitleExtended')}
        </p>
      </header>

      {loading ? (
        <Loading size="md" className="min-h-40" />
      ) : purchases.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-[#666] sm:rounded-2xl sm:p-10">
          {t('companyAdmin.purchases.emptyExtended')}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {purchases.map((purchase) => (
            <section
              key={purchase.id}
              className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl"
            >
              <div className="flex flex-col gap-3 border-b border-gray-100 bg-[#f3f7f5] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-[#1f1f1f] sm:text-base md:text-lg">
                    {getCourseTitle(purchase.course, t('companyAdmin.common.courseFallback'))}
                  </h2>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#666] sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} />
                      {t('companyAdmin.purchases.seatsUsed', {
                        used: purchase.seatsUsed,
                        total: purchase.seatsTotal,
                      })}
                    </span>
                    {purchase.daysRemaining > 0 ? (
                      <span className="text-[#d48c21]">
                        · {t('companyAdmin.purchases.expiresInDays', { days: purchase.daysRemaining })}
                      </span>
                    ) : null}
                  </p>
                </div>
                {purchase.seatsAvailable > 0 && !purchase.isExpired ? (
                  <button
                    type="button"
                    onClick={() => setInvitePurchase(purchase)}
                    className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#73bfa1] px-4 text-sm font-medium text-white sm:w-auto sm:px-5"
                  >
                    <Plus size={16} />
                    {t('companyAdmin.purchases.assignStudent')}
                  </button>
                ) : null}
              </div>

              {!purchase.assignedEmployees?.length ? (
                <p className="px-4 py-8 text-center text-sm text-[#888] sm:px-5">
                  {t('companyAdmin.purchases.noAssignedHint')}
                </p>
              ) : (
                <>
                  {/* Mobile cards */}
                  <div className="space-y-3 p-3 md:hidden">
                    {purchase.assignedEmployees.map((row) => (
                      <div
                        key={row.enrollmentId}
                        className="rounded-xl border border-gray-100 bg-white p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#222]">
                              {row.name || '—'}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-[#555]">
                              {row.email}
                            </p>
                          </div>
                          <StatusBadge used={row.accessLinkUsed} />
                        </div>

                        <div className="mt-3 border-t border-gray-100 pt-3">
                          <p className="mb-1 text-xs text-gray-500">{t('companyAdmin.purchases.table.accessLink')}</p>
                          <p className="truncate text-xs text-[#73bfa1]">
                            {row.accessUrl || '—'}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="text-xs text-gray-400">{t('companyAdmin.purchases.table.actions')}</span>
                          <RowActions
                            row={row}
                            sendingId={sendingId}
                            onCopy={handleCopyLink}
                            onSend={handleSendEmail}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop table */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[800px] border-collapse">
                      <thead>
                        <tr className="bg-[#fafafa] text-left text-xs text-[#444] sm:text-sm">
                          <th className="px-4 py-3 font-semibold lg:px-5">
                            {t('companyAdmin.purchases.table.student')}
                          </th>
                          <th className="px-4 py-3 font-semibold lg:px-5">{t('companyAdmin.purchases.table.email')}</th>
                          <th className="px-4 py-3 font-semibold lg:px-5">{t('companyAdmin.purchases.table.status')}</th>
                          <th className="px-4 py-3 font-semibold lg:px-5">
                            {t('companyAdmin.purchases.table.accessLink')}
                          </th>
                          <th className="px-4 py-3 font-semibold lg:px-5">
                            {t('companyAdmin.purchases.table.actions')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchase.assignedEmployees.map((row) => (
                          <tr
                            key={row.enrollmentId}
                            className="border-t border-gray-100"
                          >
                            <td className="max-w-[140px] truncate px-4 py-3 text-sm text-[#222] lg:px-5">
                              {row.name || '—'}
                            </td>
                            <td className="max-w-[180px] truncate px-4 py-3 text-sm text-[#555] lg:px-5">
                              {row.email}
                            </td>
                            <td className="px-4 py-3 text-sm lg:px-5">
                              <StatusBadge used={row.accessLinkUsed} />
                            </td>
                            <td className="max-w-[240px] truncate px-4 py-3 text-xs text-[#73bfa1] lg:px-5">
                              {row.accessUrl || '—'}
                            </td>
                            <td className="px-4 py-3 lg:px-5">
                              <RowActions
                                row={row}
                                sendingId={sendingId}
                                onCopy={handleCopyLink}
                                onSend={handleSendEmail}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </section>
          ))}
        </div>
      )}

      <InviteModal
        open={Boolean(invitePurchase)}
        purchase={invitePurchase}
        onClose={() => setInvitePurchase(null)}
        onSuccess={loadPurchases}
      />
    </div>
  );
};

export default CompanyPurchasesView;
