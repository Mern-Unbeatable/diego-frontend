import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner16.png';
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';

const SafetyServiceView = () => {
  return (
    <Container className=" ">
      <Banner
        description={
          'Adegua la tua struttura alle norme: valuta il rischio fulmini.'
        }
        image={banner}
        title={'Fulminazione'}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Column - Service Details (Sticky on Scroll) */}
          <div className="lg:sticky lg:top-24">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              Dettagli del servizio
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6 leading-relaxed text-gray-600">
                Art. 17. D.lgs. 81/08 Obblighi del datore di lavoro non
                delegabili: Il datore di lavoro non può delegare le seguenti
                attività: la valutazione di tutti i rischi con la conseguente
                elaborazione del documento previsto dall'articolo 28. Nonché
                quanto previsto nelle norme CEI. Tra tutti i rischi si annovera
                anche il rischio che il proprio edificio possa essere soggetto o
                meno alle scariche atmosferiche.Noi di UnoSicurezza, possiamo
                aiutarti in questo!
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
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

export default SafetyServiceView;
