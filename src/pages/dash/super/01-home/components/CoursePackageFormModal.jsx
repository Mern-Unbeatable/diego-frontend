import React, { useMemo } from 'react';
import { Package, Plus, Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Form, Input, TextArea, Checkbox } from '../../../../../Forms';
import { Modal } from '../../../../../components/ui';
import { useUpdateCoursePackageMutation } from '../../../../../features/api/coursePackageApi';
import {
  mapCoursePackageToFormValues,
  mapCoursePackageFormToPayload,
} from '../../../../../features/course/coursePackageMappers';
import {
  showSuccessToast,
  showRtkErrorToast,
  showErrorToast,
} from '../../../../../utils/toast/toastAlerts';

const inputClass =
  'h-10 w-full rounded-lg border border-[#cfdad5] bg-white px-3 text-sm text-[#222] focus:outline-none focus:ring-1 focus:ring-[#4f8f74]';

function FeatureRowsEditor({ packageType }) {
  const { watch, setValue } = useFormContext();
  const features = watch('features') || [];
  const isCompany = packageType === 'COMPANY';

  const updateFeature = (index, patch) => {
    const next = [...features];
    next[index] = { ...next[index], ...patch };
    setValue('features', next);
  };

  const removeFeature = (index) => {
    setValue(
      'features',
      features.filter((_, rowIndex) => rowIndex !== index),
    );
  };

  const addPricing = () => {
    setValue('features', [
      ...features,
      { kind: 'pricing', label: '', minUsers: '', maxUsers: '', price: '', currency: 'EUR' },
    ]);
  };

  const addCompanyFeature = () => {
    setValue('features', [...features, { kind: 'feature', label: '', currency: 'EUR' }]);
  };

  const addSimpleFeature = () => {
    setValue('features', [...features, { kind: 'simple', text: '' }]);
  };

  if (isCompany) {
    const pricingRows = features.filter((row) => row.kind === 'pricing');
    const benefitRows = features.filter((row) => row.kind === 'feature');

    const renderPricingRow = (row) => {
      const index = features.indexOf(row);
      return (
        <div key={`pricing-${row.id || index}`} className="rounded-lg border border-[#e3ece8] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-[#6b7471]">Fascia prezzo</span>
            <button type="button" onClick={() => removeFeature(index)} className="text-[#d35237]">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <input
              className={`${inputClass} md:col-span-2`}
              placeholder="Etichetta (es. 1-20 utenti - €150/utente)"
              value={row.label || ''}
              onChange={(event) => updateFeature(index, { label: event.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Utenti min"
              type="number"
              min={1}
              value={row.minUsers || ''}
              onChange={(event) => updateFeature(index, { minUsers: event.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Utenti max"
              type="number"
              min={1}
              value={row.maxUsers || ''}
              onChange={(event) => updateFeature(index, { maxUsers: event.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Prezzo"
              type="number"
              min={0}
              value={row.price || ''}
              onChange={(event) => updateFeature(index, { price: event.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Valuta"
              value={row.currency || 'EUR'}
              onChange={(event) => updateFeature(index, { currency: event.target.value })}
            />
          </div>
        </div>
      );
    };

    const renderBenefitRow = (row) => {
      const index = features.indexOf(row);
      return (
        <div key={`benefit-${row.id || index}`} className="rounded-lg border border-[#e3ece8] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-[#6b7471]">Vantaggio incluso</span>
            <button type="button" onClick={() => removeFeature(index)} className="text-[#d35237]">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <input
              className={`${inputClass} md:col-span-2`}
              placeholder="Descrizione (es. Include pannello di amministrazione)"
              value={row.label || ''}
              onChange={(event) => updateFeature(index, { label: event.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Valuta"
              value={row.currency || 'EUR'}
              onChange={(event) => updateFeature(index, { currency: event.target.value })}
            />
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-[#2f3d37]">Fasce di prezzo</p>
            <button
              type="button"
              onClick={addPricing}
              className="inline-flex h-8 items-center gap-1 rounded-full border border-[#9bb5aa] px-3 text-xs font-medium text-[#4f6f62]"
            >
              <Plus size={12} />
              Aggiungi fascia
            </button>
          </div>
          <div className="space-y-2">
            {pricingRows.length === 0 ? (
              <p className="text-sm text-[#6b7471]">Nessuna fascia di prezzo.</p>
            ) : (
              pricingRows.map(renderPricingRow)
            )}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-[#2f3d37]">Vantaggi inclusi</p>
            <button
              type="button"
              onClick={addCompanyFeature}
              className="inline-flex h-8 items-center gap-1 rounded-full border border-[#9bb5aa] px-3 text-xs font-medium text-[#4f6f62]"
            >
              <Plus size={12} />
              Aggiungi vantaggio
            </button>
          </div>
          <div className="space-y-2">
            {benefitRows.length === 0 ? (
              <p className="text-sm text-[#6b7471]">Nessun vantaggio aggiuntivo.</p>
            ) : (
              benefitRows.map(renderBenefitRow)
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-[#2f3d37]">Caratteristiche incluse</p>
        <button
          type="button"
          onClick={addSimpleFeature}
          className="inline-flex h-8 items-center gap-1 rounded-full border border-[#9bb5aa] px-3 text-xs font-medium text-[#4f6f62]"
        >
          <Plus size={12} />
          Aggiungi
        </button>
      </div>
      <div className="space-y-2">
        {features.length === 0 ? (
          <p className="text-sm text-[#6b7471]">Nessuna caratteristica.</p>
        ) : (
          features.map((row, index) => (
            <div key={`simple-${index}`} className="flex items-center gap-2">
              <input
                className={inputClass}
                placeholder="Caratteristica (italiano)"
                value={row.text || ''}
                onChange={(event) => updateFeature(index, { text: event.target.value })}
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="shrink-0 text-[#d35237]"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PackageFormFields({ packageType, showDefaultToggle }) {
  const isCompany = packageType === 'COMPANY';

  return (
    <>
      <Input name="title" label="Titolo" required variant="course" />
      {isCompany ? (
        <TextArea name="description" label="Descrizione" variant="course" rows={3} />
      ) : null}
      <FeatureRowsEditor packageType={packageType} />
      <Checkbox name="isActive" label="Pacchetto attivo" layout="inline" />
      {showDefaultToggle ? (
        <Checkbox name="isDefault" label="Pacchetto predefinito" layout="inline" />
      ) : null}
    </>
  );
}

export default function CoursePackageFormModal({
  isOpen,
  onClose,
  packageData = null,
  onSuccess,
  showDefaultToggle = false,
}) {
  const [updatePackage, { isLoading: saving }] = useUpdateCoursePackageMutation();
  const packageType = packageData?.type || 'SINGLE_USER';

  const defaultValues = useMemo(() => {
    if (!packageData) return null;
    return mapCoursePackageToFormValues(packageData);
  }, [packageData, isOpen]);

  const handleSubmit = async (formData) => {
    if (!packageData?.id) return;

    try {
      const payload = mapCoursePackageFormToPayload({
        ...formData,
        type: packageType,
        key: packageData.key,
      });

      const saved = await updatePackage({ id: packageData.id, ...payload }).unwrap();
      showSuccessToast('Pacchetto aggiornato');
      onSuccess?.(saved);
      onClose();
    } catch (error) {
      if (error?.message && !error?.data) {
        showErrorToast(error.message);
        return;
      }
      showRtkErrorToast(error);
    }
  };

  if (!isOpen || !packageData || !defaultValues) return null;

  const title =
    packageType === 'COMPANY' ? 'Modifica pacchetto aziendale' : 'Modifica pacchetto privato';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      zIndex={120}
      panelClassName="rounded-2xl"
      headerIcon={
        <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
          <Package className="h-5 w-5" />
        </div>
      }
    >
      <Form
        key={packageData.id}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="type" value={packageType} />
        <PackageFormFields packageType={packageType} showDefaultToggle={showDefaultToggle} />
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full border border-[#9bb5aa] px-5 text-sm font-medium text-[#5a6a64]"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-10 rounded-full bg-[#4f8f74] px-6 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Salvataggio...' : 'Salva modifiche'}
          </button>
        </div>
      </Form>
    </Modal>
  );
}
