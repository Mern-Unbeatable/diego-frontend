import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner16.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
const SafetyServiceView = () => {
  return <Container className=' '>
    <Banner
      description={'Adegua la tua struttura alle norme: valuta il rischio fulmini.'}
      image={banner}
      title={'Fulminazione'}
    />
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column - Service Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Dettagli del servizio
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Art. 17. D.lgs. 81/08 Obblighi del datore di lavoro non delegabili: Il datore di lavoro non può delegare le seguenti attività: la valutazione di tutti i rischi con la conseguente elaborazione del documento previsto dall'articolo 28. Nonché quanto previsto nelle norme CEI. Tra tutti i rischi si annovera anche il rischio che il proprio edificio possa essere soggetto o meno alle scariche atmosferiche.Noi di UnoSicurezza, possiamo aiutarti in questo!
            </p>





            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cosa include il servizio
            </h2>
            <div className='bg-[#F1F9F6] p-5 rounded-2xl'>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Consulenza iniziale e analisi della situazione attuale</li>
                <li>Redazione della documentazione necessaria</li>
                <li>Formazione del personale coinvolto</li>
                <li>Supporto continuativo e aggiornamenti</li>
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
};

export default SafetyServiceView;
