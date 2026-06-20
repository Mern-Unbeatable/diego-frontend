// src/components/admin/super/components/SettingsLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Save, CreditCard, Mail, Wand2, Plug } from 'lucide-react';

export default function SettingsLayout({ onSave = () => {} }) {
  const tabs = [
    {
      to: 'finance',
      label: 'Impostazioni finanziarie',
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      to: 'system',
      label: 'Impostazioni di sistema',
      icon: <Mail className="h-4 w-4" />,
    },
    { to: 'brand', label: 'Marchio', icon: <Wand2 className="h-4 w-4" /> },
    {
      to: 'api',
      label: 'API & Integrations',
      icon: <Plug className="h-4 w-4" />,
    },
  ];

  return (
    <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 rounded-t-3xl bg-gray-50 px-5 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Impostazioni</h1>
        <button
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
        >
          <Save className="h-4 w-4" />
          Salva le modifiche
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-gray-100 bg-gray-50 p-4 md:rounded-bl-3xl">
          <nav className="space-y-3">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                  [
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition',
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-gray-800 ring-1 ring-gray-200 hover:ring-gray-300',
                  ].join(' ')
                }
              >
                <span>{t.icon}</span>
                <span className="text-sm font-medium">{t.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <section className="p-5 md:p-6">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
