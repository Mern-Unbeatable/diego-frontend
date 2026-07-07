import { Heading } from '../ui';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CatalogCard({ courses = [] }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-14">
      <h3 className="text-center text-xl md:text-3xl">
        {t('trainingPages.section5.platformTitle')}
      </h3>
      <div className="mx-auto mt-14 max-w-6xl px-4">
        <Heading level={5}> {t('trainingPages.section7.title')}</Heading>
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={`${course.title}-${index}`}
              className="overflow-hidden rounded-xl border border-[#d8e7e2] bg-white transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-3 pb-0">
                <img
                  src={courseImages[index] || courseImages[0]}
                  alt=""
                  className="h-[250px] w-full rounded-lg object-cover"
                />
              </div>

              <div className="px-4 py-2">
                <h3 className="mb-2 text-[15px] leading-5 font-semibold text-[#3a3a3a]">
                  {course.title}
                </h3>

                <div className="mb-2 flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-[#73BFA1] uppercase">
                  <span>{course.category}</span>
                  <span className="h-1 w-1 rounded-full bg-[#d3e7df]" />
                  <span>{course.duration}</span>
                </div>

                <p className="line-clamp-4 text-[12px] leading-5 text-[#8b8b8b]">
                  {course.description}
                </p>

                {/* price + rating */}
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
                    <span className="text-[#3FC89E]">
                      {course.rating ?? 4.5}
                    </span>
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-[#969696]">
                      (
                      {new Intl.NumberFormat(i18n.language || 'en').format(
                        course.reviews ?? 44566,
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
          ))}
        </div>
      </div>
    </section>
  );
}
