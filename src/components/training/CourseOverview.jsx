'use client';


import { CheckCircle2, Users } from 'lucide-react';
import WorkflowSection from './WorkflowSection';
import catalog from '../../../src/assets/images/course/catalog4.png'
export default function CourseOverview() {
  const courses = [
    {
      name: 'Corso singolo',
      description: 'Icorso "Singolo" si differenzia alla direttiva UE 2012/8/UE: attesta d\'un corso singolo basato su una necessità urgente di rintrare nelle richieste della normativa',
      duration: '30 min',
      type: 'Singolo'
    },
    {
      name: 'Corso Avanzato Seveso',
      description: 'Il corso "Seveso III" si differenzia alla direttiva UE 2012/18/UE: attesta d\'un pacchetto completo di quasi corsi legati cadente immediatela sulla nostra piattaforma',
      duration: '30 min/corso',
      type: 'Pacchetto'
    }
  ];

  const processSteps = [
    { title: 'Contatto', subtitle: 'con i Team UnoDisicurezza' },
    { title: 'Scelta del prodotto', subtitle: 'corso singolo o pacchetto trimestrale' },
    { title: 'Raccolta delle esigenze', subtitle: 'Tramite form online, o sopralluogo del nostri tecnici' },
    { title: 'Realizzazione del corso personalizzato', subtitle: 'Con logo, riferimenti aziendali, foto, video, procedure operative, manuali interni' },
    { title: 'Caricamento sulla piattaforma LMS', subtitle: 'Automazione erogazione e monitoraggio attività formativa' },
    { title: 'Erogazione corso', subtitle: 'In e-learning via lavoratori da PC, tablet o smartphone' }
  ];

  const howitWorks = [
    'Contatto con i team di UnoDisicurezza',
    'Scelta del prodotto che ha per lo scopo singolo o pacchetto per formazione mensuale',
    'Raccolta esigenze tramite form, oppure sopralluogo dei nostri tecnici',
    'Realizzazione del corso con personalizazi con logo e riflerimenti aziendali, foto video procedura',
    'Caricamento sulla piattaforma LMS con automazione erogazione e monitoraggio attività formativa',
    'Erogazione e il learning in asincrono, anche da cellulare e tablet',
    'Test finale',
    'Rilascio attestato a termine del corso'
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Panoramica dei corsi</h1>

      {/* Table Section */}
      <div className="bg-white rounded-lg p-6 mb-12 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 text-gray-700 font-semibold text-sm">Corso</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold text-sm">Descrizione</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold text-sm">Durata</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold text-sm">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700 text-sm font-medium">{course.name}</td>
                <td className="py-4 px-4 text-gray-600 text-sm leading-6 max-w-[150px] whitespace-normal break-words mx-auto">
                  {course.description}
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">{course.duration}</td>
                <td className="py-4 px-4 text-gray-700 text-sm">{course.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Come funziona Section */}
      <div className="grid grid-cols-2 gap-8 mb-12 items-start">
        {/* Left - Image Card */}
        <div className="bg-teal-100 rounded-3xl overflow-hidden h-80 flex items-center justify-center">
          <div className="relative w-full h-full">
            <img
              src={catalog}
              alt="Team working together"

              className="w-full object-containt h-full "
            />
          </div>
        </div>

        {/* Right - Content */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#73BFA1] text-white p-2 rounded-full">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Come funziona</h2>
          </div>

          <ol className="space-y-3">
            {howitWorks.map((step, index) => (
              <li key={index} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                <span className="font-bold text-[#73BFA1] flex-shrink-0">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <WorkflowSection />
        </div>
      </div>

      {/* Process Flow Section */}



    </div>
  );
}
