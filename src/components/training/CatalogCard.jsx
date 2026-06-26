import { Heading } from "../ui";
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

export default function CatalogCard() {
    const { t } = useTranslation();

    return (
        <section className=" py-14">

            <h3 className='text-center text-xl md:text-3xl'>{t('trainingPages.section5.platformTitle')}</h3>
            <div className="max-w-6xl mx-auto px-4 mt-14">

                <Heading level={5}>  {t('trainingPages.section7.title')}</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 ">
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

                                {/* price + rating */}
                                <div className="flex flex-wrap items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[12px] text-gray-400 line-through">
                                            {formatEuro(course.oldPrice)}
                                        </span>

                                        <span className="text-[20px] font-bold text-[#34b86a]">
                                            {formatEuro(course.price)}
                                        </span>
                                    </div>

                                    {/* 5 star review */}
                                    <div className="flex  text-[14px] space-x-2">
                                        <span className="txt-[#3FC89E]">{t('trainingPages.section5.ratingValue')}</span>
                                        <span className="text-yellow-400">   ★★★★★</span>
                                        <span className="text-[#969696]">{t('trainingPages.section5.ratingCount')}</span>
                                    </div>
                                </div>

                                {/* buttons */}
                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 bg-[#73BFA1] text-white text-[12px] py-2 rounded-md hover:bg-[#2fa15d] transition">
                                        {t('trainingPages.section5.signUp')}
                                    </button>

                                    <a className="flex-1 border text-center border-[#73BFA1] text-[#34b86a] text-[12px] py-2 rounded-md hover:bg-[#73BFA1] hover:text-white transition" href="/training/course/details">
                                        {t('trainingPages.section5.details')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}