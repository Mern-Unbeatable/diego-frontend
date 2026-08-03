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
      {
        type: 'text',
        placeholder: t('workWithUs.section1.aziendaPlaceholder'),
      },
    ],
  };

  // ── Section 2: Professionals ────────────────────────────────────
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
        {/* Banner */}
         <div className='container mx-auto px-4'>        <Banner image={banner} title={t('workWithUs.section5.bannerTitle')} />
</div>

        {/* Hero */}
        <div className="mx-auto max-w-4xl  py-12 text-center">
          <span className="rounded-full bg-[#E4F0E8] px-3  py-2 text-sm text-[#5C9981]">
            {t('workWithUs.section5.badge')}
          </span>
          <h1 className="mt-5 mb-4 text-2xl md:text-3xl  font-bold text-gray-900">
            {t('workWithUs.section5.heroTitle')}
          </h1>
          <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-gray-600">
            {t('workWithUs.section5.heroDescription')}
          </p>
        </div>

        {/* Section 1 — Formation Entities */}
        <div className="bg-[#FAFAFA]">
          <CollaborationSection {...formationData} />
        </div>

        {/* Section 2 — Professionals */}
        <div className="bg-[#fff]">
          <CollaborationSection {...professionalsData} />
        </div>

        {/* Section 3 — Collaboration Benefits */}
        <BenefitsSection />

        {/* Section 4 — Collaboration Request Form */}
        <CollaborationRequestForm />
      </div>
    </Container>
  );
};

export default WorkWithUsView;
