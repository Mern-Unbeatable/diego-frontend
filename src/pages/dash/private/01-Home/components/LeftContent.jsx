import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Loading from '../../../../../components/ui/Utilities/Loading';
import { usePrivate } from '../../../../../features/private/privateHooks';
import CourseCard from './CourseCard';
import HeroBanner from './HeroBanner';

const LeftContent = () => {
  const navigate = useNavigate();
  const { fetchMyEnrollments, enrollments, enrollmentsLoading, enrollmentsError } =
    usePrivate();
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 3;
  const total = enrollments.length;

  useEffect(() => {
    fetchMyEnrollments().catch(() => {});
  }, [fetchMyEnrollments]);

  useEffect(() => {
    setStartIndex(0);
  }, [total]);

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

  const visibleCourses = enrollments.slice(startIndex, startIndex + visibleCount);

  return (
    <>
      <HeroBanner />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Continua il tuo viaggio di apprendimento
          </h2>
          {total > visibleCount && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={startIndex === 0}
                aria-disabled={startIndex === 0}
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#9E9E9E] transition ${startIndex === 0 ? 'cursor-not-allowed opacity-40' : 'text-[#9E9E9E] hover:bg-gray-100'}`}
              >
                <FaChevronLeft />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={startIndex + visibleCount >= total}
                aria-disabled={startIndex + visibleCount >= total}
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#9E9E9E] transition ${startIndex + visibleCount >= total ? 'cursor-not-allowed opacity-40' : 'text-[#9E9E9E] hover:bg-gray-100'}`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {enrollmentsLoading && <Loading size="md" className="min-h-60" />}

        {!enrollmentsLoading && enrollmentsError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {enrollmentsError}
          </div>
        )}

        {!enrollmentsLoading && !enrollmentsError && total === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-gray-500">
            Nessun corso iscritto al momento.
          </div>
        )}

        {!enrollmentsLoading && !enrollmentsError && total > 0 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onCardClick={() =>
                  navigate(`/dashboard/private-user/course/${course.courseId}`)
                }
                getCategoryClasses={getCategoryClasses}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LeftContent;
