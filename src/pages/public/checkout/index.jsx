import { ChevronLeft, Trash2 } from 'lucide-react';
import payment from '../../../../src/assets/images/payment/payment.png';
import payment2 from '../../../../src/assets/images/payment/payment2.png';
import payment3 from '../../../../src/assets/images/payment/payment3.png';
import course from '../../../../src/assets/images/course/course.png';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen  p-8">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3 bg-[#F1F9F6] p-5 rounded-md">
                    {/* Cart Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                            <ChevronLeft className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-semibold text-gray-800">{t('paymentPages.cart.continueShopping')}</h2>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold text-gray-800">{t('paymentPages.cart.title')}</h3>
                            <p className="mb-6 text-sm text-gray-600">{t('paymentPages.cart.contains')}</p>

                            {/* Cart Item */}
                            <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-300">
                                    <img
                                        src={course}
                                        alt="Course"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">{t('paymentPages.cart.courseDescription')}</h4>
                                    <p className="text-sm text-gray-600">{t('paymentPages.cart.courseName')}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-gray-800">€30.00</span>
                                    <button className="text-red-500 hover:text-red-700">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details Section */}
                    <div className="rounded-lg bg-[#D4EBE2] p-6">
                        <h3 className="mb-6 text-lg font-semibold text-gray-800">{t('paymentPages.cardDetails.title')}</h3>

                        {/* Payment Methods */}
                        <div className="mb-6">
                            <p className="mb-3 text-sm font-semibold text-gray-700">{t('paymentPages.cardDetails.network')}</p>
                            <div className="flex items-center justify-center gap-x-3  w-full">


                                <img
                                    src={payment2}
                                    alt="Stripe"
                                />
                                <img
                                    src={payment}
                                    alt="VISA"
                                />
                                <img
                                    src={payment3}
                                    alt="RuPay"
                                />

                                <button className="text-xs text-green-600 hover:text-green-700 font-semibold">{t('paymentPages.cardDetails.seeAll')}</button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">{t('paymentPages.cardDetails.nameOnCard')}</label>
                                <input
                                    type="text"
                                    placeholder="Franco Rossi"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">{t('paymentPages.cardDetails.cardNumber')}</label>
                                <input
                                    type="text"
                                    placeholder="3333 3333 3333 3333"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t('paymentPages.cardDetails.expiryDate')}</label>
                                    <input
                                        type="text"
                                        placeholder="01/01/2030"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">{t('paymentPages.cardDetails.cvv')}</label>
                                    <input
                                        type="text"
                                        placeholder="111"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="my-6 space-y-2 border-t border-[#73BFA1] pt-6">
                            <div className="flex justify-between text-gray-700">
                                <span>{t('paymentPages.cardDetails.subtotal')}</span>
                                <span>€80.00</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-800">
                                <span>{t('paymentPages.cardDetails.total')}</span>
                                <span>€88.00</span>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button className="w-full rounded-full bg-[#73BFA1] py-3 font-semibold text-white hover:bg-[#73BFA1] transition flex items-center justify-center gap-2">
                            <span>€ 86.00 €</span>
                            <span>{t('paymentPages.cardDetails.payNow')}</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Checkout