import { useState } from 'react';
import LicenseRenewModal from './LicenseRenewModal';
import { useGetMyLicenseQuery } from '../../../../../features/api/licenseUserApi';
import { mapTabToStatusFilter } from '../../../../../features/api/licenseUserMappers';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import Loading from '../../../../../components/ui/Utilities/Loading';

const TAB_CONFIG = [
  {
    key: 'active',
    label: 'Licenze attive',
    shortLabel: 'Attive',
    activeClass: 'bg-[#73BFA1] text-white',
    dotClass: 'bg-[#73BFA1]',
    btnClass: null,
    defaultExpiry: '31/12/2025',
    showSuffix: false,
  },
  {
    key: 'expiring',
    label: 'Licenze in scadenza',
    shortLabel: 'In scadenza',
    activeClass: 'bg-[#FFA756] text-white',
    dotClass: 'bg-[#FFA756]',
    btnClass: 'bg-[#FFA756] hover:bg-[#f59942]',
    defaultExpiry: '31/12/2025',
    showSuffix: true,
  },
  {
    key: 'expired',
    label: 'Licenze scadute',
    shortLabel: 'Scadute',
    activeClass: 'bg-[#D9381E] text-white',
    dotClass: 'bg-[#D9381E]',
    btnClass: 'bg-[#D9381E] hover:bg-[#b82e17]',
    defaultExpiry: '31/08/2025',
    showSuffix: true,
  },
];

const LicenseComponent = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [renewModalOpen, setRenewModalOpen] = useState(false);

  const statusFilter = mapTabToStatusFilter(activeTab);
  const {
    data: license,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMyLicenseQuery({
    statusFilter,
  });

  const currentTab =
    TAB_CONFIG.find((t) => t.key === activeTab) || TAB_CONFIG[0];
  const displayItems = license
    ? [license]
    : [
        {
          id: 'default-card',
          name: 'Henry, Arthur',
          role: 'Freelancer',
          expiryDate: currentTab.defaultExpiry,
        },
      ];

  if (isLoading) {
    return (
      <div className="min-w-0 w-full p-4 sm:p-6">
        <Loading size="md" className="min-h-40" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 min-w-0 w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:mt-6 sm:rounded-2xl sm:p-6 md:mt-8 md:p-8">
        <h2 className="mb-4 text-base font-semibold text-gray-900 sm:mb-6 sm:text-lg md:text-xl">
          Le tue licenze
        </h2>

        {isError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getRtkErrorMessage(error)}
            <button
              type="button"
              onClick={refetch}
              className="ml-3 font-semibold underline"
            >
              Riprova
            </button>
          </div>
        )}

        {/* Filter Tabs — scrollable on mobile */}
        <div className="-mx-1 mb-5 overflow-x-auto px-1 sm:mb-6">
          <div className="flex w-max min-w-full gap-2 sm:w-auto sm:flex-wrap sm:gap-3">
            {TAB_CONFIG.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex h-9 shrink-0 items-center justify-center rounded-full px-3 text-xs font-medium whitespace-nowrap transition-all sm:h-10 sm:px-5 sm:text-sm ${
                    isActive
                      ? tab.activeClass
                      : 'bg-[#EFEFEF] text-gray-700 hover:bg-gray-200'
                  }`}
                  type="button"
                >
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {displayItems.map((item) => (
            <article
              key={item.id || activeTab}
              className="w-full rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm sm:max-w-md sm:rounded-2xl sm:p-5 md:p-6"
            >
              <div className="flex min-w-0 flex-wrap items-baseline gap-1.5">
                <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                  {item.name || 'Henry, Arthur'}
                </h3>
                {currentTab.showSuffix ? (
                  <span className="text-xs font-normal text-gray-500">
                    (Utente licenza)
                  </span>
                ) : null}
              </div>

              <p className="mt-1.5 text-sm font-medium text-gray-700 sm:mt-2">
                {item.role || 'Freelancer'}
              </p>

              <div className="mt-2 flex items-center text-xs text-gray-600 sm:mt-2.5 sm:text-sm">
                <span>
                  Scadenza: {item.expiryDate || currentTab.defaultExpiry}
                </span>
                <span
                  className={`ml-1.5 inline-block h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5 ${currentTab.dotClass}`}
                />
              </div>

              {currentTab.btnClass ? (
                <button
                  className={`mt-4 inline-flex h-10 w-full items-center justify-center rounded-full px-5 text-sm font-medium text-white transition-colors sm:w-auto sm:px-6 ${currentTab.btnClass}`}
                  type="button"
                  onClick={() => setRenewModalOpen(true)}
                >
                  Rinnova licenza
                </button>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <LicenseRenewModal
        open={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
      />
    </>
  );
};

export default LicenseComponent;
