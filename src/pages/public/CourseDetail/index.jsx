import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PricingCardsModal from '../../../components/training/PricingCardsModal';
import CourseMedia from '../../../components/training/CourseMedia';
import { ROUTES } from '../../../config/routes';
import { ROLES } from '../../../config/roles';
import { getUserRole } from '../../../utils/auth/authUtils';
import { getCompanyPurchasesService } from '../../../features/company/companyPurchaseService';
import { useCourse } from '../../../features/public/course/courseHooks';
import {
  getLocalizedValue,
  mapCourseFromApi,
} from '../../../features/public/course/courseMappers';
import { usePrivate } from '../../../features/private/privateHooks';
import { formatEuro } from '../../../utils/courseMedia';

const getEnrollmentCourseId = (enrollment) =>
  String(enrollment?.courseId ?? enrollment?.course?.id ?? '').trim();

const getEnrollmentCourseSlug = (enrollment) =>
  String(enrollment?.slug ?? enrollment?.course?.slug ?? '').trim();

const hasMatchingEnrollment = (enrollment, courseId, courseSlug) => {
  if (!enrollment) return false;

  const enrollmentCourseId = getEnrollmentCourseId(enrollment);
  const enrollmentCourseSlug = getEnrollmentCourseSlug(enrollment);

  if (courseId && enrollmentCourseId && enrollmentCourseId === courseId) {
    return true;
  }

  if (courseSlug && enrollmentCourseSlug && enrollmentCourseSlug === courseSlug) {
    return true;
  }

  return false;
};

const hasCompanyPurchaseForCourse = (purchases = [], courseId, courseSlug) =>
  purchases.some((purchase) => {
    const purchaseCourseId = String(purchase?.course?.id || purchase?.courseId || '').trim();
    const purchaseCourseSlug = String(purchase?.course?.slug || '').trim();

    return (
      (courseId && purchaseCourseId === courseId) ||
      (courseSlug && purchaseCourseSlug === courseSlug)
    );
  });

const resolveLearnerCoursePath = (role, courseId) => {
  if (!courseId) return null;

  if (role === ROLES.COMPANY_EMPLOYEE) {
    return `${ROUTES.COMPANY_EMPLOYEE.COURSE}/${courseId}`;
  }

  return `${ROUTES.PRIVATE_USER.COURSE}/${courseId}`;
};

