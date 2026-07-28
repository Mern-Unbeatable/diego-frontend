import { ArrowLeft, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseProgram from '../10-profile/components/course/CourseProgram';
import QuizModal from './components/QuizModal';
import { Loading } from '../../../../components/ui';
import LessonContent from '../../../../components/course/LessonContent';
import LessonNavigation from '../../../../components/course/LessonNavigation';
import { useCoursePlayer } from '../../../../features/learning/useCoursePlayer';
import { getMyCertificatesService, ensureCourseCertificateService } from '../../../../features/learning/learningService';
import { useDashboardPaths } from '../../../../hooks/useDashboardPaths';

const CourseContentView = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const paths = useDashboardPaths();
  const [courseCertificate, setCourseCertificate] = useState(null);

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
    trackVideoProgress,
    logAntiCheat,
    pollScormProgress,
    handleScormComplete,
    launchScorm,
    submitQuiz,
    closeQuiz,
    navigation,
    goToPreviousModule,
    goToNextModule,
  } = useCoursePlayer(courseId);

  const enrollmentCompleted = playerData?.enrollment?.status === 'COMPLETED';

  useEffect(() => {
    if (playerData?.certificate?.pdfUrl) {
      setCourseCertificate(playerData.certificate);
    }
  }, [playerData?.certificate]);

  useEffect(() => {
    if (!enrollmentCompleted || !courseId) {
      if (!playerData?.certificate?.pdfUrl) {
        setCourseCertificate(null);
      }
      return;
    }

    if (playerData?.certificate?.pdfUrl) {
      setCourseCertificate(playerData.certificate);
      return;
    }

    let cancelled = false;

    const loadCertificate = async () => {
      try {
        const ensured = await ensureCourseCertificateService(courseId);
        const certificate = ensured?.data?.certificate ?? null;
        if (!cancelled && certificate?.pdfUrl) {
          setCourseCertificate(certificate);
          return;
        }

        const response = await getMyCertificatesService({ courseId, limit: 1 });
        const certificates = response?.data?.certificates ?? [];
        if (!cancelled) {
          setCourseCertificate(certificates[0] ?? null);
        }
      } catch {
        if (!cancelled) setCourseCertificate(null);
      }
    };

    loadCertificate();

    return () => {
      cancelled = true;
    };
  }, [courseId, enrollmentCompleted, playerData?.certificate?.pdfUrl]);

  const handleCloseQuiz = () => {
    closeQuiz();
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
          onClick={() => navigate(paths.dashboard)}
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
  const allLessonsDone = progress >= 100;
  const pendingFinalQuiz = allLessonsDone && !enrollmentCompleted;
  const finalQuizModule = modules.find(
    (module) => module.type === 'quiz' && module.quizType === 'FINAL_TEST',
  );

  const handleDownloadCertificate = async () => {
    if (courseCertificate?.pdfUrl) {
      window.open(courseCertificate.pdfUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      const response = await ensureCourseCertificateService(courseId);
      const certificate = response?.data?.certificate ?? null;
      if (certificate?.pdfUrl) {
        setCourseCertificate(certificate);
        window.open(certificate.pdfUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch {
      // fall through to certificates page
    }

    navigate(paths.certificates);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(paths.dashboard)}
        className="mb-8 inline-flex cursor-pointer items-center text-gray-800 transition-colors hover:text-black"
        aria-label="Back"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
      </button>

      {enrollmentCompleted ? (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[#cbe8dd] bg-[#f2faf7] px-4 py-4 text-sm text-[#22423b] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Corso completato</p>
            <p className="mt-1">
              {courseCertificate?.pdfUrl
                ? 'Il tuo attestato è pronto. Puoi scaricarlo subito (disponibile per 30 giorni).'
                : 'Attestato in elaborazione. Se non compare subito, usa il pulsante per rigenerarlo.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadCertificate}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#55B18D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#439678]"
          >
            <Download size={16} />
            {courseCertificate?.pdfUrl ? 'Scarica attestato' : 'Genera attestato'}
          </button>
        </div>
      ) : null}

      {pendingFinalQuiz ? (
        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Tutte le lezioni sono complete. Supera il <strong>Final Test</strong> con almeno
            70% per generare l&apos;attestato.
          </p>
          {finalQuizModule ? (
            <button
              type="button"
              onClick={() => selectModule(finalQuizModule.id)}
              disabled={finalQuizModule.status === 'locked' || quizLoading}
              className="shrink-0 rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Avvia Final Test
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <LessonContent
            course={course}
            lesson={activeLesson}
            moduleItem={activeModule}
            enrollmentId={playerData?.enrollment?.id}
            scormSession={scormSession}
            lessonLoading={lessonLoading}
            onTrackVideoProgress={trackVideoProgress}
            onLaunchScorm={launchScorm}
            onScormComplete={handleScormComplete}
            onPollScormProgress={pollScormProgress}
            onLogAntiCheat={logAntiCheat}
          />

          {!activeQuiz ? (
            <LessonNavigation
              previousTitle={navigation.previous?.title}
              nextTitle={navigation.next?.title}
              hasPrevious={navigation.hasPrevious}
              hasNext={navigation.hasNext}
              onPrevious={goToPreviousModule}
              onNext={goToNextModule}
              loading={lessonLoading || quizLoading}
            />
          ) : null}
        </div>

        <CourseProgram
          modules={modules}
          progress={progress}
          onSelectModule={selectModule}
          loading={quizLoading}
        />
      </div>

      <QuizModal
        isOpen={Boolean(activeQuiz)}
        onClose={handleCloseQuiz}
        quiz={activeQuiz}
        submitting={submittingQuiz}
        onSubmit={submitQuiz}
      />
    </div>
  );
};

export default CourseContentView;
