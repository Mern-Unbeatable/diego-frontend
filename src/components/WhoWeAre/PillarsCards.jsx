import { useTranslation } from 'react-i18next';

const PillarsCards = () => {
  const { t } = useTranslation();

  const pillarsData = [
    {
      title: t('chiSiamo.section3.card1Title'),
      description: t('chiSiamo.section3.card1Desc'),
    },
    {
      title: t('chiSiamo.section3.card2Title'),
      description: t('chiSiamo.section3.card2Desc'),
    },
    {
      title: t('chiSiamo.section3.card3Title'),
      description: t('chiSiamo.section3.card3Desc'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {pillarsData.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg  p-4 md:p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">{item.title}</h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PillarsCards;