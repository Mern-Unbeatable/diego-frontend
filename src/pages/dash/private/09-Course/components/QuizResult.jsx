import React from 'react';

const QuizResult = ({ result, onRetry, onClose }) => {
  if (!result) return null;

  return (
    <div className="w-full max-w-[620px] rounded-3xl bg-white p-8 md:p-12 shadow-2xl text-center border border-[#edf6f2]">
      {/* Title */}
      <h2 className="text-center text-[28px] font-bold text-[#55B18D] md:text-[32px] tracking-tight">
        Risultati del quiz
      </h2>

      {/* Description */}
      {result.passed ? (
        <p className="mt-4 mx-auto max-w-[480px] text-center text-lg leading-relaxed text-[#55B18D]">
          Congratulazioni! Hai superato il test con successo e consolidato le tue competenze.
        </p>
      ) : (
        <p className="mt-4 mx-auto max-w-[480px] text-center text-lg leading-relaxed text-[#ff5b5b] font-medium">
          Il tuo punteggio attuale è inferiore al 70%. Ti invitiamo a ripetere il test per migliorare il risultato e consolidare le competenze acquisite.
        </p>
      )}

      {/* Score Card */}
      <div className="relative mx-auto mt-8 max-w-[420px] rounded-2xl bg-[#f7fbf9] p-6 md:p-8 text-left overflow-hidden">
        {/* Decorative Light Green Circle in Corner */}
        <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-[#e8f5ef] opacity-70" />
        
        <h3 className="mb-5 text-xl font-bold text-[#1d1d1d]">
          Punteggi
        </h3>
        
        <div className="space-y-4 text-base font-medium">
          <div className="flex items-center justify-between">
            <span className="text-[#5a5a5a]">Punteggio ottenuto</span>
            <span
              className={`text-lg font-bold ${result.passed ? 'text-[#55B18D]' : 'text-[#ff5b5b]'}`}
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
            <span className="text-lg font-bold text-[#1d1d1d]">
              {result.time}
            </span>
          </div>
        </div>
      </div>

      {/* Button Action */}
      <div className="mt-8 flex justify-center">
        {!result.passed ? (
          <button
            type="button"
            onClick={onRetry}
            className="w-full max-w-[360px] rounded-full bg-[#73bfa1] hover:bg-[#5da78a] py-3.5 text-base font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
          >
            Riprova
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="w-full max-w-[360px] rounded-full bg-[#73bfa1] hover:bg-[#5da78a] py-3.5 text-base font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
          >
            Chiudi
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
