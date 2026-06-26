import { useState } from 'react';
import { ChevronLeft, CheckCircle, Star } from 'lucide-react';
import detail from '../../../../src/assets/images/course/course.png';
import PricingCardsModal from '../../../components/training/PricingCardsModal';
import { useTranslation } from 'react-i18next';

const CourseDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();
    const objectives = t('trainingPages.courseDetail.objectives', {
        returnObjects: true,
    });

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-6 py-14">

                <div className="mb-8 flex items-center gap-2">
                    <ChevronLeft className="h-5 w-5 text-green-600" />
                    <button className="text-green-600 hover:text-green-700 font-semibold">{t('trainingPages.courseDetail.backToCatalog')}</button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Left Content */}
                    <div className="md:col-span-2">
                        {/* Course Image */}
                        <div className="mb-6 overflow-hidden rounded-lg bg-gray-200 aspect-video">
                            <img
                                src={detail}
                                alt="Course"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Category Badge */}
                        <p className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-[#73BFA1]">
                            SAFETY
                        </p>

                        {/* Rating */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                                <Star className="h-5 w-5 text-gray-300" />
                            </div>
                            <span className="text-sm text-gray-600">{t('trainingPages.courseDetail.rating')}</span>
                        </div>

                        {/* Course Title and Description */}
                        <h1 className="mb-6 text-3xl font-bold text-gray-900">{t('trainingPages.courseDetail.title')}</h1>
                        <p className="mb-8 text-gray-700 leading-relaxed">
                            {t('trainingPages.courseDetail.description')}
                        </p>

                        {/* Objectives Section */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">{t('trainingPages.courseDetail.objectivesTitle')}</h2>
                            <div className="space-y-3">
                                {objectives.map((item, index) => (
                                    <div className="flex items-start gap-3" key={index}>
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Pricing Card */}
                    <div className="rounded-lg bg-green-50 p-6 h-fit">
                        <div className="mb-6 flex items-baseline gap-3">
                            <span className="text-2xl font-bold text-gray-800">€25.00</span>
                            <span className="text-xl font-bold text-[#73BFA1]">€18.00</span>
                            <span className="text-xs text-gray-600">{t('trainingPages.courseDetail.specialPrice')}</span>
                        </div>

                        <div className="mb-6 space-y-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#73BFA1]" />
                                <span>{t('trainingPages.courseDetail.duration')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#73BFA1]" />
                                <span>{t('trainingPages.courseDetail.code')}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full rounded-full bg-[#73BFA1] py-3 font-semibold text-white hover:bg-[#73BFA1] transition mb-6"
                        >
                            {t('trainingPages.courseDetail.enrollNow')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <PricingCardsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CourseDetails;