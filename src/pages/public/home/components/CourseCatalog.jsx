import { useRef } from 'react';
import CourseCard from './CourseCard';

import { useCarousel } from '../../../../config/hooks/useCarousel';
import { Heading, Container, Button } from '../../../../components/ui';
import { COURSE_DATA } from '../../../../config/courses';


const CourseCatalog = () => {
  const carouselRef = useRef(null);
  const {
    state,
    totalPages,
    showPagination,
    goToPage,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useCarousel(COURSE_DATA.length);

  const handleButtonClick = (action, course) => {

  };

  const renderPagination = () => {
    if (!showPagination) return null;

    return (
      <div className="mt-8 mb-8 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === state.currentPage
              ? 'w-8 bg-[#3FC89E]'
              : 'w-2 bg-[#76c0a2]'
              }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  const renderCarousel = () => {
    const finalTranslateValue = state.isMoved
      ? state.currentTranslate
      : -((state.currentPage * 100) / state.itemsPerPage);

    return (
      <div
        className="-mx-3 overflow-hidden select-none sm:-m-6"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          ref={carouselRef}
          className={`flex ${state.isMoved ? 'cursor-grabbing' : 'cursor-grab'} ${!state.isMoved || state.startX === 0
            ? 'transition-transform duration-500 ease-out'
            : ''
            }`}
          style={{
            transform: `translateX(${finalTranslateValue}%)`,
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          {COURSE_DATA.map((course) => (
            <div
              key={course.id}
              className="p-4"
              style={{
                minWidth: `${100 / state.itemsPerPage}%`,
              }}
            >
              <CourseCard
                course={course}
                isDragging={state.isDragging}
                onButtonClick={handleButtonClick}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container size="full" className="py-12 sm:py-16 lg:py-20">
      <Heading level={2} className="mb-10 sm:mb-14 lg:mb-20">
        Esplora il nostro catalogo corsi
      </Heading>

      <div>
        {renderCarousel()}
        {renderPagination()}

        <div className="flex justify-center px-2">
          <Button
            size="lg"
            variant="outline"
            label={`"Esplora tutti i nostri corsi"`}
            className="w-full max-w-[360px] font-semibold text-[#73BFA1] sm:w-auto"
          />
        </div>
      </div>
    </Container>
  );
};

export default CourseCatalog;
