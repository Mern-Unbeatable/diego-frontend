import { useMemo } from 'react';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { Save, CreditCard, Mail, Palette, Plug } from 'lucide-react';
import FinancialSettings from '../components/FinancialSettings';
import SystemSettings from '../components/SystemSettings';
import BrandSettings from '../components/BrandSettings';
import ApiSettings from '../components/ApiSettings';

const BASE_PATH = '/dashboard/super-admin/settings';

const TABS = [
  {
    id: 'finance',
    to: `${BASE_PATH}/finance`,
    label: 'Impostazioni finanziarie',
    icon: <CreditCard className="h-4 w-4" />,
    Component: FinancialSettings,
  },
  {
    id: 'system',
    to: `${BASE_PATH}/system`,
    label: 'Impostazioni di sistema',
    icon: <Mail className="h-4 w-4" />,
    Component: SystemSettings,
  },
  {
    id: 'brand',
    to: `${BASE_PATH}/brand`,
    label: 'Marchio',
    icon: <Palette className="h-4 w-4" />,
    Component: BrandSettings,
  },
  {
    id: 'api',
    to: `${BASE_PATH}/api`,
    label: 'API & Integrazioni',
    icon: <Plug className="h-4 w-4" />,
    Component: ApiSettings,
  },
];

const getActiveSection = (pathname) => {
  if (pathname.includes('/system')) return 'system';
  if (pathname.includes('/brand')) return 'brand';
  if (pathname.includes('/api')) return 'api';
  return 'finance';
};

export default function SettingsLayout() {
  const location = useLocation();
  const isIndexPath =
    location.pathname === BASE_PATH || location.pathname === `${BASE_PATH}/`;

  const activeSection = useMemo(
    () => getActiveSection(location.pathname),
    [location.pathname],
  );

  const ActiveComponent = useMemo(
    () => TABS.find((tab) => tab.id === activeSection)?.Component || FinancialSettings,
    [activeSection],
  );

  const currentTitle = useMemo(() => {
    if (activeSection === 'system') return 'Impostazioni di sistema';
    if (activeSection === 'brand') return 'Marchio';
    if (activeSection === 'api') return 'API & Integrazioni';
    return 'Gateway di pagamento';
  }, [activeSection]);

  const handleSave = () => {
    if (activeSection === 'finance') {
      window.dispatchEvent(new CustomEvent('financial-settings:save'));
    }
  };

  if (isIndexPath) {
    return <Navigate to={`${BASE_PATH}/finance`} replace />;
  }

  return (
    <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-4 rounded-t-3xl bg-gray-50 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">{currentTitle}</h1>
        {activeSection === 'finance' ? (
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
          >
            <Save className="h-4 w-4" />
            Salva le modifiche
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
        <aside className="border-r border-gray-100 bg-gray-50 p-4 md:rounded-bl-3xl">
          <nav className="space-y-3">
            {TABS.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.to}
                end={tab.id === 'finance'}
                className={({ isActive }) =>
                  [
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition',
                    isActive
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

        <section className="p-6">
          <ActiveComponent />
        </section>
      </div>
    </div>
  );
}
