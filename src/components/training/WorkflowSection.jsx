'use client';

import {
  Users,
  FileText,
  ClipboardList,
  MonitorPlay,
  BookOpen,
  Award,
  ArrowDown,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const defaultSteps = [
  {
    title: 'Contatto',
    desc: 'con il team UnoSicurezza',
  },
  {
    title: 'Scelta del prodotto',
    desc: 'corso singolo o pacchetto trimestrale',
  },
  {
    title: 'Raccolta delle esigenze',
    desc: 'tramite form online, o sopralluogo tecnico',
  },
  {
    title: 'Realizzazione del corso personalizzato',
    desc: 'con logo, riferimenti, foto, video, procedure operative, manuali interni',
  },
  {
    title: 'Caricamento sulla piattaforma LMS',
    desc: 'automazione erogazione e monitoraggio attività formativa',
  },
  {
    title: 'Erogazione corso',
    desc: 'in e-learning ai lavoratori da PC, tablet e smartphone',
  },
  {
    title: 'Rilascio attestato',
    desc: "Si dichiara il rilascio dell'attestato all'interessato, conforme alle attività svolta.",
  },
];

const icons = [
  Users,
  FileText,
  ClipboardList,
  BookOpen,
  MonitorPlay,
  Users,
  Award,
];

export default function WorkflowSection({ steps = defaultSteps }) {
  return (
    <div className="max-w-sm py-5">
      {steps.map((step, index) => {
        const Icon = icons[index] ?? Users;

        return (
          <div key={index}>
            <div className="relative">
              <div className="flex gap-3 rounded-md border border-[#73BFA1] px-4 py-3 hover:bg-[#f5f5f5]">
                {/* icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#73BFA1]">
                  <Icon size={18} className="text-white" />
                </div>

                {/* text */}
                <div className="flex-1">
                  <h3 className="text-[15px] leading-none font-semibold text-[#3f3f3f]">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-[13px] leading-4 text-[#606060]">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown
                  size={30}
                  strokeWidth={3}
                  className="text-[#73BFA1]"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
