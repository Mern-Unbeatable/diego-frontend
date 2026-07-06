import { ArrowRight } from 'lucide-react';
import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner18.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';

const OccupationalCompetentView = () => {
  return (
    <Container className=' '>
      <Banner
        image={banner}
        title="Gestione autorizzazioni impianti e incarico del medico competente"
        description="Hai un'azienda con uno o più dipendenti? Vuoi essere certo di rispettare tutti gli obblighi per la tutela della salute dei lavoratori?"
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
                La nomina del medico competente è un obbligo previsto dal D. Lgs. 81/08, in particolare dagli artt. 18 e 41, e rappresenta un elemento fondamentale per la tutela della salute dei lavoratori. Il medico competente collabora alla valutazione dei rischi, effettua la sorveglianza sanitaria e contribuisce alla prevenzione di malattie professionali e infortuni, assicurando la conformità dell’azienda alla normativa vigente.
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

export default OccupationalCompetentView;