import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner2.png'
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
import { ArrowRight } from 'lucide-react';

const SafetyServiceView = () => {
  return (
    <Container className=' '>
      <Banner
        description={'Redazione e aggiornamento del Documento di Valutazione dei Rischi'}
        image={banner}
        title={' DVR - Documento Valutazione Rischi'}
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div className="lg:sticky lg:top-24">
            <Heading level={3}>Dettagli del servizio</Heading>

            <div className="prose prose-lg max-w-none mt-3 ">
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Il Documento di Valutazione dei Rischi (DVR). Forniamo servizi completi di valutazione dei rischi, redazione del documento, formazione del personale e aggiornamenti periodici secondo quanto previsto dal D.Lgs. 81/2008.
              </p>

              <Heading level={3}>Cosa include il servizio</Heading>
              
              <div className='bg-[#F1F9F6] p-5 rounded-2xl mt-3 '>
                <ul className="list-none pl-0 space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                                      <ArrowRight  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <span>Consulenza iniziale e analisi della situazione attuale</span>
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