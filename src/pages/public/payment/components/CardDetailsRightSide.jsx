import { FaArrowRight } from 'react-icons/fa';
import Input from '../../../../components/ui/Input';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Button from '../../../../components/ui/Button';
import P from '../../../../components/ui/P';
import { Heading, Paragraph } from '../../../../components/ui';
import { useTranslation } from 'react-i18next';

const CardDetailsRightSide = () => {
  const [isOpenModal, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => {
    console.log('Opening modal...');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <div className="mt-12 w-full rounded-xl bg-[#D4EBE2] px-8 py-6 sm:mt-14 md:mt-0">
      <Heading level={4} className={''} h2={t('paymentPages.section2.title')} />
      <Heading level={4} className={'my-6'} h4={t('paymentPages.section2.network')} />
      <form onSubmit={handleSubmit}>
        <div className="flex w-full items-center justify-between">
          <div className="h-auto w-[75px] bg-[#D4EBE2]">
            <img
              className="h-full w-full bg-[#D4EBE2] bg-cover object-cover"
              src="/image/paymentIcon/visa.png"
              alt=""
            />
          </div>
          <div className="h-auto w-[75px] bg-[#D4EBE2]">
            <img
              className="h-full w-full bg-[#D4EBE2] bg-cover object-cover"
              src="/image/paymentIcon/stripe.png"
              alt=""
            />
          </div>
          <div className="h-auto w-[75px]">
            <img
              className="h-full w-full bg-cover object-cover"
              src="/image/paymentIcon/rupay.png"
              alt=""
            />
          </div>
          <P p={t('paymentPages.section2.seeAll')} />
        </div>
        <Input
          TClassName={''}
          className={'bg-white text-[#505050]'}
          name={'name'}
          placeholder={'Franco Rossi'}
          title={t('paymentPages.section2.nameOnCard')}
          type={'text'}
        />
        <Input
          TClassName={''}
          className={'bg-white text-[#505050]'}
          name={'number'}
          placeholder={'3333 3333 3333 3333'}
          title={t('paymentPages.section2.cardNumber')}
          type={'text'}
        />
        <div className="flex items-center gap-4">
          <Input
            TClassName={''}
            className={'bg-white text-[#505050]'}
            name={'date'}
            placeholder={'Franco Rossi'}
            title={t('paymentPages.section2.expiryDate')}
            type={'number'}
          />
          <Input
            TClassName={''}
            className={'bg-white text-[#505050]'}
            name={'cvv'}
            placeholder={'111'}
            title={t('paymentPages.section2.cvv')}
            type={'number'}
          />
        </div>
        <hr className="my-6 text-[#5F65C3]" />
        <div className="flex items-center justify-between text-[#505050]">
          <p className="font-[#646464] text-base leading-6 font-bold text-[#505050]">
            {t('paymentPages.section2.subtotal')}
          </p>
          <p className="font-[#646464] text-base leading-6 font-bold text-[#505050]">
            €90.00
          </p>
        </div>
        <div className="my-6 flex items-center justify-between text-[#505050]">
          <p className="font-[#646464] text-base leading-6 font-bold text-[#505050]">
            {t('paymentPages.section2.total')}
          </p>
          <p className="font-[#646464] text-base leading-6 font-bold text-[#505050]">
            €86.00
          </p>
        </div>
        <button
          onClick={openModal}
          type="submit"
          className="flex w-full items-center justify-between rounded-lg border-2 border-[#73BFA1] bg-[#73BFA1] px-6 py-3 font-bold text-[#ffffff] transition-colors hover:bg-[#ffffff] hover:text-[#73BFA1]"
        >
          86,00 €
          <div className="flex items-center gap-3">
            {t('paymentPages.section2.payNow')}
            <FaArrowRight />
          </div>
        </button>
      </form>

      {/* Modal */}
      {isOpenModal && (
        <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-white/30 p-4 backdrop-blur-md sm:p-6">
          {/* Modal Content Container */}
          <div className="relative flex max-h-[90vh] w-[50%] max-w-2xl flex-col items-center justify-center overflow-y-auto rounded-lg bg-white p-6 px-32 py-10 text-center shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 text-gray-700 transition hover:bg-gray-200 hover:text-gray-900"
              aria-label={t('paymentPages.section3.close')}
            >
              <IoClose className="h-6 w-6" />
            </button>

            <div className="flex w-full flex-col items-center justify-center">
              <div className="h-auto w-14 text-center">
                <img
                  className="h-full w-full bg-cover object-cover"
                  src="/image/icon/Group.jpg"
                  alt=""
                />
              </div>
              <Heading
                level={4}
                className={'mt-4 text-[#73BFA1]'}
                h4={t('paymentPages.section3.title')}
              />
              <Paragraph
                className={
                  'mt-2 max-w-[300px] text-center font-semibold text-[#4A4A4A]'
                }
                p={t('paymentPages.section3.description')}
              />
              <Button className={'mt-4'} text={t('paymentPages.section3.backHome')} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetailsRightSide;
