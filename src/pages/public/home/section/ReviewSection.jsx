import Button from '../../../../components/ui/buttons/Buttons';
import InputField from '../../../../components/ui/forms/InputField';
import TextAreaField from '../../../../components/ui/forms/TextAreaField';
import Paragraph from '../../../../components/ui/typography/Paragraph';
import Container from '../../../../components/ui/layouts/Container';
import Heading from '../../../../components/ui/typography/Heading';

const ReviewSection = () => {
  return (
    <div className="mt-20 items-center overflow-hidden md:flex md:gap-8">
      <Container className="">
        <div className="space-y-8">
          <Heading level={2} className="">
            Condividi la tua recensione con noi
          </Heading>
          <Paragraph className="">
            'Compila il modulo per condividere la tua esperienza. La tua
            recensione sarà visibile dopo l’approvazione.'
          </Paragraph>
          <InputField
            title="name"
            type="text"
            name="name"
            placeholder="Name *"
          />
        </div>
        <div className="my-5 space-y-8">
          <Heading level={2} className="">
            Feedback sulla sessione
          </Heading>
          <div className="space-y-4">
            <Paragraph>Lascia un commento</Paragraph>
            <Paragraph>Valuta la tua esperienza qui sotto</Paragraph>
            <Paragraph>⭐⭐⭐⭐⭐ 4/5 stars</Paragraph>
          </div>

          <TextAreaField
            id="Lascia un commento"
            title="Lascia un commento"
            name="textarea"
            className=""
            placeholder="Scrivi qualcosa  sulla tua esperienza..."
          />
        </div>
        <Button label="Invia" size="lg" className="w-full" />
      </Container>

      <div className="border">
        <div className="relative">
          <div className="ml-[140px] h-[500px] w-[260px] bg-[#73BFA1] sm:ml-[150px] sm:h-[700px] sm:w-[380px] md:ml-[300px] md:h-[800px] md:w-[360px] lg:ml-[400px] lg:h-[900px] lg:w-[529px]" />
          <div className="absolute -mt-[460px] ml-0 sm:-mt-[600px] md:-mt-[600px] md:ml-20 lg:-mt-[820px] lg:ml-24">
            <img
              className="h-[420px] w-[300px] sm:h-[500px] sm:w-[390px] md:h-[600px] lg:h-[720px] lg:w-full"
              src="./images/Componen.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
