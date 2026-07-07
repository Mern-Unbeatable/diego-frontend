import { useEffect, useState } from 'react';
import LicenseRenewModal from './LicenseRenewModal';

const LicenseComponent = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renewModalOpen, setRenewModalOpen] = useState(false);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/licenses');

        if (!response.ok) {
          throw new Error('Failed to fetch licenses');
        }

        const data = await response.json();
        setLicenses(data);
      } catch (err) {
        console.error(err);
        setLicenses([
          {
            id: 1,
            name: 'Henry, Arthur',
            role: 'Freelancer',
            expiryDate: '2025-12-31',
            status: 'active',
          },
          {
            id: 2,
            name: 'Henry, Arthur',
            role: 'Freelancer',
            expiryDate: '2025-09-30',
            status: 'expiring',
          },
          {
            id: 3,
            name: 'Henry, Arthur',
            role: 'Freelancer',
            expiryDate: '2025-08-31',
            status: 'expired',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  const filteredLicenses = licenses.filter((license) => {
    if (activeTab === 'active') return license.status === 'active';
    if (activeTab === 'expiring') return license.status === 'expiring';
    if (activeTab === 'expired') return license.status === 'expired';
    return true;
  });

  if (loading) {
    return (
      <div className="w-full p-6">
        <div className="animate-pulse">
          <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
          <div className="h-40 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 w-full rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Le tue licenze
        </h2>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('active')}
            className={`rounded-full px-6 py-3 text-sm font-medium transition-all ${activeTab === 'active' ? 'bg-[#73BFA1] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            type="button"
          >
            Licenze attive
          </button>
          <button
            onClick={() => setActiveTab('expiring')}
            className={`rounded-full px-6 py-3 text-sm font-medium transition-all ${activeTab === 'expiring' ? 'bg-[#f97316] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            type="button"
          >
            Licenze in scadenza
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`rounded-full px-6 py-3 text-sm font-medium transition-all ${activeTab === 'expired' ? 'bg-[#c43216] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            type="button"
          >
            Licenze scadute
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredLicenses.map((license) => (
            <div
              key={license.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {license.name}
              </h3>
              <p className="mb-2 text-sm font-medium text-gray-700">
                {license.role}
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Scadenza: {license.expiryDate}
              </p>

              {license.status !== 'active' ? (
                <button
                  className={`rounded-full px-6 py-3 text-sm font-medium text-white ${license.status === 'expiring' ? 'bg-[#f97316] hover:bg-orange-600' : 'bg-[#c43216] hover:bg-red-700'}`}
                  type="button"
                  onClick={() => setRenewModalOpen(true)}
                >
                  Renew the license
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {filteredLicenses.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500">Nessuna licenza trovata</p>
          </div>
        ) : null}
      </div>

      <LicenseRenewModal
        open={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
      />
    </>
  );
};

export default LicenseComponent;
