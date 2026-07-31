import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Eye, X, ChevronDown } from 'lucide-react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri';
import { CourseFormModal } from '../../../../../components/admin/course';
import Pagination from '../../../../../components/ui/Utilities/Pagination';
import { useGetLicenseUserCoursesQuery } from '../../../../../features/api/licenseUserApi';
import { useDeleteCourseMutation } from '../../../../../features/api/courseApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import {
  showSuccessToast,
  showRtkErrorToast,
  showConfirmToast,
} from '../../../../../utils/toast/toastAlerts';

const SKELETON_ROWS = 5;
const PAGE_SIZE = 10;

const TableSkeletonRows = ({ variant = 'home' }) =>
  Array.from({ length: SKELETON_ROWS }, (_, index) => (
    <tr key={`skeleton-${index}`}>
      <td className="px-4 py-4 lg:px-6">
        <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
      </td>
      {variant === 'report' ? (
        <>
          <td className="px-4 py-4 lg:px-6">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
          </td>
          <td className="px-4 py-4 lg:px-6">
            <div className="h-4 w-10 animate-pulse rounded bg-gray-100" />
          </td>
        </>
      ) : (
        <>
          <td className="px-4 py-4 lg:px-6">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
          </td>
          <td className="px-4 py-4 lg:px-6">
            <div className="h-2 w-24 animate-pulse rounded-full bg-gray-100" />
          </td>
        </>
      )}
      <td className="px-4 py-4 lg:px-6">
        <div className="h-7 w-20 animate-pulse rounded-full bg-gray-100" />
      </td>
      <td className="px-4 py-4 lg:px-6">
        <div className="h-8 w-24 animate-pulse rounded bg-gray-100" />
      </td>
    </tr>
  ));

const getStatusBadge = (status) => {
  if (status === 'Pubblicato')
    return 'bg-[#EAF5F0] text-[#55A585] border border-[#73BFA1]/30';
  if (status === 'In manutenzione')
    return 'bg-[#FFF4E5] text-[#E08A00] border border-[#E08A00]/30';
  if (status === 'In approvazione')
    return 'bg-[#EBF3FC] text-[#2B7FFF] border border-[#2B7FFF]/30';
  if (status === 'Non approvato')
    return 'bg-[#FDE8E8] text-[#E02424] border border-[#E02424]/30';
  if (status === 'Immatricolazione' || status === 'In immatricolazione') {
    return 'bg-[#FFF4E5] text-[#E08A00] border border-[#E08A00]/30';
  }
  return 'bg-gray-100 text-gray-700 border border-gray-200';
};

