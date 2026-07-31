import { useEffect, useState } from 'react';
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
import {
  Alert,
  ConfirmModal,
  Skeleton,
  Toast,
  useToast,
} from '../../../../components/ui';
import Pagination from '../../../../components/ui/Utilities/Pagination';
import { useModalState } from './hooks/useModalState';
import { formatApiErrorMessage } from '../../../../config/api/errorHandler';
import { ROUTES } from '../../../../config/routes';
import { getCompanyCoursesService } from '../../../../features/company/companyService';

const resolveErrorMessage = (error, fallback) =>
  formatApiErrorMessage(error) || fallback;

const CompanyTrainingView = () => {
  const {
    employees,
    total,
    page,
    pageSize,
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
  const [highlightCourse, setHighlightCourse] = useState(null);

  useEffect(() => {
    const loadHighlightCourse = async () => {
      try {
        const data = await getCompanyCoursesService();
        const courses = data?.courses ?? [];
        const withEnrollments = courses.find(
          (course) => course.enrolledEmployees > 0,
        );
        setHighlightCourse(withEnrollments || courses[0] || null);
      } catch {
        setHighlightCourse(null);
      }
    };

    loadHighlightCourse();
  }, []);

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
    try {
      if (modal.mode === 'edit' && modal.employee) {
        const result = await updateEmployee(modal.employee.userId, payload);
        addToast('Dipendente aggiornato con successo', 'success');
        if (result?.emailSent) {
          addToast('Email di accesso inviata al dipendente', 'success');
        }
        return;
      }

      const result = await createEmployee(payload);
      addToast('Dipendente aggiunto con successo', 'success');
      if (result?.emailSent) {
        addToast('Email di accesso inviata al dipendente', 'success');
      }
    } catch (submitError) {
      resetError();
      addToast(
        resolveErrorMessage(submitError, 'Salvataggio non riuscito. Riprova.'),
        'error',
      );
      throw submitError;
    }
  };

  const handleConfirmDelete = async () => {
    const employee = confirmDelete.employee;
    if (!employee) return;
    try {
      await deleteEmployee(employee.userId);
      addToast('Dipendente eliminato con successo', 'success');
    } catch (err) {
      addToast(
        resolveErrorMessage(err, 'Eliminazione non riuscita'),
        'error',
      );
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

      <section className="min-w-0 space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-[#1f1f1f] sm:text-lg md:text-xl">
            Anagrafica dipendenti
          </h2>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white hover:bg-[#63a88c] sm:w-auto"
          >
            + Aggiungi utente
          </button>
        </div>

        {error ? (
          <Alert
            type="error"
            title="Non è stato possibile caricare i dipendenti"
            message={error}
            onClose={resetError}
          />
        ) : null}

        {showSkeleton ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#e7e7e7] bg-white p-4 sm:p-5"
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
        ) : null}

        {showEmpty ? (
          <div className="rounded-xl border border-dashed border-[#d7d7d7] bg-white px-4 py-8 text-center sm:px-5 sm:py-10">
            <p className="text-sm text-[#7d7d7d]">
              Nessun dipendente trovato. Inizia aggiungendo il primo utente.
            </p>
            <button
              type="button"
              onClick={openAdd}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white hover:bg-[#63a88c]"
            >
              + Aggiungi utente
            </button>
          </div>
        ) : null}

        {!showSkeleton && employees.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {employees.map((employee) => (
              <article
                key={employee.userId || employee.id}
                className="flex min-w-0 flex-col rounded-xl border border-[#e7e7e7] bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf5f2] text-[#6ab292]">
                      <UsersRound size={16} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-[#1f1f1f] sm:text-base">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p className="truncate text-xs text-[#808080] sm:text-sm">
                        {employee.position}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      employee.status === 'Attivo'
                        ? 'bg-[#edf7f2] text-[#6eb295]'
                        : 'bg-[#fbe9e7] text-[#dd6b5f]'
                    }`}
                  >
                    {employee.status}
                  </span>
                </div>

                <div className="min-w-0 flex-1 space-y-2 text-xs text-[#555555] sm:text-sm">
                  <p className="flex min-w-0 items-center gap-2">
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{employee.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="shrink-0" />
                    <span>{employee.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={14} className="shrink-0" />
                    <span>Assunzione: {employee.hireDate}</span>
                  </p>
                  {employee.assignedCourseTitle ? (
                    <p className="flex min-w-0 items-center gap-2">
                      <UsersRound size={14} className="shrink-0" />
                      <span className="truncate">
                        Corso: {employee.assignedCourseTitle}
                      </span>
                    </p>
                  ) : null}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => openView(employee)}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#d7d7d7] px-3 text-xs font-medium text-[#5a5a5a] hover:bg-[#f5f5f5] sm:text-sm"
                  >
                    <Eye size={14} />
                    Dettagli
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(employee)}
                    disabled={mutating}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#92d0b7] px-3 text-xs font-medium text-[#65ad8d] hover:bg-[#eff9f5] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                  >
                    <Pencil size={14} />
                    Modifica
                  </button>
                  <button
                    type="button"
                    onClick={() => confirmDelete.open(employee)}
                    disabled={mutating}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#ef6a59] px-3 text-xs font-medium text-[#e14f3f] hover:bg-[#fff3f1] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                  >
                    <Trash2 size={14} />
                    Elimina
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {!showSkeleton && employees.length > 0 ? (
          <div className="rounded-xl border border-[#ececec] bg-white px-3 sm:px-4">
            <Pagination
              page={page}
              totalPages={Math.max(1, totalPages || 1)}
              total={total}
              limit={pageSize}
              onPageChange={setPage}
              showingLabel={
                total === 0
                  ? 'Mostra 0 di 0 dipendenti'
                  : `Mostra ${employees.length} di ${total} dipendenti`
              }
            />
          </div>
        ) : null}

        <div className="rounded-xl border border-[#ececec] bg-white px-4 py-4 sm:px-5">
          {highlightCourse ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="min-w-0 text-sm text-[#666666]">
                Corso assegnato:{' '}
                <span className="font-medium text-[#2f2f2f]">
                  {highlightCourse.courseTitle}
                </span>
              </p>
              <Link
                to={`${ROUTES.COMPANY_ADMIN.TRAINING}/courses/${highlightCourse.courseId}`}
                className="inline-flex h-10 w-full shrink-0 items-center justify-center rounded-full bg-[#73bfa1] px-5 text-sm font-medium text-white hover:bg-[#63a88c] sm:w-auto"
              >
                Vedi iscritti
              </Link>
            </div>
          ) : (
            <p className="text-sm text-[#666666]">Nessun corso assegnato.</p>
          )}
        </div>
      </section>

      {modal.open ? (
        <EmployeeModal
          mode={modal.mode}
          initialData={modal.employee}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      ) : null}

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
