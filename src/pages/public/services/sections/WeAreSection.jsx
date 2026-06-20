import {
  Button,
  Heading,
  Container,
  Paragraph,
} from '../../../../components/ui';

const WeAreSection = () => {
  const handleFormContattoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <Container className={''}>
      <div className="rounded-xl border border-[#D1D1D1] bg-[#FFFFFF] p-6 px-6 py-6 sm:px-8 md:px-[60px] lg:px-[80px]">
        <div className="text-center">
          <Heading level={1}>Siamo a tua disposizione</Heading>
          <div className="mx-auto my-5 lg:max-w-[610px]">
            <Paragraph className={'my-3'}>
              Vuoi ricevere maggiori informazioni sui nostri servizi di
              formazione, sicurezza o UN PREVENTIVO?
            </Paragraph>
            <Paragraph className={'my-3'}>
              Compila il form qui sotto oppure utilizza i nostri contatti
              diretti: ti risponderemo al più presto.
            </Paragraph>
          </div>
          <Heading level={2}>Form di contatto</Heading>
        </div>
        <div className="">
          <form onSubmit={handleFormContattoSubmit}>
            <div className="gap-6 md:flex">
              <div className="w-full">
                <Input
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                  name={'name'}
                  type={'text'}
                  placeholder={'Il tuo nome'}
                  title={'Nome*'}
                />
                <Input
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                  name={'azienda'}
                  type={'text'}
                  placeholder={'Nome della tua azienda'}
                  title={'Azienda*'}
                />
                <Input
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                  name={'telefono'}
                  type={'number'}
                  placeholder={'+39 123 456 7890'}
                  title={'Numero di telefono/cellulare*'}
                />
              </div>
              <div className="w-full">
                <Input
                  title={'Cognome*'}
                  type={'text'}
                  name={'cognome'}
                  placeholder={'Il tuo cognome'}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
                <Input
                  title={'P.IVA*'}
                  type={'text'}
                  name={'piva'}
                  placeholder={'Partita IVA'}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
                <Input
                  title={'Cognome*'}
                  type={'email'}
                  name={'email'}
                  placeholder={'tua.email@esempio.com'}
                  TClassName={'text-[#828282]'}
                  className={'w-full bg-[#FAFAFA]'}
                />
              </div>
            </div>
            <div className="mt-4 w-full">
              <label className="mb-2 block text-sm font-medium text-[#828282]">
                Descrivi la tua attività e i tuoi obiettivi
              </label>
              <textarea
                name="message"
                type={'text'}
                placeholder="Condividi con noi chi sei e come possiamo costruire insieme una partnership di valore..."
                className="max-h-[120px] min-h-[120px] w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-900 placeholder-gray-400 transition duration-200 focus:border-transparent focus:ring-4 focus:ring-[#F1F9F6] focus:outline-none"
              />
            </div>
            <div className="mt-4 flex w-full gap-6 sm:mt-5 md:my-6">
              <Button
                variant="primary"
                className={'w-full rounded-lg'}
                text={'Iscriviti ora'}
              />
              <Button className={'w-full'} text={'Dettagli'} />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default WeAreSection;
