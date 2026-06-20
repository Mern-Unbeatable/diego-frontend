import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';

function APISettings() {
  const [apiKeys, setApiKeys] = useState({
    mailchimp: '',
    zapier: '',
    analytics: '',
    sms: '',
  });

  const [webhooks, setWebhooks] = useState([
    { id: 'registration', name: 'Registrazione utente', status: 'Active' },
    { id: 'completion', name: 'Completamento del corso', status: 'Active' },
    { id: 'payment', name: 'Pagamento riuscito', status: 'Active' },
    { id: 'license_expiry', name: 'Scadenza della licenza', status: 'Active' },
  ]);

  const handleApiKeyChange = (key, value) => {
    setApiKeys((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const apiIntegrations = [
    {
      key: 'mailchimp',
      name: 'Mailchimp API Key',
      description: 'Marketing via e-mail',
      placeholder: 'Inserisci la chiave API...',
    },
    {
      key: 'zapier',
      name: 'URL del webhook Zapier',
      description: 'Automazione',
      placeholder: 'Inserisci la chiave API...',
    },
    {
      key: 'analytics',
      name: 'Chiave API di analitici',
      description: 'Google Analytics',
      placeholder: 'Inserisci la chiave API...',
    },
    {
      key: 'sms',
      name: 'API del gateway SMS',
      description: 'Notifiche',
      placeholder: 'Inserisci la chiave API...',
    },
  ];

  return (
    <div className="space-y-6">
      {/* API Keys Section */}
      <div className="space-y-4">
        {apiIntegrations.map((integration) => (
          <div key={integration.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {integration.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {integration.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="password"
                value={apiKeys[integration.key]}
                onChange={(e) =>
                  handleApiKeyChange(integration.key, e.target.value)
                }
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                placeholder={integration.placeholder}
              />
              <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                Test
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Webhooks Section */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Webhook dell'endpoint
        </h3>

        <div className="space-y-3">
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <span className="font-medium text-gray-900">{webhook.name}</span>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-emerald-600">
                  {webhook.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default APISettings;
