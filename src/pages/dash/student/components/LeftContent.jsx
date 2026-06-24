import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/ui/layouts/Card';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { IoIosStarOutline, IoMdStar } from 'react-icons/io';

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
      <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#73BFA1] to-[#5aa687] p-8 shadow-lg md:p-12">
        {/* Decorative stars cluster (keeps same look on large screens, scales/positions on smaller screens) */}
        <div className="pointer-events-none absolute inset-0 gap-4">
          <IoMdStar className="absolute -top-18 right-16 hidden h-40 w-40 text-white opacity-20 md:block" />
          <IoMdStar className="absolute top-20 right-6 hidden h-16 w-16 text-white opacity-10 md:block" />
          <IoMdStar className="absolute top-28 right-36 hidden h-26 w-26 text-white opacity-10 md:block" />
          <IoMdStar className="absolute top-38 -right-2 hidden h-26 w-26 text-white opacity-10 md:block" />
          <IoMdStar className="absolute top-8 right-62 hidden h-26 w-26 text-white opacity-10 md:block" />
          <IoMdStar className="absolute top-3 right-3 block h-28 w-28 text-white opacity-15 md:hidden" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="mb-6 text-3xl leading-tight font-bold text-white md:text-4xl">
            Affina le tue competenze professionali
          </h1>

          <button
            type="button"
            className="transform rounded-full bg-[#284338] px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:bg-slate-900"
          >
            Inizia ora
          </button>
        </div>
      </div>

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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <Card
              key={course.id}
              padding="none"
              shadow="sm"
              className="cursor-pointer overflow-hidden transition hover:shadow-lg"
              onClick={() => navigate(`/dashboard/private-user/course/1`)}
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/400x300?text=Course+Image';
                  }}
                />
                <button
                  type="button"
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/50 opacity-60 shadow-md hover:bg-gray-100"
                >
                  <span className="text-gray-600">♡</span>
                </button>
              </div>

              <div className="p-4">
                <p
                  className={`mb-2 inline-block rounded-full px-3 py-1 text-xs tracking-wide uppercase ${getCategoryClasses(course.category)}`}
                >
                  {course.category}
                </p>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {course.title}
                </h3>

                <div className="mb-4">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-[#73BFA1] transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full rounded-full bg-[#73BFA1] py-2.5 font-medium text-white transition hover:bg-[#5aa687]"
                >
                  {course.buttonText}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftContent;
