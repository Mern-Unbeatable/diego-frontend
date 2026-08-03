import { useTranslation } from 'react-i18next';
import Banner from '../../../components/common/Banner';
import { Container } from '../../../components/ui';
import HowWorks from '../nested/HowWorks';
const TrainingOurPlatformView = () => {
  const { t } = useTranslation();

  return (
    <Container className=" ">
      <div className="container mx-auto px-4">
        {' '}
        <Banner
          image="/images/course/course3.png"
          title={'UnoSicurezza - Piattaforma LMS'}
        />
      </div>

      <HowWorks />
    </Container>
  );
};

export default TrainingOurPlatformView;
