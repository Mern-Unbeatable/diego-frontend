import React from 'react';
import FigurePrevisteDashboard from './components/FigurePrevisteDashboard';
import TrainingProjectManagerSection from './components/TrainingProjectManagerSection';

export default function FiguresView() {
  return (
    <div className="space-y-6 rounded-3xl">
      <FigurePrevisteDashboard />

      <TrainingProjectManagerSection
        title="Responsabile del progetto di formazione"
        subtitle="Responsabile Progetto Formativo"
        documentLabels={[
          'Curriculum',
          'Certificati/Prova di Esperienza in Salute e Sicurezza',
          'Certificati di Competenze Digitali',
        ]}
      />

      <TrainingProjectManagerSection
        title="Mentore/tutore di contenuto"
        subtitle="Mentore/tutore di contenuto"
        documentLabels={[
          'Curriculum',
          "Carta d'identita e Codice Fiscale",
          'Certificati/Prova di Esperienza in Salute e Sicurezza',
          'Certificati di Competenze Digitali',
        ]}
      />

      <TrainingProjectManagerSection
        title="Tutor di processo"
        subtitle="Tutor di processo"
        documentLabels={["Carta d'identita e Codice Fiscale"]}
      />

      <TrainingProjectManagerSection
        title="Sviluppatore della piattaforma"
        subtitle="Sviluppatore della piattaforma"
        showPersonFields={false}
        companyLabel="Societa"
        documentLabels={['Visura camerale']}
        showFooterActions
      />
    </div>
  );
}
