import Banner from '../../../../components/common/Banner';
import Container from '../../../../components/ui/layouts/Container';

const BannerSection = () => {
  return (
    <Container size="full">
      <Banner
        description={'Esplora i nostri servizi e contattaci'}
        image={'/image/home/banner/image.jpg'}
        title={'Servizi'}
      />
    </Container>
  );
};

export default BannerSection;
