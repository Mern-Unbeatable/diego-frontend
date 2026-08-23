import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ROUTES } from '../../../../../config/routes';
import {
  useAddFavoriteMutation,
  useGetMyFavoriteCourseIdsQuery,
  useRemoveFavoriteMutation,
} from '../../../../../features/api/favoriteApi';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import CourseCard from './CourseCard';
import HeroBanner from './HeroBanner';

const getCategoryClasses = (category) => {
  switch ((category || '').toUpperCase()) {
    case 'COMPLETATO':
      return 'text-[#05563f] bg-[#F1F9F6]';
    case 'IN CORSO':
      return 'text-[#8a5b00] bg-[#FFF0D9]';
    case 'NON ANCORA INIZIATO':
      return 'text-[#2b7a64] bg-[#E8F8F3]';
    default:
      return 'text-gray-500 bg-gray-100';
  }
};

const getVisibleCount = (width) => {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
};

const LeftContent = ({ courses = [] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== 'undefined' ? getVisibleCount(window.innerWidth) : 3,
  );
  const [togglingCourseId, setTogglingCourseId] = useState(null);
  const total = courses.length;
  const navigate = useNavigate();
  const { data: favoriteIdsData } = useGetMyFavoriteCourseIdsQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const favoriteIds = useMemo(
    () => new Set(favoriteIdsData?.courseIds ?? []),
    [favoriteIdsData?.courseIds],
  );

  const handleToggleFavorite = useCallback(
    async (courseId) => {
      if (!courseId || togglingCourseId) return;

      const normalizedCourseId = String(courseId);
      const isFavorite = favoriteIds.has(normalizedCourseId);

      setTogglingCourseId(normalizedCourseId);
      try {
        if (isFavorite) {
          await removeFavorite(normalizedCourseId).unwrap();
          toast.success('Corso rimosso dai preferiti');
        } else {
          await addFavorite(normalizedCourseId).unwrap();
          toast.success('Corso aggiunto ai preferiti');
        }
      } catch (error) {
        toast.error(
          getRtkErrorMessage(error) || 'Impossibile aggiornare i preferiti',
        );
      } finally {
        setTogglingCourseId(null);
      }
    },
    [addFavorite, favoriteIds, removeFavorite, togglingCourseId],
  );

  useEffect(() => {
    const onResize = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setStartIndex((prev) => {
      const maxStart = Math.max(total - visibleCount, 0);
      return Math.min(prev, maxStart);
    });
  }, [visibleCount, total]);

  const handleNext = () => {
    if (startIndex + visibleCount >= total) return;
    const nextIndex = Math.min(
      startIndex + visibleCount,
      Math.max(total - visibleCount, 0),
    );
    setStartIndex(nextIndex);
  };

  const handlePrev = () => {
    if (startIndex === 0) return;
    const prevIndex = Math.max(startIndex - visibleCount, 0);
    setStartIndex(prevIndex);
  };

  const visibleCourses = courses.slice(startIndex, startIndex + visibleCount);

  return (
    <>
      <HeroBanner />

      <div className="min-w-0">
        <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:items-center">
          <h2 className="min-w-0 text-base font-semibold text-gray-800 sm:text-lg md:text-xl">
            Continua il tuo viaggio di apprendimento
          </h2>
          {total > visibleCount ? (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={startIndex === 0}
                aria-disabled={startIndex === 0}
                aria-label="Precedente"
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#9E9E9E] transition ${startIndex === 0 ? 'cursor-not-allowed opacity-40' : 'text-[#9E9E9E] hover:bg-gray-100'}`}
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={startIndex + visibleCount >= total}
                aria-disabled={startIndex + visibleCount >= total}
                aria-label="Successivo"
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#9E9E9E] transition ${startIndex + visibleCount >= total ? 'cursor-not-allowed opacity-40' : 'text-[#9E9E9E] hover:bg-gray-100'}`}
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          ) : null}
        </div>

        {courses.length === 0 ? (
          <p className="rounded-xl border border-[#ececec] bg-white p-4 text-sm text-gray-600 sm:p-6">
            Nessun corso trovato. Acquista un corso dal catalogo per iniziare la
            formazione.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {visibleCourses.map((course) => {
              const courseId = course.courseId ? String(course.courseId) : null;

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  onCardClick={() =>
                    navigate(`${ROUTES.PRIVATE_USER.COURSE}/${course.courseId}`)
                  }
                  getCategoryClasses={getCategoryClasses}
                  isFavorite={courseId ? favoriteIds.has(courseId) : false}
                  isFavoriteLoading={courseId ? togglingCourseId === courseId : false}
                  onToggleFavorite={
                    courseId ? () => handleToggleFavorite(courseId) : undefined
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default LeftContent;
