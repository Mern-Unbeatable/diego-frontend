import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useContact } from '../../features/public/contact/contactHooks';

const MAX_INT_32 = 2147483647;

const CollaborationRequestForm = () => {
  const { t } = useTranslation();
  const { createContact } = useContact();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nomeAzienda: '',
    tipoCollaborazione: '',
    nominativoReferente: '',
    email: '',
    telefono: '',
    dimensioneAzienda: '',
    descrizione: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    const trimmedName = formData.nominativoReferente.trim();
    const [firstName = '', ...lastNameParts] = trimmedName.split(/\s+/);
    const lastName = lastNameParts.join(' ') || '-';

    const payload = {
      firstName: firstName || '-',
      lastName,
      phone: phoneNumber,
      agencyName: formData.nomeAzienda.trim() || 'N/A',
      vat: 'N/A',
      email: formData.email.trim(),
      message: [
        `Tipo collaborazione: ${formData.tipoCollaborazione || '-'}`,
        `Dimensione azienda: ${formData.dimensioneAzienda || '-'}`,
        `Descrizione: ${formData.descrizione.trim() || '-'}`,
      ].join(' | '),
    };

    try {
      setIsSubmitting(true);
      await createContact(payload);
      toast.success('Your message has been sent successfully');
      setFormData({
        nomeAzienda: '',
        tipoCollaborazione: '',
        nominativoReferente: '',
        email: '',
        telefono: '',
        dimensioneAzienda: '',
        descrizione: '',
      });
    } catch (error) {
      toast.error(error?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cyan-10 px-4 py-14 md:py-16">
      <div className="bg-cyan-10  ">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold text-gray-900">
              {t('workWithUs.section4.title')}
            </h1>
            <p className="text-sm text-gray-600">
              {t('workWithUs.section4.subtitle')}
            </p>
          </div>

          {/* Form Container */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Nome azienda & Tipo collaborazione */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('workWithUs.section4.nomeAzienda')}
                  </label>
                  <input
                    type="text"
                    name="nomeAzienda"
                    value={formData.nomeAzienda}
                    onChange={handleChange}
                    placeholder={t(
                      'workWithUs.section4.nomeAziendaPlaceholder',
                    )}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('workWithUs.section4.tipoCollaborazione')}
                  </label>
                  <div className="relative">
                    <select
                      name="tipoCollaborazione"
                      value={formData.tipoCollaborazione}
                      onChange={handleChange}
                      className="w-full cursor-pointer appearance-none rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="">{t('workWithUs.section4.tipo1')}</option>
                      <option value="pmi">
                        {t('workWithUs.section4.tipo2')}
                      </option>
                      <option value="medio">
                        {t('workWithUs.section4.tipo3')}
                      </option>
                      <option value="grande">
                        {t('workWithUs.section4.tipo4')}
                      </option>
                      <option value="altro">
                        {t('workWithUs.section4.tipo5')}
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-3 right-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Row 2: Nominativo referente & E-mail */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('workWithUs.section4.referente')}
                  </label>
                  <input
                    type="text"
                    name="nominativoReferente"
                    value={formData.nominativoReferente}
                    onChange={handleChange}
                    placeholder={t('workWithUs.section4.referentePlaceholder')}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('workWithUs.section4.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('workWithUs.section4.emailPlaceholder')}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Telefono & Dimensione azienda */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('workWithUs.section4.telefono')}
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder={t('workWithUs.section4.telefonoPlaceholder')}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('workWithUs.section4.dimensione')}
                  </label>
                  <div className="relative">
                    <select
                      name="dimensioneAzienda"
                      value={formData.dimensioneAzienda}
                      onChange={handleChange}
                      className="w-full cursor-pointer appearance-none rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="">{t('workWithUs.section4.dim1')}</option>
                      <option value="pmi">
                        {t('workWithUs.section4.dim2')}
                      </option>
                      <option value="medio">
                        {t('workWithUs.section4.dim3')}
                      </option>
                      <option value="grande">
                        {t('workWithUs.section4.dim4')}
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-3 right-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Textarea: Descrivi la tua attività */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {t('workWithUs.section4.descrizione')}
                </label>
                <textarea
                  name="descrizione"
                  value={formData.descrizione}
                  onChange={handleChange}
                  placeholder={t('workWithUs.section4.descrizionePlaceholder')}
                  rows="5"
                  className="w-full resize-none rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#73BFA1] py-3 font-semibold text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : t('workWithUs.section4.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="rounded-lg border border-gray-200 bg-white  p-4 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t('workWithUs.section4.nomeAzienda')}
              </label>
              <input
                type="text"
                name="nomeAzienda"
                value={formData.nomeAzienda}
                onChange={handleChange}
                placeholder={t('workWithUs.section4.nomeAziendaPlaceholder')}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t('workWithUs.section4.tipoCollaborazione')}
              </label>
              <div className="relative">
                <select
                  name="tipoCollaborazione"
                  value={formData.tipoCollaborazione}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="">{t('workWithUs.section4.tipo1')}</option>
                  <option value="hr">{t('workWithUs.section4.tipo2')}</option>
                  <option value="consulting">
                    {t('workWithUs.section4.tipo3')}
                  </option>
                  <option value="company">
                    {t('workWithUs.section4.tipo4')}
                  </option>
                  <option value="other">
                    {t('workWithUs.section4.tipo5')}
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-3 right-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t('workWithUs.section4.referente')}
              </label>
              <input
                type="text"
                name="nominativoReferente"
                value={formData.nominativoReferente}
                onChange={handleChange}
                placeholder={t('workWithUs.section4.referentePlaceholder')}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t('workWithUs.section4.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('workWithUs.section4.emailPlaceholder')}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t('workWithUs.section4.telefono')}
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder={t('workWithUs.section4.telefonoPlaceholder')}
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t('workWithUs.section4.dimensione')}
              </label>
              <div className="relative">
                <select
                  name="dimensioneAzienda"
                  value={formData.dimensioneAzienda}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="">{t('workWithUs.section4.dim1')}</option>
                  <option value="pmi">{t('workWithUs.section4.dim2')}</option>
                  <option value="medio">{t('workWithUs.section4.dim3')}</option>
                  <option value="grande">
                    {t('workWithUs.section4.dim4')}
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-3 right-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              {t('workWithUs.section4.descrizione')}
            </label>
            <textarea
              name="descrizione"
              value={formData.descrizione}
              onChange={handleChange}
              placeholder={t('workWithUs.section4.descrizionePlaceholder')}
              rows="5"
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#73BFA1] py-3 font-semibold text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending...' : t('workWithUs.section4.submit')}
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default CollaborationRequestForm;
