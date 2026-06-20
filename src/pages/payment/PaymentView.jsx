import CartLeftSide from './components/CartLeftSide';
import CardDetailsRightSide from './components/CardDetailsRightSide';
import { Container } from '../../components/ui';

const PaymentView = () => {
  return (
    <Container
      className={
        'grid grid-cols-1 rounded-xl bg-[#F1F9F6] p-12 px-12 sm:p-14 sm:px-14 md:grid-cols-5 md:gap-14 md:p-14 md:px-14'
      }
    >
      <div className={'col-span-3'}>
        <CartLeftSide />
      </div>
      <div className="col-span-2">
        <CardDetailsRightSide />
      </div>
    </Container>
  );
};

export default PaymentView;
