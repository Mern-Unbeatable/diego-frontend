import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Eye, X, ChevronDown } from 'lucide-react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri';
import { CourseFormModal } from '../../../../../components/admin/course';
import { useGetLicenseUserCoursesQuery } from '../../../../../features/api/licenseUserApi';
import { useDeleteCourseMutation } from '../../../../../features/api/courseApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import {
  showSuccessToast,
  showRtkErrorToast,
  showConfirmToast,
} from '../../../../../utils/toast/toastAlerts';

const SKELETON_ROWS = 5;
const REPORT_PAGE_SIZE = 5;

const TableSkeletonRows = ({ variant = 'home' }) =>
  Array.from({ length: SKELETON_ROWS }, (_, index) => (
    <tr key={`skeleton-${index}`}>
      <td className="px-6 py-4">
        <div className="h-5 w-48 animate-pulse rounded bg-gray-100" />
      </td>
      {variant === 'report' ? (
        <>
          <td className="px-6 py-4">
            <div className="h-5 w-24 animate-pulse rounded bg-gray-100" />
          </td>
          <td className="px-6 py-4">
            <div className="h-5 w-10 animate-pulse rounded bg-gray-100" />
          </td>
        </>
      ) : (
        <>
          <td className="px-6 py-4">
            <div className="h-5 w-10 animate-pulse rounded bg-gray-100" />
          </td>
          <td className="px-6 py-4">
            <div className="h-2 w-32 animate-pulse rounded-full bg-gray-100" />
          </td>
        </>
      )}
      <td className="px-6 py-4">
        <div className="h-7 w-24 animate-pulse rounded-full bg-gray-100" />
      </td>
      <td className="px-6 py-4">
        <div className="h-8 w-28 animate-pulse rounded bg-gray-100" />
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

const getStatusColor = getStatusBadge;

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

  const PAGE_SIZE = 5;

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const displayedCourses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, page]);

  const paginationLabel = useMemo(() => {
    const total = filteredCourses.length;
    if (total === 0) return 'Mostra 0 di 0 corsi';
    const from = (page - 1) * PAGE_SIZE + 1;
    const to = Math.min(page * PAGE_SIZE, total);
    return `Mostra ${from}-${to} di ${total} corsi`;
  }, [filteredCourses.length, page]);

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

  const renderActions = (course) => (
    <div className="flex items-center gap-1.5">
      {!isReport ? (
        <button
          onClick={() => handleViewCourse(course)}
          type="button"
          className="rounded-lg p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
          title="Visualizza dettagli"
        >
          <Eye className="h-4 w-4" />
        </button>
      ) : null}
      <button
        onClick={() => handleEditCourse(course)}
        type="button"
        className="rounded-lg p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
        title="Modifica corso"
      >
        <RiEdit2Line className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={() => handleDeleteCourse(course)}
        type="button"
        disabled={deletingCourse}
        className="rounded-lg p-1.5 text-[#E55353] transition-colors hover:bg-red-50 disabled:opacity-50"
        title="Elimina corso"
      >
        <AiOutlineDelete className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );

  return (
    <>
      <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
        {/* Top Header */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            I miei corsi
          </h2>

          {!isReport ? (
            <button
              onClick={handleCreateCourse}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#73BFA1] px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#5fa889] sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Aggiungi nuovo corso
            </button>
          ) : null}
        </div>

        {/* Filter Section */}
        {!isReport ? (
          <div className="mt-5 mb-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {/* Corso Filter */}
            <div className="relative w-full sm:w-auto sm:min-w-55">
              <label className="pointer-events-none absolute -top-2.5 left-3.5 z-10 bg-white px-1.5 text-xs font-normal text-gray-500">
                Corso
              </label>
              <div className="relative">
                <select
                  value={courseSelect}
                  onChange={(e) => setCourseSelect(e.target.value)}
                  className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-3.5 pr-9 text-sm text-gray-800 outline-none focus:border-[#73BFA1]"
                >
                  <option value="all">Corso</option>
                  {courseOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Stato Filter */}
            <div className="relative w-full sm:w-auto sm:min-w-50">
              <label className="pointer-events-none absolute -top-2.5 left-3.5 z-10 bg-white px-1.5 text-xs font-normal text-gray-500">
                Stato
              </label>
              <div className="relative">
                <select
                  value={statusSelect}
                  onChange={(e) => setStatusSelect(e.target.value)}
                  className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-3.5 pr-9 text-sm text-gray-800 outline-none focus:border-[#73BFA1]"
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

            {/* Buttons */}
            <div className="flex w-full items-center gap-2.5 sm:w-auto">
              <button
                type="button"
                onClick={handleApplyFilters}
                className="h-11 flex-1 rounded-full bg-[#73BFA1] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#5fa889] sm:flex-none"
              >
                Applica
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-11 flex-1 rounded-full border border-[#73BFA1] px-6 py-2.5 text-sm font-medium text-[#73BFA1] transition-colors hover:bg-[#73BFA1]/10 sm:flex-none"
              >
                Ripristina
              </button>
            </div>
          </div>
        ) : null}

        {isError ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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

        {/* Mobile Cards View (< sm) */}
        <div className="space-y-3.5 sm:hidden">
          {isInitialLoading ? (
            Array.from({ length: SKELETON_ROWS }, (_, index) => (
              <div
                key={`mobile-skeleton-${index}`}
                className="animate-pulse space-y-3 rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="h-5 w-3/4 rounded bg-gray-100" />
                <div className="h-4 w-1/2 rounded bg-gray-100" />
                <div className="h-8 w-24 rounded-full bg-gray-100" />
              </div>
            ))
          ) : displayedCourses.length > 0 ? (
            displayedCourses.map((course) => {
              const enrolledCount =
                course.enrolledStudents ?? course.enrolled ?? 0;
              return (
                <div
                  key={`card-${course.id}`}
                  className="flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm"
                >
                  {/* Top Row: Title & Status */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base leading-snug font-semibold text-gray-900">
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

                  {/* Middle Row: Enrolled count */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
                    <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      NUMERO ISCRITTI TOTALI
                    </span>
                    <span className="text-base font-bold text-gray-800">
                      {enrolledCount}
                    </span>
                  </div>

                  {/* Bottom Row: Actions */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-400">Azioni</span>
                    {renderActions(course)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-gray-200/80 bg-white p-6 text-center">
              <p className="text-base font-medium text-gray-600">
                Nessun corso trovato
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Nessun corso corrisponde ai filtri selezionati
              </p>
              {!isReport ? (
                <button
                  onClick={handleCreateCourse}
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#73BFA1] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5fa889]"
                >
                  <Plus className="h-4 w-4" />
                  Aggiungi nuovo corso
                </button>
              ) : null}
            </div>
          )}
        </div>

        {/* Desktop Table View (>= sm) */}
        <div className="relative hidden overflow-x-auto rounded-xl border border-gray-200/80 sm:block">
          {isFetching && !isInitialLoading ? (
            <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/60 pt-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#73BFA1]" />
            </div>
          ) : null}

          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-[#f2f4f3]">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold tracking-wider text-gray-800 uppercase sm:text-sm">
                  {isReport ? 'Titolo corso' : 'CORSO'}
                </th>
                {isReport ? (
                  <>
                    <th className="px-6 py-3.5 text-xs font-semibold tracking-wider text-gray-800 uppercase sm:text-sm">
                      Data di pubblicazione
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold tracking-wider text-gray-800 uppercase sm:text-sm">
                      Iscritti
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold tracking-wider text-gray-800 uppercase sm:text-sm">
                      Stato
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3.5 text-xs font-semibold tracking-wider text-gray-800 uppercase sm:text-sm">
                      STATO
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold tracking-wider text-gray-800 uppercase sm:text-sm">
                      NUMERO ISCRITTI TOTALI
                    </th>
                  </>
                )}
                <th className="px-6 py-3.5 text-xs font-semibold tracking-wider text-gray-800 uppercase sm:text-sm">
                  {isReport ? 'Azione' : 'Azioni'}
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
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 sm:text-base">
                        {course.name || course.title}
                      </td>
                      {isReport ? (
                        <>
                          <td className="px-6 py-4 text-sm font-normal text-gray-700">
                            {course.published_date || 'GG/MM/AAAA'}
                          </td>
                          <td className="px-6 py-4 text-sm font-normal text-gray-700">
                            {enrolledCount}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                                course.status,
                              )}`}
                            >
                              {course.status || 'Pubblicato'}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                                course.status,
                              )}`}
                            >
                              {course.status || 'Pubblicato'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-normal text-gray-800 sm:text-base">
                            {enrolledCount}
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4">{renderActions(course)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={isReport ? 5 : 4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-base font-medium text-gray-600">
                        Nessun corso trovato
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        Nessun corso corrisponde ai filtri selezionati
                      </p>
                      {!isReport ? (
                        <button
                          onClick={handleCreateCourse}
                          type="button"
                          className="mt-4 flex items-center gap-2 rounded-full bg-[#73BFA1] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5fa889]"
                        >
                          <Plus className="h-4 w-4" />
                          Aggiungi nuovo corso
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {!isInitialLoading && filteredCourses.length > 0 ? (
            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-white px-6 py-5">
              <p className="text-sm font-medium text-[#7a7a7a]">
                {paginationLabel}
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-[#6d6d6d]">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="transition-colors hover:text-gray-900 disabled:opacity-40"
                >
                  Precedente
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`inline-flex h-8.5 min-w-8.5 items-center justify-center rounded-md px-2 ${
                      pageNumber === page
                        ? 'bg-[#73bfa1] font-semibold text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  className="transition-colors hover:text-gray-900 disabled:opacity-40"
                >
                  Prossimo
                </button>
              </div>
            </footer>
          ) : null}
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
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#33584d]/78 p-3 md:p-6">
          <div className="max-h-[96vh] w-full max-w-225 overflow-y-auto rounded-2xl bg-white p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#141414]">
                Dettagli Corso
              </h2>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedCourse(null);
                }}
                type="button"
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-[#141414]">
                  Informazioni Generali
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nome del Corso</p>
                    <p className="text-base font-medium text-[#141414]">
                      {selectedCourse.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Descrizione</p>
                    <p className="text-base text-[#141414]">
                      {selectedCourse.description ||
                        'Nessuna descrizione disponibile'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Istruttore</p>
                    <p className="text-base font-medium text-[#141414]">
                      {selectedCourse.instructor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stato</p>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusBadge(selectedCourse.status)}`}
                    >
                      {selectedCourse.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-[#141414]">
                  Statistiche
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Corsisti Iscritti</p>
                    <p className="text-base font-medium text-[#141414]">
                      {selectedCourse.enrolledStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Durata</p>
                    <p className="text-base font-medium text-[#141414]">
                      {selectedCourse.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categoria</p>
                    <p className="text-base font-medium text-[#141414]">
                      {selectedCourse.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-gray-200 pt-4">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedCourse(null);
                }}
                type="button"
                className="rounded-full border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                Chiudi
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditCourse(selectedCourse);
                }}
                type="button"
                className="rounded-full bg-[#73BFA1] px-6 py-2 text-white transition-colors hover:bg-[#5fa889]"
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
