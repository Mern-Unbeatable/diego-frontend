"use client";

import {
    Users,
    FileText,
    ClipboardList,
    MonitorPlay,
    BookOpen,
    ArrowDown,
} from "lucide-react";

const steps = [
    {
        icon: Users,
        title: "Contatto",
        desc: "con il team UnoSicurezza",
        avatar: true,
    },
    {
        icon: FileText,
        title: "Scelta del prodotto",
        desc: "corso singolo o pacchetto trimestrale",
    },
    {
        icon: ClipboardList,
        title: "Raccolta delle esigenze",
        desc: "tramite form online, o sopralluogo tecnico",
    },
    {
        icon: BookOpen,
        title: "Realizzazione del corso personalizzato",
        desc: "con logo, riferimenti, foto, video, procedure operative, manuali interni",
    },
    {
        icon: MonitorPlay,
        title: "Caricamento sulla piattaforma LMS",
        desc: "automazione erogazione e monitoraggio attività formativa",
    },
    {
        icon: Users,
        title: "Erogazione corso",
        desc: "in e-learning ai lavoratori da PC, tablet e smartphone",
        bottomAvatar: true,
    },
];

export default function WorkflowSection() {
    return (
        <div className="max-w-sm py-5">
            {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                    <div key={index}>
                        <div className="relative">
                            <div className="border border-[#73BFA1] rounded-md bg-[#f5f5f5] px-4 py-3 flex gap-3">
                                {/* icon */}
                                <div className="h-9 w-9 rounded bg-[#73BFA1] flex items-center justify-center shrink-0">
                                    <Icon size={18} className="text-white" />
                                </div>

                                {/* text */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[15px] text-[#3f3f3f] leading-none">
                                        {step.title}
                                    </h3>

                                    <p className="text-[13px] text-[#606060] mt-1 leading-4">
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