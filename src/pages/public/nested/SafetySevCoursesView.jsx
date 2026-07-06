import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner4.png';
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight, ChevronRight } from 'lucide-react';
const SafetyServiceView = () => {
  return (
    <Container className=" ">
      <Banner
        description={
          'Consulenza per la direttiva Seveso sulla prevenzione degli incidenti rilevanti'
        }
        image={banner}
        title={'Corsi SEVESO'}
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-26">
            <Heading level={3}>Dettagli del servizio</Heading>

            <div className="prose prose-lg mt-3">
              <p className="mb-6 text-justify leading-relaxed text-gray-600">
                Corsi finalizzati a garantire alle aziende e gestori soggetti al
                D. lgs. 105/2015 l’affinare delle proprie capacità a livello
                capillare in merito alla gestione in sicurezza di tutti i
                processi che la rendono soggetta.Il gestore deve riportare nel
                Documento il proprio impegno a realizzare, adottare, nonché' a
                mantenere e ricercare il miglioramento continuo del proprio
                sistema di gestione della sicurezza.Motivo per il quale,
                UnoSicurezza propone una vasta gamma di corsi che possano
                soddisfare le richieste del gestore e che rispettino l’ottica
                obbligatoria della formazione continua (D. lgs. 105/2015 art. 14
                all’Appendice 1 dell’Allegato B). Corsi fatti su misura, grazie
                alla collaborazione con il vostro gruppo HS.
              </p>

              <Heading level={3}>Cosa include il servizio</Heading>
              <div className="mt-3 rounded-2xl bg-[#F1F9F6] p-5">
                <ul className="list-none space-y-3 pl-0 text-gray-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>
                      Consulenza iniziale e analisi della situazione attuale
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>Redazione della documentazione necessaria</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>Formazione del personale coinvolto</span>
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
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
