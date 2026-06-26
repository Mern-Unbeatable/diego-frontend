import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Save, CreditCard, Mail, Palette, Plug } from 'lucide-react';
import FinancialSettings from '../components/FinancialSettings';
import SystemSettings from '../components/SystemSettings';
import BrandSettings from '../components/BrandSettings';
import APISettings from '../components/ApiSettings';

export default function SettingsLayout() {
  const location = useLocation();
  const basePath = '/dashboard/super-admin/impostazioni';

  const tabs = [
    {
      to: `${basePath}/finance`,
      label: 'Impostazioni finanziarie',
      icon: <CreditCard className="h-4 w-4" />,
      component: <FinancialSettings />,
    },
    {
      to: `${basePath}/system`,
      label: 'Impostazioni di sistema',
      icon: <Mail className="h-4 w-4" />,
      component: <SystemSettings />,
    },
    {
      to: `${basePath}/brand`,
      label: 'Marchio',
      icon: <Palette className="h-4 w-4" />,
      component: <BrandSettings />,
    },
    {
      to: `${basePath}/api`,
      label: 'API & Integrazioni',
      icon: <Plug className="h-4 w-4" />,
      component: <APISettings />,
    },
  ];

  // Get current tab title based on route
  const getCurrentTitle = () => {
    const currentPath = location.pathname;
    if (currentPath.includes('system')) return 'Gateway di pagamento';
    if (currentPath.includes('brand')) return 'Gateway di pagamento';
    if (currentPath.includes('api')) return 'API Keys';
    return 'Gateway di pagamento';
  };

  return (
    <div className="m-0 rounded-3xl bg-white shadow-sm ring-1 ring-black/5 md:m-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 rounded-t-3xl bg-gray-50 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          {getCurrentTitle()}
        </h1>
        <button className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">
          <Save className="h-4 w-4" />
          Salva le modifiche
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-gray-100 bg-gray-50 p-4 md:rounded-bl-3xl">
          <nav className="space-y-3">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  [
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition',
                    isActive ||
                    (location.pathname.includes('impostazioni') &&
                      !location.pathname.includes('/') &&
                      tab.to.includes('finance'))
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-gray-800 ring-1 ring-gray-200 hover:ring-gray-300',
                  ].join(' ')
                }
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <section className="p-6">
          <Routes>
            <Route path="finance" element={<FinancialSettings />} />
            <Route path="system" element={<SystemSettings />} />
            <Route path="brand" element={<BrandSettings />} />
            <Route path="api" element={<APISettings />} />
            <Route path="*" element={<FinancialSettings />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}
