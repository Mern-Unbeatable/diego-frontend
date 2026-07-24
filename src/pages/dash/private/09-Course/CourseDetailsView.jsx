import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseProgram from '../10-profile/components/course/CourseProgram';
import QuizModal from './components/QuizModal';
import { Loading } from '../../../../components/ui';
import LessonContent from '../../../../components/course/LessonContent';
import { useCoursePlayer } from '../../../../features/learning/useCoursePlayer';

const CourseContentView = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [finishingScorm, setFinishingScorm] = useState(false);

  const {
    loading,
    error,
    playerData,
    activeLesson,
    activeModule,
    lessonLoading,
    scormSession,
    activeQuiz,
    quizLoading,
    submittingQuiz,
    selectModule,
    completeLesson,
    launchScorm,
    finishScorm,
    submitQuiz,
    closeQuiz,
  } = useCoursePlayer(courseId);

  const handleFinishScorm = async (sessionId, status) => {
    setFinishingScorm(true);
    try {
      await finishScorm(sessionId, status);
    } finally {
      setFinishingScorm(false);
    }
  };

  if (loading) {
    return <Loading size="md" className="min-h-60" />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-red-700">
        <p className="mb-4">{error}</p>
        <button
          type="button"
          onClick={() => navigate('/dashboard/private-user')}
          className="rounded-full bg-[#55B18D] px-5 py-2 text-sm font-semibold text-white"
        >
          Torna alla dashboard
        </button>
      </div>
    );
  }

  const course = playerData?.course;
  const modules = playerData?.modules ?? [];
  const progress = playerData?.progress ?? 0;
  const enrollmentCompleted = playerData?.enrollment?.status === 'COMPLETED';

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/dashboard/private-user')}
        className="mb-8 inline-flex cursor-pointer items-center text-gray-800 transition-colors hover:text-black"
        aria-label="Back"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
      </button>

      {enrollmentCompleted ? (
        <div className="mb-6 rounded-xl border border-[#cbe8dd] bg-[#f2faf7] px-4 py-3 text-sm text-[#22423b]">
          Corso completato. Puoi scaricare il certificato dalla sezione Attestati.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <LessonContent
          course={course}
          lesson={activeLesson}
          moduleItem={activeModule}
          scormSession={scormSession}
          lessonLoading={lessonLoading}
          onCompleteLesson={completeLesson}
          onLaunchScorm={launchScorm}
          onFinishScorm={handleFinishScorm}
          finishingScorm={finishingScorm}
        />

        <CourseProgram
          modules={modules}
          progress={progress}
          onSelectModule={selectModule}
          loading={quizLoading}
        />
      </div>

      <QuizModal
        isOpen={Boolean(activeQuiz)}
        onClose={closeQuiz}
        quiz={activeQuiz}
        submitting={submittingQuiz}
        onSubmit={submitQuiz}
      />
    </div>
  );
};

export default CourseContentView;
