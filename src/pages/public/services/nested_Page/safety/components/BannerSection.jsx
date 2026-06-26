import Banner from '../../../../../../components/common/Banner';
import { Container } from '../../../../../../components/ui';
import { useTranslation } from 'react-i18next';

const BannerSection = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Banner
        description={t('servicesPages.section4.bannerDescription')}
        image={'/image/home/banner/image22.jpg'}
        title={t('navbar.servicesDropdown.servizioASPP')}
      />
    </Container>
  );
};

export default BannerSection;
