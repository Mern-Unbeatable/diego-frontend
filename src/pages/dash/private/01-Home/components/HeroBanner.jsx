import React from 'react';
import { IoMdStar } from 'react-icons/io';

const HeroBanner = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#73BFA1] p-8 md:p-12">
      {/* Decorative stars cluster */}
      <div className="pointer-events-none absolute inset-0 gap-4">
        <IoMdStar className="absolute -top-18 right-16 hidden h-40 w-40 text-white opacity-20 md:block" />
        <IoMdStar className="absolute top-20 right-6 hidden h-16 w-16 text-white opacity-10 md:block" />
        <IoMdStar className="absolute top-28 right-36 hidden h-26 w-26 text-white opacity-10 md:block" />
        <IoMdStar className="absolute top-38 -right-2 hidden h-26 w-26 text-white opacity-10 md:block" />
        <IoMdStar className="absolute top-8 right-62 hidden h-26 w-26 text-white opacity-10 md:block" />
        <IoMdStar className="absolute top-3 right-3 block h-28 w-28 text-white opacity-15 md:hidden" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="mb-4 text-2xl  font-[500] text-white">
          Affina le tue competenze professionali
        </h1>

        <button
          type="button"
          className="transform rounded-full bg-[#284338] px-8 py-2 font-medium text-white"
        >
          Inizia ora
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
