import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner4.png';
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { useTranslation } from 'react-i18next';

const SafetyEmergencyView = () => {
  const { t } = useTranslation();
  const includeItems = t('servicesPages.common.includeItems', {
    returnObjects: true,
  });
  const obligations = t('servicesPages.emergency.obligations', {
    returnObjects: true,
  });

  return <Container className=" ">
    <Banner

      image={banner}
      title={t('servicesPages.emergency.bannerTitle')}
    />
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column - Service Details */}
        <div>
          <Heading level={3}>{t('servicesPages.emergency.bannerTitle')}</Heading>
          <div className="prose prose-lg max-w-none mt-3">
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('servicesPages.emergency.descriptionLead')}
            </p>
            <p className='text-gray-600 leading-relaxed mb-6'>
              {t('servicesPages.emergency.descriptionBody')}
            </p>



            <ul className="list-disc mt-3 pl-6 mb-8 space-y-2 text-gray-600">
              {obligations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className='text-gray-600 leading-relaxed mb-6'>{t('servicesPages.emergency.descriptionCta')}</p>
            <Heading level={3}>{t('servicesPages.common.serviceIncludesTitle')}</Heading>
            <div className='bg-[#F1F9F6] p-5 rounded-2xl mt-3 '>
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
          <ServiceForm title={t('servicesPages.emergency.bannerTitle')} />
        </div>

      </div>
    </div>
  </Container>
};

export default SafetyEmergencyView;
