import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner14.png';
import { Container, Heading } from '../../../components/ui';
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
        description={t('servicesPages.section2.bannerDescription')}
        image={banner}
        title={t('servicesPages.section2.bannerTitle')}
      />
      <div className="container mx-auto  py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <Heading level={3}>
              {t('servicesPages.section1.serviceDetailsTitle')}
            </Heading>

            <div className="prose prose-lg mt-3 max-w-none">
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                {t('servicesPages.section4.description')}
              </p>

              <ul className="mb-8 list-none space-y-3 pl-0 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    <span className="font-semibold">ASPP</span>{' '}
                    {t('servicesPages.section4.aspp')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    <span className="font-semibold">RSPP</span>{' '}
                    {t('servicesPages.section4.rspp')}
                  </span>
                </li>
              </ul>

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
