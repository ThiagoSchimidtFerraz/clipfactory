"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Starter",
    clips: 5,
    price: 299,
    perClip: "59,80",
    popular: false,
    features: ["5 clips", "Voiceover PT-BR", "Download MP4", "Suporte email"],
  },
  {
    name: "Growth",
    clips: 15,
    price: 697,
    perClip: "46,47",
    popular: true,
    features: [
      "15 clips",
      "Voiceover PT-BR",
      "Download MP4/4K",
      "Legendas automáticas",
      "Suporte prioritário",
    ],
  },
  {
    name: "Scale",
    clips: 50,
    price: 1997,
    perClip: "39,94",
    popular: false,
    features: [
      "50 clips",
      "Tudo do Growth",
      "Templates premium",
      "Batch generation",
      "Suporte dedicado",
    ],
  },
  {
    name: "Enterprise",
    clips: 150,
    price: 4497,
    perClip: "29,98",
    popular: false,
    features: [
      "150 clips",
      "Tudo do Scale",
      "Voz clonada",
      "Avatar personalizado",
      "API access",
      "Account manager",
    ],
  },
];

const transactions = [
  { id: 1, date: "01/09/2026", type: "Compra", pack: "Growth", amount: "+15", balance: 25 },
  { id: 2, date: "31/08/2026", type: "Uso", pack: "Clip gerado", amount: "-1", balance: 10 },
  { id: 3, date: "30/08/2026", type: "Uso", pack: "Clip gerado", amount: "-1", balance: 11 },
  { id: 4, date: "28/08/2026", type: "Uso", pack: "Clip gerado", amount: "-1", balance: 12 },
  { id: 5, date: "25/08/2026", type: "Compra", pack: "Starter", amount: "+5", balance: 13 },
  { id: 6, date: "20/08/2026", type: "Bônus", pack: "Cadastro", amount: "+2", balance: 8 },
];

export default function CreditosPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          💳 Créditos
        </h1>
        <p className="text-gray-500 mt-1">
          Compre créditos para gerar clips com IA
        </p>
      </div>

      {/* Current Balance */}
      <Card className="border-0 bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-xl shadow-violet-500/20">
        <CardContent className="py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70 uppercase tracking-wider font-medium">
                Saldo Atual
              </p>
              <p className="text-5xl font-bold mt-2">25</p>
              <p className="text-sm text-white/70 mt-1">clips disponíveis</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Coins className="w-8 h-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Pacotes de Créditos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={cn(
                "relative overflow-hidden transition-shadow hover:shadow-lg",
                pkg.popular
                  ? "border-violet-500 border-2 shadow-lg shadow-violet-500/10"
                  : "border-gray-200"
              )}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold text-center py-1">
                  <Star className="w-3 h-3 inline mr-1" />
                  Mais Popular
                </div>
              )}
              <CardContent className={cn("pt-6", pkg.popular && "pt-10")}>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {pkg.name}
                </h3>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-gray-900">
                    R\${pkg.price.toLocaleString("pt-BR")}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-violet-100 text-violet-700"
                >
                  {pkg.clips} clips
                </Badge>
                <p className="text-xs text-gray-500 mt-1">
                  R\${pkg.perClip} por clip
                </p>

                <ul className="mt-4 space-y-2">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full mt-5",
                    pkg.popular
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90"
                      : ""
                  )}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Comprar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Histórico de Transações
        </h2>
        <Card className="border-gray-200">
          <div className="divide-y">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                      t.type === "Compra"
                        ? "bg-green-100 text-green-600"
                        : t.type === "Bônus"
                        ? "bg-violet-100 text-violet-600"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {t.type === "Compra" ? "+" : t.type === "Bônus" ? "🎁" : "-"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {t.pack}
                    </p>
                    <p className="text-xs text-gray-500">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      t.amount.startsWith("+")
                        ? "text-green-600"
                        : "text-gray-600"
                    )}
                  >
                    {t.amount} clip{Math.abs(parseInt(t.amount)) !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-gray-400">
                    Saldo: {t.balance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
