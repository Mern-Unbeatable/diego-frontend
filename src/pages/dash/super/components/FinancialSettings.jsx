import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FinancialSettings() {
  const [settings, setSettings] = useState({
    currency: 'EUR',
    taxRate: '0%',
    stripeEnabled: true,
    paypalEnabled: false,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Currency and Tax Settings */}
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
              <option value="0%">0%</option>
              <option value="5%">5%</option>
              <option value="10%">10%</option>
              <option value="15%">15%</option>
              <option value="20%">20%</option>
              <option value="22%">22%</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Payment Gateways */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Portale di pagamento
        </h3>

        <div className="space-y-4">
          {/* Stripe */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <h4 className="font-medium text-gray-900">Stripe</h4>
              <p className="text-sm text-gray-500">
                Elaborazione delle carte di credito
              </p>
            </div>
            <button
              onClick={() => handleToggle('stripeEnabled')}
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

          {/* PayPal */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div>
              <h4 className="font-medium text-gray-900">PayPal</h4>
              <p className="text-sm text-gray-500">Pagamenti PayPal</p>
            </div>
            <button
              onClick={() => handleToggle('paypalEnabled')}
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
        </div>
      </div>
    </div>
  );
}
