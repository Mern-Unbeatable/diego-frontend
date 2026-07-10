import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactFormModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    azienda: '',
    piva: '',
    telefono: '',
    email: '',
    messaggio: '',
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
    // Add your submit logic here
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      cognome: '',
      azienda: '',
      piva: '',
      telefono: '',
      email: '',
      messaggio: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="w-full rounded-lg bg-white p-8 shadow-lg">
          {/* Header */}
          <h1 className="mb-5 text-center text-3xl font-bold text-gray-900">
            {t('contactUs.section1.formTitle')}
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* First Row - Nome and Cognome */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  {t('contactUs.section1.nome')}
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.nomePlaceholder')}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  {t('contactUs.section1.cognome')}
                </label>
                <input
                  type="text"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.cognomePlaceholder')}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
            </div>

            {/* Second Row - Azienda and P.IVA */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  {t('contactUs.section1.azienda')}
                </label>
                <input
                  type="text"
                  name="azienda"
                  value={formData.azienda}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.aziendaPlaceholder')}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  {t('contactUs.section1.piva')}
                </label>
                <input
                  type="text"
                  name="piva"
                  value={formData.piva}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.pivaPlaceholder')}
                  className="tex-sm w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
            </div>

            {/* Third Row - Telefono and Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  {t('contactUs.section1.telefono')}
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.telefonoPlaceholder')}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  {t('contactUs.section1.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.emailPlaceholder')}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                {t('servicesPages.section19.message')}
              </label>
              <textarea
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                placeholder={t('contactUs.section1.messaggioPlaceholder')}
                rows="6"
                className="w-full resize-none rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:ring-2 focus:ring-[#73BFA1] focus:outline-none"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="w-full rounded-md bg-[#73BFA1] py-2 font-semibold text-white transition duration-300 hover:bg-[#73BFA1]"
              >
                {t('contactUs.section1.submit')}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full rounded-md border-2 border-gray-400 py-2 font-semibold text-gray-700 transition duration-300 hover:bg-gray-50"
              >
                {t('contactUs.section1.cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
