import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ROUTES } from '../../../../../config/routes';
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

const LeftContent = ({ courses = [] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const total = courses.length;
  const navigate = useNavigate();

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

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Continua il tuo viaggio di apprendimento
          </h2>
          {total > visibleCount ? (
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
          ) : null}
        </div>

        {courses.length === 0 ? (
          <p className="rounded-xl border border-[#ececec] bg-white p-6 text-sm text-gray-600">
            Nessun corso trovato. Acquista un corso dal catalogo per iniziare la
            formazione.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onCardClick={() =>
                  navigate(`${ROUTES.PRIVATE_USER.COURSE}/${course.courseId}`)
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
