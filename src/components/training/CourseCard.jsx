import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CourseMedia from './CourseMedia';
import { useCourse } from '../../features/public/course/courseHooks';
import { mapPublicCoursesToCatalogCards } from '../../features/public/course/courseMappers';
import { formatEuro } from '../../utils/courseMedia';

export default function CoursesSection() {
  const { t, i18n } = useTranslation();
  const { getPublicCourses, courses, loading } = useCourse();

  useEffect(() => {
    getPublicCourses().catch(() => {});
  }, [getPublicCourses]);

  const catalogCourses = useMemo(
    () => mapPublicCoursesToCatalogCards(courses),
    [courses],
  );

  return (
    <section className="bg-[#f6f6f6] py-10">
      <div className="mx-auto container px-4">
        <h2 className="mb-8 text-[30px] font-semibold text-[#333]">
          {t('trainingPages.section7.title')}
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">
            {t('trainingPages.section7.loadingCourses')}
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {catalogCourses.map((course, index) => {
            const courseTitle = course.title || '';
            const reviewCount = Number(course.reviews || 0);
            const ratingValue = Number(course.rating || 0);

            return (
              <div
                key={course.id || `${courseTitle}-${index}`}
                className="overflow-hidden rounded-xl border-2 border-[#d8e7e2] bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-3 pb-0">
                  <CourseMedia
                    thumbnailUrl={course.thumbnailUrl}
                    videoUrl={course.videoUrl}
                    alt={courseTitle || t('trainingPages.section7.courseImageAlt')}
                    className="h-[250px] w-full rounded-lg object-cover"
                    showVideoControls={false}
                  />
                </div>

                <div className="px-4 py-2">
                  <h3 className="mb-2 text-base leading-5 font-semibold text-[#3a3a3a] md:text-lg">
                    {courseTitle}
                  </h3>

                  <div className="mb-2 flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-[#73BFA1] uppercase">
                    <span>{course.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[#d3e7df]" />
                    <span>{course.duration}</span>
                  </div>

                  <p className="line-clamp-4 text-sm leading-5 text-[#8b8b8b]">
                    {course.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-gray-400 line-through">
                        {formatEuro(course.oldPrice)}
                      </span>
                      <span className="mt-2 text-xl font-bold text-[#34b86a]">
                        {formatEuro(course.price)}
                      </span>
                    </div>

                    <div className="flex space-x-2 text-[14px]">
                      <span className="text-[#3FC89E]">
                        {ratingValue.toFixed(1)}
                      </span>
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-[#969696]">
                        (
                        {new Intl.NumberFormat(i18n.language || 'en').format(
                          reviewCount,
                        )}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
