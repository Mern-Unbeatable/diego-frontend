import { Check, Lock, Play } from 'lucide-react';
import { MIN_WATCH_PERCENT } from '../../../../../../features/learning/trackingConstants';

const StatusIcon = ({ status, watchPercent = 0 }) => {
  if (status === 'done') {
    return (
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#55B18D] text-white sm:h-8 sm:w-8"
        title="Completata"
      >
        <Check size={12} strokeWidth={3.5} className="sm:h-3.5 sm:w-3.5" />
      </div>
    );
  }

  if (status === 'locked') {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 sm:h-8 sm:w-8">
        <Lock size={11} className="sm:h-3 sm:w-3" />
      </div>
    );
  }

  if (status === 'current') {
    return (
      <div
        className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#55B18D] bg-white text-[#55B18D] sm:h-8 sm:w-8"
        title={watchPercent > 0 ? `In corso ${watchPercent}%` : 'In corso'}
      >
        <Play size={11} className="ml-0.5 fill-[#55B18D] sm:h-3 sm:w-3" />
      </div>
    );
  }

  // Unplayed / not fully watched — stays as play (not check)
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#9e9e9e] text-white sm:h-8 sm:w-8"
      title={watchPercent > 0 && watchPercent < MIN_WATCH_PERCENT
        ? `Non completata (${watchPercent}%)`
        : 'Non vista'}
    >
      <Play size={11} className="ml-0.5 fill-white sm:h-3 sm:w-3" />
    </div>
  );
};

const CourseProgram = ({
  modules = [],
  progress = 0,
  onSelectModule,
  loading = false,
}) => {
  const safeProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  return (
    <aside className="min-w-0 w-full lg:sticky lg:top-6 lg:z-10 lg:max-h-[calc(100vh-6rem)] lg:self-start">
      <div className="flex max-h-[min(70vh,calc(100vh-6rem))] flex-col overflow-hidden rounded-xl border border-[#dceae4] bg-[#f2faf7] shadow-sm sm:rounded-2xl lg:max-h-[calc(100vh-6rem)]">
        <div className="shrink-0 space-y-3 border-b border-[#e8f0ec] bg-white px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-[#1d1d1d] sm:text-base">
              Programma del corso
            </h3>
            <span className="shrink-0 rounded-full bg-[#22423b] px-2.5 py-1 text-[11px] font-medium text-white sm:text-xs">
              {safeProgress}% avanzamento
            </span>
          </div>

          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-[#dceae4]"
            role="progressbar"
            aria-valuenow={safeProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Avanzamento corso"
          >
            <div
              className="h-full rounded-full bg-[#55B18D] transition-all duration-500"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
          <p className="text-[11px] leading-snug text-gray-500 sm:text-xs">
            La lezione resta non vista finché non guardi almeno il {MIN_WATCH_PERCENT}%
            (senza saltare avanti).
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {modules.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-gray-500">
              Nessun modulo disponibile.
            </p>
          ) : (
            <ul className="divide-y divide-[#e2ede8]">
              {modules.map((item) => {
                const isDone = item.status === 'done';
                const isCurrent = item.status === 'current';
                const isLocked = item.status === 'locked';
                const isQuiz = item.type === 'quiz';
                const isFinalQuiz = isQuiz && item.quizType === 'FINAL_TEST';
                const watchPercent = Math.min(
                  100,
                  Math.max(0, Number(item.watchPercent) || 0),
                );
                const isPartial =
                  !isDone
                  && !isQuiz
                  && watchPercent > 0
                  && watchPercent < MIN_WATCH_PERCENT;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      disabled={isLocked || loading}
                      onClick={() => onSelectModule?.(item.id)}
                      className={`flex w-full items-start gap-3 px-3.5 py-3 text-left transition-colors sm:items-center sm:gap-3.5 sm:px-5 sm:py-[15px] ${
                        isCurrent
                          ? 'border-l-[4px] border-l-[#55B18D] bg-[#e6f5ef] pl-[10px] sm:pl-[16px]'
                          : 'border-l-[4px] border-l-transparent hover:bg-[#e5f3ed]'
                      } ${isLocked ? 'cursor-not-allowed opacity-55' : 'cursor-pointer'}`}
                    >
                      <StatusIcon status={item.status} watchPercent={watchPercent} />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`text-sm leading-snug font-semibold sm:text-base ${
                              isCurrent ? 'text-[#1a5c45]' : 'text-[#1d1d1d]'
                            }`}
                          >
                            {item.title}
                          </span>

                          {isFinalQuiz ? (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber-800 uppercase">
                              Final Test
                            </span>
                          ) : isQuiz ? (
                            <span className="text-[10px] font-medium tracking-wide text-[#55B18D] uppercase sm:text-xs">
                              Quiz
                            </span>
                          ) : null}
                        </div>

                        {isPartial ? (
                          <div className="mt-1.5 max-w-[140px]">
                            <div className="h-1 overflow-hidden rounded-full bg-[#dceae4]">
                              <div
                                className="h-full rounded-full bg-[#55B18D]/70"
                                style={{ width: `${watchPercent}%` }}
                              />
                            </div>
                            <p className="mt-0.5 text-[10px] text-gray-500">
                              {watchPercent}% — non completata
                            </p>
                          </div>
                        ) : null}

                        {item.time && !isQuiz ? (
                          <p className="mt-0.5 text-xs text-gray-500 sm:hidden">
                            {item.time}
                          </p>
                        ) : null}
                      </div>

                      <div className="mt-0.5 shrink-0 text-right sm:mt-0">
                        {isQuiz && !isDone ? (
                          <span className="inline-flex rounded-full bg-[#55B18D] px-3 py-1 text-xs font-semibold text-white">
                            Start
                          </span>
                        ) : isDone ? (
                          <span className="hidden text-xs font-medium text-[#55B18D] sm:inline">
                            Completata
                          </span>
                        ) : item.time ? (
                          <span className="hidden text-sm font-medium text-[#5a5a5a] sm:inline">
                            {item.time}
                          </span>
                        ) : null}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default CourseProgram;
