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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {missionData.map((item, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
          <div className="w-12 h-12 bg-[#73BFA1] rounded-full flex items-center justify-center mx-auto mb-4">
            <item.icon className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed text-justify">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MissionCards;