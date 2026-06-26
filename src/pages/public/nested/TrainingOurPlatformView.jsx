import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/course/course2.png';
import { Container } from '../../../components/ui';
import CourseOverview from '../../../components/training/CourseOverview';
import { useTranslation } from 'react-i18next';

const TrainingOurPlatformView = () => {
  const { t } = useTranslation();

  return (
    <Container className=" ">
      <Banner

        image={banner}
        title={t('trainingPages.ourPlatform.bannerTitle')}
      />
      <CourseOverview />
    </Container>
  );
};

export default TrainingOurPlatformView; 