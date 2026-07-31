import { ArrowLeft, Copy, Mail, Plus, Users, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../../../../components/ui/Utilities/Loading';
import {
  getCompanyPurchasesService,
  inviteEmployeeToPurchaseService,
  sendAccessLinkService,
} from '../../../../features/company/companyPurchaseService';

const getCourseTitle = (course) => {
  if (!course?.courseTitle) return 'Corso';
  if (typeof course.courseTitle === 'string') return course.courseTitle;
  return (
    course.courseTitle.it ||
    course.courseTitle.en ||
    Object.values(course.courseTitle)[0]
  );
};

const InviteModal = ({ open, purchase, onClose, onSuccess }) => {
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
      toast.success('Dipendente invitato e link di accesso inviato');
      onSuccess?.();
      onClose();
      setEmail('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      toast.error(error?.message || 'Invito non riuscito');
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
      aria-label="Assegna corsista"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-h-[90vh] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-[#1f1f1f] sm:text-lg">
              Assegna corsista
            </h3>
            <p className="mt-0.5 truncate text-sm text-[#666]">
              {getCourseTitle(purchase.course)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100"
            aria-label="Chiudi"
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
            placeholder="Email del corsista"
            className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#73bfa1]"
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nome"
            className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#73bfa1]"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Cognome"
            className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#73bfa1]"
          />
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-100 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-full border border-gray-300 px-5 text-sm font-medium"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? 'Invio...' : 'Invia link'}
          </button>
        </div>
      </form>
    </div>
  );
};

const StatusBadge = ({ used }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
      used ? 'bg-[#e6f6ef] text-[#57a080]' : 'bg-[#fdf2df] text-[#e59a2b]'
    }`}
  >
    {used ? 'Attivato' : 'In attesa'}
  </span>
);

const RowActions = ({ row, sendingId, onCopy, onSend }) => (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => onCopy(row.accessUrl)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9fd9c1] text-[#73bfa1]"
      aria-label="Copia link"
    >
      <Copy size={14} />
    </button>
    <button
      type="button"
      onClick={() => onSend(row.enrollmentId)}
      disabled={sendingId === row.enrollmentId}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#73bfa1] text-white disabled:opacity-50"
      aria-label="Invia email"
    >
      <Mail size={14} />
    </button>
  </div>
);

const CompanyPurchasesView = () => {
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
      toast.error(error?.message || 'Impossibile caricare i pacchetti');
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPurchases();
  }, [loadPurchases]);

  const handleCopyLink = async (url) => {
    if (!url) {
      toast.error('Link non disponibile');
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copiato negli appunti');
    } catch {
      toast.error('Impossibile copiare il link');
    }
  };

  const handleSendEmail = async (enrollmentId) => {
    try {
      setSendingId(enrollmentId);
      await sendAccessLinkService(enrollmentId);
      toast.success('Email di accesso inviata');
    } catch (error) {
      toast.error(error?.message || 'Invio email non riuscito');
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
        Indietro
      </button>

      <header className="mb-4 sm:mb-6">
        <h1 className="text-base font-semibold text-[#1f1f1f] sm:text-lg md:text-xl">
          Pacchetti aziendali acquistati
        </h1>
        <p className="mt-1 text-xs text-[#666] sm:text-sm">
          Assegna link di accesso ai corsisti e monitora le utenze
        </p>
      </header>

      {loading ? (
        <Loading size="md" className="min-h-40" />
      ) : purchases.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-[#666] sm:rounded-2xl sm:p-10">
          Nessun pacchetto acquistato. Acquista un corso aziendale dal catalogo.
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
                    {getCourseTitle(purchase.course)}
                  </h2>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#666] sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} />
                      {purchase.seatsUsed}/{purchase.seatsTotal} posti usati
                    </span>
                    {purchase.daysRemaining > 0 ? (
                      <span className="text-[#d48c21]">
                        · Scade tra {purchase.daysRemaining} giorni
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
                    Assegna corsista
                  </button>
                ) : null}
              </div>

              {!purchase.assignedEmployees?.length ? (
                <p className="px-4 py-8 text-center text-sm text-[#888] sm:px-5">
                  Nessun corsista assegnato. Clicca &quot;Assegna corsista&quot; per
                  iniziare.
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
                          <p className="mb-1 text-xs text-gray-500">Link accesso</p>
                          <p className="truncate text-xs text-[#73bfa1]">
                            {row.accessUrl || '—'}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="text-xs text-gray-400">Azioni</span>
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
                            Corsista
                          </th>
                          <th className="px-4 py-3 font-semibold lg:px-5">Email</th>
                          <th className="px-4 py-3 font-semibold lg:px-5">Stato</th>
                          <th className="px-4 py-3 font-semibold lg:px-5">
                            Link accesso
                          </th>
                          <th className="px-4 py-3 font-semibold lg:px-5">
                            Azioni
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
