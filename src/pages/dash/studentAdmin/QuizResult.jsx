  
import React from 'react';

const scoreData = [
  { label: 'Punteggio ottenuto', value: '90%' },
  { label: 'Totale risposte corrette', value: '9/10' },
  { label: 'Tempo totale impiegato nel test', value: '10 min' },
];

const ScoreItem = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0">
    <span className="text-gray-600">{label}</span>
    <span className="text-lg font-semibold text-gray-900">{value}</span>
  </div>
);

const QuizResults = () => {
  return (
    
    <div className="flex items-center justify-center min h-screen   p-4">
      
      <div className="w-full max-w-xl text-center p-12 bg-white  rounded-xl shadow-lg">
  
        <h1 className="text-3xl font-semibold text-[#73BFA1]">
          Risultati del quiz
        </h1>
        <p className="mt-2 text-lg text-[#73BFA1]">
          Congratulazioni. Hai superato il test!
        </p>

        <div className="relative mt-8 w-full overflow-hidden rounded-xl bg-[#73BFA1]/4 p-8 text-left ">
          
        
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#73BFA1]/8 opacity-50"></div>

         
          <div className="relative z-10">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Punteggi
            </h2>
           
            <div className="space-y-4">
              {scoreData.map((item) => (
                <ScoreItem key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;