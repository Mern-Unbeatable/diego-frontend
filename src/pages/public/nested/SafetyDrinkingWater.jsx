import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner6.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const SafetyDrinkingWater = () => {
  return (
    <Container className=' '>
      <Banner
        description={'Analisi di potabilità dell’acqua per condomini, abitazioni e aziende'}
        image={banner}
        title={'Potabilità dell’acqua'}
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
                La qualità e la sicurezza dell’acqua destinata al consumo umano sono disciplinate in Italia dal D.Lgs. 18/2023, che recepisce la Direttiva Europea 2020/2184. Questa normativa stabilisce i valori limite dei parametri chimici e microbiologici che devono essere rispettati per garantire la potabilità dell’acqua.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                La verifica periodica della conformità dell’acqua è un adempimento fondamentale non solo per tutelare la salute delle persone, ma anche per adempiere agli obblighi previsti per amministratori di condominio e aziende.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Offriamo un servizio completo di campionamento ed analisi di laboratorio, che comprende:
              </p>
              <div className='bg-[#F1F9F6] p-5 rounded-2xl'>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Campionamento a domicilio - Uscita del nostro tecnico specializzato presso il punto di prelievo indicato (rubinetto o altro punto accessibile).</li>
                  <li>Analisi completa di potabilità (D.Lgs. 18/2023) - Verifica di conformità ai parametri microbiologici, chimici e indicatori previsti dalla legge, con determinazione di oltre 60 parametri, tra cui:
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>batteri coliformi, Escherichia coli, enterococchi intestinali, Clostridium perfringens;</li>
                      <li>metalli pesanti (piombo, arsenico, mercurio, cadmio, nichel, cromo);</li>
                      <li>contaminanti organici e inorganici (nitrati, nitriti, PFAS, trialometani, idrocarburi policiclici aromatici, pesticidi);</li>
                      <li>parametri indicatori (pH, torbidità, durezza, conducibilità, odore, colore, sapore).</li>
                    </ul>
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Al termine delle analisi viene rilasciato un rapporto di prova ufficiale, che riporta i valori riscontrati e il confronto con i limiti previsti dal D.Lgs. 18/2023.
                </p>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
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

export default SafetyDrinkingWater; 