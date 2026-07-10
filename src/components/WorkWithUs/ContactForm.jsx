import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactFormDesign = ({ title }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    azienda: '',
    partitaIva: '',
    telefono: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      email: '',
    });
  };

  return (
    <div className=" ">
      <div className="mx-auto max-w-2xl">
        {/* Form Container */}
        <div className="rounded-lg border border-gray-300 p-5">
          {/* Title */}
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            {title || t('workWithUs.section6.contactTitle')}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Nome and Cognome */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contactUs.section1.nome')}
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.nomePlaceholder')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contactUs.section1.cognome')}
                </label>
                <input
                  type="text"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.cognomePlaceholder')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2: Azienda and P.IVA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contactUs.section1.azienda')}
                </label>
                <input
                  type="text"
                  name="azienda"
                  value={formData.azienda}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.aziendaPlaceholder')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contactUs.section1.piva')}
                </label>
                <input
                  type="text"
                  name="partitaIva"
                  value={formData.partitaIva}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.pivaPlaceholder')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
            </div>

            {/* Row 3: Telefono and Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contactUs.section1.telefono')}
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.telefonoPlaceholder')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contactUs.section1.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.emailPlaceholder')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="submit"
                className="rounded-lg bg-[#73BFA1] py-3 font-semibold text-white transition-colors hover:bg-[#63AE91]"
              >
                {t('contactUs.section1.submit')}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border-2 border-gray-800 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-50"
              >
                {t('contactUs.section1.cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormDesign;
