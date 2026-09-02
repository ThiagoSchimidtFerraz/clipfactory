"use client";

import { useClipStore } from "@/store/clip-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  User,
  Upload,
  Coins,
  Film,
  Clock,
  Check,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const visualTypes = [
  {
    value: "ai-generated" as const,
    icon: Sparkles,
    title: "IA Generativa",
    desc: "Gere cenas visuais únicas com IA",
  },
  {
    value: "avatar" as const,
    icon: User,
    title: "Avatar Digital",
    desc: "Apresentador virtual narra seu script",
  },
  {
    value: "upload" as const,
    icon: Upload,
    title: "Upload Próprio",
    desc: "Use seus próprios vídeos",
  },
];

export default function StepVisual() {
  const { visual, updateVisual, scripts, selectedScript, prevStep, nextStep } =
    useClipStore();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [takeProgress, setTakeProgress] = useState<Record<string, number>>({});

  const currentScript = scripts[selectedScript];
  const takes = currentScript?.takes || [];

  const handleGenerate = () => {
    setGenerating(true);
    takes.forEach((take, i) => {
      setTakeProgress((p) => ({ ...p, [take.id]: 0 }));
      const interval = setInterval(() => {
        setTakeProgress((p) => {
          const current = p[take.id] || 0;
          if (current >= 100) {
            clearInterval(interval);
            if (i === takes.length - 1) {
              setTimeout(() => {
                setGenerating(false);
                setGenerated(true);
              }, 500);
            }
            return p;
          }
          return { ...p, [take.id]: current + 2 + Math.random() * 3 };
        });
      }, 100 + i * 50);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            🎬 Geração Visual
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Escolha como os visuais do clip serão criados
          </p>
        </div>
        <Badge variant="secondary" className="bg-violet-100 text-violet-700">
          <Coins className="w-3 h-3 mr-1" />
          3 créditos
        </Badge>
      </div>

      {/* Visual Type Selection */}
      <div className="grid sm:grid-cols-3 gap-4">
        {visualTypes.map((type) => (
          <Card
            key={type.value}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              visual.type === type.value
                ? "border-violet-500 border-2 shadow-lg shadow-violet-500/10 bg-violet-50/50"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => updateVisual({ type: type.value })}
          >
            <CardContent className="pt-5 text-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3",
                  visual.type === type.value
                    ? "bg-gradient-to-br from-violet-500 to-blue-500 text-white"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                <type.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900">{type.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{type.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Takes Grid */}
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Takes do Script
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {takes.map((take, i) => {
              const prog = Math.min(takeProgress[take.id] || 0, 100);
              const isDone = prog >= 100;
              return (
                <div
                  key={take.id}
                  className="rounded-xl border border-gray-200 overflow-hidden"
                >
                  {/* Preview area */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    {generating && !isDone ? (
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 text-violet-500 animate-spin mx-auto mb-2" />
                        <p className="text-xs text-gray-500">
                          Gerando... {Math.round(prog)}%
                        </p>
                      </div>
                    ) : isDone || generated ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-200 to-blue-200 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                          <Film className="w-5 h-5 text-violet-600" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Film className="w-8 h-8 text-gray-300 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Aguardando</p>
                      </div>
                    )}
                    {/* Take number badge */}
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          isDone || generated
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        Take {i + 1}
                      </Badge>
                    </div>
                  </div>

                  {/* Take info */}
                  <div className="p-3">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {take.text}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {take.duration}
                      </span>
                      {(isDone || generated) && (
                        <Check className="w-3 h-3 text-green-500 ml-auto" />
                      )}
                    </div>
                    {generating && !isDone && (
                      <Progress value={prog} className="h-1 mt-2" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Generate button */}
          {!generated && !generating && (
            <div className="text-center mt-6">
              <Button
                onClick={handleGenerate}
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Takes 🎬
              </Button>
            </div>
          )}

          {generated && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Todos os takes foram gerados com sucesso!
              </span>
            </div>
          )}
        </CardContent>
      </Card>

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
