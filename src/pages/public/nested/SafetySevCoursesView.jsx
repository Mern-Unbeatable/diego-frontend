import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner4.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
const SafetyServiceView = () => {
  return <Container className=' '>
    <Banner
      description={'Consulenza per la direttiva Seveso sulla prevenzione degli incidenti rilevanti'}
      image={banner}
      title={'Corsi SEVESO'}
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
              Corsi finalizzati a garantire alle aziende e gestori soggetti al D. lgs. 105/2015 l’affinare delle proprie capacità a livello capillare in merito alla gestione in sicurezza di tutti i processi che la rendono soggetta.Il gestore deve riportare nel Documento il proprio impegno a realizzare, adottare, nonché' a mantenere e ricercare il miglioramento continuo del proprio sistema di gestione   della sicurezza.Motivo per il quale, UnoSicurezza propone una vasta gamma di corsi che possano soddisfare le richieste del gestore e che rispettino l’ottica obbligatoria della formazione continua (D. lgs. 105/2015 art. 14 all’Appendice 1 dell’Allegato B). Corsi fatti su misura, grazie alla collaborazione con il vostro gruppo HS.
            </p>



            <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
};

export default SafetyServiceView;
