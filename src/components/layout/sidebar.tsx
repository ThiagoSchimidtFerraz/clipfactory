"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Film, 
  Settings, 
  CreditCard,
  Plus,
  Flame,
  Menu,
  LogOut,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard/novo-clip", label: "Criar Vídeo", icon: Plus },
  { href: "/dashboard/meus-clips", label: "Meus Vídeos", icon: Film },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session) {
      fetch("/api/user/balance")
        .then(res => res.json())
        .then(data => {
          setBalance(data.balance);
          setIsAdmin(data.role === "ADMIN");
        });
    }
  }, [session]);

  const NavContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex flex-col h-full bg-[#050505] border-r border-[#1A1A1A]">
      <div className="h-20 flex items-center px-6 border-b border-[#1A1A1A]">
        <Link href="/dashboard/novo-clip" onClick={onNavigate} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0047FF] to-[#00E5FF] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-white uppercase tracking-tighter">
            Digital Growth
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate}>
              <span
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group",
                  isActive
                    ? "bg-[#111] text-white border border-[#333]"
                    : "text-[#888] hover:bg-[#0A0A0A] hover:text-[#ccc] border border-transparent"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-[#00E5FF]" : "text-[#555] group-hover:text-[#888]"
                  )}
                />
                {item.label}
              </span>
            </Link>
          );
        })}

        {isAdmin && (
          <Link href="/dashboard/admin" onClick={onNavigate}>
            <span
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group mt-4",
                pathname.startsWith("/dashboard/admin")
                  ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                  : "text-[#FF3366]/70 hover:bg-[#FF3366]/5 hover:text-[#FF3366] border border-transparent"
              )}
            >
              <ShieldAlert className="w-5 h-5 transition-colors" />
              Painel Admin
            </span>
          </Link>
        )}
      </div>

      <div className="p-4">
        <div className="bg-[#0A0A0A] border border-[#222] p-4 text-center rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0047FF] to-[#00E5FF]" />
          <p className="text-[10px] font-semibold text-[#888] uppercase tracking-widest mb-1">Saldo</p>
          <p className="text-3xl font-bold text-white">
            {balance !== null ? balance : "..."} <span className="text-xs font-semibold text-[#666]">clips</span>
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-[#1A1A1A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center font-bold text-white uppercase text-xs">
            {session?.user?.email?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{session?.user?.email || "Carregando..."}</p>
            <button onClick={() => signOut()} className="text-[10px] font-bold text-[#FF3366] hover:underline uppercase flex items-center gap-1 mt-1">
              <LogOut className="w-3 h-3" /> Sair da conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-40">
        <NavContent />
      </aside>

      {/* Mobile */}
      <div className="lg:hidden fixed top-0 w-full bg-[#050505] border-b border-[#1A1A1A] z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/dashboard/novo-clip" className="flex items-center gap-2">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D0BAQHtQXlUbx-vcQ/company-logo_200_200/company-logo_200_200/0/1739128490716/digital_growth_br_logo?e=2147483647&v=beta&t=NTqSOjCRovYBgacHSy2Jj4DxtTaiBUmaJNS9HDLWwB8" 
              alt="Digital Growth Logo" 
              className="w-7 h-7 rounded-md"
            />
            <span className="text-lg font-black text-white uppercase tracking-tighter">
              Digital Growth
            </span>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="text-white hover:bg-[#111] p-2 rounded-md">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r-[#1A1A1A]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <NavContent onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
