import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Building2, Edit2, Package, User } from 'lucide-react';
import { useGetCoursePackagesQuery } from '../../../../../features/api/coursePackageApi';
import {
  canManageCoursePackage,
  filterPackagesByType,
  getAuthUserLevel,
  getPackageDisplayTitle,
} from '../../../../../features/course/coursePackageMappers';
import CoursePackageFormModal from './CoursePackageFormModal';

const TABS = [
  { type: 'SINGLE_USER', label: 'Singolo utente', icon: User },
  { type: 'COMPANY', label: 'Aziendale', icon: Building2 },
];

export default function CoursePackagesPanel() {
  const authUser = useSelector((state) => state.auth?.user);
  const userLevel = getAuthUserLevel(authUser);
  const isPlatformAdmin = userLevel === 'PLATFORM_ADMIN';

  const [activeTab, setActiveTab] = useState('SINGLE_USER');
  const [editingPackage, setEditingPackage] = useState(null);

  const { data: allPackages = [], isLoading, isFetching, refetch } = useGetCoursePackagesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const packagesByType = useMemo(
    () => ({
      SINGLE_USER: filterPackagesByType(allPackages, 'SINGLE_USER'),
      COMPANY: filterPackagesByType(allPackages, 'COMPANY'),
    }),
    [allPackages],
  );

  const currentPackages = packagesByType[activeTab] || [];

  const handleSaved = async () => {
    await refetch();
    setEditingPackage(null);
  };

  return (
    <>
      <div className="rounded-2xl border border-[#e3ece8] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-[#e8f4ef] p-2.5 text-[#4f8f74]">
            <Package size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#141414]">Pacchetti corso</h2>
            <p className="text-sm text-[#6b7471]">Modifica i pacchetti esistenti.</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.type}
                type="button"
                onClick={() => setActiveTab(tab.type)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  activeTab === tab.type
                    ? 'bg-[#4f8f74] text-white'
                    : 'bg-[#f3f7f5] text-[#5a6a64] ring-1 ring-[#d5e3dc]'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {isLoading && allPackages.length === 0 ? (
          <div className="space-y-2 py-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={`package-skeleton-${index}`}
                className="h-16 animate-pulse rounded-xl border border-[#e3ece8] bg-[#f7faf8]"
              />
            ))}
          </div>
        ) : currentPackages.length === 0 ? (
          <p className="py-10 text-center text-sm text-[#6b7471]">Nessun pacchetto trovato.</p>
        ) : (
          <div className={`space-y-2 ${isFetching ? 'opacity-60' : ''}`}>
            {currentPackages.map((pkg) => {
              const editable = canManageCoursePackage(pkg, authUser);

              return (
                <div
                  key={pkg.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e3ece8] px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-[#2f3d37]">{getPackageDisplayTitle(pkg)}</p>
                    <p className="mt-0.5 text-xs text-[#6b7471]">
                      {pkg.tenantId ? 'Tuo tenant' : 'Piattaforma'}
                      {pkg.isActive === false ? ' • Inattivo' : ''}
                    </p>
                  </div>
                  {editable ? (
                    <button
                      type="button"
                      onClick={() => setEditingPackage(pkg)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#cfdad5] px-4 text-sm font-medium text-[#4f6f62]"
                    >
                      <Edit2 size={14} />
                      Modifica
                    </button>
                  ) : (
                    <span className="text-xs text-[#8a9490]">Solo lettura</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {editingPackage ? (
        <CoursePackageFormModal
          isOpen
          onClose={() => setEditingPackage(null)}
          packageData={editingPackage}
          onSuccess={handleSaved}
          showDefaultToggle={isPlatformAdmin}
        />
      ) : null}
    </>
  );
}
