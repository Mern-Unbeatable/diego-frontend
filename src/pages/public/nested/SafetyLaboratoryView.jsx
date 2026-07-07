import { ChevronRight, ArrowRight } from 'lucide-react';
import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner8.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { useTranslation } from 'react-i18next';

const SafetyLaboratoryView = () => {
  const { t } = useTranslation();
  const includeItems = t('servicesPages.section1.includeItems', { returnObjects: true }) || [];
  const sections = t('servicesPages.section11.sections', { returnObjects: true }) || [];

  return (
    <Container className=" ">
      <Banner
        description={t('servicesPages.section11.bannerDescription')}
        image={banner}
        title={t('servicesPages.section11.bannerTitle')}
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white px-6 py-8 lg:sticky lg:top-24">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {t('servicesPages.section1.serviceDetailsTitle')}
              </h1>

              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {t('servicesPages.section11.intro')}
              </p>

              <div className="space-y-8 mb-10">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="font-bold text-gray-900 text-lg mb-3">{section.title}</h2>
                    {section.description ? (
                      <p className="text-gray-700 text-sm mb-3 pl-1">{section.description}</p>
                    ) : null}
                    <ul className="space-y-3 pl-1 text-gray-700 text-sm">
                      {(section.items || []).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-[#F0F8F5] rounded-2xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">{t('servicesPages.section1.serviceIncludesTitle')}</h2>
                <ul className="space-y-3">
                  {includeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                      <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <ServiceForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SafetyLaboratoryView;