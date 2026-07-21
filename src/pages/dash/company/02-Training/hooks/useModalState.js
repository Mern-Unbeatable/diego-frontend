import { useCallback, useState } from 'react';

const emptyModal = { open: false, mode: 'add', employee: null };
const emptyDeleteState = { isOpen: false, employee: null };

/**
 * Local UI-state hook for the employee page: which modal is open, in which
 * mode, for which record — kept separate from the employee data/state that
 * lives in the Redux `employee` slice (see employeeHooks.js).
 */
export const useModalState = () => {
  const [modal, setModal] = useState(emptyModal);
  const [deleteState, setDeleteState] = useState(emptyDeleteState);

  const openAdd = useCallback(
    () => setModal({ open: true, mode: 'add', employee: null }),
    [],
  );
  const openEdit = useCallback(
    (employee) => setModal({ open: true, mode: 'edit', employee }),
    [],
  );
  const openView = useCallback(
    (employee) => setModal({ open: true, mode: 'view', employee }),
    [],
  );
  const closeModal = useCallback(() => setModal(emptyModal), []);

  const openDeleteConfirm = useCallback(
    (employee) => setDeleteState({ isOpen: true, employee }),
    [],
  );
  const closeDeleteConfirm = useCallback(
    () => setDeleteState(emptyDeleteState),
    [],
  );

  return {
    modal,
    openAdd,
    openEdit,
    openView,
    closeModal,
    confirmDelete: {
      isOpen: deleteState.isOpen,
      employee: deleteState.employee,
      open: openDeleteConfirm,
      close: closeDeleteConfirm,
    },
  };
};
