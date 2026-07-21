import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PricingCardsModal from '../../../components/training/PricingCardsModal';
import { useCourse } from '../../../features/public/course/courseHooks';
import { ENV_CONFIG } from '../../../config/env.config';

const FALLBACK_COURSE_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%23E5E7EB'/%3E%3Ctext x='50%25' y='50%25' fill='%236B7280' font-size='36' font-family='Arial, sans-serif' text-anchor='middle' dominant-baseline='middle'%3ECourse image unavailable%3C/text%3E%3C/svg%3E";

const formatEuro = (value) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value) || 0);

const API_ORIGIN = (() => {
  try {
    return new URL(ENV_CONFIG.API_BASE_URL).origin;
  } catch {
    return '';
  }
})();

const resolveImageUrl = (url) => {
  let resolvedUrl = url || FALLBACK_COURSE_IMAGE;

  if (!url) {
    if (import.meta.env.DEV) {
      console.log('[CourseDetails:image-debug]', {
        apiBaseUrl: ENV_CONFIG.API_BASE_URL,
        apiOrigin: API_ORIGIN,
        rawThumbnailUrl: url,
        resolvedImageUrl: resolvedUrl,
      });
    }
    return resolvedUrl;
  }

  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url);
      const isLocalhostSource =
        parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
      const isFrontendLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1');

      if (API_ORIGIN && isLocalhostSource && !isFrontendLocalhost) {
        resolvedUrl = `${API_ORIGIN}${parsed.pathname}${parsed.search}`;
      } else {
        resolvedUrl = url;
      }
    } catch {
      resolvedUrl = url;
    }
  } else if (API_ORIGIN) {
    resolvedUrl = `${API_ORIGIN}/${String(url).replace(/^\/+/, '')}`;
  } else {
    resolvedUrl = url;
  }

  if (import.meta.env.DEV) {
    console.log('[CourseDetails:image-debug]', {
      apiBaseUrl: ENV_CONFIG.API_BASE_URL,
      apiOrigin: API_ORIGIN,
      rawThumbnailUrl: url,
      resolvedImageUrl: resolvedUrl,
    });
  }

  return resolvedUrl;
};

const CourseDetails = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getCourseDetails, selectedCourse, loading } = useCourse();
  const selectedCourseId = decodeURIComponent(
    (searchParams.get('id') || '').trim(),
  );

  useEffect(() => {
    if (!selectedCourseId) return;
    getCourseDetails(selectedCourseId).catch(() => {});
  }, [getCourseDetails, selectedCourseId]);

  const language = (i18n.language || 'en').split('-')[0];
  const getLocalizedValue = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return value || '';
    }
    return value[language] || value.en || Object.values(value)[0] || '';
  };

  const course = useMemo(() => {
    const courseSource =
      selectedCourse?.course ||
      selectedCourse?.data?.course ||
      selectedCourse ||
      null;

    if (!courseSource) return null;

    const objectives = [
      getLocalizedValue(courseSource.methodology),
      getLocalizedValue(courseSource.courseLocation),
      getLocalizedValue(courseSource.selectType),
    ].filter(Boolean);

    return {
      id: courseSource.id,
      courseTitle: courseSource.courseTitle || '-',
      description: courseSource.description || '-',
      category: courseSource.format || getLocalizedValue(courseSource.type),
      rating: courseSource.averageRating || 0,
      reviews: courseSource.totalReviews || courseSource?._count?.reviews || 0,
      objectives,
      basePrice: courseSource.basePrice ?? 0,
      price: courseSource.price ?? 0,
      thumbnailUrl: courseSource.thumbnailUrl || '',
      duration: courseSource.durationMinutes
        ? `${courseSource.durationMinutes} min`
        : '-',
      code: courseSource.trainingPlanId || courseSource.slug || courseSource.id,
      image: resolveImageUrl(courseSource.thumbnailUrl),
    };
  }, [selectedCourse, language]);

  const filledStars = Math.max(0, Math.min(5, Math.round(course?.rating ?? 0)));

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {loading ? <p className="mb-6 text-sm text-gray-500">Loading...</p> : null}
        {!loading && !course ? (
          <p className="mb-6 text-sm text-gray-500">Course data not found.</p>
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
          {/* Left Content */}
          <div className="md:col-span-2">
            {/* Course Image */}
            <div className="mb-6 aspect-video overflow-hidden rounded-lg bg-gray-200">
              <img
                src={course?.image}
                alt={course?.courseTitle}
                className="h-full w-full object-cover"
                onError={(event) => {
                  const failedSrc =
                    event.currentTarget.currentSrc || event.currentTarget.src;
                  if (failedSrc === FALLBACK_COURSE_IMAGE) return;
                  console.warn(
                    '[CourseDetails] Thumbnail failed, using fallback image.',
                    {
                      failedSrc,
                      rawThumbnailUrl: course?.thumbnailUrl,
                      resolvedImageUrl: course?.image,
                    },
                  );
                  event.currentTarget.src = FALLBACK_COURSE_IMAGE;
                }}
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
                    className={`h-5 w-5 ${
                      i < filledStars
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

            {/* Course Title and Description */}
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              {course?.courseTitle}
            </h1>
            <p className="mb-8 leading-relaxed text-gray-700">
              {course?.description}
            </p>

         

            

            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                {t('trainingPages.section11.objectivesTitle')}
              </h2>
              <div className="space-y-3">
                {(course?.objectives ?? []).map((objective) => (
                  <div key={objective} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Pricing Card */}
          <div className="h-fit rounded-lg bg-green-50 p-6">
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-800">
                {formatEuro(course?.basePrice)}
              </span>
              <span className="text-xl font-bold text-[#73BFA1]">
                {formatEuro(course?.price)}
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
              onClick={() => setIsModalOpen(true)}
              className="mb-6 w-full rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition hover:bg-[#73BFA1]"
            >
              {t('trainingPages.section11.enrollNow')}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <PricingCardsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={course?.id}
      />
    </div>
  );
};

export default CourseDetails;
