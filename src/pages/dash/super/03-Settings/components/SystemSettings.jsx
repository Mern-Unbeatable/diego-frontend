import { useCallback, useEffect, useState } from 'react';
import { Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';
import Loading from '../../../../../components/ui/Utilities/Loading';
import {
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
  useTestSystemSmtpMutation,
} from '../../../../../features/api/dashboardApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import EmailTemplateEditModal from './EmailTemplateEditModal';

export default function SystemSettings() {
  const { data, isLoading, isError, error } = useGetSystemSettingsQuery();
  const [updateSystemSettings, { isLoading: isSaving }] =
    useUpdateSystemSettingsMutation();
  const [testSystemSmtp, { isLoading: isTestingSmtp }] = useTestSystemSmtpMutation();

  const [settings, setSettings] = useState({
    smtpHost: '',
    smtpPort: '587',
    smtpFromEmail: '',
  });
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [smtpConfigured, setSmtpConfigured] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  useEffect(() => {
    if (!data) return;
    setSettings({
      smtpHost: data.smtpHost || '',
      smtpPort: String(data.smtpPort ?? 587),
      smtpFromEmail: data.smtpFromEmail || '',
    });
    setEmailTemplates(Array.isArray(data.emailTemplates) ? data.emailTemplates : []);
    setSmtpConfigured(Boolean(data.smtpConfigured));
  }, [data]);

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = useCallback(async () => {
    try {
      await updateSystemSettings({
        smtpHost: settings.smtpHost.trim() || null,
        smtpPort: Number.parseInt(settings.smtpPort, 10) || null,
        smtpFromEmail: settings.smtpFromEmail.trim() || null,
      }).unwrap();
      toast.success('Impostazioni di sistema salvate');
    } catch (saveError) {
      toast.error(getRtkErrorMessage(saveError));
    }
  }, [settings, updateSystemSettings]);

  useEffect(() => {
    const onSave = () => {
      void handleSave();
    };
    window.addEventListener('system-settings:save', onSave);
    return () => window.removeEventListener('system-settings:save', onSave);
  }, [handleSave]);

  const handleTestSmtp = async () => {
    try {
      await handleSave();
      const result = await testSystemSmtp().unwrap();
      toast.success(result?.message || 'Connessione SMTP verificata');
    } catch (testError) {
      toast.error(getRtkErrorMessage(testError));
    }
  };

  const handleTemplateSave = async (templatePayload) => {
    if (!editingTemplate) return;

    try {
      const result = await updateSystemSettings({
        emailTemplates: {
          [editingTemplate.id]: templatePayload,
        },
      }).unwrap();
      setEmailTemplates(Array.isArray(result.emailTemplates) ? result.emailTemplates : []);
      setEditingTemplate(null);
      toast.success('Template saved and translated to all languages');
    } catch (saveError) {
      toast.error(getRtkErrorMessage(saveError));
    }
  };

  if (isLoading) {
    return <Loading size="md" className="min-h-40" />;
  }

  return (
    <div className="space-y-6">
      {isError ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Impossibile caricare le impostazioni dal server.
          {getRtkErrorMessage(error) ? ` (${getRtkErrorMessage(error)})` : ''}
        </p>
      ) : null}

      {!smtpConfigured ? (
        <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Le credenziali SMTP (utente e password) restano nel file `.env` del server.
          Qui puoi configurare host, porta e mittente.
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            SMTP Server
          </label>
          <input
            type="text"
            value={settings.smtpHost}
            onChange={(e) => handleInputChange('smtpHost', e.target.value)}
            disabled={isSaving}
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
            disabled={isSaving}
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
          value={settings.smtpFromEmail}
          onChange={(e) => handleInputChange('smtpFromEmail', e.target.value)}
          disabled={isSaving}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          placeholder="noreply@platform.com"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => void handleTestSmtp()}
          disabled={isSaving || isTestingSmtp}
          className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 disabled:opacity-60"
        >
          {isTestingSmtp ? 'Verifica in corso...' : 'Verifica connessione SMTP'}
        </button>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Template email
        </h3>

        <div className="space-y-3">
          {emailTemplates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div>
                <span className="font-medium text-gray-900">{template.label}</span>
                {template.enabled === false ? (
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                    Disattivo
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setEditingTemplate(template)}
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Edit
                <Edit3 className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end md:hidden">
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {isSaving ? 'Salvataggio...' : 'Salva le modifiche'}
        </button>
      </div>

      <EmailTemplateEditModal
        template={editingTemplate}
        open={Boolean(editingTemplate)}
        onClose={() => setEditingTemplate(null)}
        onSave={handleTemplateSave}
        saving={isSaving}
      />
    </div>
  );
}
