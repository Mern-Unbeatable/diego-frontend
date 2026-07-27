const QuizResult = ({ result, onRetry, onClose }) => {
  if (!result) return null;

  const passScore = result.passScore ?? 70;
  const isPass = Boolean(result.passed) && !result.pendingManualReview;

  return (
    <div className="w-full max-w-[620px] rounded-3xl bg-white p-8 text-center shadow-2xl md:p-12">
      <h2 className="text-[28px] font-bold tracking-tight text-[#55B18D] md:text-[32px]">
        Risultati del quiz
      </h2>

      {result.pendingManualReview ? (
        <p className="mx-auto mt-4 max-w-[480px] text-lg font-medium leading-relaxed text-[#d97706]">
          Quiz inviato. Alcune risposte richiedono valutazione manuale: riceverai
          l&apos;esito definitivo a breve.
        </p>
      ) : result.alreadySubmitted ? (
        <p className="mx-auto mt-4 max-w-[480px] text-lg leading-relaxed text-[#55B18D]">
          Hai già superato questo quiz. Ecco il risultato del tuo tentativo migliore.
        </p>
      ) : isPass ? (
        <p className="mx-auto mt-4 max-w-[480px] text-lg leading-relaxed text-[#55B18D]">
          Congratulazioni! Hai superato il test con successo e consolidato le tue
          competenze.
        </p>
      ) : (
        <p className="mx-auto mt-4 max-w-[480px] text-lg font-medium leading-relaxed text-[#ff5b5b]">
          Il tuo punteggio attuale è inferiore al {passScore}%. Ti invitiamo a
          ripetere il test per migliorare il risultato e consolidare le competenze
          acquisite.
        </p>
      )}

      <div className="relative mx-auto mt-8 max-w-[420px] overflow-hidden rounded-2xl bg-[#f7fbf9] p-6 text-left md:p-8">
        <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#e8f5ef] opacity-70" />

        <h3 className="mb-5 text-xl font-bold text-[#1d1d1d]">Punteggi</h3>

        <div className="space-y-4 text-base font-medium">
          <div className="flex items-center justify-between">
            <span className="text-[#5a5a5a]">Punteggio ottenuto</span>
            <span
              className={`text-lg font-bold ${
                isPass ? 'text-[#55B18D]' : 'text-[#ff5b5b]'
              }`}
            >
              {result.score}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#5a5a5a]">Totale risposte corrette</span>
            <span className="text-lg font-bold text-[#1d1d1d]">
              {result.correct}/{result.total}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#5a5a5a]">Tempo totale impiegato nel test</span>
            <span className="text-lg font-bold text-[#1d1d1d]">{result.time}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        {!isPass && !result.pendingManualReview ? (
          <button
            type="button"
            onClick={onRetry}
            className="w-full max-w-[360px] cursor-pointer rounded-full bg-[#73bfa1] py-3.5 text-center text-base font-bold text-white shadow-md transition-all hover:bg-[#5da78a] hover:shadow-lg"
          >
            Riprova
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="w-full max-w-[360px] cursor-pointer rounded-full bg-[#73bfa1] py-3.5 text-center text-base font-bold text-white shadow-md transition-all hover:bg-[#5da78a] hover:shadow-lg"
          >
            Chiudi
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
