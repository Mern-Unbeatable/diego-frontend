import Banner from '../../../components/common/Banner';
import banner from '../../../../src/assets/images/course/course.png'
import { Container } from '../../../components/ui';
import HowWorks from '../nested/HowWorks'
const TrainingOurPlatformView = () => {
  return (
    <Container className=' '>
      <Banner

        image={banner}
        title={'UnoSicurezza - Piattaforma LMS'}
      />
      <HowWorks />
    </Container>
  );
};

export default TrainingOurPlatformView; 