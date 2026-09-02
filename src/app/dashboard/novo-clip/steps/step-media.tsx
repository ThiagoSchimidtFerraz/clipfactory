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
          Anexe as Fotos do Produto
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          O roteiro e a voz estão prontos! Suba até 5 fotos reais do produto (usaremos elas no vídeo). O link do passo 1 foi usado só para criar a narração.
        </p>
      </div>

      <div className="space-y-8">
        {/* Upload Área */}
        <div className="space-y-3">
          <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Fotos do Produto (Max 5)</Label>
          
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
            <span className="text-sm font-semibold text-white">Clique para selecionar as fotos reais</span>
            <span className="text-xs text-[#666] mt-2">Nós vamos estampar essas fotos no vídeo renderizado.</span>
          </div>

          {/* Grid de miniaturas (Real) */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
              {images.map((imgUrl, i) => (
                <div key={i} className="aspect-square bg-[#1A1A1A] border border-[#333] relative flex items-center justify-center group rounded-lg overflow-hidden hover:border-[#00E5FF] transition-colors">
                  <img src={imgUrl} alt={`Produto ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-[#FF3366] text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
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
