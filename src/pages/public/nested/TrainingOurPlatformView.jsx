import Banner from '../../../components/common/Banner';
import CourseOverview from '../../../components/training/CourseOverview';
import { Container } from '../../../components/ui';
import trainingCourses from '../../../data/trainingCourses.json';

const TrainingOurPlatformView = () => {
  const bannerData = trainingCourses.sevesoPage?.banner ?? {};

  return (
    <Container className=" ">
      <Banner
        image={bannerData.image ?? '/images/course/course3.png'}
        title={bannerData.title ?? 'Scopri i nostri corsi SEVESO'}
      />
      <CourseOverview />
    </Container>
  );
};

export default TrainingOurPlatformView;
