import { ArrowRight } from 'lucide-react';
import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner13.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { useTranslation } from 'react-i18next';

const OccupationalLaboratoryView = () => {
  const { t } = useTranslation();
  const includeItems = t('servicesPages.section1.includeItems', { returnObjects: true }) || [];

  return (
    <Container className=" ">
      <Banner
        description={t('servicesPages.section17.bannerDescription')}
        image={banner}
        title={t('servicesPages.section17.bannerTitle')}
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {t('servicesPages.section1.serviceDetailsTitle')}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                {t('servicesPages.section17.description')}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                {t('servicesPages.section1.serviceIncludesTitle')}
              </h2>

              <div className="bg-[#F1F9F6] p-5 rounded-2xl">
                <ul className="list-none pl-0 space-y-3 text-gray-600">
                  {includeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
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

export default OccupationalLaboratoryView;