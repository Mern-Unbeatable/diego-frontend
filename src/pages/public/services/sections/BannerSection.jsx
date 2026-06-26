import Banner from '../../../../components/common/Banner';
import Container from '../../../../components/ui/layouts/Container';
import { useTranslation } from 'react-i18next';

const BannerSection = () => {
  const { t } = useTranslation();

  return (
    <Container size="full">
      <Banner
        description={t('servicesPages.section2.bannerDescription')}
        image={'/image/home/banner/image.jpg'}
        title={t('servicesPages.section2.bannerTitle')}
      />
    </Container>
  );
};

export default BannerSection;
