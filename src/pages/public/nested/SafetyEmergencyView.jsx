import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner4.png';
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';

const SafetyEmergencyView = () => {
  return (
    <Container className=" ">
      <Banner image={banner} title={'Piano di emergenza'} />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <Heading level={3}>Piano di emergenza</Heading>
            <div className="prose prose-lg mt-3 max-w-none">
              <p className="mb-6 leading-relaxed text-gray-600">
                Ai fini degli adempimenti di cui all'articolo 18, comma 1,
                lettera t), il datore di lavoro:
              </p>
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                Deve adottare le misure necessarie ai fini della prevenzione
                incendi e dell'evacuazione dei luoghi di lavoro, nonché per il
                caso di pericolo grave e immediato, secondo le disposizioni di
                cui all'articolo 43. Tali misure devono essere adeguate:
              </p>

              <ul className="mt-3 mb-8 list-disc space-y-2 pl-6 text-gray-600">
                <li>alla natura dell'attività</li>
                <li>alle dimensioni dell'azienda o dell'unità produttiva</li>
                <li>al numero delle persone presenti</li>
              </ul>

              <p className="mb-6 leading-relaxed text-gray-600">
                Noi di UnoSicurezza, possiamo aiutarti in questo!{' '}
              </p>

              <Heading level={3}>Cosa include il servizio</Heading>

              <div className="mt-3 rounded-2xl bg-[#F1F9F6] p-5">
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
            <ServiceForm title="Piano di emergenza" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SafetyEmergencyView;