const CoursesTable = ({ variant = 'home' }) => {
  const isReport = variant === 'report';
  const [courseSelect, setCourseSelect] = useState('all');
  const [statusSelect, setStatusSelect] = useState('all');
  const [appliedCourse, setAppliedCourse] = useState('all');
  const [appliedStatus, setAppliedStatus] = useState('all');

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetLicenseUserCoursesQuery(
      { limit: 100, variant },
      { refetchOnMountOrArgChange: true },
    );
  const [deleteCourse, { isLoading: deletingCourse }] =
    useDeleteCourseMutation();

  const courses = data?.courses ?? [];
  const isInitialLoading = isLoading && courses.length === 0;

  const courseOptions = useMemo(() => {
    const names = Array.from(
      new Set(courses.map((c) => c.name || c.title).filter(Boolean)),
    );
    return names;
  }, [courses]);

  const handleApplyFilters = () => {
    setAppliedCourse(courseSelect);
    setAppliedStatus(statusSelect);
    setPage(1);
  };

  const handleResetFilters = () => {
    setCourseSelect('all');
    setStatusSelect('all');
    setAppliedCourse('all');
    setAppliedStatus('all');
    setPage(1);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const courseName = course.name || course.title || '';
      if (appliedCourse !== 'all' && courseName !== appliedCourse) {
        return false;
      }
      if (appliedStatus !== 'all' && course.status !== appliedStatus) {
        return false;
      }
      return true;
    });
  }, [courses, appliedCourse, appliedStatus]);

  useEffect(() => {
    setPage(1);
  }, [appliedCourse, appliedStatus, variant, courses.length]);

  const total = filteredCourses.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);

  const displayedCourses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, page]);

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleCreateCourse = () => {
    setSelectedCourse(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleDeleteCourse = async (course) => {
    if (!course?.id) return;

    const confirmed = await showConfirmToast({
      title: 'Elimina corso',
      message: `Eliminare il corso "${course.name}"? Questa azione non può essere annullata.`,
      confirmLabel: 'Elimina',
      cancelLabel: 'Annulla',
      variant: 'danger',
    });
    if (!confirmed) return;

    try {
      await deleteCourse(course.id).unwrap();
      showSuccessToast('Corso eliminato con successo');
      refetch();
    } catch (deleteError) {
      showRtkErrorToast(deleteError);
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedCourse(null);
  };

  const renderActions = (course) => (
    <div className="flex items-center justify-center gap-1.5">
      {!isReport ? (
        <button
          onClick={() => handleViewCourse(course)}
          type="button"
          className="rounded-lg p-1.5 text-[#73bfa1] transition-colors hover:bg-blue-50 text-center"
          title="Visualizza dettagli"
        >
          <Eye className="h-5 w-5" />
        </button>
      ) : null}
      <button
        onClick={() => handleEditCourse(course)}
        type="button"
        className="rounded-lg p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
        title="Modifica corso"
      >
        <RiEdit2Line className="h-5 w-5" />
      </button>
      <button
        onClick={() => handleDeleteCourse(course)}
        type="button"
        disabled={deletingCourse}
        className="rounded-lg p-1.5 text-[#E55353] transition-colors hover:bg-red-50 disabled:opacity-50"
        title="Elimina corso"
      >
        <AiOutlineDelete className="h-5 w-5" />
      </button>
    </div>
  );

  return (
    <>
      <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm sm:rounded-2xl">
        <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
            I miei corsi
          </h2>

          {!isReport ? (
            <button
              onClick={handleCreateCourse}
              type="button"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#73BFA1] px-4 text-sm font-medium text-white transition-colors hover:bg-[#5fa889] sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Aggiungi nuovo corso
            </button>
          ) : null}
        </div>

        {!isReport ? (
          <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-3 sm:px-6">
            <div className="relative w-full sm:min-w-48 sm:flex-1 sm:max-w-xs">
              <label className="pointer-events-none absolute -top-2 left-3 z-10 bg-white px-1 text-xs text-gray-500">
                Corso
              </label>
              <div className="relative">
                <select
                  value={courseSelect}
                  onChange={(e) => setCourseSelect(e.target.value)}
                  className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-3 pr-9 text-sm text-gray-800 outline-none focus:border-[#73BFA1]"
                >
                  <option value="all">Tutti i corsi</option>
                  {courseOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="relative w-full sm:min-w-44 sm:flex-1 sm:max-w-xs">
              <label className="pointer-events-none absolute -top-2 left-3 z-10 bg-white px-1 text-xs text-gray-500">
                Stato
              </label>
              <div className="relative">
                <select
                  value={statusSelect}
                  onChange={(e) => setStatusSelect(e.target.value)}
                  className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-3 pr-9 text-sm text-gray-800 outline-none focus:border-[#73BFA1]"
                >
                  <option value="all">Tutti gli stati</option>
                  <option value="Pubblicato">Pubblicato</option>
                  <option value="In approvazione">In approvazione</option>
                  <option value="In manutenzione">In manutenzione</option>
                  <option value="Non approvato">Non approvato</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              <button
                type="button"
                onClick={handleApplyFilters}
                className="h-10 flex-1 rounded-full bg-[#73BFA1] px-5 text-sm font-medium text-white hover:bg-[#5fa889] sm:flex-none"
              >
                Applica
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-10 flex-1 rounded-full border border-[#73BFA1] px-5 text-sm font-medium text-[#73BFA1] hover:bg-[#73BFA1]/10 sm:flex-none"
              >
                Ripristina
              </button>
            </div>
          </div>
        ) : null}

        {isError ? (
          <div className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6">
            {getRtkErrorMessage(error)}
            <button
              type="button"
              onClick={refetch}
              className="ml-3 font-semibold underline"
            >
              Riprova
            </button>
          </div>
        ) : null}

        {/* Mobile cards */}
        <div className={`space-y-3 p-3 md:hidden ${isFetching && !isInitialLoading ? 'opacity-60' : ''}`}>
          {isInitialLoading ? (
            Array.from({ length: SKELETON_ROWS }, (_, index) => (
              <div
                key={`mobile-skeleton-${index}`}
                className="animate-pulse space-y-3 rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="h-4 w-3/4 rounded bg-gray-100" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
                <div className="h-7 w-24 rounded-full bg-gray-100" />
              </div>
            ))
          ) : displayedCourses.length > 0 ? (
            displayedCourses.map((course) => {
              const enrolledCount =
                course.enrolledStudents ?? course.enrolled ?? 0;
              return (
                <div
                  key={`card-${course.id}`}
                  className="flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 flex-1 text-sm font-semibold text-gray-900">
                      {course.name || course.title}
                    </h3>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadge(
                        course.status,
                      )}`}
                    >
                      {course.status || 'Pubblicato'}
                    </span>
                  </div>

                  <dl className="space-y-1.5 border-t border-gray-100 pt-2 text-xs text-gray-600">
                    {isReport ? (
                      <div className="flex justify-between gap-2">
                        <dt>Pubblicazione</dt>
                        <dd className="font-medium text-gray-800">
                          {course.published_date || 'GG/MM/AAAA'}
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex justify-between gap-2">
                      <dt>Iscritti totali</dt>
                      <dd className="font-medium text-gray-800">{enrolledCount}</dd>
                    </div>
                  </dl>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-400">Azioni</span>
                    {renderActions(course)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-gray-200/80 bg-white p-6 text-center">
              <p className="text-sm font-medium text-gray-600">Nessun corso trovato</p>
              <p className="mt-1 text-xs text-gray-400">
                Nessun corso corrisponde ai filtri selezionati
              </p>
              {!isReport ? (
                <button
                  onClick={handleCreateCourse}
                  type="button"
                  className="mt-4 inline-flex h-9 items-center gap-2 rounded-full bg-[#73BFA1] px-4 text-sm font-medium text-white hover:bg-[#5fa889]"
                >
                  <Plus className="h-4 w-4" />
                  Aggiungi nuovo corso
                </button>
              ) : null}
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="relative hidden overflow-x-auto md:block">
          {isFetching && !isInitialLoading ? (
            <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/60 pt-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#73BFA1]" />
            </div>
          ) : null}

          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="border-b border-gray-200 bg-[#f2f4f3]">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-800 uppercase lg:px-6">
                  {isReport ? 'Titolo corso' : 'Corso'}
                </th>
                {isReport ? (
                  <>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-800 uppercase lg:px-6">
                      Data di pubblicazione
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-800 uppercase lg:px-6">
                      Iscritti
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-800 uppercase lg:px-6">
                      Stato
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-800 uppercase lg:px-6">
                      Stato
                    </th>
                    <th className="px-4 py-3 text-xs text-center font-semibold tracking-wide text-gray-800 uppercase lg:px-6">
                      Iscritti totali
                    </th>
                  </>
                )}
                <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-800 uppercase lg:px-6 text-center">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isInitialLoading ? (
                <TableSkeletonRows variant={variant} />
              ) : displayedCourses.length > 0 ? (
                displayedCourses.map((course) => {
                  const enrolledCount =
                    course.enrolledStudents ?? course.enrolled ?? 0;
                  return (
                    <tr
                      key={course.id}
                      className="transition-colors hover:bg-gray-50/80"
                    >
                      <td className="max-w-[220px] truncate px-4 py-4 text-sm font-medium text-gray-900 lg:px-6">
                        {course.name || course.title}
                      </td>
                      {isReport ? (
                        <>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-700 lg:px-6">
                            {course.published_date || 'GG/MM/AAAA'}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 lg:px-6">
                            {enrolledCount}
                          </td>
                          <td className="px-4 py-4 lg:px-6">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadge(
                                course.status,
                              )}`}
                            >
                              {course.status || 'Pubblicato'}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-4 lg:px-6">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadge(
                                course.status,
                              )}`}
                            >
                              {course.status || 'Pubblicato'}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-center text-gray-800 lg:px-6">
                            {enrolledCount}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-4 lg:px-6">{renderActions(course)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={isReport ? 5 : 4}
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-gray-600">
                      Nessun corso trovato
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Nessun corso corrisponde ai filtri selezionati
                    </p>
                    {!isReport ? (
                      <button
                        onClick={handleCreateCourse}
                        type="button"
                        className="mt-4 inline-flex h-9 items-center gap-2 rounded-full bg-[#73BFA1] px-4 text-sm font-medium text-white hover:bg-[#5fa889]"
                      >
                        <Plus className="h-4 w-4" />
                        Aggiungi nuovo corso
                      </button>
                    ) : null}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-3 sm:px-6">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={PAGE_SIZE}
            onPageChange={setPage}
            showingLabel={
              total === 0
                ? 'Mostra 0 di 0 corsi'
                : `Mostra ${Math.min((page - 1) * PAGE_SIZE + 1, total)}-${Math.min(page * PAGE_SIZE, total)} di ${total} corsi`
            }
          />
        </div>
      </div>

      {isModalOpen ? (
        <CourseFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
            setModalMode('create');
          }}
          mode={modalMode}
          courseId={modalMode === 'edit' ? selectedCourse?.id : null}
          onSuccess={() => {
            refetch();
            setIsModalOpen(false);
            setSelectedCourse(null);
            setModalMode('create');
          }}
        />
      ) : null}

      {!isReport && isViewModalOpen && selectedCourse ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={closeViewModal}
          role="dialog"
          aria-modal="true"
          aria-label="Dettagli Corso"
        >
          <div
            className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
              <h2 className="text-base font-semibold text-[#141414] sm:text-lg">
                Dettagli Corso
              </h2>
              <button
                onClick={closeViewModal}
                type="button"
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Chiudi"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-[#141414] sm:text-base">
                    Informazioni Generali
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 sm:text-sm">Nome del Corso</p>
                      <p className="text-sm font-medium text-[#141414]">
                        {selectedCourse.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 sm:text-sm">Descrizione</p>
                      <p className="text-sm text-[#141414]">
                        {selectedCourse.description ||
                          'Nessuna descrizione disponibile'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 sm:text-sm">Istruttore</p>
                      <p className="text-sm font-medium text-[#141414]">
                        {selectedCourse.instructor}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 sm:text-sm">Stato</p>
                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadge(selectedCourse.status)}`}
                      >
                        {selectedCourse.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-[#141414] sm:text-base">
                    Statistiche
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 sm:text-sm">Corsisti Iscritti</p>
                      <p className="text-sm font-medium text-[#141414]">
                        {selectedCourse.enrolledStudents}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 sm:text-sm">Durata</p>
                      <p className="text-sm font-medium text-[#141414]">
                        {selectedCourse.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 sm:text-sm">Categoria</p>
                      <p className="text-sm font-medium text-[#141414]">
                        {selectedCourse.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-100 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-5 sm:py-4">
              <button
                onClick={closeViewModal}
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-full border border-gray-300 px-5 text-sm text-gray-700 hover:bg-gray-50"
              >
                Chiudi
              </button>
              <button
                onClick={() => {
                  closeViewModal();
                  handleEditCourse(selectedCourse);
                }}
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#73BFA1] px-5 text-sm font-medium text-white hover:bg-[#5fa889]"
              >
                Modifica Corso
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CoursesTable;
