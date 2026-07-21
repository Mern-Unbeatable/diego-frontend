import { Heading } from '../ui';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FALLBACK_COURSE_IMAGE = '/images/course/course1.png';

const formatEuro = (value) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value) || 0);
};

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
          <p className="mt-4 text-sm text-gray-500">Loading courses...</p>
        ) : null}
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => {
            const courseTitle = course.title || course.courseTitle || '';
            const reviewCount = Number(course.reviews || 0);
            const ratingValue = Number(course.rating || 0);

            return (
              <div
                key={course.id || `${courseTitle}-${index}`}
                className="overflow-hidden rounded-xl border border-[#d8e7e2] bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-3 pb-0">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={courseTitle || 'Course image'}
                      className="h-[220px] w-full rounded-lg object-cover"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_COURSE_IMAGE;
                      }}
                    />
                  ) : (
                    <img
                      src={FALLBACK_COURSE_IMAGE}
                      alt="Course placeholder"
                      className="h-[250px] w-full rounded-lg object-cover"
                    />
                  )}
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

                  {/* 5 star review */}
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

                  {/* buttons */}
                  <div className="mt-3 flex gap-2">
                    <Link
                      to={`/training/course/checkout?id=${course.id}`}
                      className="flex-1 rounded-md bg-[#73BFA1] py-2 text-center text-[12px] text-white transition hover:bg-[#2fa15d]"
                    >
                      {t('trainingPages.section5.signUp')}
                    </Link>

                    <Link
                      className="flex-1 rounded-md border border-[#73BFA1] py-2 text-center text-[12px] text-[#34b86a] transition hover:bg-[#73BFA1] hover:text-white"
                      to={`/training/course/details?id=${course.id}`}
                    >
                      {t('trainingPages.section5.details')}
                    </Link>
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
