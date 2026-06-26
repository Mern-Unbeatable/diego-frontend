import Banner from '../../../../../../../components/common/Banner';
import { useTranslation } from 'react-i18next';

export const BannerSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner
        description={t('servicesPages.sevCourses.bannerDescription')}
        title={t('servicesPages.sevCourses.bannerTitle')}
        image={'/image/home/banner/image.jpg'}
      />
    </>
  );
};
