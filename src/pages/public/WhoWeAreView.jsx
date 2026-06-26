// import React from 'react';
// import Banner from '../../components/common/Banner';
// import banner from '../../../src/assets/images/banner/whoweare/banner.png';
// import PillarsCards from '../../components/WhoWeAre/PillarsCards';
// import MissionCards from '../../components/WhoWeAre/MissionCards';

// const ChiSiamo = () => {
//   return (
//     <div className="w-full bg-white">
//       <Banner
//         image={banner}
//         title={'Chi siamo'}
//       />

//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto px-4 py-16">
//         <div className="flex gap-12 items-center">
//           {/* Left Content */}
//           <div className="flex-1">
//             <div className="flex items-start gap-3 mb-6">
//               <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                 <span className="text-white text-xs font-bold">S</span>
//               </div>
//               <p className="text-gray-700 text-sm leading-relaxed">
//                 Siamo un gruppo di professionisti che si occupa di amministrazione stabili, formazione, sicurezza e salute per aziende e condomini.
//               </p>
//             </div>

//             <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
//               <div>
//                 <p className="font-semibold mb-2">Il nostro obiettivo è rendere più facile il rispetto della normativa e aiutare i nostri clienti a lavorare e vivere in ambienti più sicuri e organizzati.
//                   Cosa facciamo:</p>
//               </div>

//               <div>
//                 <h3 className="font-semibold mb-2">Cosa facciamo:</h3>
//                 <p><strong>Formazione:</strong> offriamo corsi chiari e pratici, anche online, grazie ad una piattaforma semplice da usare, pensata per lavoratori, responsabili e enti di formazione.</p>
//               </div>

//               <div>
//                 <p><strong>Sicurezza:</strong> supportiamo aziende e condomini con adempimenti documentali, corsi obbligatori, piani di emergenza e controlli per garantire ambienti di lavoro sempre più sicuri ed in conformità alla normativa.</p>
//               </div>

//               <div>
//                 <p><strong>Salute:</strong> realizziamo analisi di laboratorio per prevenire rischi, forniamo ausilio nella medicina del lavoro e proteggiamo la salute delle persone.</p>
//               </div>

//               <div>
//                 <p className="italic">Formazione e sicurezza, il motore per un futuro più sereno e di successo.</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="flex-1">
//             <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg overflow-hidden h-80">
//               <img
//                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
//                 alt="Team collaboration"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mission Section */}
//       <div className="max-w-6xl mx-auto px-4 py-16 text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">La Nostra Missione</h2>
//         <p className="text-gray-600 text-sm leading-relaxed max-w-3xl mx-auto mb-12">
//           La nostra missione è supportare le micro, piccole, medie e grandi imprese attraverso percorsi di formazione mirati, servizi di consulenza strategica e gestione efficiente degli adempimenti documentali. Crediamo nella crescita continua, nella semplificazione dei processi e nella valorizzazione delle competenze.
//         </p>

//         <MissionCards />
//       </div>

//       {/* Pillars Section */}
//       <div className="max-w-6xl mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">I nostri pilastri</h2>
//         <PillarsCards />
//       </div>
//     </div>
//   );
// };

// export default ChiSiamo;



import React from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../../components/common/Banner';
import banner from '../../../src/assets/images/banner/whoweare/banner.png';
import PillarsCards from '../../components/WhoWeAre/PillarsCards';
import MissionCards from '../../components/WhoWeAre/MissionCards';

const ChiSiamo = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white">
      <Banner
        image={banner}
        title={t('chiSiamo.section1.bannerTitle')}
      />

      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex gap-12 items-center">

          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {t('chiSiamo.section1.intro')}
              </p>
            </div>

            <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
              <div>
                <p className="font-semibold mb-2">
                  {t('chiSiamo.section1.objectiveLabel')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t('chiSiamo.section1.whatWeDoLabel')}</h3>
                <p>
                  <strong>{t('chiSiamo.section1.formazione')}</strong> {t('chiSiamo.section1.formazioneDesc')}
                </p>
              </div>

              <div>
                <p>
                  <strong>{t('chiSiamo.section1.sicurezza')}</strong> {t('chiSiamo.section1.sicurezzaDesc')}
                </p>
              </div>

              <div>
                <p>
                  <strong>{t('chiSiamo.section1.salute')}</strong> {t('chiSiamo.section1.saluteDesc')}
                </p>
              </div>

              <div>
                <p className="italic">{t('chiSiamo.section1.tagline')}</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg overflow-hidden h-80">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {t('chiSiamo.section1.missionTitle')}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed max-w-3xl mx-auto mb-12">
          {t('chiSiamo.section1.missionDesc')}
        </p>
        <MissionCards />
      </div>

      {/* Pillars Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          {t('chiSiamo.section1.pillarsTitle')}
        </h2>
        <PillarsCards />
      </div>
    </div>
  );
};

export default ChiSiamo;