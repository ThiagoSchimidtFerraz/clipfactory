"use client";

import { useClipStore } from "@/store/clip-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  X
} from "lucide-react";
import { useRef } from "react";

export default function StepMedia() {
  const { briefing, updateBriefing, prevStep, nextStep } = useClipStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = briefing.images || [];

  const handleRealUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (images.length >= 5) return;
      
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const base64Str = event.target.result as string;
            // Pega o estado mais recente para evitar overwrite race condition
            const currentImages = useClipStore.getState().briefing.images || [];
            if (currentImages.length < 5) {
                updateBriefing({ images: [...currentImages, base64Str] });
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    updateBriefing({ images: updated });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header do Step */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          As Imagens do Produto
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          Você pode subir fotos reais ou deixar nossa IA Mágica gerar imagens conceituais do seu produto do zero!
        </p>
      </div>

      <div className="space-y-8">
        
        <div className="grid sm:grid-cols-2 gap-4">
            {/* Upload Box */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Subir minhas fotos (Max 5)</Label>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleRealUpload} 
                accept="image/*" 
                multiple 
                className="hidden" 
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-[#444] bg-[#0A0A0A] hover:bg-[#111] hover:border-[#0047FF] transition-all h-64 flex flex-col items-center justify-center cursor-pointer group rounded-xl"
              >
                <div className="w-16 h-16 bg-[#1A1A1A] group-hover:bg-[#0047FF]/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <UploadCloud className="w-7 h-7 text-[#666] group-hover:text-[#00E5FF] transition-colors" />
                </div>
                <span className="text-sm font-semibold text-white">Upload de Fotos Reais</span>
                <span className="text-xs text-[#666] mt-2 text-center px-4">Suba as fotos da sua galeria</span>
              </div>
            </div>

            {/* AI Generate Box */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Deixar a IA Criar</Label>
              
              <div className="flex flex-col gap-2 h-64">
                  <textarea 
                    id="ai-scenario-input"
                    placeholder="Ex: Pessoa correndo no parque num dia ensolarado..."
                    className="w-full bg-[#0A0A0A] border border-[#333] hover:border-[#00E5FF] focus:border-[#00E5FF] transition-all text-white p-3 rounded-lg text-sm resize-none h-20 outline-none"
                  />
                  
                  <div className="flex gap-2 flex-1">
                      {/* Botão de Imagem IA */}
                      <div 
                        onClick={async () => {
                            if (images.length >= 5) return;
                            const btn = document.getElementById("ai-btn-text");
                            const scenarioInput = document.getElementById("ai-scenario-input") as HTMLTextAreaElement;
                            const customScenario = scenarioInput?.value || "in a natural environment";
                            
                            if(btn) btn.innerText = "...";
                            
                            try {
                                const basePrompt = `cinematic lifestyle photography of ${briefing.productName || "a luxury product"}, ${customScenario}, held or used by an authentic brazilian person with clear natural skin, realistic brazilian features, hyperrealistic, professional 8k resolution, no foreign stereotypes, perfect product showcase`;
                                
                                const res = await fetch("/api/generate-image", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ prompt: basePrompt })
                                });
                                
                                const data = await res.json();
                                
                                if (data.image) {
                                    const current = useClipStore.getState().briefing.images || [];
                                    updateBriefing({ images: [...current, data.image] });
                                    if(btn) btn.innerText = "Gerar Imagem";
                                } else {
                                    throw new Error(data.error || "Erro desconhecido");
                                }
                            } catch (e) {
                                console.error(e);
                                alert("Erro ao gerar imagem. Tente novamente.");
                                if(btn) btn.innerText = "Gerar Imagem";
                            }
                        }}
                        className="border border-[#333] bg-[#111] hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all flex-1 flex flex-col items-center justify-center cursor-pointer group rounded-xl relative overflow-hidden"
                      >
                        <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-2 transition-colors relative z-10 border border-[#222] group-hover:border-[#00E5FF]/50">
                          <span className="text-lg">✨</span>
                        </div>
                        <span id="ai-btn-text" className="text-xs font-semibold text-white relative z-10">Gerar Imagem</span>
                      </div>

                      {/* Botão de Vídeo B-Roll (Pixabay) */}
                      <div 
                        onClick={async () => {
                            if (images.length >= 5) return;
                            const btn = document.getElementById("vid-btn-text");
                            const scenarioInput = document.getElementById("ai-scenario-input") as HTMLTextAreaElement;
                            const q = encodeURIComponent(scenarioInput?.value || briefing.productName || "lifestyle");
                            
                            if(btn) btn.innerText = "Buscando...";
                            
                            try {
                                // Usa a chave fornecida pelo usuário
                                const apiKey = "57387230-91862bf503483aead7cc2d79d";
                                const url = `https://pixabay.com/api/videos/?key=${apiKey}&q=${q}&video_type=film&per_page=3&safesearch=true`;
                                
                                const res = await fetch(url);
                                const data = await res.json();
                                
                                if (data.hits && data.hits.length > 0) {
                                    // Pega o primeiro vídeo da busca (preferência por vídeos verticais ou o melhor tamanho)
                                    const hit = data.hits[0];
                                    const videoUrl = hit.videos.medium.url || hit.videos.tiny.url;
                                    
                                    const current = useClipStore.getState().briefing.images || [];
                                    // Salvamos a URL do vídeo na lista (assembly.tsx vai detectar se for .mp4)
                                    updateBriefing({ images: [...current, videoUrl] });
                                    if(btn) btn.innerText = "Puxar Vídeo";
                                } else {
                                    alert("Nenhum vídeo encontrado para este cenário. Tente palavras em inglês (ex: runner, gym, office) para achar mais fácil.");
                                    if(btn) btn.innerText = "Puxar Vídeo";
                                }
                            } catch (e) {
                                console.error(e);
                                alert("Erro ao buscar vídeo.");
                                if(btn) btn.innerText = "Puxar Vídeo";
                            }
                        }}
                        className="border border-[#333] bg-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_0_20px_rgba(0,71,255,0.2)] transition-all flex-1 flex flex-col items-center justify-center cursor-pointer group rounded-xl relative overflow-hidden"
                      >
                        <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-2 transition-colors relative z-10 border border-[#222] group-hover:border-[#0047FF]/50">
                          <span className="text-lg">🎬</span>
                        </div>
                        <span id="vid-btn-text" className="text-xs font-semibold text-white relative z-10 text-center">Puxar Vídeo<br/>Real</span>
                      </div>
                  </div>
              </div>
            </div>
        </div>

        {/* Grid de miniaturas */}
        {images.length > 0 && (
          <div className="space-y-3">
             <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Mídia Pronta para o Vídeo</Label>
             <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {images.map((imgUrl, i) => (
                <div key={i} className="aspect-square bg-[#1A1A1A] border border-[#333] relative flex items-center justify-center group rounded-lg overflow-hidden hover:border-[#00E5FF] transition-colors">
                  {imgUrl.includes(".mp4") ? (
                    <video src={imgUrl} autoPlay loop muted className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <img src={imgUrl} alt={`Produto ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-[#FF3366] text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
          onClick={nextStep}
          disabled={images.length === 0}
          className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-semibold text-sm px-8 h-11 rounded-lg transition-all shadow-[0_0_20px_rgba(0,119,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] disabled:opacity-50 disabled:shadow-none"
        >
          Pronto para Montagem
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}
