import { Shield, Zap, Target, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MissionCards = () => {
  const { t } = useTranslation();

  const missionData = [
    {
      icon: Shield,
      title: t('chiSiamo.section2.card1Title'),
      description: t('chiSiamo.section2.card1Desc'),
    },
    {
      icon: Zap,
      title: t('chiSiamo.section2.card2Title'),
      description: t('chiSiamo.section2.card2Desc'),
    },
    {
      icon: Target,
      title: t('chiSiamo.section2.card3Title'),
      description: t('chiSiamo.section2.card3Desc'),
    },
    {
      icon: Award,
      title: t('chiSiamo.section2.card4Title'),
      description: t('chiSiamo.section2.card4Desc'),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {missionData.map((item, index) => (
        <div key={index} className="rounded-lg bg-gray-50 p-4 md:p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#73BFA1]">
            <item.icon className="text-white" size={24} />
          </div>
          <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
          <p className=" text-sm leading-relaxed text-gray-600">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MissionCards;
