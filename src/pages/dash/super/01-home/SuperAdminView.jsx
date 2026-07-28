import React, { useMemo, useState } from 'react';
import Loading from '../../../../components/ui/Utilities/Loading';
import {
  useGetPlatformDashboardQuery,
  useGetEmergencyControlsQuery,
  useUpdateEmergencyControlsMutation,
} from '../../../../features/api/dashboardApi';
import { useGetLicensesQuery } from '../../../../features/api/licenseApi';
import { mapEmergencyControlUpdate } from '../../../../features/admin/adminMappers';
import {
  showSuccessToast,
  showRtkErrorToast,
} from '../../../../utils/toast/toastAlerts';
import KPIStateCards from './components/KPIStateCards';
import EmergencyControlPanel from './components/EmergencyControlPanel';
import LicenseeManagement from './components/LicenseeManagement';
import CourseFormModal from './components/CourseFormModal';

function SuperAdminView() {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data: dashboard, isLoading: dashboardLoading } = useGetPlatformDashboardQuery({});
  const { data: emergencyControls, isLoading: emergencyControlsLoading } =
    useGetEmergencyControlsQuery();
  const [updateEmergencyControls, { isLoading: emergencyControlsSaving }] =
    useUpdateEmergencyControlsMutation();

  const { data: licensesData, isLoading: licensesLoading } = useGetLicensesQuery({
    limit: 20,
    search: search.trim() || undefined,
  });

  const licenses = licensesData?.licenses ?? [];

  const handleEmergencyToggle = async (key) => {
    if (!emergencyControls) return;

    try {
      const payload = mapEmergencyControlUpdate(key, !emergencyControls[key]);
      await updateEmergencyControls(payload).unwrap();
      showSuccessToast('Impostazioni aggiornate');
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  if (dashboardLoading && !dashboard) {
    return <Loading size="md" className="min-h-60" />;
  }

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-8">
        <KPIStateCards
          revenue30d={dashboard?.revenue30d ?? 0}
          revenueTrend={dashboard?.revenueTrend ?? 0}
          activeUsers={dashboard?.activeUsers ?? 0}
          usersTrend={dashboard?.usersTrend ?? 0}
          licenses={dashboard?.licenses ?? { total: 0, active: 0, trial: 0, trend: 0 }}
          health={dashboard?.health ?? 0}
          uptime={dashboard?.uptime ?? 0}
          totalCourses={dashboard?.totalCourses ?? 0}
          onAddCourse={() => setIsCourseModalOpen(true)}
        />

        <EmergencyControlPanel
          permissions={emergencyControls}
          loading={emergencyControlsLoading}
          saving={emergencyControlsSaving}
          onToggle={handleEmergencyToggle}
        />

        {licensesLoading && licenses.length === 0 ? (
          <Loading size="md" className="min-h-40" />
        ) : (
          <LicenseeManagement
            rows={licenses}
            search={search}
            onSearchChange={setSearch}
          />
        )}
      </div>

      <CourseFormModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSuccess={() => setIsCourseModalOpen(false)}
      />
    </div>
  );
}

export default SuperAdminView;
