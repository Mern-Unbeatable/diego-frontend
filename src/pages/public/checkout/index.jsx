import { ChevronLeft, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import CourseMedia from '../../../components/training/CourseMedia';
import CheckoutStripeForm from '../../../components/payment/CheckoutStripeForm';
import { useCourse } from '../../../features/public/course/courseHooks';
import { usePayment } from '../../../features/public/payment/paymentHooks';
import {
  getCheckoutSelection,
  mapCourseFromApi,
} from '../../../features/public/course/courseMappers';
import { formatEuro } from '../../../utils/courseMedia';

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { getCourseDetails, selectedCourse, loading: courseLoading } = useCourse();
  const {
    createCoursePaymentIntent,
    verifyCoursePaymentIntent,
    createCompanyCourseCheckout,
    clearPaymentIntent,
    clearCompanyCheckout,
    paymentIntent,
    companyCheckout,
    loading: paymentLoading,
    companyCheckoutLoading,
    verifying: paymentVerifying,
    error: paymentError,
    companyCheckoutError,
    verifyError: paymentVerifyError,
  } = usePayment();

  const paymentIntentRequestRef = useRef(null);
  const companyCheckoutRequestRef = useRef(null);

  const courseSlug = decodeURIComponent(
    (searchParams.get('slug') || searchParams.get('id') || '').trim(),
  );
  const selectedPlan = (searchParams.get('plan') || 'single').trim();
  const selectedTierId = (searchParams.get('tier') || '').trim();
  const isCompanyPlan = selectedPlan === 'company';

  const checkoutReturnPath = useMemo(() => {
    const params = new URLSearchParams();
    if (courseSlug) params.set('slug', courseSlug);
    if (selectedPlan) params.set('plan', selectedPlan);
    if (selectedTierId) params.set('tier', selectedTierId);
    const query = params.toString();
    return query
      ? `/training/course/checkout?${query}`
      : '/training/course/checkout';
  }, [courseSlug, selectedPlan, selectedTierId]);

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

  useEffect(() => {
    if (!isAuthenticated || !course?.id || isCompanyPlan) return undefined;

    const hasIntentForCourse =
      paymentIntent?.courseId === course.id && paymentIntent?.clientSecret;

    if (hasIntentForCourse) return undefined;

    if (paymentIntentRequestRef.current === course.id) return undefined;
    paymentIntentRequestRef.current = course.id;

    createCoursePaymentIntent({ courseId: course.id })
      .catch(() => {})
      .finally(() => {
        if (paymentIntentRequestRef.current === course.id) {
          paymentIntentRequestRef.current = null;
        }
      });

    return () => {
      clearPaymentIntent();
    };
  }, [
    isAuthenticated,
    course?.id,
    isCompanyPlan,
    createCoursePaymentIntent,
    clearPaymentIntent,
    paymentIntent?.courseId,
    paymentIntent?.clientSecret,
  ]);

  useEffect(() => {
    if (!isAuthenticated || !course?.id || !isCompanyPlan || !selectedTierId) {
      return undefined;
    }

    const requestKey = `${course.id}:${selectedTierId}`;
    const hasCheckoutForSelection =
      companyCheckout?.tierId === selectedTierId && companyCheckout?.url;

    if (hasCheckoutForSelection) return undefined;
    if (companyCheckoutRequestRef.current === requestKey) return undefined;

    companyCheckoutRequestRef.current = requestKey;

    createCompanyCourseCheckout({
      courseId: course.id,
      tierId: selectedTierId,
    })
      .catch(() => {})
      .finally(() => {
        if (companyCheckoutRequestRef.current === requestKey) {
          companyCheckoutRequestRef.current = null;
        }
      });

    return () => {
      clearCompanyCheckout();
    };
  }, [
    isAuthenticated,
    course?.id,
    isCompanyPlan,
    selectedTierId,
    createCompanyCourseCheckout,
    clearCompanyCheckout,
    companyCheckout?.tierId,
    companyCheckout?.url,
  ]);

  useEffect(() => {
    if (!paymentError) return;
    toast.error(
      typeof paymentError === 'string'
        ? paymentError
        : paymentError?.message || t('paymentPages.section2.paymentError'),
    );
  }, [paymentError, t]);

  useEffect(() => {
    if (!companyCheckoutError) return;
    toast.error(
      typeof companyCheckoutError === 'string'
        ? companyCheckoutError
        : companyCheckoutError?.message || t('paymentPages.section2.paymentError'),
    );
  }, [companyCheckoutError, t]);

  useEffect(() => {
    if (!paymentVerifyError) return;
    toast.error(
      typeof paymentVerifyError === 'string'
        ? paymentVerifyError
        : paymentVerifyError?.message || t('paymentPages.section2.paymentError'),
    );
  }, [paymentVerifyError, t]);

  const displayAmount = isCompanyPlan
    ? companyCheckout?.totalAmount ?? checkoutItem?.price ?? 0
    : paymentIntent?.finalPrice ?? checkoutItem?.price ?? paymentIntent?.amount ?? 0;

  const formattedPrice = formatEuro(displayAmount);
  const clientSecret = paymentIntent?.clientSecret || '';
  const publishableKey = paymentIntent?.publishableKey || null;
  const stripeCheckoutUrl = companyCheckout?.url || '';

  const handlePaymentSuccess = useCallback(
    async (stripePaymentIntent) => {
      const paymentIntentId =
        stripePaymentIntent?.id || paymentIntent?.paymentIntentId;

      if (!paymentIntentId) {
        toast.error(t('paymentPages.section2.paymentError'));
        return;
      }

      try {
        const result = await verifyCoursePaymentIntent(paymentIntentId);
        const verified = result?.data?.paid;

        if (!verified) {
          toast.error(
            result?.data?.message || t('paymentPages.section2.paymentError'),
          );
          return;
        }

        toast.success(t('paymentPages.section3.title'));
        navigate(
          courseSlug
            ? `/training/course/details?slug=${encodeURIComponent(courseSlug)}&purchased=true`
            : '/training/courses/catalog?purchased=true',
        );
      } catch {
        toast.error(t('paymentPages.section2.paymentError'));
      }
    },
    [
      courseSlug,
      navigate,
      paymentIntent?.paymentIntentId,
      t,
      verifyCoursePaymentIntent,
    ],
  );

  const handleCompanyCheckout = () => {
    if (!stripeCheckoutUrl) {
      toast.error(t('paymentPages.section2.paymentUnavailable'));
      return;
    }

    window.location.assign(stripeCheckoutUrl);
  };

  const isPaymentLoading = isCompanyPlan ? companyCheckoutLoading : paymentLoading;

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        {courseLoading ? (
          <p className="mb-4 text-sm text-gray-500">
            {t('trainingPages.section7.loadingCourses')}
          </p>
        ) : null}

        {!courseLoading && !course ? (
          <p className="mb-4 text-sm text-gray-500">
            {t('trainingPages.section7.courseNotFound')}
          </p>
        ) : null}

        {!isAuthenticated ? (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="mb-3">
              {t('paymentPages.section2.loginRequired', {
                defaultValue: 'Please sign in to continue with payment.',
              })}
            </p>
            <Link
              to={`/auth/login?redirect=${encodeURIComponent(checkoutReturnPath)}`}
              className="inline-flex rounded-full bg-[#73BFA1] px-5 py-2 font-semibold text-white transition hover:bg-[#5fa889]"
            >
              {t('paymentPages.section2.signIn', { defaultValue: 'Sign in' })}
            </Link>
          </div>
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
                      {paymentIntent?.courseTitle || checkoutItem.displayTitle}
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
              <div className="flex w-full items-center justify-center gap-x-3">
                <img src="/images/payment/payment2.png" alt="Stripe" />
              </div>
            </div>

            {isAuthenticated && isPaymentLoading ? (
              <p className="mb-4 text-sm text-gray-600">
                {t('paymentPages.section2.preparingPayment')}
              </p>
            ) : null}

            <div className="mb-6 space-y-2 border-b border-[#73BFA1] pb-6">
              <div className="flex justify-between text-gray-700">
                <span>{t('paymentPages.section2.subtotal')}</span>
                <span>{formattedPrice}</span>
              </div>
              {!isCompanyPlan && Number(paymentIntent?.discount) > 0 ? (
                <div className="flex justify-between text-sm text-green-700">
                  <span>{t('paymentPages.section2.discount')}</span>
                  <span>-{formatEuro(paymentIntent.discount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>{t('paymentPages.section2.total')}</span>
                <span>{formattedPrice}</span>
              </div>
            </div>

            {!isAuthenticated ? (
              <p className="text-sm text-gray-600">
                {t('paymentPages.section2.loginRequired', {
                  defaultValue: 'Please sign in to continue with payment.',
                })}
              </p>
            ) : isCompanyPlan ? (
              <>
                {isCompanyPlan && !selectedTierId ? (
                  <p className="text-sm text-gray-600">
                    {t('trainingPages.section12.companyPackage.selectTierFirst')}
                  </p>
                ) : null}

                {stripeCheckoutUrl ? (
                  <button
                    type="button"
                    onClick={handleCompanyCheckout}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition hover:bg-[#5fa889]"
                  >
                    <span>{formattedPrice}</span>
                    <span>{t('paymentPages.section2.payNow')}</span>
                    <span>→</span>
                  </button>
                ) : (
                  !companyCheckoutLoading && (
                    <p className="text-sm text-gray-600">
                      {t('paymentPages.section2.paymentUnavailable')}
                    </p>
                  )
                )}
              </>
            ) : clientSecret ? (
              <CheckoutStripeForm
                key={clientSecret}
                clientSecret={clientSecret}
                publishableKey={publishableKey}
                amount={displayAmount}
                verifying={paymentVerifying}
                onSuccess={handlePaymentSuccess}
              />
            ) : (
              !paymentLoading && (
                <p className="text-sm text-gray-600">
                  {t('paymentPages.section2.paymentUnavailable')}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
