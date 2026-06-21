import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner4.png'
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
const SafetyServiceView = () => {
  return <Container className=' '>
    <Banner
      description={'Redazione e aggiornamento del Documento di Valutazione dei Rischi'}
      image={banner}
      title={' DVR - Documento Valutazione Rischi'}
    />
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column - Service Details */}
        <div>
          <Heading level={3}>Dettagli del servizio</Heading>

          <div className="prose prose-lg max-w-none mt-3 ">
            <p className="text-gray-600 leading-relaxed mb-6">
              Il Documento di Valutazione dei Rischi (DVR). Forniamo servizi completi di valutazione dei rischi, redazione del documento, formazione del personale e aggiornamenti periodici secondo quanto previsto dal D.Lgs. 81/2008.
            </p>



            <Heading level={3}>Cosa include il servizio</Heading>
            <div className='bg-[#F1F9F6] p-5 rounded-2xl mt-3 '>
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
