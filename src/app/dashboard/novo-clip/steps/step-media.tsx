"use client";

import { useClipStore } from "@/store/clip-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  Image as ImageIcon,
  X
} from "lucide-react";
import { useState, useRef } from "react";

export default function StepMedia() {
  const { prevStep, nextStep } = useClipStore();
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRealUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      // Limita a 5 arquivos totais
      const combined = [...images, ...newImages].slice(0, 5);
      setImages(combined);
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
          Anexe as Fotos do Produto
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          O roteiro e a voz estão prontos! Suba até 5 fotos do produto que você quer vender (elas serão animadas no vídeo).
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
            <span className="text-sm font-semibold text-white">Clique para selecionar as fotos</span>
            <span className="text-xs text-[#666] mt-2">Formatos aceitos: JPG, PNG, WEBP</span>
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
