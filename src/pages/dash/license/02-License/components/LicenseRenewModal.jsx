import { ArrowLeft, Check, Circle, CreditCard, Landmark } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
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

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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

  const modalContent = (
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

      <div
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Rinnova licenza"
      >
        <div
          className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-[#f6f6f6] shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-5 sm:py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-[#2f2f2f] hover:bg-gray-100"
              aria-label="Chiudi"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="min-w-0 flex-1 text-center">
              <h2 className="text-base font-semibold text-[#2c2c2c] sm:text-lg">
                Rinnova la tua licenza
              </h2>
              <p className="text-xs font-medium text-[#73bfa1] sm:text-sm">
                Gateway di pagamento sicuro
              </p>
            </div>
            <div className="w-9" />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 md:p-6">
            <section className="mb-4 rounded-xl bg-white p-4 sm:mb-5 sm:p-5">
              <p className="text-sm text-[#5d5d5d]">
                Ciao {displayName.split(',')[1]?.trim() || displayName}. La tua
                licenza è scaduta. Rinnova la tua licenza!
              </p>
            </section>

            {isLoading ? (
              <Loading size="md" className="min-h-40" />
            ) : (
              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px] lg:gap-5">
                  <section className="rounded-xl border border-[#ececec] bg-white p-4 sm:p-5">
                    <h3 className="mb-3 text-sm font-semibold text-[#2d2d2d] sm:mb-4 sm:text-base">
                      1. Rinnova licenza
                    </h3>
                    <div className="space-y-3">
                      {plans.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`w-full rounded-xl border p-3 text-left sm:p-4 ${
                            selectedPlanId === plan.id
                              ? 'border-[#73bfa1] bg-[#f5fbf8]'
                              : 'border-[#bde3d4] bg-[#f5fbf8]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-[#2f2f2f] sm:text-base">
                                {plan.name}
                              </p>
                              <p className="mt-1 text-base font-semibold text-[#2f2f2f] sm:text-lg">
                                {formatPrice(plan.priceYearly)}
                                <span className="ml-1 text-xs font-medium text-[#5f5f5f] sm:text-sm">
                                  / IVA inclusa
                                </span>
                              </p>
                            </div>
                            <Circle
                              size={14}
                              className={`mt-1 shrink-0 ${
                                selectedPlanId === plan.id
                                  ? 'fill-[#73bfa1] text-[#73bfa1]'
                                  : 'text-[#9dcfba]'
                              }`}
                            />
                          </div>
                          <ul className="mt-2 space-y-1 text-xs text-[#5d5d5d] sm:mt-3 sm:text-sm">
                            <li className="flex items-center gap-2">
                              <Check size={13} className="shrink-0 text-[#73bfa1]" />
                              Fino a {plan.maxUsers} utenti
                            </li>
                            {(plan.features ?? []).slice(0, 2).map((feature) => (
                              <li key={feature} className="flex items-center gap-2">
                                <Check size={13} className="shrink-0 text-[#73bfa1]" />
                                <span className="min-w-0 break-words">{feature}</span>
                              </li>
                            ))}
                            <li className="flex items-center gap-2">
                              <Check size={13} className="shrink-0 text-[#73bfa1]" />
                              {plan.supportLevel || 'Supporto standard'}
                            </li>
                          </ul>
                        </button>
                      ))}
                    </div>
                  </section>

                  <aside className="rounded-xl border border-[#ececec] bg-white p-4 sm:p-5">
                    <h3 className="text-sm font-semibold text-[#2c2c2c] sm:text-base">
                      Riepilogo ordine d&apos;acquisto
                    </h3>
                    <div className="mt-3 space-y-2 text-sm text-[#3d3d3d] sm:mt-4">
                      <p className="font-semibold">{selectedPlan?.name}</p>
                      <div className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm">
                        <p className="font-medium">Ragione sociale</p>
                        <p className="break-words text-right">
                          {licenseDetail?.companyName || '—'}
                        </p>
                        <p className="font-medium">Partita IVA</p>
                        <p className="break-all text-right">
                          {licenseDetail?.vatNumber || '—'}
                        </p>
                        <p className="font-medium">IVA 22%</p>
                        <p className="text-right">{formatPrice(vatAmount)}</p>
                      </div>
                      <div className="border-t border-[#e5e5e5] pt-3">
                        <div className="flex items-center justify-between text-sm font-semibold">
                          <span>Totale da pagare</span>
                          <span>{formatPrice(selectedPlan?.priceYearly)}</span>
                        </div>
                      </div>
                    </div>

                    <label className="mt-4 flex items-start gap-2 text-xs text-[#595959] sm:text-sm">
                      <input
                        type="checkbox"
                        checked={termsChecked}
                        onChange={(event) => setTermsChecked(event.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#73bfa1]"
                      />
                      <span>
                        Sono d&apos;accordo con i{' '}
                        <button
                          type="button"
                          className="text-[#73bfa1] underline"
                          onClick={() => setTermsModalOpen(true)}
                        >
                          Termini e condizioni di vendita e l&apos;informativa
                          privacy.
                        </button>
                      </span>
                    </label>

                    <button
                      type="button"
                      className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? 'Reindirizzamento...' : 'Paga e rinnova'}
                    </button>
                  </aside>
                </div>

                <section className="rounded-xl border border-[#ececec] bg-white p-4 sm:p-5">
                  <h3 className="text-sm font-semibold text-[#2d2d2d] sm:text-base">
                    2. Dati di fatturazione
                  </h3>
                  <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-[#4f4f4f] sm:mt-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold text-[#2e2e2e] sm:text-sm">
                        Nome azienda
                      </p>
                      <p className="break-words">{licenseDetail?.companyName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#2e2e2e] sm:text-sm">
                        Partita IVA
                      </p>
                      <p className="break-all">{licenseDetail?.vatNumber || '—'}</p>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-[#ececec] bg-white p-4 sm:p-5">
                  <h3 className="text-sm font-semibold text-[#2d2d2d] sm:text-base">
                    Seleziona metodo di pagamento
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-3">
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
                        className={`inline-flex h-9 items-center rounded-lg border px-3 text-xs sm:text-sm ${
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
                </section>
              </div>
            )}
          </div>
        </div>
      </div>

      <LicenseRenewTermsModal
        open={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </>
  );

  return createPortal(modalContent, document.body);
};

export default LicenseRenewModal;
