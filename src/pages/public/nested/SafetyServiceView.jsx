import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/banner/safety/banner14.png'
import { Container, Heading } from '../../../components/ui';
import ServiceForm from '../services/components/ServiceForm';
const SafetyServiceView = () => {
  return <Container className=' '>
    <Banner
      description={'Esplora i nostri servizi e contattaci'}
      image={banner}
      title={'Servizi'}
    />
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">


        {/* Left Column - Service Details */}
        <div>

          <Heading level={3}>Dettagli del servizio</Heading>

          <div className="prose prose-lg max-w-none mt-3 ">
            <p className="text-gray-600 leading-relaxed mb-6">
              La sicurezza non è un semplicemente un argomento tedesco del quale farsi beffa durante
              la quotidiana attività lavorativa. A volte può risultare macchiosa e complessa perché
              non si hanno le conoscenze sufficienti a disposizione per portarla a termine. Altre
              volte invece si pensa che è un adempimento il quale, una volta portato a termine, non
              prevede più impegno, ma ci si sbaglia di grosso. La sicurezza è un adempimento che
              prevede un mantenimento e miglioramento continuo seguendo dettami di legge. Motivo
              per il quale, UnoSicurezza, aiuta le imprese a fornire il servizio di:
            </p>

            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-600">
              <li>
                <span className="font-semibold">ASPP</span> (Addetto per il Servizio di Prevenzione e Protezione)
              </li>
              <li>
                <span className="font-semibold">RSPP</span> (Responsabile per il Servizio di Prevenzione e Protezione)
              </li>
            </ul>

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
