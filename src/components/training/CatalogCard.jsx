import { Heading } from '../ui';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CourseMedia from './CourseMedia';
import { formatEuro } from '../../utils/courseMedia';

export default function CatalogCard({ courses = [], loading = false }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-14">
      <h3 className="text-center text-xl md:text-3xl">
        {t('trainingPages.section5.platformTitle')}
      </h3>
      <div className="mx-auto mt-14 container px-4">
        <Heading level={5}> {t('trainingPages.section7.title')}</Heading>
        {loading ? (
          <p className="mt-4 text-sm text-gray-500">
            {t('trainingPages.section7.loadingCourses')}
          </p>
        ) : null}
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => {
            const courseTitle = course.title || course.courseTitle || '';
            const reviewCount = Number(course.reviews || 0);
            const ratingValue = Number(course.rating || 0);
            const courseSlug = course.slug;
            const courseId = course.id;

            return (
              <div
                key={course.id || `${courseTitle}-${index}`}
                className="overflow-hidden rounded-xl border border-[#d8e7e2] bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden p-3 pb-0">
                  <CourseMedia
                    thumbnailUrl={course.thumbnailUrl || course.image}
                    videoUrl={course.videoUrl}
                    alt={courseTitle || t('trainingPages.section7.courseImageAlt')}
                    className="h-[220px] w-full rounded-lg object-cover"
                    showVideoControls={false}
                  />
                </div>

                <div className="px-4 py-2">
                  <h3 className="mb-2 text-[15px] leading-5 font-semibold text-[#3a3a3a]">
                    {courseTitle}
                  </h3>

                  <div className="mb-2 flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-[#73BFA1] uppercase">
                    <span>{course.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[#d3e7df]" />
                    <span>{course.duration}</span>
                  </div>

                  <p className="line-clamp-4 text-[12px] leading-5 text-[#8b8b8b]">
                    {course.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-gray-400 line-through">
                        {formatEuro(course.oldPrice)}
                      </span>
                      <span className="text-[20px] font-bold text-[#34b86a]">
                        {formatEuro(course.price)}
                      </span>
                    </div>

                    <div className="flex space-x-2 text-[14px]">
                      <span className="text-[#3FC89E]">{ratingValue.toFixed(1)}</span>
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

                  <div className="mt-3 flex gap-2">
                    {courseSlug ? (
                      <>
                        <Link
                          to={`/training/course/checkout?slug=${courseSlug}`}
                          className="flex-1 rounded-md bg-[#73BFA1] py-2 text-center text-[12px] text-white transition hover:bg-[#2fa15d]"
                        >
                          {t('trainingPages.section5.signUp')}
                        </Link>

                        <Link
                          className="flex-1 rounded-md border border-[#73BFA1] py-2 text-center text-[12px] text-[#34b86a] transition hover:bg-[#73BFA1] hover:text-white"
                          to={`/training/course/details?slug=${courseSlug}`}
                        >
                          {t('trainingPages.section5.details')}
                        </Link>
                      </>
                    ) : courseId ? (
                      <>
                        <Link
                          to={`/training/course/checkout?id=${courseId}`}
                          className="flex-1 rounded-md bg-[#73BFA1] py-2 text-center text-[12px] text-white transition hover:bg-[#2fa15d]"
                        >
                          {t('trainingPages.section5.signUp')}
                        </Link>

                        <Link
                          className="flex-1 rounded-md border border-[#73BFA1] py-2 text-center text-[12px] text-[#34b86a] transition hover:bg-[#73BFA1] hover:text-white"
                          to={`/training/course/details?id=${courseId}`}
                        >
                          {t('trainingPages.section5.details')}
                        </Link>
                      </>
                    ) : null}
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
