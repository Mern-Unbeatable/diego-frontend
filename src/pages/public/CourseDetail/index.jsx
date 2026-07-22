import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PricingCardsModal from '../../../components/training/PricingCardsModal';
import CourseMedia from '../../../components/training/CourseMedia';
import { useCourse } from '../../../features/public/course/courseHooks';
import { mapCourseFromApi } from '../../../features/public/course/courseMappers';
import { formatEuro } from '../../../utils/courseMedia';

const CourseDetails = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getCourseDetails, selectedCourse, loading } = useCourse();
  const courseSlug = decodeURIComponent(
    (searchParams.get('slug') || searchParams.get('id') || '').trim(),
  );

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
  }, [selectedCourse, language, courseSlug, t]);

  const filledStars = Math.max(0, Math.min(5, Math.round(course?.rating ?? 0)));

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
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

          <div className="h-fit rounded-lg bg-green-50 p-6">
            <div className="mb-6 flex flex-col items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-800">
                {formatEuro(course?.basePrice)}
              </span>
              <span className="text-base font-semibold line-through text-[#73BFA1]">
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
