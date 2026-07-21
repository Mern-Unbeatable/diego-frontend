import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CalendarDays,
  Eye,
  Mail,
  Pencil,
  Phone,
  Trash2,
  UsersRound,
} from 'lucide-react';
import EmployeeModal from './components/EmployeeModal';
import { useEmployees } from '../../../../features/company/employee/employeeHooks';
import { getCourseById } from '../../../../features/company/employee/employeeConstants';
import {
  Alert,
  ConfirmModal,
  Skeleton,
  Toast,
  useToast,
} from '../../../../components/ui';
import { useModalState } from './hooks/useModalState';

const CompanyTrainingView = () => {
  const {
    employees,
    total,
    page,
    totalPages,
    loading,
    mutating,
    error,
    fetchEmployees,
    setPage,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    resetError,
  } = useEmployees();

  const { toasts, addToast, removeToast } = useToast();
  const { modal, openAdd, openEdit, openView, closeModal, confirmDelete } =
    useModalState();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchEmployees(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchParams.get('addUser') === '1') {
      openAdd();
      searchParams.delete('addUser');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, openAdd]);

  const handleSubmit = async (payload) => {
    if (modal.mode === 'edit' && modal.employee) {
      await updateEmployee(modal.employee.id, payload);
      addToast('Dipendente aggiornato con successo', 'success');
    } else {
      await createEmployee(payload);
      addToast('Dipendente aggiunto con successo', 'success');
    }
  };

  const handleConfirmDelete = async () => {
    const employee = confirmDelete.employee;
    if (!employee) return;
    try {
      await deleteEmployee(employee.id);
      addToast('Dipendente eliminato con successo', 'success');
    } catch (err) {
      addToast(err?.message || 'Eliminazione non riuscita', 'error');
    } finally {
      confirmDelete.close();
    }
  };

  const showSkeleton = loading && employees.length === 0;
  const showEmpty = !loading && !error && employees.length === 0;

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#1f1f1f] md:text-3xl">
            Anagrafica dipendenti
          </h2>
          <button
            type="button"
            onClick={openAdd}
            className="rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
          >
            + Aggiungi utente
          </button>
        </div>

        {error && (
          <Alert
            type="error"
            title="Non è stato possibile caricare i dipendenti"
            message={error}
            onClose={resetError}
          />
        )}

        {showSkeleton && (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#e7e7e7] bg-white p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Skeleton type="circle" className="h-9 w-9" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {showEmpty && (
          <div className="rounded-xl border border-dashed border-[#d7d7d7] bg-white px-5 py-10 text-center">
            <p className="text-sm text-[#7d7d7d]">
              Nessun dipendente trovato. Inizia aggiungendo il primo utente.
            </p>
            <button
              type="button"
              onClick={openAdd}
              className="mt-4 rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
            >
              + Aggiungi utente
            </button>
          </div>
        )}

        {!showSkeleton && employees.length > 0 && (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {employees.map((employee) => {
              const course = getCourseById(employee.assignedCourseId);
              return (
                <article
                  key={employee.id}
                  className="rounded-xl border border-[#e7e7e7] bg-white p-5"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                        <UsersRound size={18} />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-[#1f1f1f] md:text-2xl">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-sm text-[#808080]">
                          {employee.position}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${employee.status === 'Attivo' ? 'bg-[#edf7f2] text-[#6eb295]' : 'bg-[#fbe9e7] text-[#dd6b5f]'}`}
                    >
                      {employee.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-[#555555]">
                    <p className="flex items-center gap-2">
                      <Mail size={15} />
                      {employee.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={15} />
                      {employee.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays size={15} />
                      Assunzione: {employee.hireDate}
                    </p>
                    {course && (
                      <p className="flex items-center gap-2">
                        <UsersRound size={15} />
                        Corso: {course.title}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openView(employee)}
                      className="inline-flex min-w-[122px] items-center justify-center gap-2 rounded-lg border border-[#d7d7d7] px-5 py-2 text-sm font-semibold text-[#5a5a5a] hover:bg-[#f5f5f5]"
                    >
                      <Eye size={15} /> Dettagli
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(employee)}
                      disabled={mutating}
                      className="inline-flex min-w-[122px] items-center justify-center gap-2 rounded-lg border border-[#92d0b7] px-5 py-2 text-sm font-semibold text-[#65ad8d] hover:bg-[#eff9f5] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Pencil size={15} /> Modifica
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmDelete.open(employee)}
                      disabled={mutating}
                      className="inline-flex min-w-[122px] items-center justify-center gap-2 rounded-lg border border-[#ef6a59] px-5 py-2 text-sm font-semibold text-[#e14f3f] hover:bg-[#fff3f1] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={15} /> Elimina
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!showSkeleton && employees.length > 0 && (
          <footer className="flex flex-wrap items-center justify-between border-t border-[#ececec] pt-4 text-sm text-[#7d7d7d]">
            <p>
              Mostra {employees.length} di {total} dipendenti
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="disabled:cursor-not-allowed disabled:opacity-40"
              >
                Precedente
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={
                      pageNumber === page
                        ? 'h-6 w-6 rounded bg-[#73bfa1] text-sm font-semibold text-white'
                        : 'h-6 w-6 rounded text-sm font-semibold text-[#7d7d7d] hover:bg-[#f0f0f0]'
                    }
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prossimo
              </button>
            </div>
          </footer>
        )}

        <div className="rounded-xl border border-[#ececec] bg-white px-5 py-4">
          <p className="mb-3 text-sm text-[#666666]">
            Corso assegnato: Formazione SEVESO
          </p>
          <Link
            to="/dashboard/company-admin/gestisci-formazione/corsi/seveso"
            className="inline-flex rounded-full bg-[#73bfa1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#63a88c]"
          >
            Vedi iscritti
          </Link>
        </div>
      </section>

      {modal.open && (
        <EmployeeModal
          mode={modal.mode}
          initialData={modal.employee}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={confirmDelete.close}
        onConfirm={handleConfirmDelete}
        title="Elimina dipendente"
        message={
          confirmDelete.employee
            ? `Sei sicuro di voler eliminare ${confirmDelete.employee.firstName} ${confirmDelete.employee.lastName}? L'operazione non può essere annullata.`
            : 'Sei sicuro di voler eliminare questo dipendente?'
        }
      />
    </>
  );
};

export default CompanyTrainingView;
