import {
  Image,
  Container,
  Button,
  Heading,
  Paragraph,
} from '../../../../components/ui';

const HeroSection = () => {
  return (
    <Container
      size="full"
      className="grid grid-cols-1 items-center gap-12 bg-[#1b534207] md:grid-cols-2"
    >
      {/* Left side — text */}
      <div className="space-y-8">
        <Heading level={1}>UnoSicurezza</Heading>
        <Heading level={3} className="my-5">
          Ogni nuova competenza è un passo avanti verso il successo.
        </Heading>
        <div>
          <Paragraph>
            Essere in regola è: proteggere chi lavora con te.
          </Paragraph>
          <Paragraph className="my-4">
            Scegli la sicurezza, scegli noi.
          </Paragraph>
        </div>
        <Button label="Esplora i nostri servizi" variant="primary" size="lg" />
      </div>

      {/* Right side — image */}
      <div className="flex justify-end">
        <Image
          src="image/home/banner/hero-group.png"
          hoverZoom={false}
          objectFit="contain"
          height="750px"
          width="750px"
        />
      </div>
    </Container>
  );
};

export default HeroSection;
