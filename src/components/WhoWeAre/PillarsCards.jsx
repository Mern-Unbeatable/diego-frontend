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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {pillarsData.map((item, index) => (
        <div key={index} className="rounded-lg border border-gray-200 p-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900">{item.title}</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PillarsCards;
