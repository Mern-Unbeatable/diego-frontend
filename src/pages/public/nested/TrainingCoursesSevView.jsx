import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/course/course3.png';
import { Container } from '../../../components/ui';
import CourseCard from '../../../components/training/CourseCard';
import { useTranslation } from 'react-i18next';

const TrainingCoursesSevView = () => {
  const { t } = useTranslation();

  return (
    <Container className=" ">
      <Banner

        image={banner}
        title={t('trainingPages.section4.bannerTitle')}
      />
      <CourseCard />
    </Container>
  );
};

export default TrainingCoursesSevView; 