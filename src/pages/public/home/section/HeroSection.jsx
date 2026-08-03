import { useTranslation } from 'react-i18next';
import {
  Image,
  Container,
  Button,
  Heading,
  Paragraph,
} from '../../../../components/ui';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useTranslation();

  return (

    <div className="bg-[#1b534205]">
    <Container
      size=""
      className=" container mx-auto px-4 "
    >
<div className='   grid grid-cols-1 items-center gap-10  py-12 sm:px-12 sm:py-16 md:grid-cols-2 md:gap-16 lg:px-20'>
        <div className="flex justify-center md:justify-start">
        <Image
          src="/images/icons/HomeIcon.png"
          className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[550px]"
          hoverZoom={false}
          objectFit="contain"
          height="auto"
          width="100%"
        />
      </div>

      <div className="flex flex-col justify-center space-y-4 text-left md:space-y-6">
        <Heading
          level={1}
          className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-6xl"
        >
          {t('homeView.section1.title')}
        </Heading>

        <Heading
          level={3}
          className="text-lg font-bold text-[#505050] md:text-xl"
        >
          {t('homeView.section1.subtitle')}
        </Heading>

        <div className="space-y-2 text-sm text-[#555555] md:text-base lg:text-lg">
          <Paragraph>{t('homeView.section1.descriptionLineOne')}</Paragraph>
          <Paragraph>{t('homeView.section1.descriptionLineTwo')}</Paragraph>
        </div>

        <div className="pt-2">
          <Link to="/services">
            <Button
              label={t('homeView.section1.button')}
              variant="primary"
              size="lg"
              className="rounded-full bg-[#6dbfa3] px-6 py-3 text-white hover:bg-[#5aa68c]"
            />
          </Link>
        </div>
      </div>
</div>
    </Container>

    </div>
  );
};

export default HeroSection;
