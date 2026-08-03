import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../../components/ui/Utilities/Loading';
import {
  getAccessLinkInfoService,
  redeemAccessLinkService,
} from '../../features/enrollment/enrollmentAccessService';

const getCourseTitle = (course) => {
  if (!course?.courseTitle) return 'Corso';
  if (typeof course.courseTitle === 'string') return course.courseTitle;
  return course.courseTitle.it || course.courseTitle.en || Object.values(course.courseTitle)[0];
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-1 block text-sm font-semibold text-[#313131]">{label}</span>
    {children}
  </label>
);

const AccessLinkRedemptionView = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    taxCode: '',
    address: '',
    companyName: '',
    companyAddress: '',
    companyTaxId: '',
    companyVatNumber: '',
  });

  useEffect(() => {
    if (!token) return;
    getAccessLinkInfoService(token)
      .then((data) => {
        setInfo(data);
        setForm((prev) => ({
          ...prev,
          firstName: data?.user?.firstName || '',
          lastName: data?.user?.lastName || '',
          birthDate: data?.user?.birthDate
            ? new Date(data.user.birthDate).toISOString().split('T')[0]
            : '',
          birthPlace: data?.user?.birthPlace || '',
          taxCode: data?.user?.taxCode || '',
          address: data?.user?.address || '',
          companyName: data?.company?.name || '',
          companyAddress: data?.company?.fiscalAddress || '',
          companyTaxId: data?.company?.fiscalCode || '',
          companyVatNumber: data?.company?.vatNumber || '',
        }));
      })
      .catch((error) => {
        toast.error(error?.message || 'Link non valido');
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const result = await redeemAccessLinkService(token, form);
      toast.success('Profilo completato. Ora puoi accedere al corso.');
      navigate('/auth/login', {
        state: {
          email: result?.email,
          redirectTo: result?.courseUrl,
        },
      });
    } catch (error) {
      toast.error(error?.message || 'Attivazione non riuscita');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading size="md" className="min-h-screen" />;
  }

  if (!info) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f7f5] p-6">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#1f1f1f]">Link non valido</h1>
          <p className="mt-2 text-sm text-[#666]">
            Il link di accesso non esiste o è scaduto.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    );
  }

  if (info.isExpired) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f7f5] p-6">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#1f1f1f]">Link scaduto</h1>
          <p className="mt-2 text-sm text-[#666]">
            Contatta il tuo amministratore aziendale per un nuovo link.
          </p>
        </div>
      </div>
    );
  }

  if (info.accessLinkUsed && !info.requiresProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f7f5] p-6">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#1f1f1f]">Link già utilizzato</h1>
          <p className="mt-2 text-sm text-[#666]">
            Questo link è già stato attivato. Accedi con le tue credenziali.
          </p>
          <Link
            to="/auth/login"
            className="mt-6 inline-block rounded-full bg-[#73bfa1] px-6 py-2 text-sm font-semibold text-white"
          >
            Vai al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f7f5] px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#1f1f1f] md:text-3xl">
            Attivazione corso
          </h1>
          <p className="mt-2 text-sm text-[#666]">
            {getCourseTitle(info.course)}
          </p>
          {info.company?.name && (
            <p className="mt-1 text-sm font-medium text-[#73bfa1]">
              Azienda: {info.company.name}
            </p>
          )}
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Nome *">
              <input
                required
                value={form.firstName}
                onChange={handleChange('firstName')}
                className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
              />
            </Field>
            <Field label="Cognome *">
              <input
                required
                value={form.lastName}
                onChange={handleChange('lastName')}
                className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
              />
            </Field>
            <Field label="Data di nascita *">
              <input
                required
                type="date"
                value={form.birthDate}
                onChange={handleChange('birthDate')}
                className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
              />
            </Field>
            <Field label="Luogo di nascita">
              <input
                value={form.birthPlace}
                onChange={handleChange('birthPlace')}
                className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
              />
            </Field>
            <Field label="Codice fiscale *">
              <input
                required
                value={form.taxCode}
                onChange={handleChange('taxCode')}
                className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
              />
            </Field>
            <Field label="Indirizzo residenza fiscale *">
              <input
                required
                value={form.address}
                onChange={handleChange('address')}
                className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm"
              />
            </Field>
          </div>

          {info.company && (
            <section className="rounded-xl bg-[#f6f6f6] p-4">
              <h2 className="mb-3 text-lg font-semibold text-[#222]">
                Dati azienda (per attestato)
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Nome società">
                  <input
                    value={form.companyName}
                    onChange={handleChange('companyName')}
                    className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm"
                  />
                </Field>
                <Field label="Partita IVA">
                  <input
                    value={form.companyVatNumber}
                    onChange={handleChange('companyVatNumber')}
                    className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm"
                  />
                </Field>
                <Field label="Codice fiscale azienda">
                  <input
                    value={form.companyTaxId}
                    onChange={handleChange('companyTaxId')}
                    className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm"
                  />
                </Field>
                <Field label="Indirizzo fiscale azienda">
                  <input
                    value={form.companyAddress}
                    onChange={handleChange('companyAddress')}
                    className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm"
                  />
                </Field>
              </div>
            </section>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[#73bfa1] py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {submitting ? 'Attivazione...' : 'Completa profilo e attiva corso'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccessLinkRedemptionView;
