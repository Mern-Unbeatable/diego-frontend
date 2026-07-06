import { ArrowRight } from 'lucide-react';
import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner10.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const AmbientRentView = () => {
  return (
    <Container className=' '>
      <Banner
        image={banner}
        title={'RENTRI '}
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Layout fix: items-start added for sticky feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Service Details (Sticky on Scroll) */}
          <div className="lg:sticky lg:top-24">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Dettagli del servizio
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Il RENTRI è lo strumento su cui il Ministero dell’ambiente e della sicurezza energetica fonda il sistema di tracciabilità dei rifiuti e prevede la digitalizzazione dei documenti relativi alla movimentazione e al trasporto dei rifiuti.
              </p>
              <p className="text-gray-600 mb-4">In particolare, il RENTRI consente di:</p>

              <div className="mb-6">
                <ul className="list-disc pl-6 space-y-3 text-gray-600 text-justify">
                  <li>
                    mettere a disposizione della pubblica amministrazione un flusso costante di dati e informazioni sulla movimentazione dei rifiuti, a supporto delle politiche ambientali e della pianificazione regionale;
                  </li>
                  <li>
                    sostenere le autorità di controllo nella prevenzione e nel contrasto della gestione illecita dei rifiuti, facilitando le modalità di verifica basate su documenti digitali;
                  </li>
                  <li>
                    assolvere con rapidità e facilità agli adempimenti previsti per le imprese, con lo snellimento delle procedure, anche attraverso l’utilizzo di strumenti di supporto alla transizione digitale messi a disposizione dal Ministero dell’Ambiente e della Sicurezza Energetica;
                  </li>
                  <li>
                    ridurre i tempi per la trasmissione dei dati necessari per la rendicontazione e il monitoraggio del raggiungimento degli obiettivi Europei di recupero e riciclo;
                  </li>
                  <li>
                    gestire in modalità digitale milioni di documenti cartacei.
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Affidati ad UnoSicurezza, società che segue passo per passo i propri partners nella realizzazione dei propri adempimenti.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                Cosa include il servizio
              </h2>
              
              <div className='bg-[#F1F9F6] p-5 rounded-2xl'>
                <ul className="list-none pl-0 space-y-3 text-gray-600">
                  <li className="flex items-start gap-3 text-sm">
                    <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Consulenza iniziale e analisi della situazione attuale</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Redazione della documentazione necessaria</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Formazione del personale coinvolto</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Supporto continuativo e aggiornamenti</span>
                  </li>
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

export default AmbientRentView;