const CourseDetails = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResolvingEnrollment, setIsResolvingEnrollment] = useState(false);
  const hasLoadedEnrollmentsRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userRole = getUserRole(user);
  const { enrollments, enrollmentsLoading, fetchMyEnrollments } = usePrivate();
  const { getCourseDetails, selectedCourse, loading } = useCourse();
  const courseIdentifier = decodeURIComponent(
    (searchParams.get('slug') || searchParams.get('id') || '').trim(),
  );

  useEffect(() => {
    if (!courseIdentifier) return;
    getCourseDetails(courseIdentifier).catch(() => {});
  }, [getCourseDetails, courseIdentifier]);

  const language = (i18n.language || 'en').split('-')[0];

  const course = useMemo(() => {
    const courseSource =
      selectedCourse?.course ||
      selectedCourse?.data?.course ||
      selectedCourse ||
      null;

    const mapped = mapCourseFromApi(courseSource, {
      language,
      t,
      courseSlug: searchParams.get('slug') || courseSource?.slug,
    });

    if (!mapped || !courseSource) return mapped;

    const legacyObjectives = [
      getLocalizedValue(courseSource.methodology, language),
      getLocalizedValue(courseSource.courseLocation, language),
      getLocalizedValue(courseSource.selectType, language),
    ].filter(Boolean);

    const singleUserFeatures = [
      ...new Set([...(mapped.singleUserFeatures || []), ...legacyObjectives]),
    ];

    return {
      ...mapped,
      singleUserFeatures,
    };
  }, [selectedCourse, language, t, searchParams]);

  const filledStars = Math.max(0, Math.min(5, Math.round(course?.rating ?? 0)));

  useEffect(() => {
    if (!isAuthenticated) {
      hasLoadedEnrollmentsRef.current = false;
      return;
    }

    if (hasLoadedEnrollmentsRef.current || enrollmentsLoading) return;

    hasLoadedEnrollmentsRef.current = true;

    fetchMyEnrollments().catch(() => {});
  }, [
    enrollmentsLoading,
    fetchMyEnrollments,
    isAuthenticated,
  ]);

  const resolvedCourseId = String(course?.id || courseIdentifier || '').trim();
  const resolvedCourseSlug = String(course?.slug || courseIdentifier || '').trim();

  const purchasedEnrollment = useMemo(
    () =>
      enrollments.find((enrollment) =>
        hasMatchingEnrollment(enrollment, resolvedCourseId, resolvedCourseSlug),
      ) || null,
    [enrollments, resolvedCourseId, resolvedCourseSlug],
  );

  const handleEnrollNow = async () => {
    const loginRedirect = `${location.pathname}${location.search}`;

    if (!isAuthenticated) {
      navigate(`/auth/login?redirect=${encodeURIComponent(loginRedirect)}`);
      return;
    }

    setIsResolvingEnrollment(true);

    try {
      if (userRole === ROLES.COMPANY_ADMIN) {
        const purchases = await getCompanyPurchasesService().catch(() => []);
        const hasCompanyPurchase = hasCompanyPurchaseForCourse(
          purchases,
          resolvedCourseId,
          resolvedCourseSlug,
        );

        if (hasCompanyPurchase) {
          navigate(ROUTES.COMPANY_ADMIN.PURCHASES);
          return;
        }

        setIsModalOpen(true);
        return;
      }

      let currentEnrollments = enrollments;

      if (!currentEnrollments.length) {
        const response = await fetchMyEnrollments().catch(() => null);
        currentEnrollments = Array.isArray(response?.enrollments)
          ? response.enrollments
          : Array.isArray(response?.data?.enrollments)
            ? response.data.enrollments
            : Array.isArray(response?.data?.data?.enrollments)
              ? response.data.data.enrollments
              : [];
      }

      const isPurchased =
        purchasedEnrollment ||
        currentEnrollments.some((enrollment) =>
          hasMatchingEnrollment(enrollment, resolvedCourseId, resolvedCourseSlug),
        );

      if (isPurchased) {
        const learnerPath = resolveLearnerCoursePath(
          userRole,
          resolvedCourseId || course?.id,
        );

        if (learnerPath) {
          navigate(learnerPath);
        }

        return;
      }

      setIsModalOpen(true);
    } finally {
      setIsResolvingEnrollment(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto container px-4 md:px-6 py-14">
        {loading ? (
          <p className="mb-6 text-sm text-gray-500">
            {t('trainingPages.section7.loadingCourses')}
          </p>
        ) : null}
        {!loading && !course ? (
          <p className="mb-6 text-sm text-gray-500">
            {t('trainingPages.section7.courseNotFound')}
          </p>
        ) : null}
        <div className="mb-8 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/training/courses/catalog')}
            className="flex items-center gap-2 font-semibold text-green-600 hover:text-green-700"
          >
            <ChevronLeft className="h-5 w-5 text-green-600" />
            {t('trainingPages.section11.backToCatalog')}
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-6 aspect-video overflow-hidden rounded-lg bg-gray-200">
              <CourseMedia
                thumbnailUrl={course?.thumbnailUrl}
                videoUrl={course?.videoUrl}
                alt={course?.courseTitle}
                showVideoControls
              />
            </div>

            <p className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-[#73BFA1]">
              {course?.category}
            </p>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < filledStars
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {course?.rating}/5 (
                {new Intl.NumberFormat(i18n.language || 'en').format(
                  course?.reviews ?? 0,
                )}
                )
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              {course?.courseTitle}
            </h1>
            <p className="mb-8 leading-relaxed text-gray-700">
              {course?.description}
            </p>

            {(course?.singleUserFeatures ?? []).length > 0 ? (
              <div>
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  {t('trainingPages.section11.objectivesTitle')}
                </h2>
                <div className="space-y-3">
                  {course.singleUserFeatures.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="sticky top-26 h-fit self-start rounded-lg bg-green-50 p-6">
            <div className="mb-6 flex flex-col items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-800">
                {formatEuro(course?.price)}
              </span>
              <span className="text-sm md:text-base font-semibold line-through text-[#73BFA1]">
              {formatEuro(course?.basePrice)}

              </span>
              <span className="text-sm text-gray-600">
                {t('trainingPages.section11.specialPrice')}
              </span>
            </div>

            <div className="mb-6 space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#73BFA1]" />
                <span>
                  {t('trainingPages.section8.headers.duration')}:{' '}
                  {course?.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#73BFA1]" />
                <span>
                  {t('trainingPages.section11.code')} {course?.code}
                </span>
              </div>
            </div>

            <button
              onClick={handleEnrollNow}
              disabled={isResolvingEnrollment}
              className="mb-6 w-full rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition hover:bg-[#73BFA1] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {t('trainingPages.section11.enrollNow')}
            </button>
          </div>
        </div>
      </div>

      <PricingCardsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseSlug={course?.slug}
        pricing={course?.pricing}
      />
    </div>
  );
};

export default CourseDetails;
