"use client";

import { useClipStore } from "@/store/clip-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Link2,
  Plus,
  CheckCircle2,
  Play,
  Clock,
  Monitor,
  FileVideo,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function StepDownload() {
  const { briefing, reset } = useClipStore();

  const handleCopyLink = () => {
    toast.success("Link copiado para a área de transferência!");
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Seu clip está pronto! 🎉
        </h2>
        <p className="text-gray-500 mt-2">
          Parabéns! Seu vídeo foi renderizado com sucesso.
        </p>
      </div>

      {/* Video Preview */}
      <Card className="border-gray-200 max-w-2xl mx-auto overflow-hidden">
        <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-blue-900/30" />
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto cursor-pointer hover:bg-white/30 transition-colors">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-500 text-white text-xs">Pronto</Badge>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        <Card className="border-gray-200">
          <CardContent className="pt-4 text-center">
            <Clock className="w-5 h-5 text-violet-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">28s</p>
            <p className="text-xs text-gray-500">Duração</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-4 text-center">
            <Monitor className="w-5 h-5 text-violet-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">{briefing.format}</p>
            <p className="text-xs text-gray-500">Formato</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-4 text-center">
            <FileVideo className="w-5 h-5 text-violet-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">~12MB</p>
            <p className="text-xs text-gray-500">Tamanho</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <Button
          size="lg"
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 shadow-lg shadow-green-500/20"
        >
          <Download className="w-5 h-5 mr-2" />
          Baixar MP4
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          onClick={handleCopyLink}
        >
          <Link2 className="w-5 h-5 mr-2" />
          Copiar Link
        </Button>
      </div>

      {/* New Clip */}
      <div className="text-center pt-6 border-t">
        <p className="text-sm text-gray-500 mb-3">Quer criar mais clips?</p>
        <Link href="/dashboard/novo-clip">
          <Button
            variant="outline"
            className="border-violet-200 text-violet-600 hover:bg-violet-50"
            onClick={reset}
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Outro Clip
          </Button>
        </Link>
      </div>
    </div>
  );
}
