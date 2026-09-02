"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Film,
  Download,
  Copy,
  Trash2,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const tabs = ["Todos", "Prontos", "Processando", "Rascunhos"];

const mockClips: any[] = [];

export default function MeusClipsPage() {
  const [activeTab, setActiveTab] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredClips = mockClips;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            🎬 Meus Vídeos
          </h1>
          <p className="text-[#A3A3A3] mt-1 text-sm font-medium">
            Você ainda não criou nenhum vídeo.
          </p>
        </div>
        <Link href="/dashboard/novo-clip">
          <Button className="bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-bold h-11 px-6 rounded-lg shadow-[0_0_20px_rgba(0,119,255,0.3)]">
            <Plus className="w-4 h-4 mr-2" />
            Criar Novo Vídeo
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-1 bg-[#0A0A0A] border border-[#222] rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === tab
                  ? "bg-[#1A1A1A] text-white shadow-sm"
                  : "text-[#888] hover:text-[#ccc]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
          <Input
            placeholder="Buscar vídeos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#0A0A0A] border-[#333] text-white h-10 focus-visible:ring-[#00E5FF] rounded-lg"
          />
        </div>
      </div>

      {/* Empty State */}
      <Card className="border border-dashed border-[#333] bg-transparent">
        <CardContent className="py-24 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6">
            <Film className="w-8 h-8 text-[#00E5FF]" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Nenhum vídeo encontrado
          </h3>
          <p className="text-sm text-[#888] mt-2 max-w-sm">
            Seus vídeos renderizados aparecerão aqui. Clique no botão abaixo para gerar sua primeira conversão!
          </p>
          <Link href="/dashboard/novo-clip">
            <Button className="mt-8 bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-bold h-11 px-8 rounded-lg shadow-[0_0_20px_rgba(0,119,255,0.3)]">
              <Plus className="w-4 h-4 mr-2" />
              Criar Meu Primeiro Vídeo
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
