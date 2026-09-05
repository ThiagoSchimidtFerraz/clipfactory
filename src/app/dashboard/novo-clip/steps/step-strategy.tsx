"use client";

import { useClipStore } from "@/store/clip-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, Smartphone, MonitorPlay, Square, Target, Flame, Sparkles, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function StepStrategy() {
  const { briefing, updateBriefing, nextStep } = useClipStore();
  
  // Controle do mini-wizard de perguntas
  const [qIndex, setQIndex] = useState(0);

  const handleNextQ = () => setQIndex(prev => prev + 1);
  const handlePrevQ = () => setQIndex(prev => prev - 1);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Estratégia do Vídeo
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          Responda para que nossa IA crie o roteiro perfeito. (Pergunta {qIndex + 1} de 4)
        </p>
      </div>

      <div className="min-h-[250px] flex flex-col justify-center">
        
        {/* PERGUNTA 0: PRODUTO & DETALHES */}
        {qIndex === 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#888] uppercase tracking-wider">1. O que estamos vendendo?</Label>
              <Input 
                value={briefing.productName || ""}
                onChange={(e) => updateBriefing({ productName: e.target.value })}
                placeholder="Ex: Tênis Runner Air 2.0"
                autoFocus
                className="bg-[#0A0A0A] border-[#333] text-white h-12 font-medium focus-visible:ring-1 focus-visible:ring-[#00E5FF] focus-visible:border-transparent rounded-lg text-base shadow-inner"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#888] uppercase tracking-wider">Link do Produto (Opcional)</Label>
              <Input 
                value={briefing.productUrl || ""}
                onChange={(e) => updateBriefing({ productUrl: e.target.value })}
                placeholder="Ex: shopee.com.br/meu-produto"
                className="bg-[#0A0A0A] border-[#333] text-white h-12 font-medium focus-visible:ring-1 focus-visible:ring-[#00E5FF] focus-visible:border-transparent rounded-lg text-sm shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#888] uppercase tracking-wider">Principais Benefícios (Opcional)</Label>
              <textarea 
                value={briefing.productDetails || ""}
                onChange={(e) => updateBriefing({ productDetails: e.target.value })}
                onKeyDown={(e) => { if(e.key === "Enter" && !e.shiftKey && briefing.productName) handleNextQ(); }}
                placeholder="Ex: Alivia dores nas costas, frete grátis, material premium..."
                className="w-full bg-[#0A0A0A] border-[#333] text-white p-4 min-h-[80px] font-medium focus-visible:ring-1 focus-visible:ring-[#00E5FF] focus-visible:outline-none rounded-lg text-sm shadow-inner resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={handleNextQ}
                disabled={!briefing.productName}
                className="bg-[#00E5FF] hover:bg-[#00CCEE] text-black font-bold h-11 px-8 rounded-lg"
              >
                Continuar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* PERGUNTA 1: GATILHO */}
        {qIndex === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Label className="text-sm font-semibold text-[#888] uppercase tracking-wider">2. Qual o Gatilho Principal da copy?</Label>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: "escassez", label: "Urgência", icon: Flame, desc: "Promoção relâmpago" },
                { id: "desejo", label: "Desejo", icon: Sparkles, desc: "Foco nos benefícios" },
                { id: "direto", label: "Venda Direta", icon: Target, desc: "Oferta muito agressiva" },
              ].map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => {
                    updateBriefing({ objective: obj.id });
                    setTimeout(handleNextQ, 300); // Auto-avança
                  }}
                  className={cn(
                    "p-5 rounded-xl border flex flex-col items-start text-left gap-2 transition-all duration-300",
                    briefing.objective === obj.id
                      ? "bg-[#0047FF]/10 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.1)] text-white scale-[1.02]"
                      : "bg-[#0A0A0A] border-[#333] text-[#888] hover:border-[#666] hover:bg-[#111]"
                  )}
                >
                  <obj.icon className={cn("w-6 h-6", briefing.objective === obj.id ? "text-[#00E5FF]" : "text-[#444]")} />
                  <span className="font-bold text-base">{obj.label}</span>
                  <span className="text-xs opacity-70">{obj.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PERGUNTA 2: ESTILO VISUAL */}
        {qIndex === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Label className="text-sm font-semibold text-[#888] uppercase tracking-wider">3. Qual o Estilo de Edição?</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: "cinematic", label: "Cinematográfico", desc: "Cores intensas, zoom lento." },
                { id: "dynamic", label: "Dinâmico / Agressivo", desc: "Cortes secos, tremidas." },
                { id: "minimal", label: "Minimalista", desc: "Limpo, foco total no produto." },
                { id: "tiktok", label: "Estilo TikTok", desc: "Legendas pulando, chamativo." },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    updateBriefing({ visualStyle: style.id });
                    setTimeout(handleNextQ, 300); // Auto-avança
                  }}
                  className={cn(
                    "p-5 rounded-xl border flex flex-col items-start text-left gap-1 transition-all duration-300",
                    briefing.visualStyle === style.id
                      ? "bg-[#0047FF]/10 border-[#00E5FF] text-white scale-[1.02]"
                      : "bg-[#0A0A0A] border-[#333] text-[#888] hover:border-[#666] hover:bg-[#111]"
                  )}
                >
                  <span className="font-bold text-base">{style.label}</span>
                  <span className="text-xs opacity-70">{style.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PERGUNTA 3: FORMATO */}
        {qIndex === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Label className="text-sm font-semibold text-[#888] uppercase tracking-wider">4. Formato do Vídeo</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "9:16", label: "Vertical", icon: Smartphone },
                { id: "16:9", label: "Horizontal", icon: MonitorPlay },
                { id: "1:1", label: "Quadrado", icon: Square },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateBriefing({ format: f.id as any })}
                  className={cn(
                    "py-6 px-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300",
                    briefing.format === f.id
                      ? "bg-[#0047FF]/10 border-[#00E5FF] text-white scale-[1.02]"
                      : "bg-[#0A0A0A] border-[#333] text-[#888] hover:border-[#666] hover:bg-[#111]"
                  )}
                >
                  <f.icon className={cn("w-8 h-8", briefing.format === f.id ? "text-[#00E5FF]" : "text-[#444]")} />
                  <span className="font-bold text-sm">{f.label}</span>
                </button>
              ))}
            </div>
            
            <div className="flex justify-end pt-8">
              <Button
                onClick={handleNextQ}
                disabled={!briefing.format}
                className="bg-[#00E5FF] hover:bg-[#00CCEE] text-black font-bold h-11 px-8 rounded-lg"
              >
                Continuar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* PERGUNTA 4: DURAÇÃO */}
        {qIndex === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Label className="text-sm font-semibold text-[#888] uppercase tracking-wider">5. Qual a Duração Estimada?</Label>
            <div className="grid grid-cols-5 gap-2">
              {[5, 10, 15, 20, 30].map((sec) => (
                <button
                  key={sec}
                  onClick={() => updateBriefing({ videoLength: sec })}
                  className={cn(
                    "py-5 px-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300",
                    briefing.videoLength === sec
                      ? "bg-[#0047FF]/10 border-[#00E5FF] text-white scale-[1.05]"
                      : "bg-[#0A0A0A] border-[#333] text-[#888] hover:border-[#666] hover:bg-[#111]"
                  )}
                >
                  <span className="font-bold text-lg">{sec}s</span>
                </button>
              ))}
            </div>
            
            <div className="flex justify-end pt-8">
              <Button
                onClick={nextStep}
                disabled={!briefing.videoLength}
                className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-bold h-12 px-10 rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] animate-pulse"
              >
                Avançar para Roteiro <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

      </div>

      {/* Navegação Inferior (Voltar) */}
      <div className="flex justify-start pt-6 mt-8 border-t border-[#222]">
        {qIndex > 0 && (
          <Button 
            variant="ghost" 
            onClick={handlePrevQ}
            className="text-[#888] hover:text-white hover:bg-[#1A1A1A] font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para pergunta anterior
          </Button>
        )}
      </div>
    </div>
  );
}
