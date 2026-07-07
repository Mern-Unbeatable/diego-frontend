import Banner from '../../../components/common/Banner';

import { Container } from '../../../components/ui';
import CourseCard from '../../../components/training/CourseCard';
import trainingCourses from '../../../data/trainingCourses.json';

const TrainingCoursesSevView = () => {
  const bannerData = trainingCourses.sevesoPage?.banner ?? {};

  return (
    <Container className=" ">
      <Banner
        image={bannerData.image ?? '/images/course/course3.png'}
        title={bannerData.title ?? 'Scopri i nostri corsi SEVESO'}
      />
      <CourseCard />
    </Container>
  );
};

export default TrainingCoursesSevView;
