import { useState } from 'react';
import LicenseRenewModal from './LicenseRenewModal';
import { useGetMyLicenseQuery } from '../../../../../features/api/licenseUserApi';
import { mapTabToStatusFilter } from '../../../../../features/api/licenseUserMappers';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import Loading from '../../../../../components/ui/Utilities/Loading';

const TAB_CONFIG = [
  { key: 'active', label: 'Licenze attive', activeClass: 'bg-[#73BFA1] text-white' },
  { key: 'expiring', label: 'Licenze in scadenza', activeClass: 'bg-[#f97316] text-white' },
  { key: 'expired', label: 'Licenze scadute', activeClass: 'bg-[#c43216] text-white' },
];

const LicenseComponent = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [renewModalOpen, setRenewModalOpen] = useState(false);

  const statusFilter = mapTabToStatusFilter(activeTab);
  const { data: license, isLoading, isError, error, refetch } = useGetMyLicenseQuery({
    statusFilter,
  });

  const filteredLicenses = license ? [license] : [];

  if (isLoading) {
    return (
      <div className="w-full p-6">
        <Loading size="md" className="min-h-40" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 w-full rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Le tue licenze</h2>

        {isError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getRtkErrorMessage(error)}
            <button type="button" onClick={refetch} className="ml-3 font-semibold underline">
              Riprova
            </button>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-3">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? tab.activeClass
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredLicenses.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{item.name}</h3>
              <p className="mb-2 text-sm font-medium text-gray-700">{item.role}</p>
              <p className="mb-4 text-sm text-gray-600">Scadenza: {item.expiryDate}</p>

              {item.status !== 'active' ? (
                <button
                  className={`rounded-full px-6 py-3 text-sm font-medium text-white ${
                    item.status === 'expiring'
                      ? 'bg-[#f97316] hover:bg-orange-600'
                      : 'bg-[#c43216] hover:bg-red-700'
                  }`}
                  type="button"
                  onClick={() => setRenewModalOpen(true)}
                >
                  Rinnova la licenza
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {filteredLicenses.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500">Nessuna licenza trovata per questo stato</p>
          </div>
        ) : null}
      </div>

      <LicenseRenewModal open={renewModalOpen} onClose={() => setRenewModalOpen(false)} />
    </>
  );
};

export default LicenseComponent;
