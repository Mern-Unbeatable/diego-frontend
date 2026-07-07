import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../../components/ui/layouts/Card';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { IoIosStarOutline } from 'react-icons/io';
import CourseCard from './CourseCard';
import HeroBanner from './HeroBanner';

const LeftContent = () => {
  const courses = [
    {
      id: 1,
      title: 'Formazione SEVESO',
      category: 'IN CORSO',
      image: '/image/mandatory_courses/image1.jpg',
      progress: 75,
      buttonText: 'Riprendi',
    },
    {
      id: 2,
      title: 'Formazione generale',
      category: 'COMPLETATO',
      image: '/image/mandatory_courses/image2.jpg',
      progress: 100,
      buttonText: 'Scarica attestato',
    },
    {
      id: 3,
      title: 'Formazione generale',
      category: 'COMPLETATO',
      image: '/image/mandatory_courses/image2.jpg',
      progress: 100,
      buttonText: 'Scarica attestato',
    },
    {
      id: 4,
      title: 'Formazione generale',
      category: 'COMPLETATO',
      image: '/image/mandatory_courses/image2.jpg',
      progress: 100,
      buttonText: 'Scarica attestato',
    },
    {
      id: 5,
      title: 'Password Security',
      category: 'NON ANCORA INIZIATO',
      image: '/image/mandatory_courses/image3.jpg',
      progress: 0,
      buttonText: 'Inizia corso',
    },
  ];

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

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const total = courses.length;

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
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Course Cards Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Continua il tuo viaggio di apprendimento
          </h2>
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
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onCardClick={() => navigate(`/dashboard/private-user/course/1`)}
              getCategoryClasses={getCategoryClasses}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftContent;
