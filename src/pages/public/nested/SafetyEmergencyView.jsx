import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner4.png'
import { Container } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
const SafetyEmergencyView = () => {
  return <Container className=' '>
    <Banner

      image={banner}
      title={'Piano di emergenza'}
    />
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column - Service Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Piano di emergenza
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Ai fini degli adempimenti di cui all'articolo 18, comma 1, lettera t), il datore di lavoro:
            </p>
            <p className='text-gray-600 leading-relaxed mb-6'>Deve adottare le misure necessarie ai fini della prevenzione incendi e dell'evacuazione dei luoghi di lavoro, nonché per il caso di pericolo grave e immediato, secondo le disposizioni di cui all'articolo 43.
              Tali misure devono essere adeguate:</p>



            <ul className="list-disc mt-3 pl-6 mb-8 space-y-2 text-gray-600">
              <li>
                alla natura dell'attività
              </li>
              <li>
                alle dimensioni dell'azienda o dell'unità produttiva
              </li>
              <li>al numero delle persone presenti</li>
            </ul>
            <p className='text-gray-600 leading-relaxed mb-6'>Noi di UnoSicurezza, possiamo aiutarti in questo! </p>
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

export default SafetyEmergencyView;
