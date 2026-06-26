import { IoIosStar } from 'react-icons/io';
import { IoStopwatchOutline } from 'react-icons/io5';
import { Button, Heading, Paragraph } from '../../../../components/ui';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CourseCard = ({ course, isDragging = false, onButtonClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleButtonAction = (e, action) => {
    navigate('/training/course/details');

  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <IoIosStar
        key={index}
        className={`h-4 w-4 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
      />
    ));
  };

  const renderPrice = () => {
    return (
      <div className="grid grid-flow-col auto-cols-max items-center gap-2 sm:justify-self-end">
        {course.oldPrice && (
          <span className="text-sm text-gray-400 line-through">
            €{course.oldPrice.toFixed(2)}
          </span>
        )}
        <span className="text-xl font-bold text-[#3FC89E]">
          €{course.price.toFixed(2)}
        </span>
      </div>
    );
  };

  const renderRating = () => {
    return (
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-2">
        <span className="text-lg font-bold text-gray-800">
          {course.rating.toFixed(1)}
        </span>
        <div className="grid grid-flow-col auto-cols-max">{renderStars(course.rating)}</div>
        <span className="text-sm text-gray-500">
          ({course.reviews.toLocaleString()})
        </span>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-200 hover:shadow-lg ${isDragging ? 'opacity-70' : ''
        }`}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="h-48 w-full object-cover"
          draggable={false}
        />

        {course.duration && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1 text-sm shadow-sm backdrop-blur-sm">
            <IoStopwatchOutline className="h-4 w-4 text-gray-700" />
            <span className="font-medium text-gray-700">{course.duration}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5">
        <Heading
          level={5}
          className="mb-2 line-clamp-1 text-lg font-semibold text-gray-800"
        >
          {course.title}
        </Heading>

        <Paragraph className="mb-4 line-clamp-3 text-sm text-gray-600">
          {course.description}
        </Paragraph>

        {/* Rating + Price */}
        <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-center">
          {renderRating()}
          {renderPrice()}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap justify-between gap-3">
          <Button
            label={t('homeView.courseCard.enrollNow')}
            onClick={(e) => handleButtonAction(e, t('homeView.courseCard.enrollNow'))}
            className="w-full rounded-full font-semibold"
            style={{ backgroundColor: '#3FC89E', color: '#fff' }}
          />
          <Button
            label={t('homeView.courseCard.details')}
            variant="outline"
            onClick={(e) => handleButtonAction(e, t('homeView.courseCard.details'))}
            className="w-full rounded-full border-gray-300 font-semibold text-gray-700 hover:border-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
