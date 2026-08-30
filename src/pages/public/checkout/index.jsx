import { ChevronLeft, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import CourseMedia from '../../../components/training/CourseMedia';
import CheckoutStripeForm from '../../../components/payment/CheckoutStripeForm';
// import CheckoutPayPalForm from '../../../components/payment/CheckoutPayPalForm';
import CheckoutPaymentMethodPicker from '../../../components/payment/CheckoutPaymentMethodPicker';
import { useGetPlatformStatusQuery } from '../../../features/api/platformApi';
import { useCourse } from '../../../features/public/course/courseHooks';
import { usePayment } from '../../../features/public/payment/paymentHooks';
import {
  getCheckoutSelection,
  mapCourseFromApi,
} from '../../../features/public/course/courseMappers';
import { formatEuro, toEuroAmount } from '../../../utils/courseMedia';
import { ROUTES } from '../../../config/routes';
import {
  getPaymentErrorMessage,
  isEnrollmentConflictError,
  resolveEnrollmentConflictToast,
} from '../../../features/public/payment/paymentCheckoutUtils';

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { getCourseDetails, selectedCourse, loading: courseLoading } = useCourse();
  const {
    createCoursePaymentIntent,
    createCompanyCoursePaymentIntent,
    verifyCoursePaymentIntent,
    verifyCompanyCoursePaymentIntent,
    clearPaymentIntent,
    paymentIntent,
    loading: paymentLoading,
    verifying: paymentVerifying,
    error: paymentError,
    verifyError: paymentVerifyError,
  } = usePayment();

  const paymentIntentRequestRef = useRef(null);
  const enrollmentToastShownRef = useRef(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { data: platformStatus } = useGetPlatformStatusQuery();

  const courseSlug = decodeURIComponent(
    (searchParams.get('slug') || searchParams.get('id') || '').trim(),
  );
  const selectedPlan = (searchParams.get('plan') || 'single').trim();
  const selectedTierId = (searchParams.get('tier') || '').trim();
  const isCompanyPlan = selectedPlan === 'company';

  const stripeEnabled = platformStatus?.stripeEnabled !== false;
  // const paypalEnabled = Boolean(platformStatus?.paypalEnabled);
  const applePayEnabled =
    stripeEnabled && platformStatus?.applePayEnabled !== false;
  const googlePayEnabled =
    stripeEnabled && platformStatus?.googlePayEnabled !== false;
  const usesStripeIntent =
    stripeEnabled && ['card', 'google_pay', 'apple_pay'].includes(paymentMethod);

  const paymentMethods = useMemo(() => {
    const methods = [];
    if (googlePayEnabled) {
      methods.push({ id: 'google_pay', label: 'Google Pay' });
    }
    if (applePayEnabled) {
      methods.push({ id: 'apple_pay', label: 'Apple Pay' });
    }
    if (stripeEnabled) {
      methods.push({ id: 'card', label: 'Stripe' });
    }
    // if (paypalEnabled && !isCompanyPlan) {
    //   methods.push({ id: 'paypal', label: 'PayPal' });
    // }
    return methods;
  }, [
    applePayEnabled,
    googlePayEnabled,
    isCompanyPlan,
    // paypalEnabled,
    stripeEnabled,
  ]);

  useEffect(() => {
    if (!paymentMethods.length) return;
    if (paymentMethods.some((method) => method.id === paymentMethod)) return;
    setPaymentMethod(paymentMethods[0].id);
  }, [paymentMethod, paymentMethods]);

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
    getCourseDetails(courseSlug).catch(() => { });
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

  const paymentIntentKey = isCompanyPlan
    ? `${course?.id || ''}:${selectedTierId}`
    : course?.id || '';

  const paymentErrorMessage = useMemo(
    () => getPaymentErrorMessage(paymentError),
    [paymentError],
  );

  const hasEnrollmentConflict = isEnrollmentConflictError(paymentErrorMessage);

  useEffect(() => {
    clearPaymentIntent();
    paymentIntentRequestRef.current = null;
    enrollmentToastShownRef.current = false;
  }, [course?.id, selectedPlan, selectedTierId, clearPaymentIntent]);

  useEffect(() => {
    if (!isAuthenticated || !course?.id) return undefined;
    if (isCompanyPlan && !selectedTierId) return undefined;
    if (hasEnrollmentConflict) return undefined;
    // if (paymentMethod === 'paypal') return undefined;
    if (!usesStripeIntent) return undefined;

    const hasIntentForSelection = isCompanyPlan
      ? paymentIntent?.courseId === course.id &&
      paymentIntent?.tierId === selectedTierId &&
      paymentIntent?.clientSecret
      : paymentIntent?.courseId === course.id && paymentIntent?.clientSecret;

    if (hasIntentForSelection) return undefined;
    if (paymentIntentRequestRef.current === paymentIntentKey) return undefined;

    paymentIntentRequestRef.current = paymentIntentKey;

    const request = isCompanyPlan
      ? createCompanyCoursePaymentIntent({
        courseId: course.id,
        tierId: selectedTierId,
      })
      : createCoursePaymentIntent({ courseId: course.id });

    request
      .catch(() => { })
      .finally(() => {
        if (paymentIntentRequestRef.current === paymentIntentKey) {
          paymentIntentRequestRef.current = null;
        }
      });

    return undefined;
  }, [
    isAuthenticated,
    course?.id,
    isCompanyPlan,
    selectedTierId,
    paymentIntentKey,
    createCoursePaymentIntent,
    createCompanyCoursePaymentIntent,
    paymentIntent?.courseId,
    paymentIntent?.clientSecret,
    paymentIntent?.tierId,
    hasEnrollmentConflict,
    paymentMethod,
    usesStripeIntent,
  ]);

  useEffect(() => {
    if (!paymentError) return;

    if (hasEnrollmentConflict) {
      if (enrollmentToastShownRef.current) return;
      enrollmentToastShownRef.current = true;
      toast.error(resolveEnrollmentConflictToast(paymentErrorMessage, t));
      return;
    }

    toast.error(
      paymentErrorMessage || t('paymentPages.section2.paymentError'),
    );
  }, [paymentError, paymentErrorMessage, hasEnrollmentConflict, t]);

  useEffect(() => {
    if (!paymentVerifyError) return;
    toast.error(
      typeof paymentVerifyError === 'string'
        ? paymentVerifyError
        : paymentVerifyError?.message || t('paymentPages.section2.paymentError'),
    );
  }, [paymentVerifyError, t]);

  const displayAmount = toEuroAmount(
    paymentIntent?.finalPrice ?? checkoutItem?.price ?? 0,
  );

  const formattedPrice = formatEuro(displayAmount);
  const clientSecret = paymentIntent?.clientSecret || '';
  const publishableKey = paymentIntent?.publishableKey || null;

  const handlePaymentSuccess = useCallback(
    async (stripePaymentIntent) => {
      const paymentIntentId =
        stripePaymentIntent?.id || paymentIntent?.paymentIntentId;

      if (!paymentIntentId) {
        toast.error(t('paymentPages.section2.paymentError'));
        return;
      }

      try {
        const result = isCompanyPlan
          ? await verifyCompanyCoursePaymentIntent(paymentIntentId)
          : await verifyCoursePaymentIntent(paymentIntentId);
        const verified = result?.data?.paid;

        if (!verified) {
          toast.error(
            result?.data?.message || t('paymentPages.section2.paymentError'),
          );
          return;
        }

        toast.success(t('paymentPages.section3.title'));

        if (isCompanyPlan) {
          navigate(ROUTES.COMPANY_ADMIN.PURCHASES);
          return;
        }

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
      isCompanyPlan,
      navigate,
      paymentIntent?.paymentIntentId,
      t,
      verifyCompanyCoursePaymentIntent,
      verifyCoursePaymentIntent,
    ],
  );

  const handlePayPalSuccess = useCallback(
    (result) => {
      const verified = result?.paid || result?.data?.paid;
      if (!verified) {
        toast.error(
          result?.message || result?.data?.message || t('paymentPages.section2.paymentError'),
        );
        return;
      }

      toast.success(t('paymentPages.section3.title'));
      navigate(
        courseSlug
          ? `/training/course/details?slug=${encodeURIComponent(courseSlug)}&purchased=true`
          : '/training/courses/catalog?purchased=true',
      );
    },
    [courseSlug, navigate, t],
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto w-full max-w-6xl">
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

        <div className="grid max-w-full gap-4 rounded-md bg-[#F1F9F6] p-3 sm:gap-8 sm:p-5 md:grid-cols-3">
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

            <div className="rounded-lg bg-white p-4 sm:p-6 shadow">
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

          <div className="rounded-lg bg-[#D4EBE2] p-4 sm:p-6">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              {t('paymentPages.section2.title')}
            </h3>

            <div className="mb-6">
              {paymentMethods.length > 0 ? (
                <CheckoutPaymentMethodPicker
                  methods={paymentMethods}
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                  networkLabel={t('paymentPages.section2.network')}
                  seeAllLabel={t('paymentPages.section2.seeAll')}
                />
              ) : null}
            </div>


            {isAuthenticated && paymentLoading && usesStripeIntent ? (
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
            ) : isCompanyPlan && !selectedTierId ? (
              <p className="text-sm text-gray-600">
                {t('trainingPages.section12.companyPackage.selectTierFirst')}
              </p>
            ) : hasEnrollmentConflict || clientSecret ? (
              <CheckoutStripeForm
                key={`${clientSecret || 'enrollment-conflict'}-${paymentMethod}`}
                clientSecret={clientSecret}
                publishableKey={publishableKey}
                amount={displayAmount}
                currency={platformStatus?.defaultCurrency || 'EUR'}
                verifying={paymentVerifying}
                selectedMethod={paymentMethod}
                onSuccess={handlePaymentSuccess}
                submitDisabled={hasEnrollmentConflict}
                submitDisabledTitle={
                  hasEnrollmentConflict
                    ? resolveEnrollmentConflictToast(paymentErrorMessage, t)
                    : ''
                }
                readOnly={hasEnrollmentConflict && !clientSecret}
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
