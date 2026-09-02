import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: { creditBalance: true, role: true }
  });
  
  return NextResponse.json({ balance: user?.creditBalance || 0, role: user?.role });
}
