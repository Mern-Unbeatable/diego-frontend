import React from 'react';
import { Pencil, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import Select from '../../../../../Forms/Select';

export default function PlanTypeField({
  plans = [],
  onAddPlan,
  onEditPlan,
  name = 'tipoDiPiano',
}) {
  const { watch } = useFormContext();
  const value = watch(name);
  const selectedPlan = plans.find((plan) => plan.tier === value);

  const options =
    plans.length > 0
      ? plans.map((plan) => ({
          value: plan.tier,
          label: `${plan.label} (${plan.maxUsers} utenti)${
            plan.priceMonthly ? ` - €${plan.priceMonthly}/mese` : ''
          }`,
        }))
      : [
          { value: 'BEGINNER', label: 'Principiante (50 utenti)' },
          { value: 'STANDARD', label: 'Standard (100 utenti)' },
          { value: 'PREMIUM', label: 'Premium (200 utenti)' },
          { value: 'ENTERPRISE', label: 'Enterprise (500 utenti)' },
        ];

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-gray-700">
          Gestione piani
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddPlan}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <Plus className="h-3.5 w-3.5" />
            Nuovo piano
          </button>
          <button
            type="button"
            onClick={() => onEditPlan?.(selectedPlan)}
            disabled={!selectedPlan}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            Modifica piano
          </button>
        </div>
      </div>

      <Select
        name={name}
        label="Tipo di piano"
        required
        options={options}
      />

      {selectedPlan && (
        <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-xs text-emerald-900">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              <strong>Utenti:</strong> {selectedPlan.maxUsers ?? '—'}
            </span>
            <span>
              <strong>Corsi:</strong> {selectedPlan.maxCourses ?? '—'}
            </span>
            <span>
              <strong>Storage:</strong>{' '}
              {selectedPlan.storageMb
                ? `${Math.round(selectedPlan.storageMb / 1024)} GB`
                : '—'}
            </span>
            <span>
              <strong>Annuale:</strong> €
              {selectedPlan.priceYearly ?? selectedPlan.priceAnnual ?? '—'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
