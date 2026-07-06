import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner7.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';

const SafetyRadonView = () => {
  return (
    <Container className=" ">
      <Banner
        description={
          'Misurazioni e valutazioni del gas radon negli ambienti di lavoro'
        }
        image={banner}
        title={'Radon'}
      />
      <div className="mx-auto container px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              Dettagli del servizio
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6 leading-relaxed text-gray-600 text-justify">
                Ambienti di lavoro interrati, seminterrati, posizionati in aree
                prioritarie? La valutazione del rischio radon nei luoghi di
                lavoro, secondo il D. Lgs. 101/2020, è un obbligo per i datori
                di lavoro per tutelare la salute dei lavoratori.Il rischio è
                valutato effettuando misure della concentrazione di gas radon in
                aria, espressa in Bq/m³. Il team di UnoSicurezza effettua:
              </p>

              <div>
                <ul className="list-disc space-y-2 pl-6 text-gray-600">
                  <li>Misurazioni della concentrazione</li>
                  <li>Valutazione del rischio</li>
                  <li>Nomina dell’esperto</li>
                </ul>
              </div>

              <h2 className="mt-6 mb-4 text-2xl font-bold text-gray-900">
                Cosa include il servizio
              </h2>

              <div className="rounded-2xl bg-[#F1F9F6] p-5">
                <ul className="list-none space-y-3 pl-0 text-gray-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>
                      Consulenza iniziale e analisi della situazione attuale
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>Redazione della documentazione necessaria</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>Formazione del personale coinvolto</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

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

export default SafetyRadonView;
