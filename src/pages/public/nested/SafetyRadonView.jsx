import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner7.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const SafetyRadonView = () => {
  return (
    <Container className=' '>
      <Banner
        description={'Misurazioni e valutazioni del gas radon negli ambienti di lavoro'}
        image={banner}
        title={'Radon'}
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
                Ambienti di lavoro interrati, seminterrati, posizionati in aree prioritarie? La valutazione del rischio radon nei luoghi di lavoro, secondo il D. Lgs. 101/2020, è un obbligo per i datori di lavoro per tutelare la salute dei lavoratori.Il rischio è valutato effettuando misure della concentrazione di gas radon in aria, espressa in Bq/m³. Il team di UnoSicurezza effettua:
              </p>


              <div >
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Misurazioni della concentrazione</li>
                  <li>Valutazione del rischio</li>
                  <li>Nomina dell’esperto</li>
                </ul>

              </div>
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

export default SafetyRadonView; 