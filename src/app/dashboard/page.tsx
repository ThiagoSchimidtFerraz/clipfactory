import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redireciona o usuário direto para o passo a passo de criação
  // Assim que ele logar, já cai na esteira. Zero distrações.
  redirect("/dashboard/novo-clip");
}
