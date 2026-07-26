import React, { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Eye, X } from 'lucide-react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri';
import CourseFormModal from '../../components/CourseFormModal';
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

const getStatusColor = (status, variant = 'home') => {
  if (status === 'Pubblicato') return 'bg-green-100 text-green-700';
  if (status === 'In approvazione') return 'bg-blue-100 text-blue-700';
  if (status === 'Non approvato') return 'bg-red-100 text-red-700';
  if (status === 'In manutenzione') return 'bg-yellow-100 text-yellow-700';
  if (status === 'Immatricolazione' || status === 'In immatricolazione') {
    return 'bg-yellow-100 text-yellow-700';
  }
  return variant === 'report' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-700';
};

const getProgressColor = (progress) => {
  if (progress >= 25) return 'bg-[#73BFA1]';
  return 'bg-gray-300';
};

const CoursesTable = ({ variant = 'home' }) => {
  const isReport = variant === 'report';
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetLicenseUserCoursesQuery(
    { limit: 100, variant },
    { refetchOnMountOrArgChange: true },
  );
  const [deleteCourse, { isLoading: deletingCourse }] = useDeleteCourseMutation();

  const courses = data?.courses ?? [];
  const isInitialLoading = isLoading && courses.length === 0;

  const filteredCourses = useMemo(() => {
    if (isReport) return courses;

    const query = searchTerm.trim().toLowerCase();
    if (!query) return courses;

    return courses.filter((course) => {
      const haystack = [
        course.name,
        course.status,
        course.instructor,
        course.category,
        course.slug,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [courses, searchTerm, isReport]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, variant, courses.length]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / REPORT_PAGE_SIZE));
  const displayedCourses = useMemo(() => {
    if (!isReport) return filteredCourses;
    const start = (page - 1) * REPORT_PAGE_SIZE;
    return filteredCourses.slice(start, start + REPORT_PAGE_SIZE);
  }, [filteredCourses, isReport, page]);

  const paginationLabel = useMemo(() => {
    if (!isReport) return '';
    const total = filteredCourses.length;
    if (total === 0) return 'Mostra 0 di 0 corsi';
    const from = (page - 1) * REPORT_PAGE_SIZE + 1;
    const to = Math.min(page * REPORT_PAGE_SIZE, total);
    return `Mostra ${from}-${to} di ${total} corsi`;
  }, [filteredCourses.length, isReport, page]);

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
    <div className="flex items-center gap-2">
      {!isReport ? (
        <button
          onClick={() => handleViewCourse(course)}
          type="button"
          className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
          title="Visualizza dettagli"
        >
          <Eye className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
      ) : null}
      <button
        onClick={() => handleEditCourse(course)}
        type="button"
        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
        title="Modifica corso"
      >
        <RiEdit2Line className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>
      <button
        onClick={() => handleDeleteCourse(course)}
        type="button"
        disabled={deletingCourse}
        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
        title="Elimina corso"
      >
        <AiOutlineDelete className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>
    </div>
  );

  return (
    <>
      <div>
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2
            className={`font-bold text-gray-900 ${isReport ? 'text-3xl text-black' : 'text-2xl'}`}
          >
            I miei corsi
          </h2>

          {!isReport ? (
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cerca corsi..."
                    className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pr-10 pl-11 text-sm text-gray-700 transition-all placeholder:text-gray-400 focus:border-[#73BFA1] focus:bg-white focus:outline-none sm:w-64"
                  />
                  <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  {searchTerm ? (
                    <button
                      onClick={() => setSearchTerm('')}
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </div>

              <button
                onClick={handleCreateCourse}
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#73BFA1] px-6 py-3 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#5fa889]"
              >
                <Plus className="h-4 w-4" />
                Aggiungi nuovo corso
              </button>
            </div>
          ) : null}
        </div>

        {isError ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getRtkErrorMessage(error)}
            <button type="button" onClick={refetch} className="ml-3 font-semibold underline">
              Riprova
            </button>
          </div>
        ) : null}

        {!isReport && searchTerm ? (
          <div className="mb-4 px-1">
            <p className="text-sm text-gray-500">
              {filteredCourses.length}{' '}
              {filteredCourses.length === 1 ? 'corso trovato' : 'corsi trovati'} per &quot;
              {searchTerm}&quot;
            </p>
          </div>
        ) : null}

        <div
          className={`relative overflow-hidden bg-white ${
            isReport ? 'rounded-lg' : 'border border-gray-200 shadow-sm'
          }`}
        >
          {isFetching && !isInitialLoading ? (
            <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/60 pt-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#73BFA1]" />
            </div>
          ) : null}

          <table className="w-full">
            <thead className="border-b border-gray-200 bg-[#f0f0f0]">
              <tr>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                  {isReport ? 'Titolo corso' : 'Corso'}
                </th>
                {isReport ? (
                  <>
                    <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                      Data di pubblicazione
                    </th>
                    <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                      Iscritti
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                      Corsisti iscritti
                    </th>
                    <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                      Avanzamento
                    </th>
                  </>
                )}
                <th className="px-6 py-4 text-left text-base font-medium text-gray-700">Stato</th>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-700">
                  {isReport ? 'Azione' : 'Azioni'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isInitialLoading ? (
                <TableSkeletonRows variant={variant} />
              ) : displayedCourses.length > 0 ? (
                displayedCourses.map((course) => (
                  <tr key={course.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 text-base font-medium text-black">
                      {course.name || course.title}
                    </td>
                    {isReport ? (
                      <>
                        <td className="px-6 py-4 text-sm font-normal text-black">
                          {course.published_date}
                        </td>
                        <td className="px-6 py-4 text-sm font-normal text-black">
                          {course.enrolledStudents ?? course.enrolled}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-base font-normal text-black">
                          {course.enrolledStudents}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                              <div
                                className={`h-full ${getProgressColor(course.progress)} transition-all`}
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-700">
                              {course.progress === 0 ? '0%' : `${course.progress}%`}
                            </span>
                          </div>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(course.status, variant)}`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{renderActions(course)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="mb-4 h-12 w-12 text-gray-300" />
                      <p className="text-lg font-medium text-gray-600">Nessun corso trovato</p>
                      <p className="mt-1 text-sm text-gray-400">
                        {!isReport && !searchTerm
                          ? 'Aggiungi un nuovo corso per iniziare'
                          : 'Nessun corso disponibile'}
                      </p>
                      {!isReport && !searchTerm ? (
                        <button
                          onClick={handleCreateCourse}
                          type="button"
                          className="mt-4 flex items-center gap-2 rounded-full bg-[#73BFA1] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5fa889]"
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

          {isReport && !isInitialLoading ? (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 px-6 py-4">
              <p className="text-sm text-gray-600">{paginationLabel}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Precedente
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium ${
                      pageNumber === page
                        ? 'bg-[#73BFA1] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page >= totalPages}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Prossimo
                </button>
              </div>
            </div>
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
        <div className="fixed inset-0 z-[30] flex items-center justify-center bg-[#33584d]/78 p-3 md:p-6">
          <div className="max-h-[96vh] w-full max-w-[900px] overflow-y-auto rounded-2xl bg-white p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#141414]">Dettagli Corso</h2>
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
                <h3 className="mb-4 text-lg font-semibold text-[#141414]">Informazioni Generali</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nome del Corso</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Descrizione</p>
                    <p className="text-base text-[#141414]">
                      {selectedCourse.description || 'Nessuna descrizione disponibile'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Istruttore</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stato</p>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedCourse.status, variant)}`}
                    >
                      {selectedCourse.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-[#141414]">Statistiche</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Corsisti Iscritti</p>
                    <p className="text-base font-medium text-[#141414]">
                      {selectedCourse.enrolledStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Durata</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categoria</p>
                    <p className="text-base font-medium text-[#141414]">{selectedCourse.category}</p>
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
