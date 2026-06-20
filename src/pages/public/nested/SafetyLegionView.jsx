import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner5.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const SafetyLegionView = () => {
  return (
    <Container className=' '>
      <Banner
        description={'Valutazione del rischio legionella e piani di controllo'}
        image={banner}
        title={'Legionella'}
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
                Eseguiamo campionamenti e analisi su punti selezionati dell’impianto idrico, con restituzione di rapporti di prova e confronto con i valori limite di parametro previsti dal D.Lgs. 18/2023, per la determinazione della Legionella. I risultati delle indagini vengono restituiti in modo chiaro e completo.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Noi di UnoSicurezza aiutiamo i nostri partner a non correre rischi nascosti, spesso sottovalutati nella quotidianità. Uno dei rischi più trascurati è rappresentato dal batterio Legionella: un microrganismo che, se non individuato e gestito, può causare gravi problemi di salute alle persone presenti in azienda e generare pesanti responsabilità per i datori di lavoro.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Affida a noi la gestione di questa criticità
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cosa include il servizio
              </h2>
              <div className='bg-[#F1F9F6] p-5 rounded-2xl'>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Rapporti di prova ufficiali</li>
                  <li>Valutazione tecnica dei dati emersi</li>
                  <li>Campionamenti nei punti con maggiore probabilità di proliferazione del batterio</li>
                  <li>Analisi di laboratorio con confronto ai limiti previsti dalla normativa vigente</li>
                  <li>Valutazione del rischio Legionella e redazione della relativa documentazione</li>
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

export default SafetyLegionView;