import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Loading from '../../../../../components/ui/Utilities/Loading';
import {
  useGetStaffMembersQuery,
  useCreateStaffMemberMutation,
  useUpdateStaffMemberMutation,
  useUploadStaffDocumentMutation,
  useConfirmStaffMemberMutation,
  useCancelStaffMemberMutation,
  useLazyDownloadStaffDocumentQuery,
} from '../../../../../features/api/staffApi';
import {
  DOCUMENT_LABEL_TO_TYPE,
  STAFF_ROLES,
  buildCreateStaffFormData,
  buildStaffDocumentFormData,
  mapStaffMemberToSectionInitial,
} from '../../../../../features/api/staffMappers';
import {
  showSuccessToast,
  showRtkErrorToast,
  showWarningToast,
  showConfirmToast,
} from '../../../../../utils/toast/toastAlerts';
import TrainingProjectManagerSection from './TrainingProjectManagerSection';

export default function StaffRoleSection({
  role,
  title,
  subtitle,
  documentLabels,
  showPersonFields = true,
  companyLabel = 'Societa',
  showFooterActions = false,
}) {
  const { data, isLoading } = useGetStaffMembersQuery({
    role,
    page: 1,
    limit: 1,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  });

  const staffMember = data?.staffMembers?.[0] ?? null;
  const staffMemberId = staffMember?.id ?? null;
  const localStaffMemberIdRef = useRef(null);
  const effectiveStaffMemberId = staffMemberId || localStaffMemberIdRef.current;

  useEffect(() => {
    if (staffMemberId) {
      localStaffMemberIdRef.current = staffMemberId;
    }
  }, [staffMemberId]);

  const [createStaffMember] = useCreateStaffMemberMutation();
  const [updateStaffMember] = useUpdateStaffMemberMutation();
  const [uploadStaffDocument] = useUploadStaffDocumentMutation();
  const [confirmStaffMember, { isLoading: confirming }] = useConfirmStaffMemberMutation();
  const [cancelStaffMember, { isLoading: cancelling }] = useCancelStaffMemberMutation();
  const [fetchDocument] = useLazyDownloadStaffDocumentQuery();

  const saveTimerRef = useRef(null);
  const pendingFormRef = useRef(null);
  const creatingRef = useRef(false);

  const sectionInitial = useMemo(
    () => mapStaffMemberToSectionInitial(staffMember, documentLabels),
    [staffMember, documentLabels],
  );

  useEffect(() => {
    pendingFormRef.current = sectionInitial;
  }, [sectionInitial]);

  const isCompanyRole = role === STAFF_ROLES.PLATFORM_DEVELOPER;

  const validateIdentity = useCallback(
    (form) => {
      if (isCompanyRole) {
        if (!form.societa?.trim()) {
          showWarningToast(`Inserisci ${companyLabel} prima di continuare`);
          return false;
        }
        return true;
      }

      if (!form.nome?.trim() || !form.cognome?.trim()) {
        showWarningToast('Inserisci nome e cognome prima di continuare');
        return false;
      }

      return true;
    },
    [isCompanyRole, companyLabel],
  );

  const ensureStaffMember = useCallback(
    async (form) => {
      if (effectiveStaffMemberId) return effectiveStaffMemberId;
      if (creatingRef.current) return null;

      if (!validateIdentity(form)) return null;

      creatingRef.current = true;
      try {
        const created = await createStaffMember(
          buildCreateStaffFormData({
            role,
            firstName: form.nome?.trim(),
            lastName: form.cognome?.trim(),
            companyName: form.societa?.trim(),
          }),
        ).unwrap();
        const createdId = created?.id ?? null;
        if (createdId) {
          localStaffMemberIdRef.current = createdId;
        }
        return createdId;
      } catch (error) {
        showRtkErrorToast(error);
        return null;
      } finally {
        creatingRef.current = false;
      }
    },
    [effectiveStaffMemberId, validateIdentity, createStaffMember, role],
  );

  const persistForm = useCallback(
    async (form) => {
      if (!validateIdentity(form)) return;

      try {
        if (effectiveStaffMemberId) {
          await updateStaffMember({
            staffMemberId: effectiveStaffMemberId,
            role,
            ...(isCompanyRole
              ? { companyName: form.societa?.trim() }
              : {
                  firstName: form.nome?.trim(),
                  lastName: form.cognome?.trim(),
                }),
          }).unwrap();
          return;
        }

        await ensureStaffMember(form);
      } catch (error) {
        showRtkErrorToast(error);
      }
    },
    [effectiveStaffMemberId, validateIdentity, updateStaffMember, isCompanyRole, ensureStaffMember, role],
  );

  const handleFormChange = useCallback(
    (form) => {
      pendingFormRef.current = form;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        persistForm(form);
      }, 600);
    },
    [persistForm],
  );

  useEffect(
    () => () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    },
    [],
  );

  const handleUpload = useCallback(
    async (label, file) => {
      const documentType = DOCUMENT_LABEL_TO_TYPE[label];
      if (!documentType) {
        showWarningToast('Tipo documento non riconosciuto');
        return { name: file.name };
      }

      const form = pendingFormRef.current || sectionInitial;
      const memberId = await ensureStaffMember(form);
      if (!memberId) return { name: file.name };

      try {
        const uploaded = await uploadStaffDocument({
          staffMemberId: memberId,
          documentType,
          formData: buildStaffDocumentFormData(file),
        }).unwrap();

        showSuccessToast('Documento caricato con successo');
        return {
          name: uploaded?.fileName || file.name,
          url: uploaded?.fileUrl,
        };
      } catch (error) {
        showRtkErrorToast(error);
        throw error;
      }
    },
    [sectionInitial, ensureStaffMember, uploadStaffDocument],
  );

  const handleDownload = useCallback(
    async (label, meta) => {
      if (meta?.url) {
        window.open(meta.url, '_blank', 'noopener,noreferrer');
        return;
      }

      const documentType = DOCUMENT_LABEL_TO_TYPE[label];
      if (!effectiveStaffMemberId || !documentType) {
        showWarningToast('Nessun file disponibile per il download');
        return;
      }

      try {
        const document = await fetchDocument({
          staffMemberId: effectiveStaffMemberId,
          documentType,
        }).unwrap();

        if (document?.fileUrl) {
          window.open(document.fileUrl, '_blank', 'noopener,noreferrer');
          return;
        }

        showWarningToast('Nessun file disponibile per il download');
      } catch (error) {
        showRtkErrorToast(error);
      }
    },
    [effectiveStaffMemberId, fetchDocument],
  );

  const handleConfirm = useCallback(async () => {
    const form = pendingFormRef.current || sectionInitial;
    const memberId = effectiveStaffMemberId || (await ensureStaffMember(form));
    if (!memberId) return;

    try {
      await confirmStaffMember(memberId).unwrap();
      showSuccessToast('Profilo confermato con successo');
    } catch (error) {
      showRtkErrorToast(error);
    }
  }, [sectionInitial, effectiveStaffMemberId, ensureStaffMember, confirmStaffMember]);

  const handleCancel = useCallback(async () => {
    if (!effectiveStaffMemberId) return;

    const confirmed = await showConfirmToast({
      title: 'Annulla bozza',
      message: 'Vuoi annullare questa bozza? I dati non confermati verranno eliminati.',
      confirmLabel: 'Annulla bozza',
      cancelLabel: 'Chiudi',
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      await cancelStaffMember(effectiveStaffMemberId).unwrap();
      localStaffMemberIdRef.current = null;
      showSuccessToast('Bozza annullata');
    } catch (error) {
      showRtkErrorToast(error);
    }
  }, [effectiveStaffMemberId, cancelStaffMember]);

  if (isLoading && !data) {
    return (
      <section className="min-w-0 overflow-hidden rounded-2xl bg-[#f7f7f7] p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-[#ececec] sm:rounded-3xl sm:p-6 lg:p-8">
        <Loading size="md" className="min-h-32" />
      </section>
    );
  }

  return (
    <TrainingProjectManagerSection
      key={`${role}-${effectiveStaffMemberId ?? 'new'}`}
      title={title}
      subtitle={subtitle}
      documentLabels={documentLabels}
      showPersonFields={showPersonFields}
      companyLabel={companyLabel}
      showFooterActions={showFooterActions}
      initial={sectionInitial}
      syncKey={effectiveStaffMemberId ?? 'new'}
      onFormChange={handleFormChange}
      onUpload={handleUpload}
      onDownload={handleDownload}
      onConfirm={confirming ? undefined : handleConfirm}
      onCancel={cancelling ? undefined : handleCancel}
    />
  );
}
