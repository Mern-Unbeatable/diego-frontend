import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/ui/buttons/Buttons';

const EmptyCertificateState = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
      <div className="mb-5 flex justify-center sm:mb-6">
        <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48">
          <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
            <rect
              x="60"
              y="40"
              width="80"
              height="100"
              rx="8"
              fill="#E8EFFE"
              opacity="0.5"
            />
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
            <circle
              cx="120"
              cy="110"
              r="25"
              fill="white"
              stroke="#5B6FFF"
              strokeWidth="6"
            />
            <circle cx="120" cy="110" r="20" fill="white" />
            <circle cx="113" cy="105" r="2" fill="#5B6FFF" />
            <circle cx="127" cy="105" r="2" fill="#5B6FFF" />
            <path
              d="M 113 118 Q 120 113 127 118"
              stroke="#5B6FFF"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <line
              x1="138"
              y1="128"
              x2="155"
              y2="145"
              stroke="#5B6FFF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="45" cy="80" r="2" fill="#C5CEFF" opacity="0.6" />
            <circle cx="50" cy="120" r="2" fill="#C5CEFF" opacity="0.6" />
            <circle cx="155" cy="70" r="2" fill="#C5CEFF" opacity="0.6" />
            <circle cx="165" cy="95" r="2" fill="#C5CEFF" opacity="0.6" />
          </svg>
        </div>
      </div>

      <p className="mb-5 text-center text-sm leading-relaxed text-[#252525] sm:mb-6">
        Nessun corso attivo. Vai al catalogo e inizia il tuo percorso oggi
        stesso!
      </p>

      <div className="flex justify-center sm:justify-end">
        <Button
          onClick={() => navigate('/training/courses/catalog')}
          label="Catalogo corsi"
          variant="primary"
          size="sm"
          className="h-10 w-full justify-center text-sm sm:h-auto sm:w-auto"
        />
      </div>
    </div>
  );
};

export default EmptyCertificateState;
