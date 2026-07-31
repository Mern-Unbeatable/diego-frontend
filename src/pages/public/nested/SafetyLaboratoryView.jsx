import { ChevronRight, ArrowRight } from 'lucide-react';
import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner8.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { useTranslation } from 'react-i18next';

const SafetyLaboratoryView = () => {
  const { t } = useTranslation();
  const includeItems =
    t('servicesPages.section1.includeItems', { returnObjects: true }) || [];
  const sections =
    t('servicesPages.section11.sections', { returnObjects: true }) || [];

  return (
    <Container className=" ">
      <div className="container mx-auto px-4">
     
        <Banner
          description={t('servicesPages.section11.bannerDescription')}
          image={banner}
          title={t('servicesPages.section11.bannerTitle')}
        />
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="bg-white px-6 py-8 lg:sticky lg:top-24">
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-6 text-4xl font-bold text-gray-900">
                {t('servicesPages.section1.serviceDetailsTitle')}
              </h1>

              <p className="mb-8 text-sm md:text-base leading-relaxed text-gray-700">
                {t('servicesPages.section11.intro')}
              </p>

              <div className="mb-10 space-y-8">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="mb-3 text-lg font-bold text-gray-900">
                      {section.title}
                    </h2>
                    {section.description ? (
                      <p className="mb-3 pl-1 text-sm text-gray-700">
                        {section.description}
                      </p>
                    ) : null}
                    <ul className="space-y-3 pl-1 text-sm text-gray-700">
                      {(section.items || []).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#F0F8F5] p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">
                  {t('servicesPages.section1.serviceIncludesTitle')}
                </h2>
                <ul className="space-y-3">
                  {includeItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
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
