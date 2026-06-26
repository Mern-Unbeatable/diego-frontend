// import React, { useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// const CollaborationRequestForm = () => {
//     const [formData, setFormData] = useState({
//         nomeAzienda: '',
//         tipoCollaborazione: '',
//         nominativoReferente: '',
//         email: '',
//         telefono: '',
//         dimensioneAzienda: '',
//         descrizione: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form submitted:', formData);
//     };

//     return (
//         <div className="bg-cyan-10 py-16 px-4">
//             <div className="max-w-3xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-3">Richiesta di collaborazione</h1>
//                     <p className="text-gray-600 text-sm">Compila il form per ricevere maggiori informazioni sulla partnership</p>
//                 </div>

//                 {/* Form Container */}
//                 <div className="bg-white rounded-lg border border-gray-200 p-8">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Row 1: Nome azienda & Tipo collaborazione */}
//                         <div className="grid grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">Nome azienda *</label>
//                                 <input
//                                     type="text"
//                                     name="nomeAzienda"
//                                     value={formData.nomeAzienda}
//                                     onChange={handleChange}
//                                     placeholder="Denominazione..."
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">Tipo di collaborazione *</label>
//                                 <div className="relative">
//                                     <select
//                                         name="tipoCollaborazione"
//                                         value={formData.tipoCollaborazione}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
//                                     >
//                                         <option value="">Ente di Formazione</option>
//                                         <option value="pmi">Consulente HR</option>
//                                         <option value="medio">Azienda di consulenza</option>
//                                         <option value="grande">Azienda</option>
//                                         <option value="grande">Altro</option>
//                                     </select>
//                                     <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Row 2: Nominativo referente & E-mail */}
//                         <div className="grid grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">Nominativo referente *</label>
//                                 <input
//                                     type="text"
//                                     name="nominativoReferente"
//                                     value={formData.nominativoReferente}
//                                     onChange={handleChange}
//                                     placeholder="Il tuo nome..."
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">E-mail *</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     placeholder="mario.rossi@gmail.it"
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                 />
//                             </div>
//                         </div>

//                         {/* Row 3: Telefono & Dimensione azienda */}
//                         <div className="grid grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">Telefono *</label>
//                                 <input
//                                     type="tel"
//                                     name="telefono"
//                                     value={formData.telefono}
//                                     onChange={handleChange}
//                                     placeholder="+39 123 456 7890"
//                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">Dimensione azienda *</label>
//                                 <div className="relative">
//                                     <select
//                                         name="dimensioneAzienda"
//                                         value={formData.dimensioneAzienda}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
//                                     >
//                                         <option value="">Startup (1-10 dipendenti)</option>
//                                         <option value="pmi">Piccola (11-50 dipendenti)</option>
//                                         <option value="medio">Media (51-250 dipendenti)</option>
//                                         <option value="grande">Grande (250+ dipendenti)</option>
//                                     </select>
//                                     <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Textarea: Descrivi la tua attività */}
//                         <div>
//                             <label className="block text-gray-700 text-sm font-semibold mb-2">Descrivi la tua attività e i tuoi obiettivi</label>
//                             <textarea
//                                 name="descrizione"
//                                 value={formData.descrizione}
//                                 onChange={handleChange}
//                                 placeholder="Condividi con noi le come possiamo costruire insieme una partnership di valore..."
//                                 rows="5"
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
//                             ></textarea>
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             className="w-full bg-[#73BFA1] text-white font-semibold py-3 rounded-md transition duration-200"
//                         >
//                             Invia richiesta
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CollaborationRequestForm;



import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CollaborationRequestForm = () => {
  const { t } = useTranslation();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-cyan-10 py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ── Section 4: Header ── */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {t('workWithUs.section4.title')}
          </h1>
          <p className="text-gray-600 text-sm">
            {t('workWithUs.section4.subtitle')}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Row 1: Nome azienda & Tipo collaborazione */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {t('workWithUs.section4.nomeAzienda')}
                </label>
                <input
                  type="text"
                  name="nomeAzienda"
                  value={formData.nomeAzienda}
                  onChange={handleChange}
                  placeholder={t('workWithUs.section4.nomeAziendaPlaceholder')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {t('workWithUs.section4.tipoCollaborazione')}
                </label>
                <div className="relative">
                  <select
                    name="tipoCollaborazione"
                    value={formData.tipoCollaborazione}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="">{t('workWithUs.section4.tipo1')}</option>
                    <option value="hr">{t('workWithUs.section4.tipo2')}</option>
                    <option value="consulting">{t('workWithUs.section4.tipo3')}</option>
                    <option value="company">{t('workWithUs.section4.tipo4')}</option>
                    <option value="other">{t('workWithUs.section4.tipo5')}</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: Referente & Email */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {t('workWithUs.section4.referente')}
                </label>
                <input
                  type="text"
                  name="nominativoReferente"
                  value={formData.nominativoReferente}
                  onChange={handleChange}
                  placeholder={t('workWithUs.section4.referentePlaceholder')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {t('workWithUs.section4.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('workWithUs.section4.emailPlaceholder')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Row 3: Telefono & Dimensione */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {t('workWithUs.section4.telefono')}
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder={t('workWithUs.section4.telefonoPlaceholder')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {t('workWithUs.section4.dimensione')}
                </label>
                <div className="relative">
                  <select
                    name="dimensioneAzienda"
                    value={formData.dimensioneAzienda}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="">{t('workWithUs.section4.dim1')}</option>
                    <option value="pmi">{t('workWithUs.section4.dim2')}</option>
                    <option value="medio">{t('workWithUs.section4.dim3')}</option>
                    <option value="grande">{t('workWithUs.section4.dim4')}</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                {t('workWithUs.section4.descrizione')}
              </label>
              <textarea
                name="descrizione"
                value={formData.descrizione}
                onChange={handleChange}
                placeholder={t('workWithUs.section4.descrizionePlaceholder')}
                rows="5"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#73BFA1] text-white font-semibold py-3 rounded-md transition duration-200"
            >
              {t('workWithUs.section4.submit')}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CollaborationRequestForm;
