import { CheckCircle, Zap, Settings, BookOpen, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CollaborationBenefits() {
    const { t } = useTranslation();

    const benefits = [
        {
            id: 1,
            icon: Zap,
            title: t('workWithUs.section3.benefit1Title'),
            description: t('workWithUs.section3.benefit1Desc')
        },
        {
            id: 2,
            icon: Settings,
            title: t('workWithUs.section3.benefit2Title'),
            description: t('workWithUs.section3.benefit2Desc')
        },
        {
            id: 3,
            icon: BookOpen,
            title: t('workWithUs.section3.benefit3Title'),
            description: t('workWithUs.section3.benefit3Desc')
        },
        {
            id: 4,
            icon: Shield,
            title: t('workWithUs.section3.benefit4Title'),
            description: t('workWithUs.section3.benefit4Desc')
        }
    ];

    const licenseFeatures = [
        t('workWithUs.section3.feature1'),
        t('workWithUs.section3.feature2'),
        t('workWithUs.section3.feature3'),
        t('workWithUs.section3.feature4'),
        t('workWithUs.section3.feature5')
    ];

    return (
        <div className="  bg-gradient-to-r from-[#FAFAFA] to-blue-50 py-16 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-7xl mx-auto">
                {/* Main Container with 2 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column - Benefits */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            {t('workWithUs.section3.title')}
                        </h1>

                        <p className="text-gray-600 mb-12 leading-relaxed">
                            {t('workWithUs.section3.description')}
                        </p>

                        {/* Benefits Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {benefits.map((benefit) => {
                                const IconComponent = benefit.icon;
                                return (
                                    <div key={benefit.id} className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-teal-100">
                                                <IconComponent className="h-6 w-6 text-teal-600" strokeWidth={2} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column - License Model Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg border border-teal-200 p-8 sticky top-20">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                {t('workWithUs.section3.licenseTitle')}
                            </h2>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8">
                                {licenseFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm leading-relaxed">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Footer Text */}
                            <div className="border-t border-teal-200 pt-6">
                                <p className="text-sm text-gray-600 text-center font-medium">
                                    {t('workWithUs.section3.compliance')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
