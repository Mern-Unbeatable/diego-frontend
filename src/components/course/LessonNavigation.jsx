import { ChevronLeft, ChevronRight } from 'lucide-react';

const LessonNavigation = ({
  previousTitle,
  nextTitle,
  hasPrevious = false,
  hasNext = false,
  onPrevious,
  onNext,
  loading = false,
}) => (
  <div className="flex items-center justify-between gap-3 border-t border-[#e2ede8] pt-5">
    <button
      type="button"
      onClick={onPrevious}
      disabled={!hasPrevious || loading}
      className="inline-flex items-center gap-2 rounded-full border border-[#cbe8dd] bg-white px-5 py-2.5 text-sm font-semibold text-[#22423b] transition-colors hover:bg-[#f2faf7] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ChevronLeft size={18} />
      Precedente
    </button>

    <div className="hidden min-w-0 flex-1 px-2 text-center text-xs text-[#5a5a5a] sm:block">
      {nextTitle && hasNext ? `Prossimo: ${nextTitle}` : previousTitle && hasPrevious ? `Precedente: ${previousTitle}` : null}
    </div>

    <button
      type="button"
      onClick={onNext}
      disabled={!hasNext || loading}
      className="inline-flex items-center gap-2 rounded-full bg-[#55B18D] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#439678] disabled:cursor-not-allowed disabled:opacity-60"
    >
      Successiva
      <ChevronRight size={18} />
    </button>
  </div>
);

export default LessonNavigation;
