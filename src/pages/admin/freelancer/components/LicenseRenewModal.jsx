import { ArrowLeft, Check, Circle, CreditCard, Landmark } from 'lucide-react';
import { useState } from 'react';
import LicenseRenewTermsModal from './LicenseRenewTermsModal';

const licensePlans = [
    {
        id: 100,
        name: '1S Licenza 100',
        price: 'EUR365,00',
        users: 'Fino a 100 utenti',
    },
    {
        id: 300,
        name: '1S Licenza 300',
        price: 'EUR990,00',
        users: 'Fino a 300 utenti',
    },
    {
        id: 600,
        name: '1S Licenza 600',
        price: 'EUR1830,00',
        users: 'Fino a 600 utenti',
    },
];

const LicenseRenewModal = ({ open, onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState(100);
    const [termsChecked, setTermsChecked] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [termsModalOpen, setTermsModalOpen] = useState(false);

    if (!open) return null;

    return (
        <>
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
                        <h2 className="text-xl font-semibold leading-none text-[#2c2c2c]">Rinnova la tua licenza</h2>
                        <p className="mt-2 text-sm text-[#5d5d5d]">Ciao Henry. La tua licenza e scaduta. Rinnova la tua licenza!</p>
                    </section>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                        <section className="rounded-lg border border-[#ececec] bg-white p-4 sm:p-6">
                            <h3 className="mb-4 text-xl font-semibold text-[#2d2d2d]">1. Rinnova licenza</h3>
                            <div className="space-y-4">
                                {licensePlans.map((plan) => (
                                    <button
                                        key={plan.id}
                                        type="button"
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className="w-full rounded-lg border border-[#bde3d4] bg-[#f5fbf8] p-4 text-left"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-xl font-semibold text-[#2f2f2f]">{plan.name}</p>
                                                <p className="mt-1 text-2xl font-semibold text-[#2f2f2f]">{plan.price}<span className="ml-1 text-sm font-medium text-[#5f5f5f]">/ IVA inclusa</span></p>
                                            </div>
                                            <Circle size={14} className={selectedPlan === plan.id ? 'fill-[#73bfa1] text-[#73bfa1]' : 'text-[#9dcfba]'} />
                                        </div>
                                        <ul className="mt-3 space-y-1 text-sm text-[#5d5d5d]">
                                            <li className="flex items-center gap-2"><Check size={13} className="text-[#73bfa1]" /> {plan.users}</li>
                                            <li className="flex items-center gap-2"><Check size={13} className="text-[#73bfa1]" /> Accesso completo alla piattaforma</li>
                                            <li className="flex items-center gap-2"><Check size={13} className="text-[#73bfa1]" /> Supporto standard</li>
                                        </ul>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <aside className="rounded-lg border border-[#ececec] bg-white p-4 sm:p-5">
                            <h3 className="text-xl font-semibold leading-tight text-[#2c2c2c]">Riepilogo ordine d'acquisto</h3>
                            <div className="mt-4 space-y-3 text-sm text-[#3d3d3d]">
                                <p className="text-base font-semibold">1S Licenza 100</p>
                                <div className="grid grid-cols-2 gap-y-2 text-base">
                                    <p className="font-semibold">Ragione sociale</p><p>Ragione</p>
                                    <p className="font-semibold">Indirizzo</p><p>Indirizzo</p>
                                    <p className="font-semibold">Codice fiscale</p><p>codice fiscale</p>
                                    <p className="font-semibold">IVA 22%</p><p>EUR65</p>
                                </div>
                                <div className="border-t border-[#e5e5e5] pt-3">
                                    <div className="flex items-center justify-between text-sm font-semibold">
                                        <span>Totale da pagare</span>
                                        <span>EUR365,00</span>
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
                                    Sono d'accordo con i{' '}
                                    <button
                                        type="button"
                                        className="text-[#73bfa1] underline"
                                        onClick={() => setTermsModalOpen(true)}
                                    >
                                        Termini e condizioni di vendita e l'informativa privacy.
                                    </button>
                                </span>
                            </label>

                            <button
                                type="button"
                                className="mt-4 w-full rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white"
                                onClick={onClose}
                            >
                                Paga e rinnova
                            </button>
                        </aside>
                    </div>

                    <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                        <div className="rounded-lg border border-[#ececec] bg-white p-4 sm:p-6">
                            <h3 className="text-xl font-semibold text-[#2d2d2d]">2. Dati di fatturazione</h3>
                            <div className="mt-4 space-y-4 text-sm text-[#4f4f4f]">
                                <div><p className="text-base font-semibold text-[#2e2e2e]">Nome azienda</p><p>Mario Rossi S.r.l.</p></div>
                                <div><p className="text-base font-semibold text-[#2e2e2e]">Partita IVA</p><p>IT12345678901</p></div>
                                <div><p className="text-base font-semibold text-[#2e2e2e]">Indirizzo di fatturazione</p><p>Via Roma 1, Milano, 21100, Italia</p></div>
                                <button type="button" className="text-sm font-semibold text-[#73bfa1]">Modifica i dati di fatturazione</button>
                            </div>
                        </div>
                        <div />
                    </section>

                    <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                        <div className="rounded-lg border border-[#ececec] bg-white p-4 sm:p-6">
                            <h3 className="text-xl font-semibold text-[#2d2d2d]">Seleziona metodo di pagamento</h3>
                            <div className="mt-4 flex flex-wrap gap-3 text-sm">
                                <button type="button" onClick={() => setPaymentMethod('card')} className={`rounded-md border px-3 py-1.5 ${paymentMethod === 'card' ? 'border-[#9bd8bf] bg-[#f1fbf7] text-[#73bfa1]' : 'border-[#dbdbdb] bg-white text-[#535353]'}`}><span className="inline-flex items-center gap-2"><CreditCard size={14} /> Carta di credito/debito</span></button>
                                <button type="button" onClick={() => setPaymentMethod('apple')} className={`rounded-md border px-3 py-1.5 ${paymentMethod === 'apple' ? 'border-[#9bd8bf] bg-[#f1fbf7] text-[#73bfa1]' : 'border-[#dbdbdb] bg-white text-[#535353]'}`}>Apple Pay</button>
                                <button type="button" onClick={() => setPaymentMethod('gpay')} className={`rounded-md border px-3 py-1.5 ${paymentMethod === 'gpay' ? 'border-[#9bd8bf] bg-[#f1fbf7] text-[#73bfa1]' : 'border-[#dbdbdb] bg-white text-[#535353]'}`}>G Pay</button>
                                <button type="button" onClick={() => setPaymentMethod('bank')} className={`rounded-md border px-3 py-1.5 ${paymentMethod === 'bank' ? 'border-[#9bd8bf] bg-[#f1fbf7] text-[#73bfa1]' : 'border-[#dbdbdb] bg-white text-[#535353]'}`}><span className="inline-flex items-center gap-2"><Landmark size={14} /> Bonifico bancario</span></button>
                            </div>

                            <div className="mt-4 space-y-4 text-sm text-[#4f4f4f]">
                                <div><p className="text-base font-semibold text-[#2e2e2e]">Partita IVA</p><p>IT12345678901</p></div>
                                <div><p className="text-base font-semibold text-[#2e2e2e]">Indirizzo</p><p>Via Roma 1, Milano, 21100, Italia</p></div>
                                <button type="button" className="text-sm font-semibold text-[#73bfa1]">Modifica i dati di fatturazione</button>
                            </div>
                        </div>
                        <div />
                    </section>
                </div>
            </div>

            <LicenseRenewTermsModal open={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
        </>
    );
};

export default LicenseRenewModal;