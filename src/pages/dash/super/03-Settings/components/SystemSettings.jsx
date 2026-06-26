import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    fromEmail: 'noreply@platform.com',
  });

  const emailTemplates = [
    { id: 'welcome', name: 'Email di benvenuto', editable: true },
    { id: 'password_reset', name: 'Reimpostazione password', editable: true },
    {
      id: 'course_completion',
      name: 'Completamento del corso',
      editable: true,
    },
    {
      id: 'payment_confirmation',
      name: 'Conferma del pagamento',
      editable: true,
    },
    {
      id: 'license_expiry',
      name: 'Avviso di scadenza della licenza',
      editable: true,
    },
  ];

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* SMTP Configuration */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            SMTP Server
          </label>
          <input
            type="text"
            value={settings.smtpServer}
            onChange={(e) => handleInputChange('smtpServer', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            placeholder="smtp.gmail.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            SMTP Port
          </label>
          <input
            type="text"
            value={settings.smtpPort}
            onChange={(e) => handleInputChange('smtpPort', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            placeholder="587"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Da indirizzo email
        </label>
        <input
          type="email"
          value={settings.fromEmail}
          onChange={(e) => handleInputChange('fromEmail', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          placeholder="noreply@platform.com"
        />
      </div>

      {/* Email Templates */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Tipo di piano
        </h3>

        <div className="space-y-3">
          {emailTemplates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <span className="font-medium text-gray-900">{template.name}</span>
              {template.editable && (
                <button className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                  Edit
                  <Edit3 className="ml-1 h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
