"use client";

import { useClipStore } from "@/store/clip-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function StepScript() {
  const { scripts, selectedScript, briefing, prevStep, nextStep } = useClipStore();
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
    
  const [customText, setCustomText] = useState(
    scripts[selectedScript]?.content || ""
  );
  const [generating, setGenerating] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState("anthropic/claude-sonnet-5");
  const [visualDirection, setVisualDirection] = useState("");
  const [musicVibe, setMusicVibe] = useState("");

  useEffect(() => {
    if (session) {
      fetch("/api/user/balance")
        .then(res => res.json())
        .then(data => {
          setIsAdmin(data.role === "ADMIN");
        });
    }
  }, [session]);

  const handleAiAssist = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productName: briefing.productName,
          productUrl: briefing.productUrl,
          productDetails: briefing.productDetails,
          objective: briefing.objective,
          visualStyle: briefing.visualStyle,
          videoLength: briefing.videoLength,
          aiModel: selectedAiModel
        }),
      });
      const data = await response.json();
      
      if (data.spokenScript) {
        setCustomText(data.spokenScript);
        setVisualDirection(data.visualDirection || "");
        setMusicVibe(data.musicVibe || "");
      } else {
        alert("Ops, não veio roteiro: " + (data.error || "erro desconhecido"));
      }
    } catch (err) {
      alert("Falha de conexão com a IA.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header do Step */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          O Roteiro da Venda
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          Escreva o texto para a narração e legenda. Se precisar de ajuda, a IA escreve para você.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#0047FF]" />
            Texto do Locutor
          </Label>

          <div className="flex flex-col sm:flex-row gap-3">
            {isAdmin && (
              <select 
                value={selectedAiModel}
                onChange={(e) => setSelectedAiModel(e.target.value)}
                className="bg-[#0A0A0A] border border-[#333] text-xs font-semibold text-white h-12 px-4 rounded-lg outline-none focus:border-[#00E5FF] transition-all"
              >
                <option value="nvidia/nemotron-3.5-lightning:free">Nvidia Nemotron (100% Grátis)</option>
                <option value="anthropic/claude-sonnet-5">Claude 5 Sonnet (Premium/Pago)</option>
                <option value="google/gemini-3.5-flash">Gemini 3.5 Flash</option>
              </select>
            )}

            <Button 
              onClick={handleAiAssist}
              disabled={generating}
              className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-bold h-12 px-8 rounded-lg shadow-[0_0_20px_rgba(0,119,255,0.4)] transition-all animate-in fade-in"
            >
              {generating ? "Pensando..." : <><Sparkles className="w-5 h-5 mr-2" /> Gerar Roteiro</>}
            </Button>
          </div>
        </div>

        {visualDirection && (
          <div className="bg-[#111] border border-[#333] rounded-xl p-5 mb-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            <h3 className="text-sm font-semibold text-[#00E5FF] uppercase tracking-wider">🎬 Direção de Arte</h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed">{visualDirection}</p>
            
            <h3 className="text-sm font-semibold text-[#00E5FF] uppercase tracking-wider mt-4">🎵 Trilha Sonora</h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed">{musicVibe}</p>
          </div>
        )}
        
        <Textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Digite o que a voz deve falar no vídeo..."
          className="min-h-[250px] bg-[#0A0A0A] border-[#333] text-white p-5 text-base font-medium leading-relaxed resize-none focus-visible:ring-1 focus-visible:ring-[#00E5FF] rounded-xl shadow-inner"
        />
        <div className="flex justify-between text-[10px] font-semibold uppercase tracking-widest text-[#666]">
          <span>Caracteres: {customText.length}</span>
          <span>Duração estimada: ~{Math.max(1, Math.ceil(customText.length / 15))} segundos</span>
        </div>
      </div>

      {/* Navegação */}
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
          onClick={() => {
            const updated = [...scripts];
            if (updated.length === 0) {
              updated.push({ id: '1', title: 'Custom', content: customText, takes: [] });
            } else {
              if (!updated[selectedScript]) {
                  updated[selectedScript] = { id: '1', title: 'Custom', content: customText, takes: [] };
              } else {
                  updated[selectedScript].content = customText;
              }
            }
            useClipStore.getState().setScripts(updated);
            nextStep();
          }}
          disabled={customText.length < 10}
          className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-semibold text-sm px-8 h-11 rounded-lg transition-all shadow-[0_0_20px_rgba(0,119,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] disabled:opacity-50 disabled:shadow-none"
        >
          Próximo Passo
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
