"use client";

import { useClipStore } from "@/store/clip-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, PlayCircle, Download } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function StepAssembly() {
  const { briefing, prevStep } = useClipStore();
  const [status, setStatus] = useState<"idle" | "downloading" | "rendering" | "done">("idle");
  const [progress, setProgress] = useState(0);
  
  // Na versão final, isso vem do FFmpeg real gerado. Aqui é para UX demo.
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startRender = async () => {
    setStatus("downloading");
    setProgress(10);
    
    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { fetchFile, toBlobURL } = await import('@ffmpeg/util');
      
      const ffmpeg = new FFmpeg();
      
      ffmpeg.on("progress", ({ progress: p }) => {
        setProgress(10 + Math.round(p * 80)); // 10% a 90%
      });

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      
      setStatus("rendering");

      // 1. Pega o áudio que geramos na store (ou um de teste)
      const audioUrl = briefing.generatedAudioUrl || "https://www.w3schools.com/html/horse.mp3";
      await ffmpeg.writeFile('audio.mp3', await fetchFile(audioUrl));

      // 2. Transforma a primeira mídia do state no arquivo de input do ffmpeg
      const rawMedia = briefing.images && briefing.images.length > 0
        ? briefing.images[0]
        : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1080&auto=format&fit=crop";

      const isVideo = rawMedia.includes(".mp4");
      const inputFilename = isVideo ? 'input_video.mp4' : 'image.png';

      if (rawMedia.startsWith("data:image")) {
        await ffmpeg.writeFile(inputFilename, await fetchFile(rawMedia));
      } else {
        // Usa um proxy ou baixa direto (Pixabay/Pexels costuma liberar CORS)
        try {
            await ffmpeg.writeFile(inputFilename, await fetchFile(rawMedia));
        } catch (e) {
            // Fallback caso dê erro de CORS no download direto
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(rawMedia)}`;
            await ffmpeg.writeFile(inputFilename, await fetchFile(proxyUrl));
        }
      }

      // 2.5 Baixa uma música de fundo royalty-free
      try {
        await ffmpeg.writeFile('music.mp3', await fetchFile('https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'));
      } catch (e) {
        console.warn("Erro ao baixar música, usando sem música");
      }

      // 3. Executa o comando FFmpeg
      if (isVideo) {
        // Se for VÍDEO de fundo (B-Roll): Corta no meio, remove o áudio original dele e junta com a voz e música
        await ffmpeg.exec([
            '-stream_loop', '-1', // Loopa o vídeo infinito até o áudio acabar
            '-i', inputFilename,
            '-i', 'audio.mp3',
            '-i', 'music.mp3',
            '-filter_complex', '[0:v]scale=-2:1920,crop=1080:1920:exact=1[v];[2:a]volume=0.15[bgm];[1:a][bgm]amix=inputs=2:duration=first[a]',
            '-map', '[v]',
            '-map', '[a]',
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-b:a', '192k',
            '-pix_fmt', 'yuv420p',
            '-shortest',
            'output.mp4'
        ]);
      } else {
        // Se for IMAGEM estática: Adiciona o zoompan
        await ffmpeg.exec([
            '-loop', '1', 
            '-i', inputFilename,
            '-i', 'audio.mp3',
            '-i', 'music.mp3',
            '-filter_complex', '[0:v]scale=-2:2000,crop=1080:1920,zoompan=z=\'min(zoom+0.001,1.5)\':d=1500:x=\'iw/2-(iw/zoom/2)\':y=\'ih/2-(ih/zoom/2)\':s=1080x1920[v];[2:a]volume=0.15[bgm];[1:a][bgm]amix=inputs=2:duration=first[a]',
            '-map', '[v]',
            '-map', '[a]',
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-b:a', '192k',
            '-pix_fmt', 'yuv420p',
            '-shortest',
            'output.mp4'
        ]);
      }

      const data = await ffmpeg.readFile('output.mp4');
      const videoBlob = new Blob([data as any], { type: 'video/mp4' });
      setFinalVideoUrl(URL.createObjectURL(videoBlob));
      
      setProgress(100);
      setStatus("done");
      
    } catch (err) {
      console.error(err);
      alert("Erro na renderização. Verifique o console.");
      setStatus("idle");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {status === "done" ? "Clip Finalizado! 🎉" : "Montagem em Andamento"}
        </h2>
        <p className="text-[#A3A3A3] text-sm font-medium">
          {status === "idle" && "Seu vídeo está pronto para ser costurado (Imagens + Áudio + Legendas)."}
          {status === "downloading" && "Baixando vozes neurais e recursos..."}
          {status === "rendering" && "Renderizando o vídeo final usando Inteligência Artificial e FFmpeg."}
          {status === "done" && "Seu vídeo está pronto para fazer suas vendas decolarem."}
        </p>
      </div>

      {/* Área do Player/Status */}
      <div className="bg-[#0A0A0A] border border-[#222] rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center relative">
        {status === "idle" && (
          <Button 
            onClick={startRender}
            className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-bold px-8 h-12 rounded-full shadow-[0_0_30px_rgba(0,229,255,0.4)]"
          >
            <PlayCircle className="w-5 h-5 mr-2" /> Iniciar Renderização
          </Button>
        )}

        {(status === "downloading" || status === "rendering") && (
          <div className="w-full max-w-xs space-y-6 text-center">
            <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin mx-auto" />
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[#888]">
                <span>Progresso</span>
                <span className="text-[#00E5FF]">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#0047FF] to-[#00E5FF] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {status === "done" && finalVideoUrl && (
          <div className="w-full h-full relative aspect-video">
            <video 
              ref={videoRef}
              src={finalVideoUrl} 
              controls 
              autoPlay
              className="w-full h-full object-contain bg-black"
            />
          </div>
        )}
      </div>

      {status === "done" && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            variant="outline"
            onClick={startRender}
            className="w-full sm:w-auto bg-transparent border-[#444] text-white hover:bg-[#1A1A1A] font-semibold h-11 px-8 rounded-lg"
          >
            Renderizar Novamente
          </Button>
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-[#00FF66] to-[#00CC44] hover:from-[#00E65C] hover:to-[#00B33C] text-black font-bold h-11 px-10 rounded-lg shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)]"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar Vídeo (MP4)
          </Button>
        </div>
      )}

      {status !== "done" && status !== "rendering" && (
        <div className="flex justify-start pt-6 border-t border-[#222]">
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="bg-transparent border-[#444] text-[#A3A3A3] hover:bg-[#1A1A1A] hover:text-white font-semibold text-sm rounded-lg h-11 px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      )}
    </div>
  );
}
