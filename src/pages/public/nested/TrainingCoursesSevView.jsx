import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/course/course3.png'
import { Container } from '../../../components/ui';
import CourseOverview from '../../../components/training/CourseOverview';
import CourseCard from '../../../components/training/CourseCard';

const TrainingCoursesSevView = () => {
  return (
    <Container className=' '>
      <Banner

        image={banner}
        title={'Scopri i nostri corsi SEVESO'}
      />
      <CourseCard />
    </Container>
  );
};

export default TrainingCoursesSevView; 