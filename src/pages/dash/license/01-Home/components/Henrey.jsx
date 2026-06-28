import React from 'react';
import rightDownSideBg from '/image/freelancerBg/ciao.png';

const Henrey = () => {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-[#73BFA1] text-white md:h-48">
      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col justify-center px-8 py-6 md:px-10 md:py-8">
        <p className="mb-1 text-sm font-medium text-white md:text-base">
          Ciao!
        </p>
        <h2 className="mb-2 text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
          Henry, Arthur
        </h2>
        <p className="text-sm font-normal text-white/90 md:text-base">
          Benvenuto su UnoSicurezza
        </p>
      </div>

      {/* Background layer */}
      <div className='absolute z-0 -right-20 top-9'>
        <img src={rightDownSideBg} alt="circleBg" />
      </div>
    </div>
  );
};

export default Henrey;
