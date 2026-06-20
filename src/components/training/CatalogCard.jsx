import { courses } from "./CourseCard";

export default function CatalogCard() {
    return (
        <section className=" py-14">
            <h3 className='text-center text-3xl'>La piattaforma di formazione online per la tua azienda</h3>
            <div className="max-w-6xl mx-auto px-4 mt-14">
                <h2 className="text-[30px] font-semibold text-[#333] mb-8">
                    Corsi obbligatori
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white border border-[#d8e7e2] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="p-3 pb-0">
                                <img
                                    src={course.image}
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
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[12px] text-gray-400 line-through">
                                            {course.oldPrice}
                                        </span>

                                        <span className="text-[20px] font-bold text-[#34b86a]">
                                            {course.price}
                                        </span>
                                    </div>

                                    {/* 5 star review */}
                                    <div className="flex  text-[14px] space-x-2">
                                        <span className="txt-[#3FC89E]">4.5</span>
                                        <span className="text-yellow-400">   ★★★★★</span>
                                        <span className="text-[#969696]">(44,566)</span>
                                    </div>
                                </div>

                                {/* buttons */}
                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 bg-[#73BFA1] text-white text-[12px] py-2 rounded-md hover:bg-[#2fa15d] transition">
                                        Sign up
                                    </button>

                                    <button className="flex-1 border border-[#73BFA1] text-[#34b86a] text-[12px] py-2 rounded-md hover:bg-[#73BFA1] hover:text-white transition">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}