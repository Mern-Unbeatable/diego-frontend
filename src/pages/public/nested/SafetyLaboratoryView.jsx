import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner8.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { useTranslation } from 'react-i18next';

const SafetyLaboratoryView = () => {
  const { t } = useTranslation();
  const includeItems = t('servicesPages.section1.includeItems', {
    returnObjects: true,
  });
  const sections = t('servicesPages.section11.sections', {
    returnObjects: true,
  });

  return (
    <Container className=" ">
      <Banner
        description={t('servicesPages.section11.bannerDescription')}
        image={banner}
        title={t('servicesPages.section11.bannerTitle')}
      />



      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Service Details */}
          <div className="bg-white px-8 py-12">
            <div className="max-w-2xl mx-auto">
              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {t('servicesPages.section1.serviceDetailsTitle')}
              </h1>

              {/* Introduction Paragraph */}
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {t('servicesPages.section11.intro')}
              </p>

              {/* Service Sections */}
              <div className="space-y-8 mb-10">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h2 className="font-bold text-gray-900 mb-3">{section.title}</h2>
                    {section.description && (
                      <p className="text-gray-700 text-sm mb-3 ml-6">{section.description}</p>
                    )}
                    <ul className="space-y-2 ml-6 text-gray-700 text-sm">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-gray-400 mr-3 mt-1">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* What's Included Section */}
              <div className="bg-[#F0F8F5] rounded-2xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">{t('servicesPages.section1.serviceIncludesTitle')}</h2>
                <ul className="space-y-3">
                  {includeItems.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700 text-sm">
                      <span className="text-gray-900 mr-3 font-semibold">→</span>
                      <span>{item}</span>
                    </li>
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

export default SafetyLaboratoryView; 