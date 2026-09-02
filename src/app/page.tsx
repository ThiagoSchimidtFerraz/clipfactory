"use client";

import { Button } from "@/components/ui/button";
import { Play, ArrowRight, CheckCircle2, Flame, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] selection:bg-[#00E5FF] selection:text-black">
      {/* Navbar Minimalista */}
      <nav className="fixed w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D0BAQHtQXlUbx-vcQ/company-logo_200_200/company-logo_200_200/0/1739128490716/digital_growth_br_logo?e=2147483647&v=beta&t=NTqSOjCRovYBgacHSy2Jj4DxtTaiBUmaJNS9HDLWwB8" 
              alt="Digital Growth Logo" 
              className="w-8 h-8 rounded-md"
            />
            <span className="text-xl font-black text-white tracking-tighter uppercase">
              Digital Growth
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-[#A3A3A3] hover:text-white uppercase tracking-wide hidden sm:block">
              Acesso
            </Link>
            <Link href="/login">
              <Button className="bg-[#0047FF] hover:bg-[#0033CC] text-white font-bold px-8 h-12 text-sm tracking-wide uppercase rounded-none border-b-4 border-[#002299] active:border-b-0 active:translate-y-1 transition-all">
                Testar Agora
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section Agressiva */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Gradients de Fundo (Neon style) */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#0047FF]/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[150px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-full mb-8">
            <Flame className="w-4 h-4 text-[#FF3366]" fill="currentColor" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Atenção Sellers de Alta Performance</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-black text-white uppercase leading-[0.95] tracking-tighter">
            PARE DE PERDER VENDAS POR FALTA DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0047FF]">VÍDEO</span>.
          </h1>
          
          <p className="mt-8 text-xl sm:text-2xl text-[#A3A3A3] max-w-3xl mx-auto font-medium">
            Transforme seus anúncios estáticos em <strong className="text-white font-bold">clips virais de alta conversão</strong> em menos de 5 minutos, usando a mesma inteligência artificial das top agências.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#00E5FF] hover:bg-[#00CCEE] text-black font-black text-lg px-12 h-16 uppercase tracking-wider rounded-none border-b-4 border-[#0099B3] active:border-b-0 active:translate-y-1 transition-all">
                Quero Escalar Minhas Vendas
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-[#A3A3A3] font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#00FF66]" />
              <span>2 Vídeos Grátis para testar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video VSL Area (Digital Growth Style) */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1A1A1A] border border-[#333] p-2 sm:p-4 rounded-xl shadow-[0_0_50px_rgba(0,71,255,0.15)]">
            <div className="aspect-video bg-black relative flex items-center justify-center cursor-pointer group rounded-lg overflow-hidden border border-[#333]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 w-24 h-24 bg-[#0047FF] flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300">
                <Play className="w-10 h-10 text-white ml-2" fill="currentColor" />
              </div>
              
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase animate-pulse">
                Ao Vivo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Esteira de Produção */}
      <section className="py-32 px-6 bg-[#050505] border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter">
              A Sua Nova Esteira <br/>
              <span className="text-[#00E5FF]">De Produção Automática</span>
            </h2>
            <p className="mt-6 text-xl text-[#A3A3A3] max-w-2xl mx-auto">
              Esqueça editores freelancers caros e demorados. Nossa IA faz tudo no modo passo a passo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "O Briefing", desc: "Diga o que você vende. Nossa IA estuda o produto e o público-alvo em segundos." },
              { num: "02", title: "O Script de Venda", desc: "Geramos 3 scripts aplicando os mesmos gatilhos mentais das agências que faturam milhões." },
              { num: "03", title: "A Voz Que Vende", desc: "Vozes ultrarrealistas em português que geram conexão imediata com seu cliente." },
              { num: "04", title: "O Visual de Impacto", desc: "A IA busca ou gera as cenas perfeitas pra prender a atenção nos primeiros 3 segundos." },
              { num: "05", title: "A Montagem Final", desc: "Música, legenda dinâmica e cortes rápidos. Tudo montado sozinho e renderizado." },
              { num: "06", title: "O Lucro", desc: "Baixe o vídeo pronto, suba no Mercado Livre / Ads e veja a mágica do CTR alto acontecer." }
            ].map((step, i) => (
              <div key={i} className="bg-[#111] border border-[#222] p-8 hover:border-[#00E5FF] transition-colors group">
                <div className="text-6xl font-black text-[#222] group-hover:text-[#0047FF] transition-colors mb-4 font-mono tracking-tighter leading-none">
                  {step.num}
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[#A3A3A3] font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA Final */}
      <section className="py-32 px-6 bg-[#0047FF] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <TrendingUp className="w-16 h-16 text-[#00E5FF] mx-auto mb-8" />
          <h2 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            A ESCALA EXIGE <br/> VELOCIDADE.
          </h2>
          <p className="mt-8 text-2xl text-blue-100 font-medium max-w-2xl mx-auto">
            Gere seu primeiro vídeo agora mesmo. Sem setup complexo, sem mensalidade presa. Você só paga pelos vídeos que renderizar.
          </p>

          <Link href="/login" className="inline-block mt-12">
            <Button className="bg-[#00E5FF] hover:bg-white text-black font-black text-xl px-16 h-20 uppercase tracking-widest rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[10px] hover:translate-y-[10px] transition-all border-2 border-black">
              Criar Conta e Começar
            </Button>
          </Link>
          <p className="mt-6 text-blue-200 font-bold uppercase tracking-widest text-sm">
            Garantia incondicional de 7 dias
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-[#050505] py-12 px-6 border-t border-[#222]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00E5FF]" fill="currentColor" />
            <span className="text-xl font-black text-white uppercase tracking-tighter">
              Digital Growth Clips
            </span>
          </div>
          <p className="text-[#666] font-medium text-sm">
            © {new Date().getFullYear()} Digital Growth Clips. Plataforma exclusiva para vendedores de alta performance.
          </p>
        </div>
      </footer>
    </div>
  );
}
