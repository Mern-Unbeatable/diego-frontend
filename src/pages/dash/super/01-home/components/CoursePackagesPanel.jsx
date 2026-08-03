import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Building2, Edit2, Package, User } from 'lucide-react';
import Pagination from '../../../../../components/ui/Utilities/Pagination';
import { useGetCoursePackagesQuery } from '../../../../../features/api/coursePackageApi';
import {
  canManageCoursePackage,
  filterPackagesByType,
  getAuthUserLevel,
  getPackageDisplayTitle,
} from '../../../../../features/course/coursePackageMappers';
import CoursePackageFormModal from './CoursePackageFormModal';

const PAGE_SIZE = 10;

const TABS = [
  { type: 'SINGLE_USER', label: 'Singolo utente', icon: User },
  { type: 'COMPANY', label: 'Aziendale', icon: Building2 },
];

export default function CoursePackagesPanel() {
  const authUser = useSelector((state) => state.auth?.user);
  const userLevel = getAuthUserLevel(authUser);
  const isPlatformAdmin = userLevel === 'PLATFORM_ADMIN';

  const [activeTab, setActiveTab] = useState('SINGLE_USER');
  const [page, setPage] = useState(1);
  const [editingPackage, setEditingPackage] = useState(null);

  const { data: allPackages = [], isLoading, isFetching, refetch } = useGetCoursePackagesQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const packagesByType = useMemo(
    () => ({
      SINGLE_USER: filterPackagesByType(allPackages, 'SINGLE_USER'),
      COMPANY: filterPackagesByType(allPackages, 'COMPANY'),
    }),
    [allPackages],
  );

  const currentPackages = packagesByType[activeTab] || [];
  const total = currentPackages.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const displayedPackages = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return currentPackages.slice(start, start + PAGE_SIZE);
  }, [currentPackages, page]);

  const handleSaved = async () => {
    await refetch();
    setEditingPackage(null);
  };

  return (
    <>
      <div className="min-w-0 overflow-hidden rounded-xl border border-[#e3ece8] bg-white shadow-sm sm:rounded-2xl">
        <div className="flex items-start gap-3 border-b border-[#e3ece8] px-4 py-4 sm:px-6 sm:py-5">
          <div className="rounded-xl bg-[#e8f4ef] p-2 text-[#4f8f74] sm:p-2.5">
            <Package size={18} />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-[#141414] sm:text-lg md:text-xl">
              Pacchetti corso
            </h2>
            <p className="text-xs text-[#6b7471] sm:text-sm">
              Modifica i pacchetti esistenti.
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:px-6 sm:py-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.type}
                type="button"
                onClick={() => setActiveTab(tab.type)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap sm:px-4 sm:text-sm ${
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

        <div className={`px-3 pb-1 sm:px-6 ${isFetching ? 'opacity-60' : ''}`}>
          {isLoading && allPackages.length === 0 ? (
            <div className="space-y-2 py-2">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={`package-skeleton-${index}`}
                  className="h-16 animate-pulse rounded-xl border border-[#e3ece8] bg-[#f7faf8]"
                />
              ))}
            </div>
          ) : displayedPackages.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#6b7471]">
              Nessun pacchetto trovato.
            </p>
          ) : (
            <div className="space-y-2">
              {displayedPackages.map((pkg) => {
                const editable = canManageCoursePackage(pkg, authUser);

                return (
                  <div
                    key={pkg.id}
                    className="flex flex-col gap-3 rounded-xl border border-[#e3ece8] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#2f3d37]">
                        {getPackageDisplayTitle(pkg)}
                      </p>
                      <p className="mt-0.5 text-xs text-[#6b7471]">
                        {pkg.tenantId ? 'Tuo tenant' : 'Piattaforma'}
                        {pkg.isActive === false ? ' • Inattivo' : ''}
                      </p>
                    </div>
                    {editable ? (
                      <button
                        type="button"
                        onClick={() => setEditingPackage(pkg)}
                        className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-[#cfdad5] px-4 text-sm font-medium text-[#4f6f62] sm:w-auto"
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

        <div className="px-3 sm:px-6">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={PAGE_SIZE}
            onPageChange={setPage}
            showingLabel={
              total === 0
                ? 'Mostra 0 di 0 pacchetti'
                : `Mostra ${Math.min((page - 1) * PAGE_SIZE + 1, total)}-${Math.min(page * PAGE_SIZE, total)} di ${total} pacchetti`
            }
          />
        </div>
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
