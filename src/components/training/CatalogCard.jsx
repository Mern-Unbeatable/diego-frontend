import { Heading } from "../ui";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CatalogCard({ courses = [] }) {
    const { t, i18n } = useTranslation();

    return (
        <section className=" py-14">

            <h3 className='text-center text-xl md:text-3xl'>{t('trainingPages.section5.platformTitle')}</h3>
            <div className="container mx-auto px-4 mt-14">

                <Heading level={5}>  {t('trainingPages.section7.title')}</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-3 ">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white border-2 border-[#d8e7e2] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full"
                        >
                            <div className="p-3 pb-0">
                                <img
                                    src={course.image}
                                    alt=""
                                    className="h-[250px] w-full object-cover rounded-lg"
                                />
                            </div>

                            <div className="px-4 py-2 flex flex-col flex-1">
                                <h3 className="text-xl font-semibold text-[#3a3a3a] leading-5 mb-2">
                                    {course.title}
                                </h3>

                                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase  text-[#73BFA1]">
                                    <span>{course.category}</span>
                                    <span className="h-1 w-1 rounded-full bg-[#d3e7df]" />
                                    <span>{course.duration}</span>
                                </div>

                                <p className="text-sm leading-5 text-[#8b8b8b] line-clamp-4">
                                    {course.description}
                                </p>

                                {/* price + rating */}
                                <div className="flex flex-wrap items-center justify-between mt-2">
                                    {/* 5 star review */}
                                    <div className="flex  text-[14px] space-x-2">
                                        <span className="text-[#3FC89E]">{course.rating ?? 4.5}</span>
                                        <span className="text-yellow-400">★★★★★</span>
                                        <span className="text-[#969696]">
                                            ({new Intl.NumberFormat(i18n.language || "en").format(course.reviews ?? 44566)})
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[12px] text-gray-400 line-through">
                                            {course.oldPrice}
                                        </span>

                                        <span className="text-[20px] font-bold text-[#34b86a]">
                                            {course.price}
                                        </span>
                                    </div>

                                </div>

                                {/* buttons */}
                                <div className="flex gap-2 mt-3 mt-auto pt-3">
                                    <Link
                                        to={`/training/course/checkout?id=${course.id}`}
                                        className="flex-1 bg-[#73BFA1] text-center text-white text-base py-2 rounded-full hover:bg-[#2fa15d] transition"
                                    >
                                        {t('trainingPages.section5.signUp')}
                                    </Link>

                                    <Link
                                        className="flex-1 border text-center border-[#73BFA1] rounded-full text-[#34b86a] text-base py-2  hover:bg-[#73BFA1] hover:text-white transition"
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