'use client';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { howWorksData } from '../../../data/howWorksData';

const accentStyles = {
  1: {
    badge: 'border-[#8FC3E8]/30 bg-[#8FC3E8]/10 text-[#5D93B8]',
  },
  2: {
    badge: 'border-[#6FCB43]/30 bg-[#6FCB43]/10 text-[#5A9E31]',
  },
  3: {
    badge: 'border-[#FF8A00]/30 bg-[#FF8A00]/10 text-[#CC6B00]',
  },
};

const HowWorks = () => {
  const { t } = useTranslation();
  const sections =
    t('trainingPages.section10.sections', { returnObjects: true }) || [];

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto container">
        <section className="container mb-6 lg:mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('trainingPages.section10.headerTitle')}
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {t('trainingPages.section10.headerDescription')}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#5F9F86]">
            <Search size={16} />
            {t('trainingPages.section10.headerCta')}
          </div>
        </section>

        {/* Sections */}
        <div className="space-y-14 lg:space-y-18">
          {howWorksData.map((section, index) => {
            const isReverse = section.reverse;
            const styles = accentStyles[section.id];
            const sectionText = sections[index] || {};

            const textBlock = (
              <div className={`flex-1 ${isReverse ? 'lg:order-2' : ''}`}>
                <div className="max-w-xl">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    {sectionText.title || section.title}
                  </h2>

                  <div className="mt-5 space-y-4 text-slate-600">
                    {(sectionText.contents || section.contents || []).map(
                      (content, contentIndex) => {
                        const isSubheading =
                          content === 'How it works' ||
                          content === 'Come funziona';

                        if (isSubheading) {
                          return (
                            <p
                              key={`${section.id}-${contentIndex}`}
                              className="text-justify text-sm font-semibold text-slate-500 sm:text-base"
                            >
                              {content}
                            </p>
                          );
                        }

                        return (
                          <p
                            key={`${section.id}-${contentIndex}`}
                            className="text-justify text-sm text-slate-600 sm:text-base"
                          >
                            {content}
                          </p>
                        );
                      },
                    )}
                  </div>

                  {section.badge && (
                    <div className="mt-4 inline-flex items-center gap-6 rounded-full border border-[#73BFA1]/25 bg-[#73BFA1]/10 px-4 py-2 text-sm font-medium text-[#5F9F86]">
                      <span className="h-2 w-2 rounded-full bg-[#73BFA1]" />
                      {section.badge}
                    </div>
                  )}
                </div>
              </div>
            );

            const imageBlock = (
              <div className={`flex-1 ${isReverse ? 'lg:order-1' : ''}`}>
                <div className=" ">
                  <img
                    src={section.image}
                    alt={sectionText.title || section.title}
                    className="h-100 w-full object-contain"
                  />
                </div>
              </div>
            );

            return (
              <section
                key={section.id}
                className="grid items-center gap-6 lg:grid-cols-2 lg:gap-22"
              >
                {textBlock}
                {imageBlock}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
