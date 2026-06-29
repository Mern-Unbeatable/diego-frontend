import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import Banner from '../../components/common/Banner';
import Container from '../../components/ui/layouts/Container';
import banner from '../../../src/assets/images/banner/whoweare/banner3.png';

export default function ContactUsView() {
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
        <Banner image={banner} title={'Contattaci'} />
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Siamo a tua disposizione
          </h1>
          <p className="text-base leading-relaxed text-gray-700">
            Vuoi ricevere maggiori informazioni sui nostri servizi di
            formazione, sicurezza o un preventivo?
            <br />
            Compila il form qui sotto oppure utilizza i nostri contatti diretti.
            Ti risponderemo al più presto.
          </p>
        </div>

        {/* Form Section */}
        <div className="mx-auto max-w-4xl px-6 pb-20">
          <div className="rounded-lg border border-gray-200 p-12">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Form di contatto
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6 grid grid-cols-2 gap-6">
                {/* Nome */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Nome*
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Il tuo nome"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* Cognome */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Cognome*
                  </label>
                  <input
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    Contattaci
                    placeholder="Il tuo cognome"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* Azienda */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Azienda*
                  </label>
                  <input
                    type="text"
                    name="azienda"
                    value={formData.azienda}
                    onChange={handleChange}
                    placeholder="Nome della tua azienda"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* P.IVA */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    P.IVA*
                  </label>
                  <input
                    type="text"
                    name="partitaIva"
                    value={formData.partitaIva}
                    onChange={handleChange}
                    placeholder="Partita IVA"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* Telefono */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Numero di telefono/cellulare*
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+39 123 456 7890"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tua.email@esempio.com"
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
                  placeholder="Lascia un messaggio"
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
                  Invia
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 rounded-lg border-2 border-gray-900 px-6 py-3 font-medium text-gray-900 transition duration-200 hover:bg-gray-50"
                >
                  Annulla
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
              <h3 className="mb-2 text-xl font-bold text-gray-900">E-mail</h3>
              <p className="mb-1 font-medium text-[#73BFA1]">
                info@unosicurezza.it
              </p>
              <p className="text-sm text-gray-600">
                Scrivi per qualsiasi informazione
              </p>
            </div>

            {/* Phone Card */}
            <div className="rounded-lg border border-gray-200 p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-[#73BFA1] p-4">
                  <Phone className="text-white" size={28} />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Telefono</h3>
              <p className="mb-1 font-medium text-[#73BFA1]">
                +39 02 1234 5678
              </p>
              <p className="text-sm text-gray-600">Lun-Ven 9.00-18.00</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
