import Banner from '../../../components/common/Banner';
import { useTranslation } from 'react-i18next';
import CourseOverview from '../../../components/training/CourseOverview';
import { Container } from '../../../components/ui';
import trainingCourses from '../../../data/trainingCourses.json';
import CoursesOur from './CoursesOur';

const TrainingOurPlatformView = () => {
  const { t } = useTranslation();
  const bannerData = trainingCourses.sevesoPage?.banner ?? {};

  return (
    <Container className=" ">
      <Banner
        image={bannerData.image ?? '/images/course/course3.png'}
        title={t('trainingPages.section2.bannerTitle', {
          defaultValue: bannerData.title ?? 'Scopri i nostri corsi SEVESO',
        })}
      />
      {/* <CourseOverview /> */}
      <CoursesOur/>
    </Container>
  );
};

export default TrainingOurPlatformView;
