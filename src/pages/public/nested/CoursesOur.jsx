import {
  Target,
  FileText,
  ClipboardList,
  Settings,
  Server,
  Users,
  ArrowDown,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container } from '../../../components/ui';

const WORKFLOW_ICONS = [Target, FileText, ClipboardList, Settings, Server, Users];

export default function CoursesOur() {
  const { t } = useTranslation();
  const howItWorksSteps =
    t('trainingPages.section8.howItWorksSteps', { returnObjects: true }) || [];
  const workflowSteps =
    t('trainingPages.section9.steps', { returnObjects: true }) || [];
  // const howItWorksImage = t('trainingPages.section8.howItWorksImage', {
  //   defaultValue: '/images/CoursesOur.png',
  // });

  return (
           <div className='container mx-auto px-4'>

  <Container className="py-10 md:py-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-30 xl:gap-36">
        {/* Left: sticky image */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden bg-white p-3 shadow-sm">
            <img
              src="../../../../public/images/Come_funziona.png"
              alt={t('trainingPages.section8.howItWorksTitle')}
              className="aspect-[4/4] w-full rounded-xl object-cover lg:aspect-auto lg:min-h-[400px]"
            />
          </div>
        </div>

        {/* Right: scrollable content */}
        <div className="flex min-w-0 flex-col">
          <div className="mb-10 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#73BFA1]/15">
              <Target className="h-5 w-5 text-[#73BFA1]" strokeWidth={2.2} />
            </span>
            <h2 className="text-2xl font-bold text-[#333333] md:text-[28px]">
              {t('trainingPages.section8.howItWorksTitle')}
            </h2>
          </div>

          <ol className="mb-14 w-full space-y-3 md:mb-16">
            {howItWorksSteps.map((step, index) => (
              <li
                key={`${index}-${step}`}
                className="flex items-start gap-3 text-[15px] leading-7 text-[#555555]"
              >
                <span className="w-6 shrink-0 text-right font-semibold text-[#333333]">
                  {index + 1}.
                </span>
                <span className="flex-1">{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex w-full flex-col">
            {workflowSteps.map((step, index) => {
              const Icon = WORKFLOW_ICONS[index] || Target;
              const isLast = index === workflowSteps.length - 1;

              return (
                <div
                  key={`${step.title}-${index}`}
                  className="flex w-full flex-col"
                >
                  <div className="flex w-full items-center gap-4 rounded-2xl border border-[#d9ece4] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] md:gap-5 md:px-6 md:py-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f1]">
                      <Icon
                        className="h-7 w-7 text-[#73BFA1]"
                        strokeWidth={1.8}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#333333] md:text-base lg:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#666666] md:text-[15px]">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {!isLast ? (
                    <div className="my-3 flex justify-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#73BFA1] shadow-sm">
                        <ArrowDown
                          className="h-5 w-5 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>



           </div>

  );
}
