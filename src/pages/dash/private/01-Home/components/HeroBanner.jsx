import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdStar } from 'react-icons/io';

const HeroBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#73BFA1] px-4 py-6 sm:px-6 sm:py-8 md:p-10 lg:p-12">
      <div className="pointer-events-none absolute inset-0">
        <IoMdStar className="absolute -top-18 right-16 hidden h-40 w-40 text-white opacity-20 md:block" />
        <IoMdStar className="absolute top-20 right-6 hidden h-16 w-16 text-white opacity-10 md:block" />
        <IoMdStar className="absolute top-28 right-36 hidden h-26 w-26 text-white opacity-10 md:block" />
        <IoMdStar className="absolute top-38 -right-2 hidden h-26 w-26 text-white opacity-10 md:block" />
        <IoMdStar className="absolute top-8 right-62 hidden h-26 w-26 text-white opacity-10 md:block" />
        <IoMdStar className="absolute top-2 right-2 h-20 w-20 text-white opacity-15 sm:h-24 sm:w-24 md:hidden" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="mb-3 text-lg font-medium text-white sm:mb-4 sm:text-xl md:text-2xl">
          {t('privateHome.heroTitle')}
        </h1>

        <button
          type="button"
          className="rounded-full bg-[#284338] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1f352c] sm:px-8 sm:text-base"
        >
          {t('privateHome.heroCta')}
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
