import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/course/course4.png';
import { Container } from '../../../components/ui';
import CourseFilters from '../../../components/training/CourseFilters';
import CatalogCard from '../../../components/training/CatalogCard';
import { useTranslation } from 'react-i18next';

const TrainingCoursesSevView = () => {
  const { t } = useTranslation();

  return (
    <Container className=" ">
      <Banner

        image={banner}
        title={t('trainingPages.section5.bannerTitle')}
      />
      <CourseFilters />


      <CatalogCard />
    </Container>
  );
};

export default TrainingCoursesSevView; 