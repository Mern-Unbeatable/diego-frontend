import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner8.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const SafetyLaboratoryView = () => {
  return (
    <Container className=' '>
      <Banner
        description={'Offriamo servizi di analisi di laboratorio completi per garantire la qualità, la sicurezza e la conformità dei prodotti e degli ambienti. Attraverso metodi certificati, analizziamo campioni di acqua, aria, rifiuti e materiali al fine di individuare eventuali contaminazioni e assicurare il rispetto delle normative vigenti.'}
        image={banner}
        title={'Analisi di laboratorio '}
      />



      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Service Details */}
          <div className="bg-white px-8 py-12">
            <div className="max-w-2xl mx-auto">
              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Dettagli del servizio
              </h1>

              {/* Introduction Paragraph */}
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                Il nostro obiettivo è trasformare gli adempimenti normativi in strumenti di prevenzione e valorizzazione, offrendo soluzioni integrate per la protezione dell'ambiente.
              </p>

              {/* Service Sections */}
              <div className="space-y-8 mb-10">
                {/* Gestione Rifiuti */}
                <div>
                  <h2 className="font-bold text-gray-900 mb-3">• Gestione Rifiuti:</h2>
                  <ul className="space-y-2 ml-6 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>La corretta gestione dei rifiuti è un elemento centrale della sostenibilità ambientale.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>campionamenti in sito e analisi di laboratorio;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>test di cessione per l'utilizzo o lo smaltimento in impianto.</span>
                    </li>
                  </ul>
                </div>

                {/* Acque */}
                <div>
                  <h2 className="font-bold text-gray-900 mb-3">• Acque</h2>
                  <p className="text-gray-700 text-sm mb-3 ml-6">
                    Gli scarichi idrici e il monitoraggio delle acque sotterranee devono rispettare prescrizioni precise. Occupiamo di:
                  </p>
                  <ul className="space-y-2 ml-6 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>La corretta gestione dei rifiuti è un elemento centrale della sicurezza ambientale.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>eseguire campionamenti e analisi di laboratorio;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>monitoraggi tramite piezometri e pozzi artigianali per cave, impianti di trattamento e aziende industriali.</span>
                    </li>
                  </ul>
                </div>

                {/* Emissioni in Atmosfera */}
                <div>
                  <h2 className="font-bold text-gray-900 mb-3">• Emissioni in Atmosfera</h2>
                  <p className="text-gray-700 text-sm mb-3 ml-6">
                    Le emissioni industriali e artigianali sono regolate da normative stringenti. I nostri servizi comprendono:
                  </p>
                  <ul className="space-y-2 ml-6 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>identificazione dei processi soggetti a normativa;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>redazione delle richieste autorizzative;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>campionamenti e analisi a camino;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>determinazione dei principali inquinanti (polveri, metalli, acidi, COV, SOx, NOx, CO, CO₂, diossine).</span>
                    </li>
                  </ul>
                </div>

                {/* Amianto */}
                <div>
                  <h2 className="font-bold text-gray-900 mb-3">• Amianto</h2>
                  <p className="text-gray-700 text-sm mb-3 ml-6">
                    Per la gestione del rischio amianto offriamo:
                  </p>
                  <ul className="space-y-2 ml-6 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>valutazione dello stato dei manufatti con algoritmi certificati;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>prelievi e analisi qualitative/quantitative con tecniche FT-IR e XRD;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>campionamenti e analisi a camino;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>determinazione dei principali inquinanti (polveri, metalli, acidi, COV, SOx, NOx, CO, CO₂, diossine).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">›</span>
                      <span>monitoraggio delle fibre aerodisperse (MOCF e SEM).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* What's Included Section */}
              <div className="bg-[#F0F8F5] rounded-2xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">Cosa include il servizio</h2>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700 text-sm">
                    <span className="text-gray-900 mr-3 font-semibold">→</span>
                    <span>Consulenza iniziale e analisi della situazione attuale</span>
                  </li>
                  <li className="flex items-start text-gray-700 text-sm">
                    <span className="text-gray-900 mr-3 font-semibold">→</span>
                    <span>Redazione della documentazione necessaria</span>
                  </li>
                  <li className="flex items-start text-gray-700 text-sm">
                    <span className="text-gray-900 mr-3 font-semibold">→</span>
                    <span>Formazione del personale coinvolto</span>
                  </li>
                  <li className="flex items-start text-gray-700 text-sm">
                    <span className="text-gray-900 mr-3 font-semibold">→</span>
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

export default SafetyLaboratoryView; 