"use client";

import { useClipStore } from "@/store/clip-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Smartphone, MonitorPlay, Square } from "lucide-react";
import { cn } from "@/lib/utils";

const formats = [
  { id: "9:16", label: "Vertical", icon: Smartphone, desc: "TikTok, Reels, Shorts" },
  { id: "16:9", label: "Horizontal", icon: MonitorPlay, desc: "YouTube, Computador" },
  { id: "1:1", label: "Quadrado", icon: Square, desc: "Feed Instagram, Facebook" },
];

export default function StepFormat() {
  const { briefing, updateBriefing, prevStep, nextStep } = useClipStore();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Formato e Estilo
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          Onde este vídeo vai rodar? Escolha a proporção de tela adequada para a rede social.
        </p>
      </div>

      <div className="space-y-6">
        <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Proporção da Tela</Label>
        
        <div className="grid sm:grid-cols-3 gap-4">
          {formats.map((f) => {
            const isSelected = briefing.format === f.id;
            return (
              <button
                key={f.id}
                onClick={() => updateBriefing({ format: f.id as any })}
                className={cn(
                  "p-6 rounded-xl border flex flex-col items-center text-center gap-3 transition-all duration-300",
                  isSelected
                    ? "bg-[#0047FF]/10 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.15)] text-white"
                    : "bg-[#0A0A0A] border-[#333] text-[#888] hover:border-[#666] hover:bg-[#111]"
                )}
              >
                <f.icon className={cn("w-8 h-8", isSelected ? "text-[#00E5FF]" : "")} />
                <div>
                  <p className="font-bold text-sm uppercase">{f.label}</p>
                  <p className="text-xs mt-1 opacity-70">{f.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Direção Visual (Edição)</Label>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { id: "cinematic", label: "Cinematográfico", desc: "Cores intensas, zoom lento, bordas de cinema." },
            { id: "dynamic", label: "Dinâmico / Agressivo", desc: "Cortes secos, flash, tremores na batida, cores vivas." },
            { id: "minimal", label: "Minimalista", desc: "Foco total no produto. Transições suaves (Fade) e fundo limpo." },
            { id: "tiktok", label: "Estilo TikTok", desc: "Zoom rápido, legendas gigantes pulando na tela, bem chamativo." },
          ].map((style) => {
            const isSelected = briefing.visualStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => updateBriefing({ visualStyle: style.id })}
                className={cn(
                  "p-4 rounded-xl border flex flex-col items-start text-left gap-1 transition-all duration-300",
                  isSelected
                    ? "bg-[#0047FF]/10 border-[#00E5FF] text-white"
                    : "bg-[#0A0A0A] border-[#333] text-[#888] hover:border-[#666] hover:bg-[#111]"
                )}
              >
                <p className="font-bold text-sm uppercase">{style.label}</p>
                <p className="text-xs opacity-70">{style.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#222]">
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="bg-transparent border-[#444] text-[#A3A3A3] hover:bg-[#1A1A1A] hover:text-white font-semibold text-sm rounded-lg h-11 px-6 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={nextStep}
          disabled={!briefing.format || !briefing.visualStyle}
          className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-semibold text-sm px-8 h-11 rounded-lg transition-all shadow-[0_0_20px_rgba(0,119,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] disabled:opacity-50 disabled:shadow-none"
        >
          Ir para Montagem
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
