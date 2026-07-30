import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useContact } from '../../features/public/contact/contactHooks';

const MAX_INT_32 = 2147483647;

const ContactFormDesign = ({ title }) => {
  const { t } = useTranslation();
  const { createContact } = useContact();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawPhoneDigits = formData.telefono.replace(/\D/g, '');
    const normalizedPhoneDigits =
      rawPhoneDigits.length > 10 && rawPhoneDigits.startsWith('39')
        ? rawPhoneDigits.slice(2)
        : rawPhoneDigits;

    const phoneNumber = Number(normalizedPhoneDigits);
    if (
      !normalizedPhoneDigits ||
      !Number.isInteger(phoneNumber) ||
      phoneNumber <= 0 ||
      phoneNumber > MAX_INT_32
    ) {
      toast.error('Use digits only and remove country code from phone number.');
      return;
    }

    const payload = {
      firstName: formData.nome.trim(),
      lastName: formData.cognome.trim(),
      phone: phoneNumber,
      agencyName: formData.azienda.trim(),
      vat: formData.partitaIva.trim() || 'N/A',
      email: formData.email.trim(),
      message: 'Work with us request from inline form',
    };

    try {
      setIsSubmitting(true);
      await createContact(payload);
      toast.success('Your message has been sent successfully');
      handleReset();
    } catch (error) {
      toast.error(error?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
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
                disabled={isSubmitting}
                className="rounded-lg bg-[#73BFA1] py-3 font-semibold text-white transition-colors hover:bg-[#63AE91] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : t('contactUs.section1.submit')}
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
