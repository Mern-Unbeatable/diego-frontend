import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../../components/common/Banner';
import Container from '../../components/ui/layouts/Container';
import banner from '../../../src/assets/images/banner/whoweare/banner3.png';

export default function ContactUsView() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    azienda: '',
    partitaIva: '',
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
    // Handle form submission here
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      cognome: '',
      azienda: '',
      partitaIva: '',
      telefono: '',
      email: '',
      messaggio: '',
    });
  };

  return (
    <Container size="full">
      <div className="min-h-screen bg-white">
        <Banner image={banner} title={t('contactUs.section1.bannerTitle')} />
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {t('contactUs.section1.heroTitle')}
          </h1>
          <p className="text-base leading-relaxed text-gray-700">
            {t('contactUs.section1.heroDescription')}
          </p>
        </div>

        {/* Form Section */}
        <div className="mx-auto max-w-4xl px-6 pb-20">
          <div className="rounded-lg border border-gray-200 p-12">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              {t('contactUs.section1.formTitle')}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6 grid grid-cols-2 gap-6">
                {/* Nome */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    {t('contactUs.section1.nome')}
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder={t('contactUs.section1.nomePlaceholder')}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* Cognome */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    {t('contactUs.section1.cognome')}
                  </label>
                  <input
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    placeholder={t('contactUs.section1.cognomePlaceholder')}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* Azienda */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    {t('contactUs.section1.azienda')}
                  </label>
                  <input
                    type="text"
                    name="azienda"
                    value={formData.azienda}
                    onChange={handleChange}
                    placeholder={t('contactUs.section1.aziendaPlaceholder')}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* P.IVA */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    {t('contactUs.section1.piva')}
                  </label>
                  <input
                    type="text"
                    name="partitaIva"
                    value={formData.partitaIva}
                    onChange={handleChange}
                    placeholder={t('contactUs.section1.pivaPlaceholder')}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* Telefono */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    {t('contactUs.section1.telefono')}
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder={t('contactUs.section1.telefonoPlaceholder')}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div className="">
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    {t('contactUs.section1.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contactUs.section1.emailPlaceholder')}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Messaggio */}
              <div className="mb-8">
                <textarea
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  placeholder={t('contactUs.section1.messaggioPlaceholder')}
                  rows="6"
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-6">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#73BFA1] px-6 py-3 font-medium text-white transition duration-200"
                >
                  {t('contactUs.section1.submit')}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 rounded-lg border-2 border-gray-900 px-6 py-3 font-medium text-gray-900 transition duration-200 hover:bg-gray-50"
                >
                  {t('contactUs.section1.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="mx-auto max-w-4xl px-6 pb-20">
          <div className="grid grid-cols-2 gap-8">
            {/* Email Card */}
            <div className="rounded-lg border border-gray-200 p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-[#73BFA1] p-4">
                  <Mail className="text-white" size={28} />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {t('contactUs.section1.emailCardTitle')}
              </h3>
              <p className="mb-1 font-medium text-[#73BFA1]">
                info@unosicurezza.it
              </p>
              <p className="text-sm text-gray-600">
                {t('contactUs.section1.emailCardSub')}
              </p>
            </div>

            {/* Phone Card */}
            <div className="rounded-lg border border-gray-200 p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-[#73BFA1] p-4">
                  <Phone className="text-white" size={28} />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {t('contactUs.section1.phoneCardTitle')}
              </h3>
              <p className="mb-1 font-medium text-[#73BFA1]">
                +39 02 1234 5678
              </p>
              <p className="text-sm text-gray-600">
                {t('contactUs.section1.phoneCardSub')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
