import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner13.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { useTranslation } from 'react-i18next';

const LabratoryAnalysis = () => {
  const { t } = useTranslation();
  const includeItems = t('servicesPages.common.includeItems', {
    returnObjects: true,
  });

  return (
    <Container className=" ">
      <Banner
        description={t('servicesPages.occupationalLab.bannerDescription')}
        image={banner}
        title={t('servicesPages.occupationalLab.bannerTitle')}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Service Details */}
          <div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {t('servicesPages.common.serviceDetailsTitle')}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('servicesPages.occupationalLab.description')}

              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                {t('servicesPages.common.serviceIncludesTitle')}
              </h2>
              <div className='bg-[#F1F9F6] p-5 rounded-2xl'>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {includeItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <ServiceForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LabratoryAnalysis; 