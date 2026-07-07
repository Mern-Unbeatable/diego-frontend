import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner4.png';
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SafetyEmergencyView = () => {
  const { t } = useTranslation();
  const includeItems =
    t('servicesPages.section1.includeItems', { returnObjects: true }) || [];
  const obligations =
    t('servicesPages.section6.obligations', { returnObjects: true }) || [];

  return (
    <Container className=" ">
      <Banner image={banner} title={t('servicesPages.section6.bannerTitle')} />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <Heading level={3}>
              {t('servicesPages.section6.bannerTitle')}
            </Heading>
            <div className="prose prose-lg mt-3 max-w-none">
              <p className="mb-6 leading-relaxed text-gray-600">
                {t('servicesPages.section6.descriptionLead')}
              </p>
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                {t('servicesPages.section6.descriptionBody')}
              </p>

              <ul className="mt-3 mb-8 list-disc space-y-2 pl-6 text-gray-600">
                {obligations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="mb-6 leading-relaxed text-gray-600">
                {t('servicesPages.section6.descriptionCta')}
              </p>

              <Heading level={3}>
                {t('servicesPages.section1.serviceIncludesTitle')}
              </Heading>

              <div className="mt-3 rounded-2xl bg-[#F1F9F6] p-5">
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
            <ServiceForm title={t('servicesPages.section6.bannerTitle')} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SafetyEmergencyView;
