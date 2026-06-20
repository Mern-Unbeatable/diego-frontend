import { X, CheckCircle } from 'lucide-react';

const PricingCardsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 transition z-20"
                >
                    <X className="h-5 w-5 text-gray-600" />
                </button>

                <div className="w-full max-w-4xl mx-auto">
                    <p className="mb-8 text-gray-700">Frame 1281154065</p>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Single Course Card */}
                        <div className="rounded-lg bg-white p-8 shadow-lg border border-gray-200">
                            <h3 className="mb-3 text-xl font-bold text-gray-800">Corso singolo</h3>
                            <p className="mb-8 text-sm text-gray-600">
                                Ottimo per chi vuole accedere e frequentare individualmente
                            </p>

                            <div className="mb-6 text-3xl font-bold text-gray-800">€20</div>

                            <div className="mb-8 space-y-3">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-sm text-gray-700">1 utente</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-sm text-gray-700">Accesso completo al corso</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-sm text-gray-700">Possibilità di scaricare l'attestato</span>
                                </div>
                            </div>

                            <a href="/training/course/checkout">
                                <button className="w-full rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition">
                                    Seleziona
                                </button>
                            </a>
                        </div>

                        {/* Company Package Card */}
                        <div className="rounded-lg bg-white p-8 shadow-lg border border-gray-200">
                            <h3 className="mb-2 text-xl font-bold text-gray-800">Pacchetto Aziendale</h3>
                            <p className="mb-2 text-sm text-gray-600">
                                Soluzione per supportare le aziende nel monitoraggio delle scadenze normative, garantendo assistenza puntuale e conformità
                            </p>

                            <p className="mb-6 text-xs font-semibold text-gray-700">Formazione: la taglia perfetta per te</p>

                            <div className="mb-8 space-y-3">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#73BFA1]" />
                                    <span className="text-sm text-gray-700">1-20 utenti - €150/utente</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#73BFA1]" />
                                    <span className="text-sm text-gray-700">21-50 utenti - €420/utente</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#73BFA1]" />
                                    <span className="text-sm text-gray-700">51-200 utenti - €1000/utente</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#73BFA1]" />
                                    <span className="text-sm text-gray-700">Include pannello di amministrazione</span>
                                </div>
                            </div>

                            <a href="/training/course/checkout">
                                <button className="w-full rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition">
                                    Seleziona
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingCardsModal;