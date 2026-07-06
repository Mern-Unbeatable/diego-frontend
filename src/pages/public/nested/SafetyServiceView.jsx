import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner14.png';
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';

const SafetyServiceView = () => {
  return (
    <Container className=" ">
      <Banner
        description={'Esplora i nostri servizi e contattaci'}
        image={banner}
        title={'Servizi'}
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <Heading level={3}>Dettagli del servizio</Heading>

            <div className="prose prose-lg mt-3 max-w-none">
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                La sicurezza non è un semplicemente un argomento tedesco del
                quale farsi beffa durante la quotidiana attività lavorativa. A
                volte può risultare macchiosa e complessa perché non si hanno le
                conoscenze sufficienti a disposizione per portarla a termine.
                Altre volte invece si pensa che è un adempimento il quale, una
                volta portato a termine, non prevede più impegno, ma ci si
                sbaglia di grosso. La sicurezza è un adempimento che prevede un
                mantenimento e miglioramento continuo seguendo dettami di legge.
                Motivo per il quale, UnoSicurezza, aiuta le imprese a fornire il
                servizio di:
              </p>

              <ul className="mb-8 list-none space-y-3 pl-0 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    <span className="font-semibold">ASPP</span> (Addetto per il
                    Servizio di Prevenzione e Protezione)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    <span className="font-semibold">RSPP</span> (Responsabile
                    per il Servizio di Prevenzione e Protezione)
                  </span>
                </li>
              </ul>

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
