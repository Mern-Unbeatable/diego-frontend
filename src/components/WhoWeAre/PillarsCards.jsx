// import React from 'react';

// const PillarsCards = () => {
//   const pillarsData = [
//     {
//       title: "Applicazione concreta della normativa",
//       description: "Ci dedichiamo con costanza all'aggiornamento continuo in conformità con la normativa vigente."
//     },
//     {
//       title: "Infrastruttura tecnologica innovativa",
//       description: "Piattaforma LMS pensata per offrire percorsi formativi semplici, efficaci e sempre aggiornati rispetto alla normativa vigente"
//     },
//     {
//       title: "Formazione Multi-Settoriale",
//       description: "Un'unica piattaforma che racchiude corsi diversificati e percorsi formativi personalizzati, pensati per ogni esigenza."
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//       {pillarsData.map((item, index) => (
//         <div key={index} className="border border-gray-200 rounded-lg p-8">
//           <h3 className="font-bold text-gray-900 mb-4 text-lg">{item.title}</h3>
//           <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PillarsCards;


import React from 'react';
import { useTranslation } from 'react-i18next';

const PillarsCards = () => {
  const { t } = useTranslation();

  const pillarsData = [
    {
      title: t('chiSiamo.pillars.card1Title'),
      description: t('chiSiamo.pillars.card1Desc'),
    },
    {
      title: t('chiSiamo.pillars.card2Title'),
      description: t('chiSiamo.pillars.card2Desc'),
    },
    {
      title: t('chiSiamo.pillars.card3Title'),
      description: t('chiSiamo.pillars.card3Desc'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {pillarsData.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-8">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">{item.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PillarsCards;