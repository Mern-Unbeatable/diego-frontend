import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import Banner from '../../components/common/Banner';
import banner from '../../../src/assets/images/banner/whoweare/banner3.png';
export default function ContactUs() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    azienda: '',
    partitaIva: '',
    telefono: '',
    email: '',
    messaggio: ''
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
      messaggio: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Banner
        image={banner}
        title={'Contattaci'}
      />
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Siamo a tua disposizione</h1>
        <p className="text-gray-700 text-base leading-relaxed">
          Vuoi ricevere maggiori informazioni sui nostri servizi di formazione, sicurezza o un preventivo?
          <br />
          Compila il form qui sotto oppure utilizza i nostri contatti diretti. Ti risponderemo al più presto.
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="border border-gray-200 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Form di contatto</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Nome */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">Nome*</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Il tuo nome"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              {/* Cognome */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">Cognome*</label>
                <input
                  type="text"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange} Contattaci
                  placeholder="Il tuo cognome"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              {/* Azienda */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">Azienda*</label>
                <input
                  type="text"
                  name="azienda"
                  value={formData.azienda}
                  onChange={handleChange}
                  placeholder="Nome della tua azienda"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              {/* P.IVA */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">P.IVA*</label>
                <input
                  type="text"
                  name="partitaIva"
                  value={formData.partitaIva}
                  onChange={handleChange}
                  placeholder="Partita IVA"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              {/* Telefono */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">Numero di telefono/cellulare*</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+39 123 456 7890"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm">E-mail*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tua.email@esempio.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-300"
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
                placeholder="Lascia un messaggio"
                rows="6"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-300 resize-none"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-6">
              <button
                type="submit"
                className="flex-1 bg-[#73BFA1]  text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Invia
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 border-2 border-gray-900 text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Annulla
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 gap-8">
          {/* Email Card */}
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#73BFA1] p-4 rounded-full">
                <Mail className="text-white" size={28} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">E-mail</h3>
            <p className="text-[#73BFA1] font-medium mb-1">info@unosicurezza.it</p>
            <p className="text-gray-600 text-sm">Scrivi per qualsiasi informazione</p>
          </div>

          {/* Phone Card */}
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#73BFA1] p-4 rounded-full">
                <Phone className="text-white" size={28} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Telefono</h3>
            <p className="text-[#73BFA1] font-medium mb-1">+39 02 1234 5678</p>
            <p className="text-gray-600 text-sm">Lun-Ven 9.00-18.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
