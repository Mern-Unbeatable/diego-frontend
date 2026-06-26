import { GrClose } from "react-icons/gr";
import { useTranslation } from 'react-i18next';

const SubdomainModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
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
                    {t('auth.setup.subdomainModal.title')}<span className="text-red-500 ml-0.5">*</span>
                </h2>
                <div className="text-left bg-[#F1F9F6] p-5 rounded-lg">
                    {/* Title with asterisk */}


                    {/* Main description */}
                    <p className="text-sm text-gray-700 mb-4">
                        {t('auth.setup.subdomainModal.description1')}
                    </p>

                    {/* Second description */}
                    <p className="text-sm text-gray-700 mb-6">
                        {t('auth.setup.subdomainModal.description2')}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3 mb-6">
                        <button className="px-6 py-2.5 rounded-full bg-[#D23B1D] text-white text-sm font-medium hover:bg-[#b8301a] transition-colors">
                            {t('auth.setup.subdomainModal.buyButton')}
                        </button>

                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            {t('auth.common.close')}
                        </button>
                    </div>

                    {/* Suggestion box */}
                    <div >
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">{t('auth.setup.subdomainModal.tipTitle')}</span>
                            <span className="ml-1">{t('auth.setup.subdomainModal.tipText')}</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SubdomainModal;