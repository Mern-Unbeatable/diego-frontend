import Banner from '../../../components/common/Banner';
import CourseOverview from '../../../components/training/CourseOverview';
import { Container } from '../../../components/ui';

const TrainingOurPlatformView = () => {
  return (
    <Container className=" ">
      <Banner
        image="/images/course/course3.png"
        title={'Scopri i nostri corsi SEVESO'}
      />
      <CourseOverview />
    </Container>
  );
};

export default TrainingOurPlatformView;
