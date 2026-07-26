import React, { useMemo, useState } from 'react';
import { Check, Layers, Pencil, Plus, Power, Trash2 } from 'lucide-react';
import Loading from '../../../../../components/ui/Utilities/Loading';
import PlanFormModal from './PlanFormModal';
import {
  useDeleteLicensePlanMutation,
  useGetLicensePlansQuery,
  useToggleLicensePlanActiveMutation,
} from '../../../../../features/api/planApi';
import {
  showConfirmToast,
  showRtkErrorToast,
  showSuccessToast,
} from '../../../../../utils/toast/toastAlerts';

const TIER_LABELS = {
  BEGINNER: 'Principiante',
  STANDARD: 'Standard',
  PREMIUM: 'Premium',
  ENTERPRISE: 'Enterprise',
};

const formatPrice = (amount) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount ?? 0);

const getPlanFeatures = (plan) => {
  if (Array.isArray(plan.features)) return plan.features;
  if (plan.features?.it) return plan.features.it;
  if (plan.features?.en) return plan.features.en;
  return [];
};

const getSupportLabel = (plan) => {
  if (typeof plan.supportLevel === 'string') return plan.supportLevel;
  return plan.supportLevel?.it || plan.supportLevel?.en || 'Supporto standard';
};

export default function LicensePlansPanel() {
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [planModalMode, setPlanModalMode] = useState('create');
  const [editingPlan, setEditingPlan] = useState(null);

  const { data: plans = [], isLoading, isFetching, refetch } = useGetLicensePlansQuery(
    { limit: 100, sortBy: 'sortOrder', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true },
  );
  const [deletePlan, { isLoading: deleting }] = useDeleteLicensePlanMutation();
  const [togglePlanActive, { isLoading: toggling }] = useToggleLicensePlanActiveMutation();

  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [plans],
  );

  const openCreate = () => {
    setPlanModalMode('create');
    setEditingPlan(null);
    setPlanModalOpen(true);
  };

  const openEdit = (plan) => {
    setPlanModalMode('edit');
    setEditingPlan(plan);
    setPlanModalOpen(true);
  };

  const handleDelete = async (plan) => {
    const confirmed = await showConfirmToast({
      title: 'Elimina piano licenza',
      message: `Eliminare il piano "${plan.label || TIER_LABELS[plan.tier] || plan.tier}"? Questa azione non può essere annullata.`,
      confirmLabel: 'Elimina',
      cancelLabel: 'Annulla',
      variant: 'danger',
    });
    if (!confirmed) return;

    try {
      await deletePlan(plan.id).unwrap();
      showSuccessToast('Piano eliminato con successo');
      refetch();
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const handleToggleActive = async (plan) => {
    try {
      await togglePlanActive({
        id: plan.id,
        isActive: !plan.isActive,
      }).unwrap();
      showSuccessToast(plan.isActive ? 'Piano disattivato' : 'Piano attivato');
      refetch();
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const isInitialLoading = isLoading && plans.length === 0;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Piani licenza</h3>
          <p className="mt-1 text-sm text-gray-500">
            Gestisci i piani mostrati nel rinnovo licenza (Principiante, Standard, Premium).
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600"
        >
          <Plus className="h-5 w-5" />
          Aggiungi piano
        </button>
      </div>

      {isInitialLoading ? (
        <Loading size="md" className="min-h-60" />
      ) : (
        <div className={`relative mt-6 ${isFetching ? 'opacity-70' : ''}`}>
          {sortedPlans.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-14 text-center">
              <Layers className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium text-gray-700">Nessun piano licenza</p>
              <p className="mt-1 text-sm text-gray-500">
                Crea il primo piano per abilitare il rinnovo licenza.
              </p>
              <button
                type="button"
                onClick={openCreate}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white"
              >
                <Plus className="h-4 w-4" />
                Aggiungi piano
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {sortedPlans.map((plan) => {
                const features = getPlanFeatures(plan);
                const title = plan.label || TIER_LABELS[plan.tier] || plan.tier;

                return (
                  <article
                    key={plan.id}
                    className={`rounded-2xl border p-5 ${
                      plan.isActive
                        ? 'border-[#bde3d4] bg-[#f5fbf8]'
                        : 'border-gray-200 bg-gray-50 opacity-80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xl font-semibold text-[#2f2f2f]">{title}</p>
                          <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                            {TIER_LABELS[plan.tier] || plan.tier}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              plan.isActive
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {plan.isActive ? 'Attivo' : 'Inattivo'}
                          </span>
                        </div>
                        <p className="mt-2 text-2xl font-semibold text-[#2f2f2f]">
                          {formatPrice(plan.priceYearly ?? plan.priceAnnual)}
                          <span className="ml-1 text-sm font-medium text-[#5f5f5f]">
                            / anno IVA inclusa
                          </span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Mensile: {formatPrice(plan.priceMonthly)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(plan)}
                          className="rounded-lg p-2 text-gray-700 hover:bg-white/80"
                          title="Modifica piano"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(plan)}
                          disabled={toggling}
                          className="rounded-lg p-2 text-emerald-700 hover:bg-white/80 disabled:opacity-50"
                          title={plan.isActive ? 'Disattiva piano' : 'Attiva piano'}
                        >
                          <Power className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(plan)}
                          disabled={deleting}
                          className="rounded-lg p-2 text-red-600 hover:bg-white/80 disabled:opacity-50"
                          title="Elimina piano"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-sm text-[#5d5d5d]">
                      <li className="flex items-center gap-2">
                        <Check size={13} className="text-[#73bfa1]" />
                        Fino a {plan.maxUsers} utenti
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={13} className="text-[#73bfa1]" />
                        Fino a {plan.maxCourses} corsi
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={13} className="text-[#73bfa1]" />
                        Storage: {Math.round((plan.storageMb ?? 0) / 1024) || 0} GB
                      </li>
                      {features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check size={13} className="text-[#73bfa1]" />
                          {feature}
                        </li>
                      ))}
                      <li className="flex items-center gap-2">
                        <Check size={13} className="text-[#73bfa1]" />
                        {getSupportLabel(plan)}
                      </li>
                    </ul>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      <PlanFormModal
        isOpen={planModalOpen}
        mode={planModalMode}
        plan={editingPlan}
        onClose={() => {
          setPlanModalOpen(false);
          setEditingPlan(null);
          setPlanModalMode('create');
        }}
        onSuccess={() => {
          refetch();
        }}
      />
    </>
  );
}
