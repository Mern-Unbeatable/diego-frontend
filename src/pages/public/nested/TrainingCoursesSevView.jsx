import Banner from '../../../components/common/Banner';
import { useTranslation } from 'react-i18next';

import { Container } from '../../../components/ui';
import CourseCard from '../../../components/training/CourseCard';
import trainingCourses from '../../../data/trainingCourses.json';

const TrainingCoursesSevView = () => {
  const { t } = useTranslation();
  const bannerData = trainingCourses.sevesoPage?.banner ?? {};

  return (
    <Container className=" ">
         <div className='container mx-auto px-4'>      <Banner
        image={bannerData.image ?? '/images/course/course3.png'}
        title={t('trainingPages.section2.bannerTitle', {
          defaultValue: bannerData.title ?? 'Scopri i nostri corsi SEVESO',
        })}
      /></div>

      <CourseCard />
    </Container>
  );
};

export default TrainingCoursesSevView;
