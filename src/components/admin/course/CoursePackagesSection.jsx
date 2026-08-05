import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Edit2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Select } from '../../../Forms';
import { extractPackagesFromResponse, useGetCoursePackagesQuery } from '../../../features/api/coursePackageApi';
import {
  canManageCoursePackage,
  filterActivePackages,
  findPackageById,
  getAuthUserLevel,
  mapPackagesToSelectOptions,
  pickDefaultPackageId,
} from '../../../features/course/coursePackageMappers';
import CoursePackageFormModal from '../../../pages/dash/super/01-home/components/CoursePackageFormModal';

const PACKAGE_FIELDS = [
  {
    type: 'SINGLE_USER',
    field: 'singleUserPackageId',
    label: 'Pacchetto privato',
  },
  {
    type: 'COMPANY',
    field: 'companyPackageId',
    label: 'Pacchetto aziendale',
  },
];

const normalizePackageType = (value) => String(value || '').trim().toUpperCase();

const filterPackagesByNormalizedType = (packages = [], type) =>
  (packages || []).filter((pkg) => normalizePackageType(pkg?.type) === type);

function PackageField({ fieldConfig, packages, canEdit, onEdit }) {
  const { watch, setValue } = useFormContext();
  const selectedId = watch(fieldConfig.field);
  const selectedPackage = findPackageById(packages, selectedId);
  const options = mapPackagesToSelectOptions(packages, { includeEmpty: false });

  useEffect(() => {
    if (!packages.length) return;

    const isValid = packages.some((pkg) => pkg.id === selectedId);
    if (isValid) return;

    const activeList = filterActivePackages(packages);
    const defaultId = pickDefaultPackageId(activeList.length ? activeList : packages);
    if (!defaultId) return;

    setValue(fieldConfig.field, defaultId, {
      shouldDirty: false,
      shouldValidate: true,
    });
  }, [packages, selectedId, fieldConfig.field, setValue]);

  return (
    <div className="flex items-end gap-2">
      <div className="min-w-0 flex-1">
        <Select
          key={`${fieldConfig.field}-${options.map((option) => option.value).join('|')}-${selectedId || 'empty'}`}
          name={fieldConfig.field}
          label={fieldConfig.label}
          required
          variant="course"
          options={
            options.length
              ? options
              : [{ value: '', label: 'Nessun pacchetto disponibile', disabled: true }]
          }
          disabled={options.length === 0}
        />
      </div>
      {canEdit ? (
        <button
          type="button"
          onClick={() => selectedPackage && onEdit(selectedPackage)}
          disabled={!selectedPackage}
          className="mb-0.5 inline-flex h-[46px] shrink-0 items-center gap-1 rounded-xl border border-[#cfdad5] bg-white px-3 text-sm text-[#4f6f62] disabled:opacity-50"
          title="Modifica pacchetto"
        >
          <Edit2 size={15} />
        </button>
      ) : null}
    </div>
  );
}

export default function CoursePackagesSection() {
  const { setValue } = useFormContext();
  const authUser = useSelector((state) => state.auth?.user);
  const isPlatformAdmin = getAuthUserLevel(authUser) === 'PLATFORM_ADMIN';
  const canEditPackages = canManageCoursePackage(undefined, authUser);

  const [editingPackage, setEditingPackage] = useState(null);

  const { data: allPackages = [], isLoading, refetch, isError } = useGetCoursePackagesQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const packageList = useMemo(
    () => extractPackagesFromResponse(allPackages),
    [allPackages],
  );

  const packagesByType = useMemo(
    () => ({
      SINGLE_USER: filterPackagesByNormalizedType(packageList, 'SINGLE_USER'),
      COMPANY: filterPackagesByNormalizedType(packageList, 'COMPANY'),
    }),
    [packageList],
  );

  const handleSaved = async (savedPackage) => {
    await refetch();
    setEditingPackage(null);
    if (!savedPackage?.id) return;
    if (savedPackage.type === 'SINGLE_USER') {
      setValue('singleUserPackageId', savedPackage.id, { shouldDirty: true });
    }
    if (savedPackage.type === 'COMPANY') {
      setValue('companyPackageId', savedPackage.id, { shouldDirty: true });
    }
  };

  return (
    <>
      <div className="space-y-3 rounded-xl border border-[#d5e3dc] bg-[#f7faf8] p-4">
        {isLoading ? (
          <p className="text-sm text-[#6b7471]">Caricamento pacchetti...</p>
        ) : isError ? (
          <p className="text-sm text-[#d35237]">Errore nel caricamento dei pacchetti.</p>
        ) : (
          PACKAGE_FIELDS.map((fieldConfig) => (
            <PackageField
              key={fieldConfig.field}
              fieldConfig={fieldConfig}
              packages={packagesByType[fieldConfig.type] || []}
              canEdit={canEditPackages}
              onEdit={setEditingPackage}
            />
          ))
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
