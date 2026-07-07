import React from 'react';
import { Check, Play } from 'lucide-react';

const CourseProgram = ({ modules = [], progress = 0, onStartQuiz, onSelectModule }) => {
  return (
    <aside className="w-full">
      <div className="overflow-hidden rounded-2xl bg-[#f2faf7] shadow-sm">
        {/* Header: Corso */}
        <div className="px-6 py-5">
          <h3 className="text-xl font-bold text-[#1d1d1d]">Corso</h3>
        </div>

        {/* Subheader: Programma del corso */}
        <div className="flex items-center justify-between bg-[#22423b] px-6 py-4 text-white">
          <span className="text-[17px] font-semibold">Programma del corso</span>
          <span className="text-sm font-medium text-white/90">{progress}% avanzamento</span>
        </div>

        {/* Modules List */}
        <div className="divide-y divide-[#e2ede8]">
          {modules.map((item) => {
            const isDone = item.status === 'done';
            const isCurrent = item.status === 'current';
            const isQuiz = item.type === 'quiz';

            const handleClick = () => {
              if (isQuiz) {
                if (onStartQuiz) onStartQuiz();
              } else {
                if (onSelectModule) onSelectModule(item.id);
              }
            };

            return (
              <div
                key={item.id}
                onClick={handleClick}
                className={`flex items-center justify-between px-6 py-[18px] transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-l-[4px] border-l-[#55B18D] bg-[#e6f5ef] pl-[20px]'
                    : 'hover:bg-[#e5f3ed]'
                }`}
              >
                {/* Left Side: Icon & Title */}
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  {isDone ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#55B18D] text-white">
                      <Check size={12} strokeWidth={3.5} />
                    </div>
                  ) : isCurrent ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[2px] border-[#55B18D] text-[#55B18D]">
                      <Play size={10} className="fill-[#55B18D] ml-[1px]" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[2px] border-[#5a5a5a] text-[#5a5a5a]">
                      <Play size={10} className="fill-[#5a5a5a] ml-[1px]" />
                    </div>
                  )}

                  {/* Title */}
                  <span className="text-base font-semibold text-[#1d1d1d]">
                    {item.title}
                  </span>
                </div>

                {/* Right Side: Duration / Action */}
                <div className="text-sm font-medium text-[#5a5a5a]">
                  <span>{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default CourseProgram;
