import { useCallback, useEffect, useRef, useState } from 'react';
import { Paperclip, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import Loading from '../../../../../components/ui/Utilities/Loading';
import {
  useGetBrandSettingsQuery,
  useUpdateBrandSettingsMutation,
  useUploadBrandLogoMutation,
  useGetEmergencyControlsQuery,
  useUpdateEmergencyControlsMutation,
} from '../../../../../features/api/dashboardApi';
import { mapEmergencyControlUpdate } from '../../../../../features/admin/adminMappers';
import { getRtkErrorMessage } from '../../../../../features/api/utils';

export default function BrandSettings() {
  const fileInputRef = useRef(null);
  const { data, isLoading, isError, error } = useGetBrandSettingsQuery();
  const { data: emergencyControls, isLoading: emergencyLoading } =
    useGetEmergencyControlsQuery();
  const [updateBrandSettings, { isLoading: isSaving }] =
    useUpdateBrandSettingsMutation();
  const [uploadBrandLogo, { isLoading: isUploadingLogo }] =
    useUploadBrandLogoMutation();
  const [updateEmergencyControls, { isLoading: emergencySaving }] =
    useUpdateEmergencyControlsMutation();

  const [settings, setSettings] = useState({
    platformName: '',
    primaryColor: '#736FA1',
    platformLogoUrl: '',
  });

  useEffect(() => {
    if (!data) return;
    setSettings({
      platformName: data.platformName || '',
      primaryColor: data.primaryColor || '#736FA1',
      platformLogoUrl: data.platformLogoUrl || '',
    });
  }, [data]);

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = useCallback(async () => {
    try {
      await updateBrandSettings({
        platformName: settings.platformName.trim(),
        primaryColor: settings.primaryColor.trim(),
        platformLogoUrl: settings.platformLogoUrl || null,
      }).unwrap();
      toast.success('Impostazioni marchio salvate');
    } catch (saveError) {
      toast.error(getRtkErrorMessage(saveError));
    }
  }, [settings, updateBrandSettings]);

  useEffect(() => {
    const onSave = () => {
      void handleSave();
    };
    window.addEventListener('brand-settings:save', onSave);
    return () => window.removeEventListener('brand-settings:save', onSave);
  }, [handleSave]);

  const handleEmergencyToggle = async (key) => {
    if (!emergencyControls) return;

    try {
      const payload = mapEmergencyControlUpdate(key, !emergencyControls[key]);
      await updateEmergencyControls(payload).unwrap();
      toast.success('Impostazioni aggiornate');
    } catch (toggleError) {
      toast.error(getRtkErrorMessage(toggleError));
    }
  };

  const handleLogoSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadBrandLogo(file).unwrap();
      setSettings((prev) => ({
        ...prev,
        platformLogoUrl: result.platformLogoUrl || prev.platformLogoUrl,
      }));
      toast.success('Logo caricato');
    } catch (uploadError) {
      toast.error(getRtkErrorMessage(uploadError));
    } finally {
      event.target.value = '';
    }
  };

  if (isLoading || emergencyLoading) {
    return <Loading size="md" className="min-h-40" />;
  }

  const newUserRegistrations = Boolean(emergencyControls?.userPanel);
  const certificateDownloads = Boolean(emergencyControls?.download);
  const toggleDisabled = isSaving || emergencySaving || isUploadingLogo;

  return (
    <div className="space-y-6">
      {isError ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Impossibile caricare le impostazioni dal server.
          {getRtkErrorMessage(error) ? ` (${getRtkErrorMessage(error)})` : ''}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nome della piattaforma
          </label>
          <input
            type="text"
            value={settings.platformName}
            onChange={(e) => handleInputChange('platformName', e.target.value)}
            disabled={isSaving}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            placeholder="One Security"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Colore primario
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => handleInputChange('primaryColor', e.target.value)}
              disabled={isSaving}
              className="h-10 w-12 cursor-pointer rounded border border-gray-300 bg-white"
            />
            <input
              type="text"
              value={settings.primaryColor}
              onChange={(e) => handleInputChange('primaryColor', e.target.value)}
              disabled={isSaving}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              placeholder="#736FA1"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Platform logo
        </label>
        <div className="flex items-center space-x-4">
          {settings.platformLogoUrl ? (
            <img
              src={settings.platformLogoUrl}
              alt="Platform logo"
              className="h-12 w-12 rounded-lg border border-gray-200 object-contain"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <div className="flex h-6 w-8 items-center justify-center rounded-sm bg-red-500">
                <Upload className="h-3 w-3 text-white" />
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoSelect}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={toggleDisabled}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:opacity-60"
          >
            <Paperclip className="mr-2 h-4 w-4" />
            {isUploadingLogo ? 'Caricamento...' : 'Add logo'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Controlli piattaforma
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          Stesse impostazioni del pannello di emergenza nella dashboard super-admin.
        </p>

        <div className="space-y-4">
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
              type="button"
              onClick={() => void handleEmergencyToggle('userPanel')}
              disabled={toggleDisabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:opacity-60 ${
                newUserRegistrations ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  newUserRegistrations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

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
              type="button"
              onClick={() => void handleEmergencyToggle('download')}
              disabled={toggleDisabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:opacity-60 ${
                certificateDownloads ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  certificateDownloads ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
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
    </div>
  );
}
