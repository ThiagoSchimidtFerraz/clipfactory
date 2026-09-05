import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/auth-provider";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "DG Clips Factory | Escale suas vendas",
  description: "Crie clips de alta conversão para seus produtos em minutos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} font-sans antialiased bg-black text-white selection:bg-[#00E5FF] selection:text-black`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster theme="dark" richColors />
      </body>
    </html>
  );
}
