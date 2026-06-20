import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/ui/buttons/Buttons';

const EmptyCertificateState = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-12 shadow-sm">
      {/* Empty state illustration */}
      <div className="mb-6 flex justify-center">
        <div className="relative h-48 w-48">
          {/* Document with magnifying glass illustration */}
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Document background */}
            <rect
              x="60"
              y="40"
              width="80"
              height="100"
              rx="8"
              fill="#E8EFFE"
              opacity="0.5"
            />

            {/* Document lines */}
            <line
              x1="75"
              y1="60"
              x2="125"
              y2="60"
              stroke="#8B9FFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="75"
              y1="75"
              x2="125"
              y2="75"
              stroke="#8B9FFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="75"
              y1="90"
              x2="110"
              y2="90"
              stroke="#8B9FFF"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Magnifying glass */}
            <circle
              cx="120"
              cy="110"
              r="25"
              fill="white"
              stroke="#5B6FFF"
              strokeWidth="6"
            />
            <circle cx="120" cy="110" r="20" fill="white" />

            {/* Sad face */}
            <circle cx="113" cy="105" r="2" fill="#5B6FFF" />
            <circle cx="127" cy="105" r="2" fill="#5B6FFF" />
            <path
              d="M 113 118 Q 120 113 127 118"
              stroke="#5B6FFF"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Magnifying glass handle */}
            <line
              x1="138"
              y1="128"
              x2="155"
              y2="145"
              stroke="#5B6FFF"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Decorative dots */}
            <circle cx="45" cy="80" r="2" fill="#C5CEFF" opacity="0.6" />
            <circle cx="50" cy="120" r="2" fill="#C5CEFF" opacity="0.6" />
            <circle cx="155" cy="70" r="2" fill="#C5CEFF" opacity="0.6" />
            <circle cx="165" cy="95" r="2" fill="#C5CEFF" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Empty state message */}
      <p className="mb-6 text-center text-sm leading-relaxed text-[#252525]">
        Nessun corso attivo. Vai al catalogo e inizia il tuo percorso oggi
        stesso!
      </p>

      {/* Action button */}
      <div className="flex justify-end">
        <Button
          onClick={() => navigate('/training/courses/catalog')}
          label="Catalogo corsi"
          variant="primary"
          size="sm"
          className="text-xs"
        />
      </div>
    </div>
  );
};

export default EmptyCertificateState;
