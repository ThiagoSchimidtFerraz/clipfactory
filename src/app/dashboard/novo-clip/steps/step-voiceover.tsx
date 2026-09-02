"use client";

import { useClipStore } from "@/store/clip-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Mic,
  Coins,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const voices = [
  { id: "ana", name: "Ana", gender: "Feminina", style: "Natural", emoji: "👩" },
  { id: "carlos", name: "Carlos", gender: "Masculino", style: "Grave", emoji: "👨" },
  { id: "julia", name: "Julia", gender: "Feminina", style: "Jovem", emoji: "👩‍🦰" },
  { id: "pedro", name: "Pedro", gender: "Masculino", style: "Energético", emoji: "🧑" },
  { id: "maria", name: "Maria", gender: "Feminina", style: "Profissional", emoji: "👩‍💼" },
  { id: "lucas", name: "Lucas", gender: "Masculino", style: "Descontraído", emoji: "🧔" },
];

export default function StepVoiceover() {
  const { voiceover, updateVoiceover, prevStep, nextStep } = useClipStore();
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setGenerated(true);
          updateVoiceover({ audioUrl: "/mock-audio.mp3" });
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            🎙️ Escolha a Narração
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Selecione a voz ideal para seu produto
          </p>
        </div>
        <Badge variant="secondary" className="bg-violet-100 text-violet-700">
          <Coins className="w-3 h-3 mr-1" />
          1 crédito
        </Badge>
      </div>

      {/* Voice Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {voices.map((voice) => (
          <Card
            key={voice.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              voiceover.voiceId === voice.id
                ? "border-violet-500 border-2 shadow-lg shadow-violet-500/10 bg-violet-50/50"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() =>
              updateVoiceover({ voiceId: voice.id, voiceName: voice.name })
            }
          >
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl">{voice.emoji}</span>
                  <h3 className="font-semibold text-gray-900 mt-2">
                    {voice.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {voice.gender} • {voice.style}
                  </p>
                </div>
                {voiceover.voiceId === voice.id && (
                  <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-violet-600 p-0 h-auto text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <Play className="w-3 h-3 mr-1" />
                Ouvir Amostra
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate */}
      {voiceover.voiceId && (
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            {generating ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-violet-600 animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">
                    Gerando narração com {voiceover.voiceName}...
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-gray-400">{progress}% concluído</p>
              </div>
            ) : generated ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Narração gerada com sucesso!
                  </p>
                  <p className="text-xs text-gray-500">
                    Voz: {voiceover.voiceName} • Duração: ~28s
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Ouvir
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-600 mb-4">
                  Voz selecionada: <strong>{voiceover.voiceName}</strong>
                </p>
                <Button
                  onClick={handleGenerate}
                  className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Gerar Narração 🎙️
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={nextStep}
          disabled={!generated}
          className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90 shadow-md disabled:opacity-50"
        >
          Próximo
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
