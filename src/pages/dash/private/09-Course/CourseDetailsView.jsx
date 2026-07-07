import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CourseMain from '../10-profile/components/course/CourseMain';
import CourseProgram from '../10-profile/components/course/CourseProgram';
import QuizModal from './components/QuizModal';

const quizQuestions = [
  {
    id: 1,
    text: 'What is 2 + 2?',
    options: ['1', '3', '4', '5'],
    answer: '4',
  },
  {
    id: 2,
    text: 'Which color is the sky on a clear day?',
    options: ['Blue', 'Red', 'Yellow', 'Pink'],
    answer: 'Blue',
  },
  {
    id: 3,
    text: 'How many days are in one week?',
    options: ['5', '6', '7', '8'],
    answer: '7',
  },
  {
    id: 4,
    text: 'Which is a safety device?',
    options: ['Helmet', 'Notebook', 'Spoon', 'Pillow'],
    answer: 'Helmet',
  },
  {
    id: 5,
    text: 'Fire extinguisher is used to?',
    options: ['Cook', 'Wash', 'Put out fires', 'Open doors'],
    answer: 'Put out fires',
  },
  {
    id: 6,
    text: 'PPE means?',
    options: [
      'Personal Protective Equipment',
      'Public Policy Element',
      'Private Program Entry',
      'Power Plant Energy',
    ],
    answer: 'Personal Protective Equipment',
  },
  {
    id: 7,
    text: 'Emergency number in most EU countries is?',
    options: ['111', '112', '118', '120'],
    answer: '112',
  },
  {
    id: 8,
    text: 'A wet floor sign helps to?',
    options: ['Decorate room', 'Prevent slips', 'Increase heat', 'Block exits'],
    answer: 'Prevent slips',
  },
  {
    id: 9,
    text: 'Before using equipment, you should?',
    options: [
      'Ignore instructions',
      'Read instructions',
      'Run quickly',
      'Switch off lights',
    ],
    answer: 'Read instructions',
  },
  {
    id: 10,
    text: 'Best action if you see a hazard?',
    options: ['Do nothing', 'Report it', 'Hide it', 'Wait one week'],
    answer: 'Report it',
  },
];

const CourseContentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Modules stored in React State to make them interactive
  const [modules, setModules] = useState([
    { id: 1, title: 'Class-1', time: '3 minuti', status: 'done' },
    { id: 2, title: 'Class-2', time: '10 minuti', status: 'done' },
    { id: 3, title: 'Class-3', time: '20 minuti', status: 'current' },
    { id: 4, title: 'Class-4', time: '30 minuti', status: 'upcoming' },
    { id: 5, title: 'Class-5', time: '30 minuti', status: 'upcoming' },
    {
      id: 6,
      title: 'Quiz-1',
      time: 'Start',
      status: 'upcoming',
      type: 'quiz',
    },
    { id: 7, title: 'Class-7', time: '31 minuti', status: 'upcoming' },
    { id: 8, title: 'Class-8', time: '28:59 minuti', status: 'upcoming' },
  ]);

  // Handle selection of a class module
  const selectModule = (moduleId) => {
    setModules((prevModules) => {
      const targetIndex = prevModules.findIndex((m) => m.id === moduleId);
      if (targetIndex === -1) return prevModules;

      return prevModules.map((m, idx) => {
        if (m.type === 'quiz') return m;
        
        if (idx < targetIndex) {
          return { ...m, status: 'done' };
        } else if (idx === targetIndex) {
          return { ...m, status: 'current' };
        } else {
          return { ...m, status: 'upcoming' };
        }
      });
    });
  };

  // Dynamically calculate progress based on completed classes
  const progress = useMemo(() => {
    const nonQuizModules = modules.filter((m) => m.type !== 'quiz');
    const doneCount = nonQuizModules.filter((m) => m.status === 'done').length;
    return Math.round((doneCount / nonQuizModules.length) * 100);
  }, [modules]);

  // TODO: fetch course details by id (use API or redux)
  const course = {
    id,
    title: 'Formazione SEVESO',
    video: '/image/mandatory_courses/image1.jpg',
    description:
      "Il D. lgs. 105/2015 art. 14 all'Appendice I dell'Allegato B, precisa al gestore come ottemperare in maniera organica e programmata agli obblighi di informazione, formazione, addestramento ed equipaggiamento ai fini della sicurezza, degli addetti e di coloro che accedono agli stabilimenti, tenendo conto delle dispositions dettate in materia per la tutela della salute e della sicurezza dei lavoratori sul luogo di lavoro.",
  };

  const openQuiz = () => {
    setIsQuizOpen(true);
  };

  return (
    <div className="">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center text-gray-800 hover:text-black transition-colors cursor-pointer"
        aria-label="Back"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CourseMain course={course} />

        <CourseProgram
          modules={modules}
          progress={progress}
          onStartQuiz={openQuiz}
          onSelectModule={selectModule}
        />
      </div>

      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        quizQuestions={quizQuestions} 
      />
    </div>
  );
};

export default CourseContentView;
