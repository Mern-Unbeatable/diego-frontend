import { IoStopwatchOutline } from 'react-icons/io5';
import { Button, Heading, Paragraph } from '../../../../components/ui';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CourseMedia from '../../../../components/training/CourseMedia';
import { formatEuro } from '../../../../utils/courseMedia';

const CourseCard = ({ course, isDragging = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleButtonAction = () => {
    if (!course.slug) return;
    navigate(`/training/course/details?slug=${course.slug}`);
  };

  const handleEnroll = () => {
    if (!course.slug) return;
    navigate(`/training/course/checkout?slug=${course.slug}&plan=single`);
  };

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-200 hover:shadow-lg ${
        isDragging ? 'opacity-70' : ''
      }`}
    >
      <div className="relative">
        <CourseMedia
          thumbnailUrl={course.thumbnailUrl}
          videoUrl={course.videoUrl}
          alt={course.title}
          className="h-48 w-full object-cover"
          showVideoControls={false}
        />

        {course.duration ? (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1 text-sm shadow-sm backdrop-blur-sm">
            <IoStopwatchOutline className="h-4 w-4 text-gray-700" />
            <span className="font-medium text-gray-700">{course.duration}</span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col p-4 md:p-5">
        <Heading
          level={5}
          className="mb-2 line-clamp-1 text-lg font-semibold text-gray-800"
        >
          {course.title}
        </Heading>

        <Paragraph className="mb-4 line-clamp-3 text-sm text-gray-600">
          {course.description}
        </Paragraph>

        <div className="mt-2 text-start">
          <div className="grid auto-cols-max grid-flow-col items-center gap-2 sm:justify-self-end">
            {Number(course.oldPrice) > Number(course.price) ? (
              <span className="text-sm text-gray-400 line-through">
                {formatEuro(course.oldPrice)}
              </span>
            ) : null}
            <span className="text-xl font-bold text-[#3FC89E]">
              {formatEuro(course.price)}
            </span>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button
            label={t('homeView.section4.enrollNow')}
            onClick={handleEnroll}
            className="flex-1 rounded-full bg-[#3FC89E] px-3 py-3 font-semibold text-white hover:bg-[#35b88f]"
          />

          <Button
            label={t('homeView.section4.details')}
            variant="outline"
            onClick={handleButtonAction}
            className="flex-1 rounded-full border border-gray-300 px-3 py-3 font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
