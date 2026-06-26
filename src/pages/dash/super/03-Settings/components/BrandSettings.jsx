import React, { useState } from 'react';
import { Upload, Paperclip } from 'lucide-react';

export default function BrandSettings() {
  const [settings, setSettings] = useState({
    platformName: 'sunosicurezza.com',
    primaryColor: '#736FA1',
    newUserRegistrations: true,
    certificateDownloads: false,
  });

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Platform Name and Primary Color */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nome della piattaforma
          </label>
          <input
            type="text"
            value={settings.platformName}
            onChange={(e) => handleInputChange('platformName', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            placeholder="sunosicurezza.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Colore primario
          </label>
          <input
            type="text"
            value={settings.primaryColor}
            onChange={(e) => handleInputChange('primaryColor', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            placeholder="#736FA1"
          />
        </div>
      </div>

      {/* Platform Logo */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Platform logo
        </label>
        <div className="flex items-center space-x-4">
          {/* Logo placeholder */}
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
            <div className="flex h-6 w-8 items-center justify-center rounded-sm bg-red-500">
              <Upload className="h-3 w-3 text-white" />
            </div>
          </div>

          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-emerald-500 focus:outline-none">
            <Paperclip className="mr-2 h-4 w-4" />
            Add logo
          </button>
        </div>
      </div>

      {/* Plan Types */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Tipo di piano
        </h3>

        <div className="space-y-4">
          {/* New User Registrations */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <h4 className="font-medium text-gray-900">
                Nuove registrazioni utente
              </h4>
              <p className="text-sm text-gray-500">
                Consenti ai nuovi utenti di registrarsi autonomamente
              </p>
            </div>
            <button
              onClick={() => handleToggle('newUserRegistrations')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none ${
                settings.newUserRegistrations ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.newUserRegistrations
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Certificate Downloads */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <h4 className="font-medium text-gray-900">
                Download dei certificati
              </h4>
              <p className="text-sm text-gray-500">
                Consente agli utenti di scaricare i certificati di completamento
              </p>
            </div>
            <button
              onClick={() => handleToggle('certificateDownloads')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none ${
                settings.certificateDownloads ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.certificateDownloads
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
