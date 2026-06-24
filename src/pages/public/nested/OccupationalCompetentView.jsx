import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner18.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const OccupationalCompetentView = () => {
  return (
    <Container className=' '>
      <Banner
        image={banner}
        title="Gestione autorizzazioni impianti e incarico del medico competente"
        description="Hai un'azienda con uno o più dipendenti? Vuoi essere certo di rispettare tutti gli obblighi per la tutela della salute dei lavoratori?"
      />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Service Details */}
          <div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Dettagli del servizio
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                La nomina del medico competente è un obbligo previsto dal D. Lgs. 81/08, in particolare dagli artt. 18 e 41, e rappresenta un elemento fondamentale per la tutela della salute dei lavoratori. Il medico competente collabora alla valutazione dei rischi, effettua la sorveglianza sanitaria e contribuisce alla prevenzione di malattie professionali e infortuni, assicurando la conformità dell’azienda alla normativa vigente.

              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                Cosa include il servizio
              </h2>
              <div className='bg-[#F1F9F6] p-5 rounded-2xl'>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Consulenza iniziale e analisi della situazione attuale</li>
                  <li>Redazione della documentazione necessaria</li>
                  <li>Formazione del personale coinvolto</li>
                  <li>Supporto continuativo e aggiornamenti</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <ServiceForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OccupationalCompetentView; 