import { ArrowLeft, Check, Circle, CreditCard, Landmark } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import LicenseRenewTermsModal from './LicenseRenewTermsModal';
import {
  useCreateLicenseRenewalCheckoutMutation,
  useGetMyLicenseDetailQuery,
  useGetPublicLicensePlansQuery,
} from '../../../../../features/api/licenseUserApi';
import { getUserDisplayName } from '../../../../../features/api/licenseUserMappers';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import Loading from '../../../../../components/ui/Utilities/Loading';
import { Toast, useToast } from '../../../../../components/ui';

const formatPrice = (amount) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount ?? 0);

const LicenseRenewModal = ({ open, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const displayName = getUserDisplayName(user);
  const { toasts, addToast, removeToast } = useToast();

  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const { data: plans = [], isLoading: plansLoading } = useGetPublicLicensePlansQuery(
    undefined,
    { skip: !open },
  );
  const { data: licenseDetail, isLoading: detailLoading } = useGetMyLicenseDetailQuery(
    undefined,
    { skip: !open },
  );
  const [createRenewalCheckout, { isLoading: checkoutLoading }] =
    useCreateLicenseRenewalCheckoutMutation();

  useEffect(() => {
    if (plans.length > 0 && !selectedPlanId) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlanId]);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0] ?? null,
    [plans, selectedPlanId],
  );

  const vatAmount = useMemo(() => {
    const base = selectedPlan?.priceYearly ?? 0;
    return Math.round(base * 0.22);
  }, [selectedPlan]);

  const handleCheckout = async () => {
    if (!termsChecked) {
      addToast('Devi accettare i termini e condizioni', 'error');
      return;
    }

    if (!selectedPlan?.id) {
      addToast('Seleziona un piano di licenza', 'error');
      return;
    }

    try {
      const result = await createRenewalCheckout({
        planId: selectedPlan.id,
        billingCycle: 'YEARLY',
        licenseId: licenseDetail?.id,
      }).unwrap();

      if (result?.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }

      addToast('Checkout avviato con successo', 'success');
      onClose?.();
    } catch (checkoutError) {
      addToast(getRtkErrorMessage(checkoutError), 'error');
    }
  };

  if (!open) return null;

  const isLoading = plansLoading || detailLoading;

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <div className="fixed inset-0 z-40 overflow-y-auto bg-[#101010]/35 p-3 sm:p-6">
        <div className="mx-auto max-w-[1240px] rounded-xl bg-[#f6f6f6] p-4 sm:p-6 lg:p-8">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={onClose} className="inline-flex items-center text-[#2f2f2f]">
              <ArrowLeft size={17} />
            </button>
            <p className="text-[14px] font-semibold text-[#73bfa1]">Gateway di pagamento sicuro</p>
            <span className="w-[18px]" />
          </div>

          <section className="mb-6 rounded-lg bg-white p-4 sm:p-6">
            <h2 className="text-xl leading-none font-semibold text-[#2c2c2c]">
              Rinnova la tua licenza
            </h2>
            <p className="mt-2 text-sm text-[#5d5d5d]">
              Ciao {displayName.split(',')[1]?.trim() || displayName}. La tua licenza è scaduta.
              Rinnova la tua licenza!
            </p>
          </section>

          {isLoading ? (
            <Loading size="md" className="min-h-60" />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <section className="rounded-lg border border-[#ececec] bg-white p-4 sm:p-6">
                  <h3 className="mb-4 text-xl font-semibold text-[#2d2d2d]">1. Rinnova licenza</h3>
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlanId(plan.id)}
                        className="w-full rounded-lg border border-[#bde3d4] bg-[#f5fbf8] p-4 text-left"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xl font-semibold text-[#2f2f2f]">{plan.name}</p>
                            <p className="mt-1 text-2xl font-semibold text-[#2f2f2f]">
                              {formatPrice(plan.priceYearly)}
                              <span className="ml-1 text-sm font-medium text-[#5f5f5f]">
                                / IVA inclusa
                              </span>
                            </p>
                          </div>
                          <Circle
                            size={14}
                            className={
                              selectedPlanId === plan.id
                                ? 'fill-[#73bfa1] text-[#73bfa1]'
                                : 'text-[#9dcfba]'
                            }
                          />
                        </div>
                        <ul className="mt-3 space-y-1 text-sm text-[#5d5d5d]">
                          <li className="flex items-center gap-2">
                            <Check size={13} className="text-[#73bfa1]" />
                            Fino a {plan.maxUsers} utenti
                          </li>
                          {(plan.features ?? []).slice(0, 2).map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <Check size={13} className="text-[#73bfa1]" />
                              {feature}
                            </li>
                          ))}
                          <li className="flex items-center gap-2">
                            <Check size={13} className="text-[#73bfa1]" />
                            {plan.supportLevel || 'Supporto standard'}
                          </li>
                        </ul>
                      </button>
                    ))}
                  </div>
                </section>

                <aside className="rounded-lg border border-[#ececec] bg-white p-4 sm:p-5">
                  <h3 className="text-xl leading-tight font-semibold text-[#2c2c2c]">
                    Riepilogo ordine d&apos;acquisto
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-[#3d3d3d]">
                    <p className="text-base font-semibold">{selectedPlan?.name}</p>
                    <div className="grid grid-cols-2 gap-y-2 text-base">
                      <p className="font-semibold">Ragione sociale</p>
                      <p>{licenseDetail?.companyName || '—'}</p>
                      <p className="font-semibold">Partita IVA</p>
                      <p>{licenseDetail?.vatNumber || '—'}</p>
                      <p className="font-semibold">IVA 22%</p>
                      <p>{formatPrice(vatAmount)}</p>
                    </div>
                    <div className="border-t border-[#e5e5e5] pt-3">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>Totale da pagare</span>
                        <span>{formatPrice(selectedPlan?.priceYearly)}</span>
                      </div>
                    </div>
                  </div>

                  <label className="mt-4 flex items-start gap-2 text-[13px] text-[#595959]">
                    <input
                      type="checkbox"
                      checked={termsChecked}
                      onChange={(event) => setTermsChecked(event.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 accent-[#73bfa1]"
                    />
                    <span>
                      Sono d&apos;accordo con i{' '}
                      <button
                        type="button"
                        className="text-[#73bfa1] underline"
                        onClick={() => setTermsModalOpen(true)}
                      >
                        Termini e condizioni di vendita e l&apos;informativa privacy.
                      </button>
                    </span>
                  </label>

                  <button
                    type="button"
                    className="mt-4 w-full rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? 'Reindirizzamento...' : 'Paga e rinnova'}
                  </button>
                </aside>
              </div>

              <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <div className="rounded-lg border border-[#ececec] bg-white p-4 sm:p-6">
                  <h3 className="text-xl font-semibold text-[#2d2d2d]">2. Dati di fatturazione</h3>
                  <div className="mt-4 space-y-4 text-sm text-[#4f4f4f]">
                    <div>
                      <p className="text-base font-semibold text-[#2e2e2e]">Nome azienda</p>
                      <p>{licenseDetail?.companyName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#2e2e2e]">Partita IVA</p>
                      <p>{licenseDetail?.vatNumber || '—'}</p>
                    </div>
                  </div>
                </div>
                <div />
              </section>

              <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <div className="rounded-lg border border-[#ececec] bg-white p-4 sm:p-6">
                  <h3 className="text-xl font-semibold text-[#2d2d2d]">
                    Seleziona metodo di pagamento
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    {[
                      { key: 'card', label: 'Carta di credito/debito', icon: CreditCard },
                      { key: 'apple', label: 'Apple Pay' },
                      { key: 'gpay', label: 'G Pay' },
                      { key: 'bank', label: 'Bonifico bancario', icon: Landmark },
                    ].map((method) => (
                      <button
                        key={method.key}
                        type="button"
                        onClick={() => setPaymentMethod(method.key)}
                        className={`rounded-md border px-3 py-1.5 ${
                          paymentMethod === method.key
                            ? 'border-[#9bd8bf] bg-[#f1fbf7] text-[#73bfa1]'
                            : 'border-[#dbdbdb] bg-white text-[#535353]'
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          {method.icon ? <method.icon size={14} /> : null}
                          {method.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div />
              </section>
            </>
          )}
        </div>
      </div>

      <LicenseRenewTermsModal open={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
    </>
  );
};

export default LicenseRenewModal;
