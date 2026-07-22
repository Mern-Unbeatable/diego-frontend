import { ChevronLeft, Trash2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CourseMedia from '../../../components/training/CourseMedia';
import { useCourse } from '../../../features/public/course/courseHooks';
import {
  getCheckoutSelection,
  mapCourseFromApi,
} from '../../../features/public/course/courseMappers';
import { formatEuro } from '../../../utils/courseMedia';

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getCourseDetails, selectedCourse, loading } = useCourse();

  const courseSlug = decodeURIComponent(
    (searchParams.get('slug') || searchParams.get('id') || '').trim(),
  );
  const selectedPlan = (searchParams.get('plan') || 'single').trim();
  const selectedTierId = (searchParams.get('tier') || '').trim();

  useEffect(() => {
    if (!courseSlug) return;
    getCourseDetails(courseSlug).catch(() => {});
  }, [getCourseDetails, courseSlug]);

  const language = (i18n.language || 'en').split('-')[0];

  const course = useMemo(() => {
    const courseSource =
      selectedCourse?.course ||
      selectedCourse?.data?.course ||
      selectedCourse ||
      null;

    return mapCourseFromApi(courseSource, { language, t, courseSlug });
  }, [selectedCourse, language, t, courseSlug]);

  const checkoutItem = useMemo(
    () =>
      getCheckoutSelection(course, {
        plan: selectedPlan,
        tierId: selectedTierId,
      }),
    [course, selectedPlan, selectedTierId],
  );

  const formattedPrice = formatEuro(checkoutItem?.price ?? 0);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        {loading ? (
          <p className="mb-4 text-sm text-gray-500">
            {t('trainingPages.section7.loadingCourses')}
          </p>
        ) : null}
        {!loading && !course ? (
          <p className="mb-4 text-sm text-gray-500">
            {t('trainingPages.section7.courseNotFound')}
          </p>
        ) : null}

        <div className="grid gap-8 rounded-md bg-[#F1F9F6] p-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={() =>
                navigate(
                  courseSlug
                    ? `/training/course/details?slug=${encodeURIComponent(courseSlug)}`
                    : '/training/courses/catalog',
                )
              }
              className="mb-8 flex items-center gap-2 text-left"
            >
              <ChevronLeft className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {t('paymentPages.section1.continueShopping')}
              </h2>
            </button>

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                {t('paymentPages.section1.title')}
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                {t('paymentPages.section1.contains')}
              </p>

              {checkoutItem ? (
                <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-300">
                    <CourseMedia
                      thumbnailUrl={course?.thumbnailUrl}
                      videoUrl={course?.videoUrl}
                      alt={checkoutItem.displayTitle}
                      className="h-full w-full object-cover"
                      showVideoControls={false}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {checkoutItem.displayTitle}
                    </h4>
                    <p className="text-sm text-gray-600">{course?.category}</p>
                    <p className="mt-1 text-sm font-medium text-[#73BFA1]">
                      {checkoutItem.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-800">
                      {formattedPrice}
                    </span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg bg-[#D4EBE2] p-6">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              {t('paymentPages.section2.title')}
            </h3>

            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold text-gray-700">
                {/* {t('paymentPages.section2.network')} */}
              </p>
              <div className="flex w-full items-center justify-center gap-x-3">
                <img src="/public/image/paymentIcon/stripe.png" alt="Stripe" />
                {/* <img src="/images/payment/payment.png" alt="VISA" />
                <img src="/images/payment/payment3.png" alt="RuPay" /> */}
{/* 
                <button className="text-sm font-semibold text-green-600 hover:text-green-700">
                  {t('paymentPages.section2.seeAll')}
                </button> */}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {t('paymentPages.section2.nameOnCard')}
                </label>
                <input
                  type="text"
                  placeholder="Franco Rossi"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {t('paymentPages.section2.cardNumber')}
                </label>
                <input
                  type="text"
                  placeholder="3333 3333 3333 3333"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('paymentPages.section2.expiryDate')}
                  </label>
                  <input
                    type="text"
                    placeholder="01/01/2030"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('paymentPages.section2.cvv')}
                  </label>
                  <input
                    type="text"
                    placeholder="111"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="my-6 space-y-2 border-t border-[#73BFA1] pt-6">
              <div className="flex justify-between text-gray-700">
                <span>{t('paymentPages.section2.subtotal')}</span>
                <span>{formattedPrice}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>{t('paymentPages.section2.total')}</span>
                <span>{formattedPrice}</span>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition hover:bg-[#73BFA1]">
              <span>{formattedPrice}</span>
              <span>{t('paymentPages.section2.payNow')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
