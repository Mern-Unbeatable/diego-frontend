import { ArrowRight } from 'lucide-react';
import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner9.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const SafetyBuildingView = () => {
  return (
    <Container className=' '>
      <Banner
        description={'Misurazioni e valutazioni del gas radon negli ambienti di lavoro'}
        image={banner}
        title={'Building management'}
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="lg:sticky lg:top-24">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Dettagli del servizio
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Il team UnoSicurezza offre il servizio di building management e amministrazione condominiale per poter sgravare i propri clienti possessori/gestori di edifici che vogliono ottimizzare i processi di:
              </p>
              
              <div>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Manutenzioni e riparazioni </li>
                  <li>Gestione dell’energia e dell’efficienza </li>
                  <li>Sicurezza e conformità normativa</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                Affidati a noi e contattaci!
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

export default SafetyBuildingView;