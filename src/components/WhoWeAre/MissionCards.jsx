import React from 'react';
import { Shield, Zap, Target, Award } from 'lucide-react';

const MissionCards = () => {
  const missionData = [
    {
      icon: Shield,
      title: "Sicurezza Prima di Tutto",
      description: "La sicurezza sul lavoro è al centro di tutto ciò che facciamo, con l'obiettivo di creare ambienti di lavoro più sicuri."
    },
    {
      icon: Zap,
      title: "Innovazione Tecnologica",
      description: "Utilizziamo sistemi affidabili e collaudati per offrire percorsi formativi di qualità, accessibili e funzionali."
    },
    {
      icon: Target,
      title: "Orientamento al Cliente",
      description: "Ogni soluzione è progettata sulle specifiche esigenze del cliente, garantendo risultati concreti."
    },
    {
      icon: Award,
      title: "Eccellenza Formativa",
      description: "Standard di qualità in ogni corso, con metodologie didattiche all'avanguardia."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {missionData.map((item, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
          <div className="w-12 h-12 bg-[#73BFA1] rounded-full flex items-center justify-center mx-auto mb-4">
            <item.icon className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MissionCards;