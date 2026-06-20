import { MdAddCall, MdOutlineEmail } from 'react-icons/md';
import { Container, Heading, Paragraph } from '../../../../components/ui';

const ContactSection = () => {
  return (
    <Container
      className={'max-w-2xl grid-cols-1 gap-10 md:grid md:grid-cols-2'}
    >
      <div className="col-span-1 mb-6 flex flex-col items-center gap-2 rounded-lg border border-[#D1D1D1] px-3 py-6 text-center md:mb-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#73BFA1] p-2 text-white">
          <MdOutlineEmail className="h-6 w-6" />
        </div>
        <Heading className={'font-bold'}>E-mail</Heading>
        <Heading className="text-base font-bold text-[#73BFA1] md:text-lg">
          info@unosicurezza.it
        </Heading>
        <Paragraph>Scrivici per qualsiasi informazione</Paragraph>
      </div>
      <div className="col-span-1 flex flex-col items-center gap-2 rounded-lg border border-[#D1D1D1] px-3 py-6 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#73BFA1] p-2 text-white">
          <MdAddCall className="h-6 w-6" />
        </div>
        <Heading className={'font-bold'} h4="Telefono"></Heading>
        <Heading className="text-base font-bold text-[#73BFA1] md:text-lg">
          +39 02 1234 5678
        </Heading>
        <Paragraph>Lun-Ven 9:00-18:00</Paragraph>
      </div>
    </Container>
  );
};

export default ContactSection;
