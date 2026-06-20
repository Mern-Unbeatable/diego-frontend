import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/course/course2.png'
import { Container } from '../../../components/ui';
import CourseOverview from '../../../components/training/CourseOverview';

const TrainingOurPlatformView = () => {
  return (
    <Container className=' '>
      <Banner

        image={banner}
        title={'Scopri i nostri corsi SEVESO'}
      />
      <CourseOverview />
    </Container>
  );
};

export default TrainingOurPlatformView; 