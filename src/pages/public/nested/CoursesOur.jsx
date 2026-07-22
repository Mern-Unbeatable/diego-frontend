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



function AvatarStack({ avatars }) {
  return (
    <div className="absolute -right-3 -top-3 flex items-center">
      {avatars.map((a, i) => (
        <span
          key={i}
          className="-ml-3 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-[3px] border-white text-sm font-bold text-white shadow-md first:ml-0"
          style={{ backgroundColor: a.type === 'initial' ? a.bg : '#e5e5e5' }}
        >
          {a.type === 'initial' ? (
            a.label
          ) : (
            <img src={a.src} alt="" className="h-full w-full object-cover" />
          )}
        </span>
      ))}
    </div>
  );
}

export default function CoursesOur() {
  const { t } = useTranslation();
  const howItWorksSteps =
    t('trainingPages.section8.howItWorksSteps', { returnObjects: true }) || [];
  const workflowSteps =
    t('trainingPages.section9.steps', { returnObjects: true }) || [];
  const howItWorksImage = t('trainingPages.section8.howItWorksImage', {
    defaultValue: '/image/course/level2.png',
  });

  return (
    <Container className="py-10 md:py-14">
      {/* Top section: image + numbered "how it works" list */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl w-200 bg-white p-3 shadow-sm">
          <img
            src="/imgi_3.webp"
            alt={t('trainingPages.section8.howItWorksTitle')}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#73BFA1]/15">
              <Target className="h-5 w-5 text-[#73BFA1]" strokeWidth={2.2} />
            </span>
            <h2 className="text-2xl font-bold text-[#333333] md:text-[28px]">
              {t('trainingPages.section8.howItWorksTitle')}
            </h2>
          </div>

          <ol className="space-y-3">
            {howItWorksSteps.map((step, index) => (
              <li
                key={`${index}-${step}`}
                className="flex gap-3 text-[15px] leading-7 text-[#555555]"
              >
                <span className="min-w-[20px] font-semibold text-[#333333]">
                  {index + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Vertical workflow with connector arrows + avatar badges on first/last card */}
      <div className="mt-16 flex max-w-3xl flex-col items-end justify-end md:mt-20">
        {workflowSteps.map((step, index) => {
          const Icon = WORKFLOW_ICONS[index] || Target;
          const isFirst = index === 0;
          const isLast = index === workflowSteps.length - 1;

          return (
            <div key={`${step.title}-${index}`} className="flex w-full flex-col items-center">
              <div className="relative flex w-full items-center gap-4 rounded-2xl border border-[#d9ece4] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] md:gap-5 md:px-6 md:py-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f1]">
                  <Icon className="h-7 w-7 text-[#73BFA1]" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#333333] md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#666666] md:text-[15px]">
                    {step.desc}
                  </p>
                </div>

          
              </div>

              {!isLast ? (
                <div className="my-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#73BFA1] shadow-sm">
                  <ArrowDown className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Container>
  );
}