import React from 'react';
import { FaCheckCircle, FaPlayCircle, FaRegCircle } from 'react-icons/fa';
import { Heading } from '../../../../../components/ui';

const CourseProgram = ({ modules = [], progress = 0, onStartQuiz }) => {
  return (
    <aside>
      <div className="p-0">
        <div className="overflow-hidden rounded-t-xl">
          <div className="bg-[#F1FBF7] p-4">
            <Heading level={5} className="text-base">
              Corso
            </Heading>
          </div>
          <div className="flex items-center justify-between bg-[#17342e] px-4 py-3 text-white">
            <div className="font-medium">Programma del corso</div>
            <div className="text-sm">{progress}% avanzamento</div>
          </div>
        </div>

        <div className="bg-green-50 p-4">
          <ul className="space-y-3">
            {modules.map((item) => (
              <li
                key={item.id}
                className={`flex items-center justify-between rounded-md p-4 ${item.status === 'current'
                    ? 'border-l-4 border-l-[#73BFA1] bg-[#eef9f4]'
                    : ''
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div>
                    {item.status === 'done' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F8F3] text-[#0b6c50]">
                        <FaCheckCircle />
                      </div>
                    )}

                    {item.status === 'current' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DFF5EA] bg-white text-[#73BFA1]">
                        <FaPlayCircle />
                      </div>
                    )}

                    {item.status === 'upcoming' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400">
                        <FaRegCircle />
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-[#252525]">{item.title}</div>
                </div>

                {item.type === 'quiz' ? (
                  <button
                    type="button"
                    onClick={() => onStartQuiz && onStartQuiz(item)}
                    className="rounded-full bg-[#73BFA1] px-3 py-1 text-xs font-semibold text-white hover:bg-[#5fa488]"
                  >
                    Start
                  </button>
                ) : (
                  <div className="text-sm text-gray-500">{item.time}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default CourseProgram;
