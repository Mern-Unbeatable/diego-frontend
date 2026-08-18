import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useGetFinancialSettingsQuery,
  useUpdateFinancialSettingsMutation,
} from '../../../../../features/api/dashboardApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import Loading from '../../../../../components/ui/Utilities/Loading';

const TAX_OPTIONS = ['0%', '5%', '10%', '15%', '20%', '22%'];

const FinancialSettings = forwardRef(function FinancialSettings(_props, ref) {
  const { data, isLoading, isError, error } = useGetFinancialSettingsQuery();
  const [updateFinancialSettings, { isLoading: isSaving }] =
    useUpdateFinancialSettingsMutation();

  const [settings, setSettings] = useState({
    currency: 'EUR',
    taxRate: '0%',
    stripeEnabled: true,
    paypalEnabled: false,
    applePayEnabled: true,
    googlePayEnabled: true,
  });

  useEffect(() => {
    if (!data) return;
    setSettings({
      currency: data.currency || 'EUR',
      taxRate: `${data.taxRate ?? 0}%`,
      stripeEnabled: Boolean(data.stripeEnabled),
      paypalEnabled: Boolean(data.paypalEnabled),
      applePayEnabled: data.applePayEnabled !== false,
      googlePayEnabled: data.googlePayEnabled !== false,
    });
  }, [data]);

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSave = useCallback(async () => {
    try {
      await updateFinancialSettings({
        currency: settings.currency,
        taxRate: Number.parseFloat(settings.taxRate) || 0,
        stripeEnabled: settings.stripeEnabled,
        paypalEnabled: settings.paypalEnabled,
        applePayEnabled: settings.applePayEnabled,
        googlePayEnabled: settings.googlePayEnabled,
      }).unwrap();
      toast.success('Impostazioni finanziarie salvate');
    } catch (saveError) {
      toast.error(getRtkErrorMessage(saveError));
    }
  }, [settings, updateFinancialSettings]);

  useImperativeHandle(ref, () => ({ save: handleSave }));

  useEffect(() => {
    const onSave = () => {
      void handleSave();
    };
    window.addEventListener('financial-settings:save', onSave);
    return () => window.removeEventListener('financial-settings:save', onSave);
  }, [handleSave]);

  if (isLoading) {
    return <Loading size="md" className="min-h-40" />;
  }

  return (
    <div className="space-y-6">
      {isError ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Impossibile caricare le impostazioni dal server. Puoi modificare i valori
          qui sotto e salvare di nuovo.
          {getRtkErrorMessage(error) ? ` (${getRtkErrorMessage(error)})` : ''}
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Divisa
          </label>
          <div className="relative">
            <select
              value={settings.currency}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, currency: e.target.value }))
              }
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Aliquota fiscale predefinita (%)
          </label>
          <div className="relative">
            <select
              value={settings.taxRate}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, taxRate: e.target.value }))
              }
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              {TAX_OPTIONS.map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Portale di pagamento
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <h4 className="font-medium text-gray-900">Stripe</h4>
              <p className="text-sm text-gray-500">
                Elaborazione delle carte di credito
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('stripeEnabled')}
              disabled={isSaving}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none ${
                settings.stripeEnabled ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.stripeEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <h4 className="font-medium text-gray-900">PayPal</h4>
              <p className="text-sm text-gray-500">Pagamenti PayPal</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('paypalEnabled')}
              disabled={isSaving}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none ${
                settings.paypalEnabled ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.paypalEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <h4 className="font-medium text-gray-900">Apple Pay</h4>
              <p className="text-sm text-gray-500">
                Pagamenti rapidi tramite Stripe (Safari / iOS)
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('applePayEnabled')}
              disabled={isSaving || !settings.stripeEnabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                settings.applePayEnabled && settings.stripeEnabled
                  ? 'bg-emerald-500'
                  : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.applePayEnabled && settings.stripeEnabled
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <h4 className="font-medium text-gray-900">Google Pay</h4>
              <p className="text-sm text-gray-500">
                Pagamenti rapidi tramite Stripe (Chrome / Android)
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('googlePayEnabled')}
              disabled={isSaving || !settings.stripeEnabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                settings.googlePayEnabled && settings.stripeEnabled
                  ? 'bg-emerald-500'
                  : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.googlePayEnabled && settings.stripeEnabled
                    ? 'translate-x-6'
                    : 'translate-x-1'
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
});

export default FinancialSettings;
