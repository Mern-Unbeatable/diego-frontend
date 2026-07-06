import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner6.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';

const SafetyDrinkingWater = () => {
  return (
    <Container className=" ">
      <Banner
        description={
          'Analisi di potabilità dell’acqua per condomini, abitazioni e aziende'
        }
        image={banner}
        title={'Potabilità dell’acqua'}
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Column - Service Details (Sticky on Scroll) */}
          <div className="lg:sticky lg:top-24">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              Dettagli del servizio
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                La qualità e la sicurezza dell’acqua destinata al consumo umano
                sono disciplinate in Italia dal D.Lgs. 18/2023, che recepisce la
                Direttiva Europea 2020/2184. Questa normativa stabilisce i
                valori limite dei parametri chimici e microbiologici che devono
                essere rispettati per garantire la potabilità dell’acqua.
              </p>
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                La verifica periodica della conformità dell’acqua è un
                adempimento fondamentale non solo per tutelare la salute delle
                persone, ma anche per adempiere agli obblighi previsti per
                amministratori di condominio e aziende.
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                Offriamo un servizio completo di campionamento ed analisi di
                laboratorio, che comprende:
              </p>

              <div className="rounded-2xl bg-[#F1F9F6] p-5">
                <ul className="list-disc space-y-4 pl-5 text-gray-600">
                  <li className="leading-relaxed">
                    <strong>Campionamento a domicilio</strong> - Uscita del
                    nostro tecnico specializzato presso il punto di prelievo
                    indicato (rubinetto o altro punto accessibile).
                  </li>

                  <li className="leading-relaxed">
                    <div>
                      <span>
                        <strong>
                          Analisi completa di potabilità (D.Lgs. 18/2023)
                        </strong>{' '}
                        - Verifica di conformità ai parametri microbiologici,
                        chimici e indicatori previsti dalla legge, con
                        determinazione di oltre 60 parametri, tra cui:
                      </span>

                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-gray-500">
                        <li>
                          batteri coliformi, Escherichia coli, enterococchi
                          intestinali, Clostridium perfringens;
                        </li>
                        <li>
                          metalli pesanti (piombo, arsenico, mercurio, cadmio,
                          nichel, cromo);
                        </li>
                        <li>
                          contaminanti organici e inorganici (nitrati, nitriti,
                          PFAS, trialometani, idrocarburi policiclici aromatici,
                          pesticidi);
                        </li>
                        <li>
                          parametri indicatori (pH, torbidità, durezza,
                          conducibilità, odore, colore, sapore).
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Al termine delle analisi viene rilasciato un rapporto di prova
                  ufficiale, che riporta i valori riscontrati e il confronto con
                  i limites previsti dal D.Lgs. 18/2023.
                </p>
              </div>

              <h2 className="mt-6 mb-4 text-2xl font-bold text-gray-900">
                Cosa include il servizio
              </h2>

              <div className="rounded-2xl bg-[#F1F9F6] p-5">
                <ul className="list-none space-y-3 pl-0 text-gray-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>Rapporti di prova ufficiali</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>Valutazione tecnica dei dati emersi</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>
                      Campionamenti nei punti con maggiore probabilità di
                      proliferazione del batterio
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>
                      Analisi di laboratorio con confronto ai limiti previsti
                      dalla normativa vigente
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>
                      Valutazione del rischio Legionella e redazione della
                      relativa documentazione
                    </span>
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

export default SafetyDrinkingWater;
