import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner5.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';

const SafetyLegionView = () => {
  return (
    <Container className=" ">
      <Banner
        description={'Valutazione del rischio legionella e piani di controllo'}
        image={banner}
        title={'Legionella'}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              Dettagli del servizio
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6 leading-relaxed text-gray-600 text-justify">
                Eseguiamo campionamenti e analisi su punti selezionati
                dell’impianto idrico, con restituzione di rapporti di prova e
                confronto con i valori limite di parametro previsti dal D.Lgs.
                18/2023, per la determinazione della Legionella. I risultati
                delle indagini vengono restituiti in modo chiaro e completo.
              </p>
              <p className="mb-6 leading-relaxed text-gray-600 text-justify">
                Noi di UnoSicurezza aiutiamo i nostri partner a non correre
                rischi nascosti, spesso sottovalutati nella quotidianità. Uno
                dei rischi più trascurati è rappresentato dal batterio
                Legionella: un microrganismo che, se non individuato e gestito,
                può causarare gravi problemi di salute alle persone presenti in
                azienda e generare pesanti responsabilità per i datori di
                lavoro.
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                Affida a noi la gestione di questa criticità
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Cosa include il servizio
              </h2>

              <div className="rounded-2xl bg-[#F1F9F6] p-5">
                <ul className="list-none space-y-3 pl-0 text-gray-600">
                  <li className="flex items-start gap-2">
                                                      <ArrowRight  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

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

export default SafetyLegionView;
