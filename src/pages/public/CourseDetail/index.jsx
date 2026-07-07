import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Star } from 'lucide-react';
import PricingCardsModal from '../../../components/training/PricingCardsModal';
import courses from '../../../data/trainingCourses.json';

const CourseDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCourseId = Number(searchParams.get('id')) || courses[0]?.id;

  const selectedCourse = useMemo(
    () =>
      courses.find((course) => course.id === selectedCourseId) ?? courses[0],
    [selectedCourseId]
  );

  const filledStars = Math.round(selectedCourse?.rating ?? 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/training/courses/catalog')}
            className="flex items-center gap-2 font-semibold text-green-600 hover:text-green-700"
          >
            <ChevronLeft className="h-5 w-5 text-green-600" />
            Torna al catalogo
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Content */}
          <div className="md:col-span-2">
            {/* Course Image */}
            <div className="mb-6 aspect-video overflow-hidden rounded-lg bg-gray-200">
              <img
                src={selectedCourse?.image}
                alt={selectedCourse?.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Category Badge */}
            <p className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-[#73BFA1]">
              {selectedCourse?.category}
            </p>

            {/* Rating */}
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
                {selectedCourse?.rating}/5 Stelle (
                {new Intl.NumberFormat('en-US').format(
                  selectedCourse?.reviews ?? 0
                )}
                )
              </span>
            </div>

            {/* Course Title and Description */}
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              {selectedCourse?.title}
            </h1>
            <p className="mb-8 leading-relaxed text-gray-700">
              {selectedCourse?.description}
            </p>

            {/* Objectives Section */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Obiettivi
              </h2>
              <div className="space-y-3">
                {(selectedCourse?.objectives ?? []).map((objective) => (
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
                {selectedCourse?.oldPrice}
              </span>
              <span className="text-xl font-bold text-[#73BFA1]">
                {selectedCourse?.price}
              </span>
              <span className="text-sm text-gray-600">Prezzo speciale</span>
            </div>

            <div className="mb-6 space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#73BFA1]" />
                <span>Durata {selectedCourse?.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#73BFA1]" />
                <span>Codice: {selectedCourse?.code}</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mb-6 w-full rounded-full bg-[#73BFA1] py-3 font-semibold text-white transition hover:bg-[#73BFA1]"
            >
              Iscriviti ora
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <PricingCardsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={selectedCourse?.id}
      />
    </div>
  );
};

export default CourseDetails;
