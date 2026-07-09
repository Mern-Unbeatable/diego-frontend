import { Container } from '../../components/ui';
import Banner from '../../components/common/Banner';
import banner from '../../../src/assets/images/banner/whoweare/banner2.png';
import CollaborationSection from '../../components/WorkWithUs/CollaborationSection';
import BenefitsSection from '../../components/WorkWithUs/BenefitsSection';
import CollaborationRequestForm from '../../components/WorkWithUs/CollaborationRequestForm';
import { useTranslation } from 'react-i18next';

const WorkWithUsView = () => {
  const { t } = useTranslation();

  // Data for Formation Entities Section
  const formationData = {
    title: t('workWithUs.section1.title'),
    description: t('workWithUs.section1.description'),
    bulletPoints: [
      t('workWithUs.section1.bullet1'),
      t('workWithUs.section1.bullet2'),
    ],
    bottomText: t('workWithUs.section1.bottomText'),
    buttonText: t('workWithUs.section1.buttonText'),
    contactFormTitle: t('workWithUs.section1.contactFormTitle'),
    additionalFields: [
      { type: 'text', placeholder: t('workWithUs.section1.aziendaPlaceholder') },
    ],
  };

  // Data for Professionals Section
  const professionalsData = {
    title: t('workWithUs.section2.title'),
    description: t('workWithUs.section2.description'),
    subText: t('workWithUs.section2.subText'),
    bulletPoints: [
      t('workWithUs.section2.bullet1'),
      t('workWithUs.section2.bullet2'),
    ],
    buttonText: t('workWithUs.section2.buttonText'),
    contactFormTitle: t('workWithUs.section2.contactFormTitle'),
    bottomText: t('workWithUs.section2.bottomText'),
    additionalFields: [
      {
        type: 'text',
        placeholder: t('workWithUs.section2.qualificaPlaceholder'),
      },
    ],
  };

  return (
    <Container>
      <div className="w-full bg-[#fff]">
        <Banner
          image={banner}
          title={t('workWithUs.section5.bannerTitle')}
        />


        <div className="max-w-6xl mx-auto px-4 py-12 text-center">

          <span className='bg-[#E4F0E8] text-sm p-3 rounded-full  text-[#5C9981]'>
            {t('workWithUs.section5.badge')}
          </span>
          <h1 className=" mt-5 text-2xl font-bold text-gray-900 mb-4">
            {t('workWithUs.section5.heroTitle')}
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {t('workWithUs.section5.heroDescription')}
          </p>
        </div>

        {/* Formation Entities Section */}

        <div className='bg-[#FAFAFA]'>  <CollaborationSection {...formationData} /> </div>

        {/* Professionals Section */}
        <div className='bg-[#fff]'> <CollaborationSection {...professionalsData} /></div>

        {/* Collaboration Benefits Section */}
        <BenefitsSection />

        {/* Collaboration Request Form Section */}
        <CollaborationRequestForm />
      </div>
    </Container>
  );
};

export default WorkWithUsView;