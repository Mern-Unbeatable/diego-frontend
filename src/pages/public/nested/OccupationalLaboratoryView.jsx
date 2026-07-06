import { ArrowRight } from 'lucide-react';
import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner13.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const OccupationalLaboratoryView = () => {
  return (
    <Container className=' '>
      <Banner
        description={'       Hai una azienda/impresa con uno o più dipendenti? Vuoi esser tranquillo di non aver dimenticato nessun adempimento per la tutela della salute dei propri dipendenti?'}
        image={banner}
        title={'Analisi di laboratorio'}
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Layout fix: items-start added for sticky feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Service Details (Sticky on Scroll) */}
          <div className="lg:sticky lg:top-24">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Dettagli del servizio
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Analisi di laboratorio In alcuni casi specifici, in base alla mansione svolta, è necessario effettuare analisi di laboratorio per completare la valutazione dell’idoneità al lavoro. Questi controlli, richiesti dal D. Lgs. 81/08, permettono di accertare che il lavoratore sia nelle condizioni fisiche ottimali per svolgere le proprie attività in sicurezza. Non si tratta solo di un obbligo normativo, ma di una misura concreta di prevenzione e tutela, pensata per garantire il benessere del personale e mantenere elevati standard di sicurezza all’interno dell’azienda.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                Cosa include il servizio
              </h2>
              
              {/* Box con Icone Lucide React (ArrowRight) */}
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

export default OccupationalLaboratoryView;