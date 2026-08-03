import React, { useMemo } from 'react';
import { Layers, Euro } from 'lucide-react';
import { Form, Input, Select, TextArea, Checkbox } from '../../../../../Forms';
import { Modal } from '../../../../../components/ui';
import {
  useGetLicensePlansQuery,
  useCreateLicensePlanMutation,
  useUpdateLicensePlanMutation,
} from '../../../../../features/api/planApi';
import {
  showSuccessToast,
  showRtkErrorToast,
} from '../../../../../utils/toast/toastAlerts';
import {
  mapPlanToFormData,
  getAvailablePlanTiers,
  mapPlanFormToCreatePayload,
  mapPlanFormToUpdatePayload,
} from '../../../../../features/admin/adminMappers';

const TIER_LABELS = {
  BEGINNER: 'Principiante',
  STANDARD: 'Standard',
  PREMIUM: 'Premium',
  ENTERPRISE: 'Enterprise',
};

export default function PlanFormModal({
  isOpen,
  onClose,
  mode = 'create',
  plan = null,
  onSuccess,
}) {
  const { data: plans = [] } = useGetLicensePlansQuery(undefined, {
    skip: !isOpen,
  });
  const [createLicensePlan, { isLoading: createLoading }] =
    useCreateLicensePlanMutation();
  const [updateLicensePlan, { isLoading: updateLoading }] =
    useUpdateLicensePlanMutation();

  const saving = createLoading || updateLoading;

  const availableTiers = useMemo(
    () => (mode === 'create' ? getAvailablePlanTiers(plans) : []),
    [mode, plans],
  );

  const defaultValues = useMemo(() => {
    if (mode === 'edit' && plan) {
      return mapPlanToFormData(plan);
    }

    const values = mapPlanToFormData(null);
    if (availableTiers.length > 0) {
      values.tier = availableTiers[0];
    }
    return values;
  }, [mode, plan, availableTiers, isOpen]);

  const handleSubmit = async (formData) => {
    try {
      if (mode === 'create') {
        const payload = mapPlanFormToCreatePayload(formData);
        await createLicensePlan(payload).unwrap();
        showSuccessToast('Piano creato con successo');
        onSuccess?.(payload.tier);
      } else {
        const payload = mapPlanFormToUpdatePayload(formData);
        await updateLicensePlan({ id: plan.id, ...payload }).unwrap();
        showSuccessToast('Piano aggiornato con successo');
        onSuccess?.(formData.tier);
      }
      onClose();
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  if (!isOpen) return null;

  const isCreate = mode === 'create';
  const title = isCreate ? 'Aggiungi nuovo piano' : 'Modifica piano licenza';
  const canCreate = isCreate && availableTiers.length > 0;

  const tierOptions = availableTiers.map((tier) => ({
    value: tier,
    label: TIER_LABELS[tier] || tier,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description="Configura limiti, prezzi e funzionalità del piano licenza."
      size="xl"
      zIndex={60}
      panelClassName="max-w-lg rounded-2xl sm:max-w-xl lg:max-w-xl"
      headerIcon={
        <div className="rounded-lg bg-emerald-100/50 p-2 text-emerald-700">
          <Layers className="h-5 w-5" />
        </div>
      }
    >
      {isCreate && availableTiers.length === 0 ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 sm:px-5 sm:py-4">
            Tutti i tier disponibili sono già in uso. Modifica un piano esistente
            oppure disattiva un piano non utilizzato.
          </div>
        ) : (
          <Form
            key={`${mode}-${plan?.id || 'new'}`}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            className="min-w-0 space-y-6 sm:space-y-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              {isCreate ? (
                <Select
                  name="tier"
                  label="Tier"
                  required
                  options={tierOptions}
                />
              ) : (
                <div className="group min-w-0">
                  <label className="mb-2 block text-sm font-semibold text-gray-700 sm:mb-3">
                    Tier
                  </label>
                  <div className="rounded-xl border-2 border-gray-100 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 sm:px-4 sm:py-3">
                    {TIER_LABELS[defaultValues.tier] || defaultValues.tier}
                  </div>
                </div>
              )}

              <Input
                name="nome"
                label="Nome piano"
                placeholder="Es. Premium"
                required
              />
            </div>

            <Input
              name="descrizione"
              label="Descrizione"
              placeholder="Breve descrizione del piano"
              multiline
              rows={2}
            />

            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 sm:rounded-2xl sm:p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 sm:mb-4">
                <Euro className="h-4 w-4 shrink-0 text-emerald-600" />
                Prezzi e limiti
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
                <Input
                  name="priceMonthly"
                  label="Prezzo mensile (€)"
                  type="number"
                  min={0}
                  step="0.01"
                  required
                />
                <Input
                  name="priceYearly"
                  label="Prezzo annuale (€)"
                  type="number"
                  min={0}
                  step="0.01"
                  required
                />
                <Input
                  name="sortOrder"
                  label="Ordine visualizzazione"
                  type="number"
                  min={0}
                />
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-3">
                <Input
                  name="maxUsers"
                  label="Max utenti"
                  type="number"
                  min={1}
                  required
                />
                <Input
                  name="maxCourses"
                  label="Max corsi"
                  type="number"
                  min={0}
                  required
                />
                <Input
                  name="storageGb"
                  label="Storage (GB)"
                  type="number"
                  min={0}
                  required
                />
              </div>
            </div>

            <TextArea
              name="funzionalita"
              label="Funzionalità incluse"
              placeholder={'Una funzionalità per riga\nEs. Fino a 200 utenti'}
              rows={5}
            />

            <Input
              name="supporto"
              label="Livello supporto"
              placeholder="Es. Supporto prioritario 24/7"
            />

            <Checkbox name="isActive" label="Piano attivo" />

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
              <p className="text-xs text-gray-500 sm:text-sm">* Campi obbligatori</p>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 sm:w-auto sm:px-6 sm:py-2"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={saving || (isCreate && !canCreate)}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-60 sm:w-auto sm:px-8 sm:py-2"
                >
                  {saving
                    ? 'Salvataggio...'
                    : isCreate
                      ? 'Crea piano'
                      : 'Salva piano'}
                </button>
              </div>
            </div>
          </Form>
        )}
    </Modal>
  );
}
