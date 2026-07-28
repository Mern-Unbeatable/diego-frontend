import React from 'react';
import { Euro, Users, BookOpen, UserCheck, Ticket } from 'lucide-react';
import { useGetLicenseUserDashboardQuery } from '../../../../../features/api/licenseUserApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import Loading from '../../../../../components/ui/Utilities/Loading';

const Panoramica = () => {
  const { data: dashboardData, isLoading, isError, error, refetch } =
    useGetLicenseUserDashboardQuery();

  if (isLoading) {
    return (
      <div className="w-full p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Panoramica</h2>
        </div>
        <Loading size="md" className="min-h-40" />
      </div>
    );
  }

  if (isError && !dashboardData) {
    return (
      <div className="w-full p-6">
        <div className="rounded-xl bg-red-50 p-6 text-center">
          <p className="text-red-600">{getRtkErrorMessage(error)}</p>
          <button
            onClick={refetch}
            type="button"
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 lg:py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Panoramica</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <Euro className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">Totale venduto</h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            €{(dashboardData?.totaleSales?.value ?? 0).toLocaleString('it-IT')}
          </p>
          <p className="text-sm text-green-600">
            +{dashboardData?.totaleSales?.change ?? 0}%
          </p>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">Nuovi utenti</h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            {dashboardData?.newUsers?.value ?? 0}
          </p>
          <p className="text-sm text-gray-500">
            +{dashboardData?.newUsers?.weeklyIncrease ?? 0} questa settimana
          </p>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">I miei corsi</h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            {dashboardData?.courses?.current ?? 0}/{dashboardData?.courses?.total ?? 0}
          </p>
          <p className="text-sm text-gray-500">
            {dashboardData?.courses?.percentage ?? 0}% di spazio utilizzato
          </p>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <UserCheck className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">Corsisti attivi</h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            {dashboardData?.activeStudents?.current ?? 0}/
            {dashboardData?.activeStudents?.total ?? 0}
          </p>
          <p className="text-sm text-gray-500">
            {dashboardData?.activeStudents?.percentage ?? 0}% di capacità
          </p>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#73BFA1]">
            <Ticket className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-2 text-sm font-medium text-gray-600">I miei ticket</h3>
          <p className="mb-1 text-2xl font-bold text-gray-900">
            {String(dashboardData?.tickets?.value ?? 0).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Panoramica;
