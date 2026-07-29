import { ArrowLeft, Copy, Mail, Plus, Users } from 'lucide-react';
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
  return course.courseTitle.it || course.courseTitle.en || Object.values(course.courseTitle)[0];
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#143428]/60 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <h3 className="text-xl font-semibold text-[#1f1f1f]">Assegna corsista</h3>
        <p className="mt-1 text-sm text-[#666]">{getCourseTitle(purchase.course)}</p>

        <div className="mt-4 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email del corsista"
            className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nome"
            className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Cognome"
            className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? 'Invio...' : 'Invia link'}
          </button>
        </div>
      </form>
    </div>
  );
};

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
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-[#2f2f2f]"
      >
        <ArrowLeft size={18} />
        Indietro
      </button>

      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1f1f1f] md:text-3xl">
            Pacchetti aziendali acquistati
          </h1>
          <p className="mt-1 text-sm text-[#666]">
            Assegna link di accesso ai corsisti e monitora le utenze
          </p>
        </div>
      </header>

      {loading ? (
        <Loading size="md" className="min-h-40" />
      ) : purchases.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-[#666]">
          Nessun pacchetto acquistato. Acquista un corso aziendale dal catalogo.
        </div>
      ) : (
        <div className="space-y-6">
          {purchases.map((purchase) => (
            <section
              key={purchase.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-[#f3f7f5] px-5 py-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#1f1f1f]">
                    {getCourseTitle(purchase.course)}
                  </h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-[#666]">
                    <Users size={14} />
                    {purchase.seatsUsed}/{purchase.seatsTotal} posti usati
                    {purchase.daysRemaining > 0 && (
                      <span className="text-[#d48c21]">
                        · Scade tra {purchase.daysRemaining} giorni
                      </span>
                    )}
                  </p>
                </div>
                {purchase.seatsAvailable > 0 && !purchase.isExpired && (
                  <button
                    type="button"
                    onClick={() => setInvitePurchase(purchase)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
                  >
                    <Plus size={16} />
                    Assegna corsista
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="bg-[#fafafa] text-left text-sm text-[#444]">
                      <th className="px-5 py-3 font-semibold">Corsista</th>
                      <th className="px-5 py-3 font-semibold">Email</th>
                      <th className="px-5 py-3 font-semibold">Stato</th>
                      <th className="px-5 py-3 font-semibold">Link accesso</th>
                      <th className="px-5 py-3 font-semibold">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchase.assignedEmployees?.length ? (
                      purchase.assignedEmployees.map((row) => (
                        <tr key={row.enrollmentId} className="border-t border-gray-100">
                          <td className="px-5 py-3 text-sm text-[#222]">
                            {row.name || '—'}
                          </td>
                          <td className="px-5 py-3 text-sm text-[#555]">{row.email}</td>
                          <td className="px-5 py-3 text-sm">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                row.accessLinkUsed
                                  ? 'bg-[#e6f6ef] text-[#57a080]'
                                  : 'bg-[#fdf2df] text-[#e59a2b]'
                              }`}
                            >
                              {row.accessLinkUsed ? 'Attivato' : 'In attesa'}
                            </span>
                          </td>
                          <td className="max-w-[280px] truncate px-5 py-3 text-xs text-[#73bfa1]">
                            {row.accessUrl || '—'}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyLink(row.accessUrl)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9fd9c1] text-[#73bfa1]"
                                aria-label="Copia link"
                              >
                                <Copy size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSendEmail(row.enrollmentId)}
                                disabled={sendingId === row.enrollmentId}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#73bfa1] text-white disabled:opacity-50"
                                aria-label="Invia email"
                              >
                                <Mail size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-sm text-[#888]">
                          Nessun corsista assegnato. Clicca &quot;Assegna corsista&quot; per iniziare.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
