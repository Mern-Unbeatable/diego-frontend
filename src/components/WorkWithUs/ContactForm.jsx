import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactFormDesign = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        azienda: '',
        partitaIva: '',
        telefono: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleReset = () => {
        setFormData({
            nome: '',
            cognome: '',
            azienda: '',
            partitaIva: '',
            telefono: '',
            email: ''
        });
    };

    return (
        <div className=" ">
            <div className="max-w-2xl mx-auto">
                {/* Form Container */}
                <div className="border border-gray-300 rounded-lg p-5">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        {t('workWithUs.form.contactTitle')}
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Row 1: Nome and Cognome */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    {t('contactUs.nome')}
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder={t('contactUs.nomePlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#73BFA1] focus:border-transparent text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    {t('contactUs.cognome')}
                                </label>
                                <input
                                    type="text"
                                    name="cognome"
                                    value={formData.cognome}
                                    onChange={handleChange}
                                    placeholder={t('contactUs.cognomePlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#73BFA1] focus:border-transparent text-xs"
                                />
                            </div>
                        </div>

                        {/* Row 2: Azienda and P.IVA */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    {t('contactUs.azienda')}
                                </label>
                                <input
                                    type="text"
                                    name="azienda"
                                    value={formData.azienda}
                                    onChange={handleChange}
                                    placeholder={t('contactUs.aziendaPlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#73BFA1] focus:border-transparent text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    {t('contactUs.piva')}
                                </label>
                                <input
                                    type="text"
                                    name="partitaIva"
                                    value={formData.partitaIva}
                                    onChange={handleChange}
                                    placeholder={t('contactUs.pivaPlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#73BFA1] focus:border-transparent text-xs"
                                />
                            </div>
                        </div>

                        {/* Row 3: Telefono and Email */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    {t('contactUs.telefono')}
                                </label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder={t('contactUs.telefonoPlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#73BFA1] focus:border-transparent text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    {t('contactUs.email')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('contactUs.emailPlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#73BFA1] focus:border-transparent text-xs"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <button
                                type="submit"
                                className="bg-[#73BFA1] text-white font-semibold py-3 rounded-lg hover:bg-[#63AE91] transition-colors"
                            >
                                {t('contactUs.submit')}
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="border-2 border-gray-800 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {t('contactUs.cancel')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactFormDesign;
