import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner2.png';
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SafetyServiceView = () => {
  const { t } = useTranslation();
  const includeItems = t('servicesPages.section1.includeItems', { returnObjects: true }) || [];
  return (
    <Container className=" ">
      <Banner
        description={t('servicesPages.section5.bannerDescription')}
        image={banner}
        title={t('servicesPages.section5.bannerTitle')}
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <Heading level={3}>{t('servicesPages.section1.serviceDetailsTitle')}</Heading>

            <div className="prose prose-lg max-w-none mt-3 ">
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                {t('servicesPages.section5.description')}
              </p>

              <Heading level={3}></Heading>
<h2 className=' text-lg md:text-2xl'>{t('servicesPages.section1.serviceIncludesTitle')}</h2>
              <div className="bg-[#F1F9F6] p-5 rounded-2xl mt-3 ">
                <ul className="list-none pl-0 space-y-3 text-gray-600">
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