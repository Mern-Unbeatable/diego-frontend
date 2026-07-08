import Banner from '../../../../../../../components/common/Banner';
import { useTranslation } from 'react-i18next';

export const BannerSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner
        description={t('servicesPages.section3.bannerDescription')}
        title={t('servicesPages.section3.bannerTitle')}
        image={'/image/home/banner/image.jpg'}
      />
    </>
  );
};
