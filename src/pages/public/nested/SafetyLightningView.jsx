import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner16.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SafetyServiceView = () => {
  const { t } = useTranslation();
  const includeItems =
    t('servicesPages.section1.includeItems', { returnObjects: true }) || [];

  return (
    <Container className=" ">
      <Banner
        description={t('servicesPages.section7.bannerDescription')}
        image={banner}
        title={t('servicesPages.section7.bannerTitle')}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              {t('servicesPages.section1.serviceDetailsTitle')}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6 leading-relaxed text-gray-600">
                {t('servicesPages.section7.description')}
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
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

export default SafetyServiceView;
