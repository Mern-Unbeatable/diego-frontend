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
    activeClass: 'bg-[#73BFA1] text-white',
    dotClass: 'bg-[#73BFA1]',
    btnClass: null,
    defaultExpiry: '31/12/2025',
    showSuffix: false,
  },
  {
    key: 'expiring',
    label: 'Licenze in scadenza',
    activeClass: 'bg-[#FFA756] text-white',
    dotClass: 'bg-[#FFA756]',
    btnClass: 'bg-[#FFA756] hover:bg-[#f59942]',
    defaultExpiry: '31/12/2025',
    showSuffix: true,
  },
  {
    key: 'expired',
    label: 'Licenze scadute',
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
      <div className="w-full p-6">
        <Loading size="md" className="min-h-40" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
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

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-3">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? tab.activeClass
                  : 'bg-[#EFEFEF] text-gray-700 hover:bg-gray-200'
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {displayItems.map((item) => (
            <div
              key={item.id || activeTab}
              className="w-full max-w-md rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs"
            >
              <div className="flex items-baseline gap-1.5">
                <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                  {item.name || 'Henry, Arthur'}
                </h3>
                {currentTab.showSuffix ? (
                  <span className="text-xs font-normal text-gray-500">
                    (Utente licenza)
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-sm font-medium text-gray-700">
                {item.role || 'Freelancer'}
              </p>

              <div className="mt-2.5 flex items-center text-xs text-gray-600 sm:text-sm">
                <span>
                  Scadenza: {item.expiryDate || currentTab.defaultExpiry}
                </span>
                <span
                  className={`ml-1.5 inline-block h-2.5 w-2.5 rounded-full ${currentTab.dotClass}`}
                />
              </div>

              {currentTab.btnClass ? (
                <button
                  className={`mt-4 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white transition-colors ${currentTab.btnClass}`}
                  type="button"
                  onClick={() => setRenewModalOpen(true)}
                >
                  Rinnova licenza
                </button>
              ) : null}
            </div>
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
