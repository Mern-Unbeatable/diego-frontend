import Banner from '../../../components/common/Banner';
import { Container } from '../../../components/ui';
import HowWorks from '../nested/HowWorks';
const TrainingOurPlatformView = () => {
  return (
    <Container className=" ">
      <Banner
        image="/images/course/course3.png"
        title={'UnoSicurezza - Piattaforma LMS'}
      />
      <HowWorks />
    </Container>
  );
};

export default TrainingOurPlatformView;
