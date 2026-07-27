import { Check, Lock, Play } from 'lucide-react';

const CourseProgram = ({
  modules = [],
  progress = 0,
  onSelectModule,
  loading = false,
}) => {
  return (
    <aside className="w-full">
      <div className="overflow-hidden rounded-2xl bg-[#f2faf7] shadow-sm">
        <div className="px-6 py-5">
          <h3 className="text-xl font-bold text-[#1d1d1d]">Corso</h3>
        </div>

        <div className="flex items-center justify-between bg-[#22423b] px-6 py-4 text-white">
          <span className="text-[17px] font-semibold">Programma del corso</span>
          <span className="text-sm font-medium text-white/90">{progress}% avanzamento</span>
        </div>

        <div className="divide-y divide-[#e2ede8]">
          {modules.map((item) => {
            const isDone = item.status === 'done';
            const isCurrent = item.status === 'current';
            const isLocked = item.status === 'locked';
            const isQuiz = item.type === 'quiz';
            const isFinalQuiz = isQuiz && item.quizType === 'FINAL_TEST';

            return (
              <button
                key={item.id}
                type="button"
                disabled={isLocked || loading}
                onClick={() => onSelectModule?.(item.id)}
                className={`flex w-full items-center justify-between px-6 py-[18px] text-left transition-all ${
                  isCurrent
                    ? 'border-l-[4px] border-l-[#55B18D] bg-[#e6f5ef] pl-[20px]'
                    : 'hover:bg-[#e5f3ed]'
                } ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-4">
                  {isDone ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#55B18D] text-white">
                      <Check size={12} strokeWidth={3.5} />
                    </div>
                  ) : isLocked ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[2px] border-gray-400 text-gray-400">
                      <Lock size={10} />
                    </div>
                  ) : isCurrent ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[2px] border-[#55B18D] text-[#55B18D]">
                      <Play size={10} className="ml-[1px] fill-[#55B18D]" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[2px] border-[#5a5a5a] text-[#5a5a5a]">
                      <Play size={10} className="ml-[1px] fill-[#5a5a5a]" />
                    </div>
                  )}

                  <span className="text-base font-semibold text-[#1d1d1d]">
                    {item.title}
                    {isFinalQuiz ? (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold uppercase text-amber-800">
                        Final Test
                      </span>
                    ) : isQuiz ? (
                      <span className="ml-2 text-xs font-medium uppercase text-[#55B18D]">
                        Quiz
                      </span>
                    ) : null}
                  </span>
                </div>

                <div className="text-sm font-medium text-[#5a5a5a]">{item.time}</div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default CourseProgram;
