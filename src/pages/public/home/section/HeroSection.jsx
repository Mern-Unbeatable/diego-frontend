import {
  Image,
  Container,
  Button,
  Heading,
  Paragraph,
} from '../../../../components/ui';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <Container
      size="full"
      className="grid grid-cols-1 items-center gap-8 bg-[#1b534207] py-10 sm:gap-10 sm:py-12 md:grid-cols-2 md:gap-12"
    >
      {/* Left side — text */}
      <div className="space-y-6 sm:space-y-8">
        <Heading level={1}>{t('homeView.hero.title')}</Heading>
        <Heading level={3} className="my-5">
          {t('homeView.hero.subtitle')}
        </Heading>
        <div>
          <Paragraph>{t('homeView.hero.descriptionLineOne')}</Paragraph>
          <Paragraph className="my-4">
            {t('homeView.hero.descriptionLineTwo')}
          </Paragraph>
        </div>
        <Button label={t('homeView.hero.button')} variant="primary" size="lg" />
      </div>

      {/* Right side — image */}
      <div className="flex justify-center md:justify-end">
        <Image
          src="image/home/banner/hero-group.png"
          className="w-full max-w-[320px] sm:max-w-[460px] md:max-w-[620px] lg:max-w-[750px]"
          hoverZoom={false}
          objectFit="contain"
          height="auto"
          width="100%"
        />
      </div>
    </Container>
  );
};

export default HeroSection;
