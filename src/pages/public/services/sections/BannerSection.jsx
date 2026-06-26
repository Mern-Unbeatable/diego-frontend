import Banner from '../../../../components/common/Banner';
import Container from '../../../../components/ui/layouts/Container';
import { useTranslation } from 'react-i18next';

const BannerSection = () => {
  const { t } = useTranslation();

  return (
    <Container size="full">
      <Banner
        description={t('servicesPages.servicesLanding.bannerDescription')}
        image={'/image/home/banner/image.jpg'}
        title={t('servicesPages.servicesLanding.bannerTitle')}
      />
    </Container>
  );
};

export default BannerSection;
