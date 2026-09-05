"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/dashboard/novo-clip");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos de Fundo Neon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0047FF] opacity-10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00E5FF] opacity-10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl shadow-2xl p-8 overflow-hidden">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0047FF] to-[#00E5FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] mb-4">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
              DG Clips Factory
            </h1>
            <p className="text-[#888] text-sm mt-1">Faça login para acessar o estúdio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-[#111] border-[#333] text-white h-12 focus-visible:ring-1 focus-visible:ring-[#00E5FF] focus-visible:border-transparent rounded-lg placeholder:text-[#444]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-[#888] uppercase tracking-wider">Senha</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#111] border-[#333] text-white h-12 focus-visible:ring-1 focus-visible:ring-[#00E5FF] focus-visible:border-transparent rounded-lg placeholder:text-[#444]"
              />
            </div>

            {error && (
              <p className="text-[#FF3366] text-sm font-semibold text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#0047FF] to-[#00E5FF] hover:from-[#0033CC] hover:to-[#00CCEE] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(0,119,255,0.3)] transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar na Plataforma"}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-[#222] text-center">
            <p className="text-xs text-[#666]">
              Ainda não tem conta? <a href="#" className="text-[#00E5FF] hover:underline font-semibold">Fale com um consultor</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
