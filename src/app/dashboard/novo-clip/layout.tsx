"use client";

import { useClipStore } from "@/store/clip-store";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = [
  { id: 1, title: "Estratégia" },
  { id: 2, title: "Roteiro" },
  { id: 3, title: "Locutor" },
  { id: 4, title: "Mídias" },
  { id: 5, title: "Montagem" },
];

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentStep } = useClipStore();

  return (
    <div className="max-w-4xl mx-auto w-full pt-8 pb-24 relative">
      
      {/* Background Glow suave (Estilo Premium) */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#0047FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Título */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold text-white tracking-tight">Criar Clip</h1>
      </div>

      {/* Barra de Progresso Elegante */}
      <div className="relative mb-12 max-w-2xl mx-auto px-4">
        <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-[#1A1A1A] -translate-y-1/2 z-0 rounded-full" />
        <div 
          className="absolute top-1/2 left-4 h-[2px] bg-gradient-to-r from-[#0047FF] to-[#00E5FF] -translate-y-1/2 z-0 transition-all duration-700 ease-in-out rounded-full"
          style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2rem)` }}
        />
        
        <div className="relative z-10 flex justify-between">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs transition-all duration-500",
                    isCompleted
                      ? "bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                      : isActive
                      ? "bg-[#0047FF] text-white shadow-[0_0_15px_rgba(0,71,255,0.5)] ring-2 ring-[#0047FF]/30 ring-offset-2 ring-offset-[#0A0A0A]"
                      : "bg-[#111] text-[#666] border border-[#222]"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Container Principal com efeito Glassmorphism */}
      <div className="relative z-10 bg-[#111111]/80 backdrop-blur-xl border border-[#222] rounded-2xl p-8 sm:p-10 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
