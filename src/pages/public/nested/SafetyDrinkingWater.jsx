import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner6.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SafetyDrinkingWater = () => {
  const { t } = useTranslation();
  const includeItems =
    t('servicesPages.section1.includeItems', { returnObjects: true }) || [];
  const parameterItems =
    t('servicesPages.section10.parameterItems', { returnObjects: true }) || [];

  return (
    <Container className=" ">
      <div className='container mx-auto px-4'>

      <Banner
        description={t('servicesPages.section10.bannerDescription')}
        image={banner}
        title={t('servicesPages.section10.bannerTitle')}
      />

      </div>

      <div className="container mx-auto px-4  py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              {t('servicesPages.section1.serviceDetailsTitle')}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                {t('servicesPages.section10.paragraph1')}
              </p>
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                {t('servicesPages.section10.paragraph2')}
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                {t('servicesPages.section10.paragraph3')}
              </p>

              <div className="rounded-2xl bg-[#F1F9F6] p-5">
                <ul className="list-disc space-y-4 pl-5 text-gray-600">
                  <li className="leading-relaxed">
                    <strong>{t('servicesPages.section10.sampleAtHome')}</strong>
                  </li>

                  <li className="leading-relaxed">
                    <div>
                      <span>
                        <strong>
                          {t('servicesPages.section10.fullAnalysisLead')}
                        </strong>{' '}
                      </span>

                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-gray-500">
                        {parameterItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
                <p className="mt-4 leading-relaxed text-gray-600">
                  {t('servicesPages.section10.reportNote')}
                </p>
              </div>

              <h2 className="mt-6 mb-4 text-2xl font-bold text-gray-900">
                {t('servicesPages.section1.serviceIncludesTitle')}
              </h2>

              <div className="rounded-2xl bg-[#F1F9F6] p-5">
                <ul className="list-none space-y-3 pl-0 text-gray-600">
                  {includeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
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

export default SafetyDrinkingWater;
