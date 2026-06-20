import { IoIosStar } from 'react-icons/io';
import { IoStopwatchOutline } from 'react-icons/io5';
import { Button, Heading, Paragraph } from '../../../../components/ui';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, isDragging = false, onButtonClick }) => {
  const navigate = useNavigate();
  const handleButtonAction = (e, action) => {
    navigate('/training/course/details');

  };

  const renderStars = (rating) => {
    return [...Array(6)].map((_, index) => (
      <IoIosStar
        key={index}
        className={`h-4 w-4 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
      />
    ));
  };

  const renderPrice = () => {
    return (
      <div className="flex items-center gap-2">
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
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-800">
          {course.rating.toFixed(1)}
        </span>
        <div className="flex">{renderStars(course.rating)}</div>
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
          level={3}
          className="mb-2 line-clamp-1 text-lg font-semibold text-gray-800"
        >
          {course.title}
        </Heading>

        <Paragraph className="mb-4 line-clamp-3 text-sm text-gray-600">
          {course.description}
        </Paragraph>

        {/* Rating + Price */}
        <div className="mt-auto flex items-center justify-between">
          {renderRating()}
          {renderPrice()}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <Button
            label="Iscriviti ora"
            onClick={(e) => handleButtonAction(e, 'Iscriviti ora')}
            className="flex-1 rounded-full font-semibold"
            style={{ backgroundColor: '#3FC89E', color: '#fff' }}
          />
          <Button
            label="Dettagli"
            variant="outline"
            onClick={(e) => handleButtonAction(e, 'Dettagli')}
            className="flex-1 rounded-full border-gray-300 font-semibold text-gray-700 hover:border-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
