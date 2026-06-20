import { GrClose } from "react-icons/gr";

const SubdomainModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[500px] rounded-2xl bg-white p-8 shadow-xl">

                {/* CLOSE BUTTON */}
                <div className="flex justify-end mb-2">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <GrClose size={20} />
                    </button>
                </div>

                {/* CONTENT */}
                <h2 className="text-xl font-semibold mb-2">
                    Sottodominio<span className="text-red-500 ml-0.5">*</span>
                </h2>
                <div className="text-left bg-[#F1F9F6] p-5 rounded-lg">
                    {/* Title with asterisk */}


                    {/* Main description */}
                    <p className="text-sm text-gray-700 mb-4">
                        Inserisci il dominio e noi penseremmo al resto.
                    </p>

                    {/* Second description */}
                    <p className="text-sm text-gray-700 mb-6">
                        Inserisci il dominio acquistato. Noi penseremmo a far visualizzare il nome della tua azienda
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3 mb-6">
                        <button className="px-6 py-2.5 rounded-full bg-[#D23B1D] text-white text-sm font-medium hover:bg-[#b8301a] transition-colors">
                            Acquista sottodominio
                        </button>

                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Chiudi
                        </button>
                    </div>

                    {/* Suggestion box */}
                    <div >
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Suggerimento:</span>
                            <span className="ml-1">dopo l'acquisto ci può fornire il dominio e lo collegheremo automaticamente.</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SubdomainModal;