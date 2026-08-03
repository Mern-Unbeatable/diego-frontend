import React, { useEffect, useMemo, useState } from 'react';
import { Form, Input } from '../../../../../Forms';
import { Modal } from '../../../../../components/ui';
import PlanTypeField from './PlanTypeField';
import PlanFormModal from './PlanFormModal';
import Loading from '../../../../../components/ui/Utilities/Loading';
import { useGetLicensePlansQuery } from '../../../../../features/api/planApi';
import {
  useGetLicenseByUserQuery,
  useCreateLicenseMutation,
  useUpdateLicenseMutation,
} from '../../../../../features/api/licenseApi';
import {
  showSuccessToast,
  showRtkErrorToast,
  showErrorToast,
} from '../../../../../utils/toast/toastAlerts';
import {
  getEmptyLicenseFormValues,
  mapLicenseToFormData,
  mapLicenseFormToCreatePayload,
  mapLicenseFormToUpdatePayload,
  resolveLicensePlanTier,
} from '../../../../../features/admin/adminMappers';

const FormSection = ({ color, title, children }) => (
  <div className="relative min-w-0">
    <div className="mb-4 flex items-center space-x-2 sm:mb-6">
      <div className={`h-2 w-2 shrink-0 rounded-full ${color}`} />
      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{title}</h3>
    </div>
    {children}
  </div>
);

export default function LicenseFormModal({
  isOpen,
  onClose,
  mode = 'create',
  userId = null,
  onSuccess,
}) {
  const isEdit = mode === 'edit';

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [planModalMode, setPlanModalMode] = useState('create');
  const [editingPlan, setEditingPlan] = useState(null);
  const [selectedPlanTier, setSelectedPlanTier] = useState(null);

  const { data: plans = [] } = useGetLicensePlansQuery(undefined, {
    skip: !isOpen,
  });

  const {
    data: license,
    isLoading: licenseLoading,
    isError: licenseError,
  } = useGetLicenseByUserQuery(userId, {
    skip: !isOpen || !isEdit || !userId,
  });

  const [createLicense, { isLoading: createLoading }] = useCreateLicenseMutation();
  const [updateLicense, { isLoading: updateLoading }] = useUpdateLicenseMutation();

  const saving = createLoading || updateLoading;

  useEffect(() => {
    if (!isOpen) {
      setSelectedPlanTier(null);
      setIsPlanModalOpen(false);
      setEditingPlan(null);
      setPlanModalMode('create');
    }
  }, [isOpen]);

  const defaultValues = useMemo(() => {
    if (isEdit) {
      if (!license) return mapLicenseToFormData(null, plans);
      const values = mapLicenseToFormData(license, plans);
      if (selectedPlanTier) values.tipoDiPiano = selectedPlanTier;
      return values;
    }

    const values = getEmptyLicenseFormValues(plans);
    if (selectedPlanTier) values.tipoDiPiano = selectedPlanTier;
    return values;
  }, [isEdit, license, plans, selectedPlanTier]);

  const formKey = isEdit
    ? `edit-license-${userId}-${selectedPlanTier || license?.planTier || ''}`
    : `add-license-${selectedPlanTier || plans[0]?.tier || 'new'}`;

  const handleSubmit = async (formData) => {
    const planTier = resolveLicensePlanTier(formData.tipoDiPiano, plans);

    try {
      if (isEdit) {
        if (!userId) return;
        const payload = mapLicenseFormToUpdatePayload(formData, planTier);
        await updateLicense({ userId, ...payload }).unwrap();
        showSuccessToast('Licenza aggiornata');
      } else {
        const payload = mapLicenseFormToCreatePayload(formData, planTier);
        await createLicense(payload).unwrap();
        showSuccessToast('Licenza creata con successo');
        onSuccess?.();
      }
      onClose();
    } catch (error) {
      showRtkErrorToast(error);
    }
  };

  const openCreatePlanModal = () => {
    setPlanModalMode('create');
    setEditingPlan(null);
    setIsPlanModalOpen(true);
  };

  const openEditPlanModal = (plan) => {
    if (!plan) {
      showErrorToast('Seleziona un piano da modificare');
      return;
    }
    setPlanModalMode('edit');
    setEditingPlan(plan);
    setIsPlanModalOpen(true);
  };

  if (!isOpen) return null;
  if (isEdit && !userId) return null;

  const title = isEdit ? 'Modifica licenza' : 'Aggiungi nuova licenza';
  const accentColor = isEdit ? 'bg-blue-500' : 'bg-emerald-500';
  const submitLabel = saving
    ? 'Salvataggio...'
    : isEdit
      ? 'Salva modifiche'
      : 'Aggiungi licenza';

  const showForm = !isEdit || (!licenseLoading && !licenseError && license);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        accentColor={accentColor}
        size="xl"
        panelClassName="max-w-lg sm:max-w-xl"
      >
        {isEdit && licenseLoading && (
          <Loading size="md" className="min-h-48" />
        )}

        {isEdit && licenseError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:px-5 sm:py-4">
            Impossibile caricare i dettagli della licenza.
          </div>
        )}

        {showForm && (
          <Form
            key={formKey}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            className="min-w-0 space-y-6 sm:space-y-8"
          >
            <FormSection color="bg-blue-500" title="Informazioni aziendali">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <Input
                  name="nomeEnteDiFormazione"
                  label="Nome ente di formazione"
                  placeholder="Inserisci il nome dell'azienda"
                  required
                />
                <Input
                  name="numeroDiTelefono"
                  label="Numero di telefono"
                  type="tel"
                  placeholder="Inserisci il numero telefonico"
                  required
                />
              </div>
            </FormSection>

            {!isEdit && (
              <FormSection color="bg-indigo-500" title="Accesso utente licenza">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                  <Input name="nome" label="Nome referente" placeholder="Nome" />
                  <Input name="cognome" label="Cognome referente" placeholder="Cognome" />
                  <Input
                    name="password"
                    label="Password iniziale"
                    type="password"
                    placeholder="Minimo 8 caratteri"
                    minLength={8}
                    required
                    className="md:col-span-2"
                    helperText="Il titolare della licenza userà questa password per il primo accesso."
                  />
                </div>
              </FormSection>
            )}

            <FormSection color="bg-purple-500" title="Informazioni di contatto">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <Input
                  name="indirizzoEmail"
                  label="Indirizzo e-mail"
                  type="email"
                  placeholder="esempio@azienda.it"
                  required
                />
                <Input
                  name="postaElettronicaCertificataPEC"
                  label="Posta elettronica certificata PEC"
                  type="email"
                  placeholder="pec@azienda.it"
                />
              </div>
            </FormSection>

            <FormSection color="bg-orange-500" title="Configurazione piattaforma">
              <div className="min-w-0 space-y-4 sm:space-y-6">
                <Input
                  name="sottodominio"
                  label="Sottodominio"
                  placeholder="miazienda"
                  suffix=".unosicurezza.com"
                  required
                />
                <PlanTypeField
                  plans={plans}
                  onAddPlan={openCreatePlanModal}
                  onEditPlan={openEditPlanModal}
                />
              </div>
            </FormSection>

            <div className="flex flex-col border-t border-gray-100 pt-4 sm:pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-gray-500 sm:text-sm">* Campi obbligatori</div>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:space-x-3 sm:gap-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 sm:w-auto sm:px-6 sm:py-2"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-60 sm:w-auto sm:px-8 sm:py-2"
                  >
                    {submitLabel}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Modal>

      <PlanFormModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        mode={planModalMode}
        plan={editingPlan}
        onSuccess={(tier) => setSelectedPlanTier(tier)}
      />
    </>
  );
}
