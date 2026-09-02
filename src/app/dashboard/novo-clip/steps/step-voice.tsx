"use client";

import { useClipStore } from "@/store/clip-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Play, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const voices = [
  { id: "pt-BR-AntonioNeural", name: "Antônio", type: "Masculino - Forte", desc: "A voz oficial dos vídeos virais de curiosidades e vendas." },
  { id: "en-US-AndrewMultilingualNeural", name: "Lucas", type: "Masculino - Jovem", desc: "Voz mais leve e natural, parece muito um influenciador." },
  { id: "en-US-BrianMultilingualNeural", name: "Ricardo", type: "Masculino - Sênior", desc: "Voz profunda e de autoridade. Excelente para produtos High Ticket." },
  { id: "pt-BR-FranciscaNeural", name: "Francisca", type: "Feminino - Calma", desc: "Voz padrão do TikTok, ótima para Vlogs e lifestyle." },
  { id: "pt-BR-ThalitaMultilingualNeural", name: "Thalita", type: "Feminino - Varejo", desc: "Voz mais energética, excelente para Shopee e Moda." },
  { id: "en-US-AvaMultilingualNeural", name: "Amanda", type: "Feminino - Dinâmica", desc: "Voz muito expressiva e cativante para prender a atenção." },
];

export default function StepVoice() {
  const { briefing, scripts, selectedScript, updateBriefing, prevStep, nextStep } = useClipStore();
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scriptText = scripts[selectedScript]?.content || "Olá! Este é um teste da minha voz. Preparado para escalar suas vendas?";

  // Toca um preview da voz
  const handlePreview = async (voiceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (playingVoice === voiceId && audioRef.current) {
      audioRef.current.pause();
      setPlayingVoice(null);
      return;
    }

    setPlayingVoice(voiceId);
    
    try {
      const res = await fetch("/api/generate-tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: "Olá! Este é um teste da minha voz. Preparado para escalar suas vendas?", 
          voice: voiceId 
        }),
      });
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const newAudio = new Audio(url);
      audioRef.current = newAudio;
      
      newAudio.onended = () => setPlayingVoice(null);
      await newAudio.play();
    } catch (err) {
      alert("Erro ao tocar preview.");
      setPlayingVoice(null);
    }
  };

  // Gera o áudio final do roteiro
  const handleNext = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: scriptText, 
          voice: briefing.voice || "pt-BR-AntonioNeural"
        }),
      });

      if (!res.ok) throw new Error("Falha");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      
      // Salva a URL do áudio gerado na store pra gente usar na montagem depois
      updateBriefing({ generatedAudioUrl: url });
      
      nextStep();
    } catch (err) {
      alert("Erro ao gerar áudio oficial.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          A Voz que Vende
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          Escolha o locutor para narrar o seu vídeo. Usamos vozes neurais gratuitas de altíssima conversão.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {voices.map((voice) => {
          const isSelected = briefing.voice === voice.id;
          const isPlaying = playingVoice === voice.id;

          return (
            <div
              key={voice.id}
              onClick={() => updateBriefing({ voice: voice.id })}
              className={cn(
                "relative p-5 rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden group",
                isSelected
                  ? "bg-[#0047FF]/10 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                  : "bg-[#0A0A0A] border-[#333] hover:border-[#666] hover:bg-[#111]"
              )}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0047FF] to-[#00E5FF]" />
              )}
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={cn("text-lg font-bold transition-colors", isSelected ? "text-white" : "text-[#ccc]")}>
                    {voice.name}
                  </h3>
                  <p className="text-[#00E5FF] text-xs font-semibold uppercase tracking-wider mt-1">{voice.type}</p>
                </div>
                
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => handlePreview(voice.id, e)}
                  className={cn(
                    "w-10 h-10 rounded-full transition-colors",
                    isPlaying ? "bg-[#00E5FF] text-black" : "bg-[#1A1A1A] text-white hover:bg-[#0047FF] hover:text-white"
                  )}
                >
                  {isPlaying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 ml-1" fill="currentColor" />}
                </Button>
              </div>
              
              <p className="text-sm text-[#888] mt-4 font-medium leading-relaxed">
                {voice.desc}
              </p>

              {isSelected && (
                <div className="absolute bottom-4 right-4">
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#222]">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={generating}
          className="bg-transparent border-[#444] text-[#A3A3A3] hover:bg-[#1A1A1A] hover:text-white font-semibold text-sm rounded-lg h-11 px-6 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={handleNext}
          disabled={generating || !briefing.voice}
          className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-semibold text-sm px-8 h-11 rounded-lg transition-all shadow-[0_0_20px_rgba(0,119,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] disabled:opacity-50 disabled:shadow-none"
        >
          {generating ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando Áudio...</>
          ) : (
            <>Gerar Voz e Avançar <ArrowRight className="w-4 h-4 ml-2" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
