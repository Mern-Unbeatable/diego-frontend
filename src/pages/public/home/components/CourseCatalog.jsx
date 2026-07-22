import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CourseCard from './CourseCard';
import { useCarousel } from '../../../../hooks/useCarousel';
import { Heading, Container, Button } from '../../../../components/ui';
import { useCourse } from '../../../../features/public/course/courseHooks';
import { mapPublicCoursesToCatalogCards } from '../../../../features/public/course/courseMappers';
import { Link } from 'react-router-dom';

const CourseCatalog = () => {
  const { t } = useTranslation();
  const carouselRef = useRef(null);
  const { getPublicCourses, courses, loading } = useCourse();

  useEffect(() => {
    getPublicCourses().catch(() => {});
  }, [getPublicCourses]);

  const catalogCourses = useMemo(
    () => mapPublicCoursesToCatalogCards(courses),
    [courses],
  );

  const {
    state,
    totalPages,
    showPagination,
    goToPage,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useCarousel(catalogCourses.length);

  const renderPagination = () => {
    if (!showPagination) return null;

    return (
      <div className="mt-8 mb-8 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === state.currentPage
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
          className={`flex ${state.isMoved ? 'cursor-grabbing' : 'cursor-grab'} ${
            !state.isMoved || state.startX === 0
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
          {catalogCourses.map((course) => (
            <div
              key={course.id}
              className="p-4"
              style={{
                minWidth: `${100 / state.itemsPerPage}%`,
              }}
            >
              <CourseCard course={course} isDragging={state.isDragging} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container size="full" className="py-12 sm:py-16 lg:py-20">
      <Heading
        level={2}
        className="mb-8 text-2xl font-bold text-[#1a1a1a] sm:mb-12 sm:text-3xl lg:text-4xl"
      >
        {t('homeView.section3.exploreCatalog')}
      </Heading>

      <div>
        {loading ? (
          <p className="mb-6 text-sm text-gray-500">
            {t('trainingPages.section7.loadingCourses')}
          </p>
        ) : null}

        {!loading && catalogCourses.length === 0 ? (
          <p className="mb-6 text-sm text-gray-500">
            {t('trainingPages.section7.courseNotFound')}
          </p>
        ) : null}

        {catalogCourses.length > 0 ? renderCarousel() : null}
        {catalogCourses.length > 0 ? renderPagination() : null}

        <div className="flex justify-center px-2">

          <Link to="/training/courses/catalog">
            <Button
              size="lg"
              variant="outline"
              label={t('homeView.section3.exploreAllCourses')}
              className="w-full max-w-[360px] font-semibold text-[#73BFA1] sm:w-auto"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default CourseCatalog;
