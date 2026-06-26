import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner4.png';
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { useTranslation } from 'react-i18next';

const SafetyServiceView = () => {
  const { t } = useTranslation();
  const includeItems = t('servicesPages.common.includeItems', {
    returnObjects: true,
  });

  return <Container className=" ">
    <Banner
      description={t('servicesPages.sevCourses.bannerDescription')}
      image={banner}
      title={t('servicesPages.sevCourses.bannerTitle')}
    />

    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column - Service Details */}
        <div>
          <Heading level={3}>{t('servicesPages.common.serviceDetailsTitle')}</Heading>


          <div className="prose prose-lg max-w-none mt-3">
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('servicesPages.sevCourses.description')}
            </p>



            <Heading level={3}>{t('servicesPages.common.serviceIncludesTitle')}</Heading>
            <div className='bg-[#F1F9F6] p-5 rounded-2xl mt-3'>
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
};

export default SafetyServiceView;
