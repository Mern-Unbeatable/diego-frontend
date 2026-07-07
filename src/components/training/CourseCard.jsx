import trainingCourses from '../../data/trainingCourses.json';
import { useTranslation } from 'react-i18next';

export const courses = trainingCourses.courses ?? [];
export const pageContent = trainingCourses.sevesoPage ?? {};

export default function CoursesSection() {
  const { t } = useTranslation();

  const localizedCourses = courses.map((course, index) => ({
    ...course,
    title: t(`trainingPages.section7.courses.${index}.title`, {
      defaultValue: course.title,
    }),
    description: t(`trainingPages.section7.courses.${index}.description`, {
      defaultValue: course.description,
    }),
  }));

  return (
    <section className="bg-[#f6f6f6] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-[30px] font-semibold text-[#333]">
          {t('trainingPages.section7.title', {
            defaultValue: pageContent.courseCardsTitle ?? 'Corsi obbligatori',
          })}
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {localizedCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-xl border border-[#d8e7e2] bg-white transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-3 pb-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-[250px] w-full rounded-lg object-cover"
                />
              </div>

              <div className="px-4 py-2">
                <h3 className="mb-2 text-[15px] leading-5 font-semibold text-[#3a3a3a]">
                  {course.title}
                </h3>

                <p className="line-clamp-4 text-[12px] leading-5 text-[#8b8b8b]">
                  {course.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-400 line-through">
                    {course.oldPrice}
                  </span>

                  <span className="text-[20px] font-bold text-[#34b86a]">
                    {course.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
