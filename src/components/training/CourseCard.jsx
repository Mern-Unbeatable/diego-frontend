import { useTranslation } from 'react-i18next';
import catalog from '../../../src/assets/images/course/catalog.png';
import catalog2 from '../../../src/assets/images/course/catalog2.png';
import catalog3 from '../../../src/assets/images/course/catalog3.png';
import catalog4 from '../../../src/assets/images/course/catalog4.png';
import catalog5 from '../../../src/assets/images/course/catalog5.png';
import catalog6 from '../../../src/assets/images/course/catalog6.png';
import { COURSE_DATA } from '../../config/courses';

const courseImages = [catalog, catalog2, catalog3, catalog4, catalog5, catalog6];
const courses = COURSE_DATA.slice(0, 6);

const formatEuro = (value) => `${value.toFixed(2).replace('.', ',')} €`;

export default function CoursesSection() {
    const { t } = useTranslation();

    return (
        <section className="bg-[#f6f6f6] py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-[30px] font-semibold text-[#333] mb-8">
                    {t('trainingPages.section7.title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {courses.map((course, index) => (
                        <div
                            key={`${course.title}-${index}`}
                            className="bg-white border border-[#d8e7e2] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="p-3 pb-0">
                                <img
                                    src={courseImages[index] || courseImages[0]}
                                    alt=""
                                    className="h-[250px] w-full object-cover rounded-lg"
                                />
                            </div>

                            <div className="px-4 py-2">
                                <h3 className="text-[15px] font-semibold text-[#3a3a3a] leading-5 mb-2">
                                    {course.title}
                                </h3>

                                <p className="text-[12px] leading-5 text-[#8b8b8b] line-clamp-4">
                                    {course.description}
                                </p>

                                <div className=" flex items-center gap-2">
                                    <span className="text-[12px] text-gray-400 line-through">
                                        {formatEuro(course.oldPrice)}
                                    </span>

                                    <span className="text-[20px] font-bold text-[#34b86a]">
                                        {formatEuro(course.price)}
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