import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/course/course.png';
import { Container } from '../../../components/ui';
import HowWorks from '../nested/HowWorks';
import { useTranslation } from 'react-i18next';

const TrainingOurPlatformView = () => {
  const { t } = useTranslation();

  return (
    <Container className=" ">
      <Banner

        image={banner}
        title={t('trainingPages.required.bannerTitle')}
      />
      <HowWorks />
    </Container>
  );
};

export default TrainingOurPlatformView; 