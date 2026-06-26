'use client';
import { howWorksData } from '../../../data/howWorksData';
import { useTranslation } from 'react-i18next';

const HowWorks = () => {
    const { t } = useTranslation();
    const sections = t('trainingPages.section10.sections', { returnObjects: true });

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 md:p-12">
            {/* Header Section */}
            <div className="mx-auto mb-16 max-w-6xl">
                <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                    {t('trainingPages.section10.headerTitle')}
                </h1>
                <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
                    {t('trainingPages.section10.headerDescription')}
                </p>
                <span className="text-[#73BFA1]">"{t('trainingPages.section10.headerCta')}"</span>
            </div>

            {howWorksData.map((section, index) => {
                const isReverse = section.reverse;
                const sectionSpacingClass = index === 0 ? 'mb-16' : index === 1 ? 'mb-16 mt-12' : 'mt-12';
                const sectionContent = sections[index];

                const textBlock = (
                    <div className={`flex-1 ${isReverse ? 'order-2 md:order-1' : ''}`}>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">{sectionContent.title}</h2>

                        {sectionContent.contents.map((content, contentIndex) => (
                            <p
                                key={`${section.id}-${contentIndex}`}
                                className={`text-sm leading-relaxed text-gray-600 md:text-base ${contentIndex !== sectionContent.contents.length - 1 || sectionContent.badge ? 'mb-4' : ''
                                    }`}
                            >
                                {content}
                            </p>
                        ))}

                        {sectionContent.badge && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                {sectionContent.badge}
                            </div>
                        )}
                    </div>
                );

                const imageBlock = (
                    <div className={`relative flex-1 ${isReverse ? 'order-1 md:order-2' : ''}`}>
                        <img src={section.image} alt="" className="h-auto w-full" />
                    </div>
                );

                return (
                    <div
                        key={section.id}
                        className={`mx-auto max-w-6xl flex flex-col items-center gap-8 md:flex-row md:gap-12 ${sectionSpacingClass}`}
                    >
                        {isReverse ? (
                            <>
                                {textBlock}
                                {imageBlock}
                            </>
                        ) : (
                            <>
                                {imageBlock}
                                {textBlock}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default HowWorks;