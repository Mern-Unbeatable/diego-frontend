import { useState } from 'react';
import { Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';
import Loading from '../../../../../components/ui/Utilities/Loading';
import {
  useGetWebhookSettingsQuery,
  useUpdateWebhookSettingsMutation,
  useTestSmsMutation,
} from '../../../../../features/api/dashboardApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import WebhookEditModal from './WebhookEditModal';

function APISettings() {
  const [apiKeys, setApiKeys] = useState({
    mailchimp: '',
    zapier: '',
    analytics: '',
  });
  const [smsTestPhone, setSmsTestPhone] = useState('');

  const { data, isLoading, isError, error } = useGetWebhookSettingsQuery();
  const [updateWebhookSettings, { isLoading: isSaving }] =
    useUpdateWebhookSettingsMutation();
  const [testSms, { isLoading: isTestingSms }] = useTestSmsMutation();
  const [editingWebhook, setEditingWebhook] = useState(null);

  const webhooks = data?.webhooks ?? [];
  const smsStatus = data?.sms ?? { configured: false, fromNumberMasked: null };

  const handleWebhookToggle = async (webhookId, enabled) => {
    try {
      await updateWebhookSettings({
        webhooks: {
          [webhookId]: { enabled },
        },
      }).unwrap();
      toast.success('Webhook aggiornato');
    } catch (toggleError) {
      toast.error(getRtkErrorMessage(toggleError));
    }
  };

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
  ];

  const handleWebhookSave = async (payload) => {
    if (!editingWebhook) return;

    try {
      await updateWebhookSettings({
        webhooks: {
          [editingWebhook.id]: payload,
        },
      }).unwrap();
      setEditingWebhook(null);
      toast.success('Webhook aggiornato');
    } catch (saveError) {
      toast.error(getRtkErrorMessage(saveError));
    }
  };

  const handleTestSms = async () => {
    // Prefer international; local BD 01xxxxxxxxx is also accepted by backend
    const to = smsTestPhone.trim().replace(/\s+/g, '');
    if (!to) {
      toast.error('Inserisci un numero, es. +8801825445033');
      return;
    }

    try {
      const result = await testSms({ to }).unwrap();
      toast.success(result?.message || `SMS inviato a ${result?.to || to}`);
    } catch (testError) {
      toast.error(getRtkErrorMessage(testError));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            API del gateway SMS (Twilio)
          </h3>
          <p className="text-sm text-gray-500">
            Notifiche SMS — le credenziali restano nel file `.env` del server
          </p>
        </div>



        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="tel"
            value={smsTestPhone}
            onChange={(e) => setSmsTestPhone(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            placeholder="+8801825445033"
            disabled={isTestingSms}
          />
          <button
            type="button"
            onClick={() => void handleTestSms()}
            disabled={isTestingSms}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isTestingSms ? 'Invio...' : 'Test SMS'}
          </button>
        </div>
      </div>

      {/* <div className="space-y-4">
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
              <button
                type="button"
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                Test
              </button>
            </div>
          </div>
        ))}
      </div> */}

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Webhook dell&apos;endpoint
        </h3>

        {isLoading ? (
          <Loading size="md" className="min-h-32" />
        ) : (
          <>
            {isError ? (
              <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Impossibile caricare i webhook dal server.
                {getRtkErrorMessage(error) ? ` (${getRtkErrorMessage(error)})` : ''}
              </p>
            ) : null}

            <div className="space-y-3">
              {webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <div>
                    <span className="font-medium text-gray-900">{webhook.name}</span>
                    {webhook.url ? (
                      <p className="mt-1 truncate text-xs text-gray-500">{webhook.url}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      {webhook.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => void handleWebhookToggle(webhook.id, !webhook.enabled)}
                      disabled={isSaving}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:opacity-60 ${webhook.enabled ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${webhook.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingWebhook(webhook)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <WebhookEditModal
        webhook={editingWebhook}
        open={Boolean(editingWebhook)}
        onClose={() => setEditingWebhook(null)}
        onSave={handleWebhookSave}
        saving={isSaving}
      />
    </div>
  );
}

export default APISettings;
