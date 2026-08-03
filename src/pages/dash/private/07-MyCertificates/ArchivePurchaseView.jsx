import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa';
import CheckoutStripeForm from '../../../../components/payment/CheckoutStripeForm';
import Loading from '../../../../components/ui/Utilities/Loading';
import {
  createArchivePaymentIntentService,
  getArchivePlanService,
  verifyArchivePaymentIntentService,
} from '../../../../features/archive/archiveService';
import { resolveArchiveRoutes } from '../../../../features/archive/archiveRoutes';
import { formatEuro } from '../../../../utils/courseMedia';

const ArchivePurchaseView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { certificates: certificatesRoute } = useMemo(
    () => resolveArchiveRoutes(location.pathname),
    [location.pathname],
  );
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [creatingIntent, setCreatingIntent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const intentRequestRef = useRef(false);

  const loadPlan = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArchivePlanService();
      setPlanData(data);
    } catch (error) {
      toast.error(error?.message || 'Impossibile caricare il piano archivio');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlan();
  }, [loadPlan]);

  const plan = planData?.plan;
  const subscription = planData?.subscription;
  const hasActiveSubscription =
    planData?.hasArchiveAccess || subscription?.isActive;

  const amountLabel = useMemo(
    () => formatEuro(Number(plan?.priceEur || 0)),
    [plan?.priceEur],
  );

  useEffect(() => {
    if (
      loading ||
      hasActiveSubscription ||
      !plan?.enabled ||
      intentRequestRef.current
    ) {
      return;
    }

    intentRequestRef.current = true;
    setCreatingIntent(true);

    createArchivePaymentIntentService()
      .then((result) => {
        const payload = result?.data ?? result;
        setPaymentIntent({
          clientSecret:
            payload?.clientSecret || payload?.paymentIntent?.client_secret,
        });
      })
      .catch((error) => {
        toast.error(error?.message || 'Impossibile avviare il pagamento');
      })
      .finally(() => setCreatingIntent(false));
  }, [loading, hasActiveSubscription, plan?.enabled]);

  const handlePaymentSuccess = async (intent) => {
    setVerifying(true);
    try {
      const paymentIntentId = intent?.id || intent;
      await verifyArchivePaymentIntentService(paymentIntentId);
      toast.success('Archivio cloud attivato con successo');
      navigate(`${certificatesRoute}?archive=activated`);
    } catch (error) {
      toast.error(error?.message || 'Verifica pagamento non riuscita');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return <Loading size="md" className="min-h-60" />;
  }

  return (
    <div className="mx-auto min-w-0 w-full max-w-2xl space-y-4 sm:space-y-5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Torna indietro"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F9F6] hover:bg-[#e5f3ed]"
      >
        <FaChevronLeft className="text-sm text-gray-600" />
      </button>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 md:p-6">
        <h1 className="text-base font-semibold text-[#1f1f1f] sm:text-lg md:text-xl">
          Archivio attestati cloud
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#666]">
          Conserva e scarica i tuoi attestati oltre i 30 giorni gratuiti. I
          documenti restano archiviati sui nostri server per 5 anni (conformità
          normativa).
        </p>

        {hasActiveSubscription ? (
          <div className="mt-5 rounded-xl bg-[#e6f6ef] px-4 py-4 text-[#2d5f49] sm:mt-6 sm:px-5">
            <p className="text-sm font-semibold sm:text-base">Archivio attivo</p>
            <p className="mt-1 text-sm">
              Il tuo abbonamento è valido fino al{' '}
              {subscription?.expiresAt
                ? new Date(subscription.expiresAt).toLocaleDateString('it-IT')
                : '—'}
            </p>
            <Link
              to={certificatesRoute}
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-semibold text-white hover:bg-[#63a88c] sm:w-auto"
            >
              Vai ai certificati
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-5 rounded-xl bg-[#f3f7f5] p-4 sm:mt-6 sm:p-5">
              <h2 className="text-sm font-semibold text-[#222] sm:text-base">
                {plan?.name || 'Piano archivio annuale'}
              </h2>
              <p className="mt-2 text-sm text-[#555]">
                {plan?.description ||
                  `Accesso illimitato al download degli attestati per ${plan?.durationDays || 365} giorni.`}
              </p>
              <p className="mt-4 text-2xl font-bold text-[#73bfa1] sm:text-3xl">
                {amountLabel}
              </p>
              <p className="mt-1 text-xs text-[#888] sm:text-sm">
                Spazio: {plan?.storageMb || 1024} MB · Durata:{' '}
                {plan?.durationDays || 365} giorni
              </p>
            </div>

            {creatingIntent ? (
              <Loading size="sm" className="mt-6 min-h-24" />
            ) : paymentIntent?.clientSecret ? (
              <div className="mt-5 min-w-0 sm:mt-6">
                <CheckoutStripeForm
                  clientSecret={paymentIntent.clientSecret}
                  amount={Number(plan?.priceEur || 0)}
                  currency={plan?.currency || 'EUR'}
                  onSuccess={handlePaymentSuccess}
                  submitting={verifying}
                />
              </div>
            ) : (
              <p className="mt-5 text-sm text-red-600 sm:mt-6">
                Pagamento non disponibile al momento.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArchivePurchaseView;
