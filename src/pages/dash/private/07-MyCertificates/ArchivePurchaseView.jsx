import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa';
import CheckoutStripeForm from '../../../../components/payment/CheckoutStripeForm';
import Loading from '../../../../components/ui/Utilities/Loading';
import { ROUTES } from '../../../../config/routes';
import {
  createArchivePaymentIntentService,
  getArchivePlanService,
  verifyArchivePaymentIntentService,
} from '../../../../features/archive/archiveService';
import { formatEuro } from '../../../../utils/courseMedia';

const ArchivePurchaseView = () => {
  const navigate = useNavigate();
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
  const hasActiveSubscription = planData?.hasArchiveAccess || subscription?.isActive;

  const amountLabel = useMemo(
    () => formatEuro(Number(plan?.priceEur || 0)),
    [plan?.priceEur],
  );

  useEffect(() => {
    if (loading || hasActiveSubscription || !plan?.enabled || intentRequestRef.current) {
      return;
    }

    intentRequestRef.current = true;
    setCreatingIntent(true);

    createArchivePaymentIntentService()
      .then((result) => {
        const payload = result?.data ?? result;
        setPaymentIntent({
          clientSecret: payload?.clientSecret || payload?.paymentIntent?.client_secret,
        });
      })
      .catch((error) => {
        toast.error(error?.message || 'Impossibile avviare il pagamento');
      })
      .finally(() => setCreatingIntent(false));
  }, [loading, hasActiveSubscription, plan?.enabled]);

  const handlePaymentSuccess = async (paymentIntent) => {
    setVerifying(true);
    try {
      const paymentIntentId = paymentIntent?.id || paymentIntent;
      await verifyArchivePaymentIntentService(paymentIntentId);
      toast.success('Archivio cloud attivato con successo');
      navigate(`${ROUTES.PRIVATE_USER.CERTIFICATES}?archive=activated`);
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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F9F6]"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-bold text-[#1f1f1f] md:text-3xl">
          Archivio attestati cloud
        </h1>
        <p className="mt-2 text-sm text-[#666]">
          Conserva e scarica i tuoi attestati oltre i 30 giorni gratuiti.
          I documenti restano archiviati sui nostri server per 5 anni (conformità normativa).
        </p>

        {hasActiveSubscription ? (
          <div className="mt-6 rounded-xl bg-[#e6f6ef] px-5 py-4 text-[#2d5f49]">
            <p className="font-semibold">Archivio attivo</p>
            <p className="mt-1 text-sm">
              Il tuo abbonamento è valido fino al{' '}
              {subscription?.expiresAt
                ? new Date(subscription.expiresAt).toLocaleDateString('it-IT')
                : '—'}
            </p>
            <Link
              to={ROUTES.PRIVATE_USER.CERTIFICATES}
              className="mt-4 inline-block rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
            >
              Vai ai certificati
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 rounded-xl bg-[#f3f7f5] p-5">
              <h2 className="text-lg font-semibold text-[#222]">
                {plan?.name || 'Piano archivio annuale'}
              </h2>
              <p className="mt-2 text-sm text-[#555]">
                {plan?.description ||
                  `Accesso illimitato al download degli attestati per ${plan?.durationDays || 365} giorni.`}
              </p>
              <p className="mt-4 text-3xl font-bold text-[#73bfa1]">{amountLabel}</p>
              <p className="text-sm text-[#888]">
                Spazio: {plan?.storageMb || 1024} MB · Durata: {plan?.durationDays || 365} giorni
              </p>
            </div>

            {creatingIntent ? (
              <Loading size="sm" className="mt-6 min-h-24" />
            ) : paymentIntent?.clientSecret ? (
              <div className="mt-6">
                <CheckoutStripeForm
                  clientSecret={paymentIntent.clientSecret}
                  amount={Number(plan?.priceEur || 0)}
                  currency={plan?.currency || 'EUR'}
                  onSuccess={handlePaymentSuccess}
                  submitting={verifying}
                />
              </div>
            ) : (
              <p className="mt-6 text-sm text-red-600">
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
