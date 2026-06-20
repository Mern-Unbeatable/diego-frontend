import Banner from '../../../../../../components/common/Banner';
import { Container } from '../../../../../../components/ui';

const BannerSection = () => {
  return (
    <Container>
      <Banner
        description={'La sicurezza sul lavoro ha due alleati: ASPP e RSPP'}
        image={'/image/home/banner/image22.jpg'}
        title={'Servizio ASPP e RSPP'}
      />
    </Container>
  );
};

export default BannerSection;
