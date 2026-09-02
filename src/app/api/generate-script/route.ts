import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { productName, productUrl, productDetails, objective, visualStyle } = await req.json();

    if (!productName) {
      return NextResponse.json({ error: "Nome do produto é obrigatório" }, { status: 400 });
    }

    const prompt = `Você é um copywriter de altíssima conversão focado em e-commerce (Mercado Livre, Shopee) e anúncios de vídeo no TikTok/Reels.
Eu estou vendendo o produto: "${productName}".
${productDetails ? `Detalhes e benefícios do produto: ${productDetails}` : ''}
${productUrl ? `Link de referência: ${productUrl}` : ''}
O objetivo deste vídeo é: ${objective === 'escassez' ? 'Criar senso de urgência e promoção relâmpago' : objective === 'desejo' ? 'Criar desejo mostrando os benefícios premium' : 'Venda direta e agressiva'}.
A direção de arte será: ${visualStyle}.

Crie um roteiro de venda curto (máximo de 3 a 5 frases curtas) para ser narrado num vídeo de até 15 segundos.
A estrutura OBRIGATÓRIA deve ser:
1. Um gancho agressivo/forte (quebra de padrão).
2. O maior benefício do produto (não foque apenas em características técnicas, foque na dor que ele resolve).
3. Chamada para ação (CTA) imperativa e com senso de urgência.

Não inclua cabeçalhos como "Gancho:" no meio do texto, me dê o texto corrido e pronto para ser copiado e colado num gerador de voz.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const script = response.text || "";

    return NextResponse.json({ script });
  } catch (error: any) {
    console.error("Erro na API do Gemini:", error);
    return NextResponse.json(
      { error: "Falha ao gerar roteiro", details: error.message },
      { status: 500 }
    );
  }
}
