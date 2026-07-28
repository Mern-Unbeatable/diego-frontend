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
  <div className="relative">
    <div className="mb-6 flex items-center space-x-2">
      <div className={`h-2 w-2 rounded-full ${color}`} />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
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
        size="md"
      >
        {isEdit && licenseLoading && (
          <Loading size="md" className="min-h-48" />
        )}

        {isEdit && licenseError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            Impossibile caricare i dettagli della licenza.
          </div>
        )}

        {showForm && (
          <Form
            key={formKey}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <FormSection color="bg-blue-500" title="Informazioni aziendali">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              <div className="space-y-6">
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

            <div className="flex flex-col space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">* Campi obbligatori</div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border-2 border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-60"
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
