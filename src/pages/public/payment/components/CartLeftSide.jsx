import { IoMdArrowRoundBack } from 'react-icons/io'
import { H3, H4 } from '../../../../components/ui/Heading'
import P from '../../../../components/ui/P'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CartLeftSide = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <button
        onClick={handleGoBack}
        className="mb-5 flex items-center gap-1 text-base font-bold text-[#73BFA1]"
      >
        <IoMdArrowRoundBack className="text-lg text-[#73BFA1]" />
        <h4 className={`text-base font-bold text-[#73BFA1] md:text-lg`}>
          {t('paymentPages.cart.continueShopping')}
        </h4>
      </button>

      <hr className="my-6 text-[#D0CFCF]" />

      <H4 h4={t('paymentPages.cart.title')} />
      <P className={'my-5'} p={t('paymentPages.cart.contains')} />

      <div className="flex items-center justify-between gap-10 rounded-xl bg-white p-3">
        <div className="flex items-center gap-10">
          <div className="h-20 w-20">
            <img
              className="h-full w-full bg-cover object-cover"
              src="/image/priceing/Rectangle.jpg"
              alt=""
            />
          </div>

          <div>
            <H3 className={''} h3={t('paymentPages.cart.courseDescription')} />
            <P p={t('paymentPages.cart.courseName')} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-10">
          <p className="text-sm font-bold text-[#393939]">€30.00</p>
          <MdOutlineDeleteForever className="h-8 w-8 cursor-pointer text-gray-600" />
        </div>
      </div>
    </div>
  )
}

export default CartLeftSide
