import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/course/course4.png'
import { Container } from '../../../components/ui';
import CourseOverview from '../../../components/training/CourseOverview';
import CourseCard from '../../../components/training/CourseCard';
import CourseFilters from '../../../components/training/CourseFilters';
import CatalogCard from '../../../components/training/CatalogCard';

const TrainingCoursesSevView = () => {
  return (
    <Container className=' '>
      <Banner

        image={banner}
        title={'Catalogo'}
      />
      <CourseFilters />


      <CatalogCard />
    </Container>
  );
};

export default TrainingCoursesSevView; 