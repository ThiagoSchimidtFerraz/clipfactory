"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Users, Coins, Trash2 } from "lucide-react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credits, setCredits] = useState("25");

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (data.users) setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, credits: parseInt(credits) })
    });
    setEmail("");
    setPassword("");
    setCredits("25");
    fetchUsers();
  };

  const handleAddCredits = async (userId: string, amount: number) => {
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, addCredits: amount })
    });
    fetchUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    if(!confirm("Tem certeza que deseja deletar este cliente?")) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId })
    });
    fetchUsers();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <Users className="w-8 h-8 text-[#00E5FF]" />
          Gestão de Clientes
        </h1>
        <p className="text-[#888] mt-1 text-sm font-medium">
          Área restrita. Crie contas de clientes e libere saldo de vídeos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Formulário de Criação */}
        <Card className="bg-[#0A0A0A] border-[#222] md:col-span-1">
          <CardHeader>
            <CardTitle className="text-white text-lg">Novo Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-[#888] uppercase">Email do Cliente</Label>
                <Input required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#111] border-[#333] text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#888] uppercase">Senha de Acesso</Label>
                <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#111] border-[#333] text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#888] uppercase">Saldo Inicial (Clips)</Label>
                <Input required type="number" value={credits} onChange={(e) => setCredits(e.target.value)} className="bg-[#111] border-[#333] text-white" />
              </div>
              <Button type="submit" className="w-full bg-[#00E5FF] hover:bg-[#00CCEE] text-black font-bold">
                <Plus className="w-4 h-4 mr-2" /> Cadastrar Cliente
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tabela de Usuários */}
        <div className="md:col-span-2 space-y-4">
          {users.map(u => (
            <div key={u.id} className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-bold">{u.email}</p>
                <p className="text-xs text-[#666] uppercase mt-1">Saldo: <span className="text-[#00E5FF] font-bold">{u.creditBalance}</span> clips</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleAddCredits(u.id, 10)} size="sm" variant="outline" className="border-[#333] text-[#888] hover:text-white hover:bg-[#1A1A1A]">
                  <Coins className="w-4 h-4 mr-2" /> +10 Créditos
                </Button>
                {u.role !== "ADMIN" && (
                  <Button onClick={() => handleDeleteUser(u.id)} size="sm" variant="ghost" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {users.length === 0 && <p className="text-[#666] text-sm">Carregando clientes...</p>}
        </div>

      </div>
    </div>
  );
}
