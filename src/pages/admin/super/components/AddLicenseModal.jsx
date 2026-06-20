import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

export default function AddLicenseModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nomeEnteDiFormazione: '',
    numeroDiTelefono: '',
    indirizzoEmail: '',
    postaElettronicaCertificataPEC: '',
    sottodominio: '',
    tipoDiPiano: 'Principiante (50 utenti)',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    // Reset form after saving
    setFormData({
      nomeEnteDiFormazione: '',
      numeroDiTelefono: '',
      indirizzoEmail: '',
      postaElettronicaCertificataPEC: '',
      sottodominio: '',
      tipoDiPiano: 'Principiante (50 utenti)',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Aggiungi nuova licenza
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information Section */}
          <div className="relative">
            <div className="mb-6 flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                Informazioni aziendali
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="group">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Nome ente di formazione{' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.nomeEnteDiFormazione}
                    onChange={(e) =>
                      handleInputChange('nomeEnteDiFormazione', e.target.value)
                    }
                    placeholder="Inserisci il nome dell'azienda"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 group-hover:border-gray-300 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="group">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Numero di telefono <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.numeroDiTelefono}
                    onChange={(e) =>
                      handleInputChange('numeroDiTelefono', e.target.value)
                    }
                    placeholder="Inserisci il numero telefonico"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 group-hover:border-gray-300 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="relative">
            <div className="mb-6 flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                Informazioni di contatto
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="group">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Indirizzo e-mail <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.indirizzoEmail}
                    onChange={(e) =>
                      handleInputChange('indirizzoEmail', e.target.value)
                    }
                    placeholder="esempio@azienda.it"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 group-hover:border-gray-300 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="group">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Posta elettronica certificata PEC
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.postaElettronicaCertificataPEC}
                    onChange={(e) =>
                      handleInputChange(
                        'postaElettronicaCertificataPEC',
                        e.target.value,
                      )
                    }
                    placeholder="pec@azienda.it"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 group-hover:border-gray-300 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Platform Configuration Section */}
          <div className="relative">
            <div className="mb-6 flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                Configurazione piattaforma
              </h3>
            </div>
            <div className="space-y-6">
              <div className="group">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Sottodominio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.sottodominio}
                    onChange={(e) =>
                      handleInputChange('sottodominio', e.target.value)
                    }
                    placeholder="miazienda"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 group-hover:border-gray-300 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none"
                    required
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center text-sm text-gray-500">
                    .unosicurezza.com
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Tipo di piano <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.tipoDiPiano}
                    onChange={(e) =>
                      handleInputChange('tipoDiPiano', e.target.value)
                    }
                    className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm transition-all duration-200 group-hover:border-gray-300 focus:border-emerald-500 focus:bg-emerald-50/30 focus:ring-0 focus:outline-none"
                  >
                    <option value="Principiante (50 utenti)">
                      🟢 Principiante (50 utenti) - €29/mese
                    </option>
                    <option value="Standard (100 utenti)">
                      🟡 Standard (100 utenti) - €59/mese
                    </option>
                    <option value="Premium (200 utenti)">
                      🟠 Premium (200 utenti) - €99/mese
                    </option>
                    <option value="Enterprise (500 utenti)">
                      🔴 Enterprise (500 utenti) - €199/mese
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">* Campi obbligatori</div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border-2 border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                >
                  Aggiungi licenza
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
