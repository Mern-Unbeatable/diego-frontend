// import React from 'react';

// import { Container } from '../../components/ui';
// import Banner from '../../components/common/Banner';
// import banner from '../../../src/assets/images/banner/whoweare/banner2.png';
// import CollaborationSection from '../../components/WorkWithUs/CollaborationSection';
// import BenefitsSection from '../../components/WorkWithUs/BenefitsSection';
// import CollaborationRequestForm from '../../components/WorkWithUs/CollaborationRequestForm';

// const WorkWithUsView = () => {
//   // Data for Formation Entities Section
//   const formationData = {
//     title: "Per gli Enti di Formazione",
//     description: "Mettiamo a disposizione uno spazio dedicato sulla nostra piattaforma dove potrai:",
//     bulletPoints: [
//       "proporre i tuoi corsi in materia di salute e sicurezza sul lavoro",
//       "gestire utenti e percorsi formativi in autonomia"

//     ],
//     bottomText: "Una soluzione pratica e professionale per valorizzare i tuoi  servizi e garantire ai clienti percorsi formativi obbligatori sempre aggiornati e certificati.",
//     buttonText: "Contattaci e al resto ci pensiamo noi!",
//     contactFormTitle: "Clicca qui per contattarci",
//     additionalFields: [
//       { type: "text", placeholder: "Azienda*" }
//     ]
//   };

//   // Data for Professionals Section
//   const professionalsData = {
//     title: "Per i professionisti",
//     description: "Se operi nel campo della salute e sicurezza sul lavoro, entra nella nostra rete e proponi i tuoi servizi in collaborazione con noi.",
//     subText: "Avrai l’opportunità di:",
//     bulletPoints: [
//       "I docenti e i trainer che vogliono creare una propria scuola online acquisiti in grado di generare ricavi immediati.",
//       "Una piattaforma semplice, intuitiva e con strumenti professionali per la creazione di corsi online e training."
//     ],
//     buttonText: "Contattaci di una proposizione",
//     contactFormTitle: "Clicca qui per contattarci",
//     bottomText: "Una collaborazione che ti permette di crescere professionalmente e dare maggiore completezza ai tuoi servizi.",
//     additionalFields: [
//       { type: "text", placeholder: "Qualifica*" }
//     ]
//   };

//   return (
//     <Container>
//       <div className="w-full bg-[#fff]">
//         <Banner
//           image={banner}
//           title={'Collabora con UnoSicurezza'}
//         />


//         <div className="max-w-4xl mx-auto px-4 py-12 text-center">

//           <span className='bg-[#E4F0E8] text-xs p-3 rounded-full  text-[#5C9981]'> Partnership</span>
//           <h1 className=" mt-5 text-2xl font-bold text-gray-900 mb-4">Unisciti alla rete di UnoSicurezza</h1>
//           <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
//             La piattaforma è disponibile in modalità cloud secondo gli standard di sicurezza, affidabilità e protezione dei dati. Scopri come collaborare con noi per formazione, sicurezza e professionisti.
//           </p>
//         </div>

//         {/* Formation Entities Section */}

//         <div className='bg-[#FAFAFA]'>  <CollaborationSection {...formationData} /> </div>

//         {/* Professionals Section */}
//         <div className='bg-[#fff]'> <CollaborationSection {...professionalsData} /></div>

//         {/* Collaboration Benefits Section */}
//         <BenefitsSection />

//         {/* Collaboration Request Form Section */}
//         <CollaborationRequestForm />
//       </div>
//     </Container>
//   );
// };

// export default WorkWithUsView;



import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../../components/ui';
import Banner from '../../components/common/Banner';
import banner from '../../../src/assets/images/banner/whoweare/banner2.png';
import CollaborationSection from '../../components/WorkWithUs/CollaborationSection';
import BenefitsSection from '../../components/WorkWithUs/BenefitsSection';
import CollaborationRequestForm from '../../components/WorkWithUs/CollaborationRequestForm';

const WorkWithUsView = () => {
  const { t } = useTranslation();

  // ── Section 1: Formation Entities ──────────────────────────────
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
      { type: 'text', placeholder: t('workWithUs.section2.qualificaPlaceholder') },
    ],
  };

  return (
    <Container>
      <div className="w-full bg-[#fff]">

        {/* Banner */}
        <Banner
          image={banner}
          title={t('workWithUs.section5.bannerTitle')}
        />

        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <span className="bg-[#E4F0E8] text-xs p-3 rounded-full text-[#5C9981]">
            {t('workWithUs.section5.badge')}
          </span>
          <h1 className="mt-5 text-2xl font-bold text-gray-900 mb-4">
            {t('workWithUs.section5.heroTitle')}
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
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