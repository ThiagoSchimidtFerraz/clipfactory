"use client";

import { useClipStore } from "@/store/clip-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight,
  UploadCloud,
  Image as ImageIcon,
  X
} from "lucide-react";
import { useState } from "react";

export default function StepBriefing() {
  const { briefing, updateBriefing, nextStep } = useClipStore();
  const [images, setImages] = useState<string[]>([]);

  const handleFakeUpload = () => {
    if (images.length < 5) {
      setImages([...images, `Foto ${images.length + 1}`]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header do Step */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Adicione suas mídias
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          Comece fazendo o upload das fotos ou vídeos curtos do seu produto.
        </p>
      </div>

      <div className="space-y-8">
        {/* Nome do Produto */}
        <div className="space-y-3">
          <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Qual é o produto?</Label>
          <Input 
            value={briefing.productName}
            onChange={(e) => updateBriefing({ productName: e.target.value })}
            placeholder="Ex: Tênis Runner Air 2.0"
            className="bg-[#0A0A0A] border-[#333] text-white h-12 font-medium focus-visible:ring-1 focus-visible:ring-[#00E5FF] focus-visible:border-transparent rounded-lg text-base shadow-inner"
          />
        </div>

        {/* Upload Área */}
        <div className="space-y-3">
          <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Arquivos (Max 5)</Label>
          
          <div 
            onClick={handleFakeUpload}
            className="border border-dashed border-[#444] bg-[#0A0A0A] hover:bg-[#111] hover:border-[#0047FF] transition-all h-56 flex flex-col items-center justify-center cursor-pointer group rounded-xl"
          >
            <div className="w-14 h-14 bg-[#1A1A1A] group-hover:bg-[#0047FF]/20 rounded-full flex items-center justify-center mb-4 transition-colors">
              <UploadCloud className="w-6 h-6 text-[#666] group-hover:text-[#00E5FF] transition-colors" />
            </div>
            <span className="text-sm font-medium text-white">Clique para selecionar arquivos</span>
            <span className="text-xs text-[#666] mt-1">Arraste e solte fotos ou vídeos aqui</span>
          </div>

          {/* Grid de miniaturas (Mock) */}
          {images.length > 0 && (
            <div className="grid grid-cols-5 gap-3 pt-4">
              {images.map((img, i) => (
                <div key={i} className="aspect-square bg-[#1A1A1A] border border-[#333] relative flex items-center justify-center group rounded-lg overflow-hidden hover:border-[#00E5FF] transition-colors">
                  <ImageIcon className="w-6 h-6 text-[#444] group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-2 left-0 right-0 text-center text-[9px] font-bold text-[#888] uppercase truncate px-1">{img}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 hover:bg-[#FF3366] text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navegação */}
      <div className="flex justify-end pt-6 border-t border-[#222]">
        <Button
          onClick={nextStep}
          disabled={!briefing.productName || images.length === 0}
          className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-semibold text-sm px-8 h-11 rounded-lg transition-all shadow-[0_0_20px_rgba(0,119,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] disabled:opacity-50 disabled:shadow-none"
        >
          Próximo Passo
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}
