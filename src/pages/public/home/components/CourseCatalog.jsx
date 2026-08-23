// import { useEffect, useMemo, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import CourseCard from './CourseCard';
// import { useCarousel } from '../../../../hooks/useCarousel';
// import { Heading, Container, Button } from '../../../../components/ui';
// import { useCourse } from '../../../../features/public/course/courseHooks';
// import { mapPublicCoursesToCatalogCards } from '../../../../features/public/course/courseMappers';
// import { Link } from 'react-router-dom';

// const CourseCatalog = () => {
//   const { t } = useTranslation();
//   const carouselRef = useRef(null);
//   const { getPublicCourses, courses, loading } = useCourse();

//   useEffect(() => {
//     getPublicCourses().catch(() => {});
//   }, [getPublicCourses]);

//   const catalogCourses = useMemo(
//     () => mapPublicCoursesToCatalogCards(courses),
//     [courses],
//   );

//   const {
//     state,
//     totalPages,
//     showPagination,
//     goToPage,
//     handleDragStart,
//     handleDragMove,
//     handleDragEnd,
//   } = useCarousel(catalogCourses.length);

//   const renderPagination = () => {
//     if (!showPagination) return null;

//     return (
//       <div className="mt-8 mb-8 flex justify-center gap-2">
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToPage(index)}
//             className={`h-2 rounded-full transition-all duration-300 ${
//               index === state.currentPage
//                 ? 'w-8 bg-[#3FC89E]'
//                 : 'w-2 bg-[#76c0a2]'
//             }`}
//             aria-label={`Go to page ${index + 1}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   const renderCarousel = () => {
//     const finalTranslateValue = state.isMoved
//       ? state.currentTranslate
//       : -((state.currentPage * 100) / state.itemsPerPage);

//     return (
//       <div
//         className="-mx-3 overflow-hidden select-none sm:-m-6"
//         onMouseDown={handleDragStart}
//         onMouseMove={handleDragMove}
//         onMouseUp={handleDragEnd}
//         onMouseLeave={handleDragEnd}
//         onTouchStart={handleDragStart}
//         onTouchMove={handleDragMove}
//         onTouchEnd={handleDragEnd}
//       >
//         <div
//           ref={carouselRef}
//           className={`flex ${state.isMoved ? 'cursor-grabbing' : 'cursor-grab'} ${
//             !state.isMoved || state.startX === 0
//               ? 'transition-transform duration-500 ease-out'
//               : ''
//           }`}
//           style={{
//             transform: `translateX(${finalTranslateValue}%)`,
//             WebkitUserSelect: 'none',
//             MozUserSelect: 'none',
//             msUserSelect: 'none',
//             userSelect: 'none',
//           }}
//         >
//           {catalogCourses.map((course) => (
//             <div
//               key={course.id}
//               className="p-4"
//               style={{
//                 minWidth: `${100 / state.itemsPerPage}%`,
//               }}
//             >
//               <CourseCard course={course} isDragging={state.isDragging} />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
// <div className='container mx-auto px-4'>

//     <Container size="full" className=" py-12 sm:py-16 lg:py-20">
//       <Heading
//         level={2}
//         className="mb-8 text-2xl font-bold text-[#1a1a1a] sm:mb-12 sm:text-3xl lg:text-4xl"
//       >
//         {t('homeView.section3.exploreCatalog')}
//       </Heading>

//       <div>
//         {loading ? (
//           <p className="mb-6 text-sm text-gray-500">
//             {t('trainingPages.section7.loadingCourses')}
//           </p>
//         ) : null}

//         {!loading && catalogCourses.length === 0 ? (
//           <p className="mb-6 text-sm text-gray-500">
//             {t('trainingPages.section7.courseNotFound')}
//           </p>
//         ) : null}

//         {catalogCourses.length > 0 ? renderCarousel() : null}
//         {catalogCourses.length > 0 ? renderPagination() : null}

//         <div className="flex justify-center px-2">

//           <Link to="/training/courses/catalog">
//             <Button
//               size="lg"
//               variant="outline"
//               label={t('homeView.section3.exploreAllCourses')}
//               className="w-full max-w-[360px] font-semibold text-[#73BFA1] sm:w-auto"
//             />
//           </Link>
//         </div>
//       </div>
//     </Container>

// </div>
//   );
// };

// export default CourseCatalog;





import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CourseCard from './CourseCard';
import { useCarousel } from '../../../../hooks/useCarousel';
import { Heading, Container, Button } from '../../../../components/ui';
import { useCourse } from '../../../../features/public/course/courseHooks';
import { mapPublicCoursesToCatalogCards } from '../../../../features/public/course/courseMappers';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react'; // Error icon

const CourseCatalog = () => {
  const { t } = useTranslation();
  const carouselRef = useRef(null);
  const { getPublicCourses, courses, loading, error } = useCourse();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getPublicCourses().catch(() => {});
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  // Retry function
  const handleRetry = async () => {
    try {
      await getPublicCourses();
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const renderPagination = () => {
    if (!showPagination || isMobile) return null;

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
              className="p-3 sm:p-4"
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
    <div className='container mx-auto'>
      <Container size="full" className="px-4 py-12 sm:py-16 lg:py-20">
        <Heading
          level={2}
          className="mb-8 text-2xl font-bold text-[#1a1a1a] sm:mb-12 sm:text-3xl lg:text-4xl"
        >
          {t('homeView.section3.exploreCatalog')}
        </Heading>

        <div>
          {/* Loading State */}
          {loading ? (
            <p className="mb-6 text-sm text-gray-500">
              {t('trainingPages.section7.loadingCourses')}
            </p>
          ) : null}

          {/* Error State with Retry Button */}
          {error && !loading ? (
            <div className="mb-6 flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <RefreshCw className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-red-900">
                {t('trainingPages.section7.errorLoadingCourses')}
              </h3>
              <p className="mb-4 text-sm text-red-700">
                {t('trainingPages.section7.errorMessage')}
              </p>
              <Button
                onClick={handleRetry}
                variant="outline"
                size="md"
                className="flex items-center gap-2 border-red-300 bg-white text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                {t('trainingPages.section7.retry')}
              </Button>
            </div>
          ) : null}

          {/* No Courses Found */}
          {!loading && !error && catalogCourses.length === 0 ? (
            <p className="mb-6 text-sm text-gray-500">
              {t('trainingPages.section7.courseNotFound')}
            </p>
          ) : null}

          {/* Courses Carousel */}
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
    </div>
  );
};

export default CourseCatalog;