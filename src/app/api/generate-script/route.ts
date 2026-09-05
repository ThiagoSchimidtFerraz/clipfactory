import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productName, productUrl, productDetails, objective, visualStyle, aiModel } = await req.json();

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

    // Se o usuário não mandar o modelo do front, usa o Nvidia grátis pra não estourar a conta
    const modelToUse = aiModel || "nvidia/nemotron-3.5-lightning:free";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300 // Roteiro é pequeno. Isso evita erro "402 Payment Required" por projeção de saldo.
      })
    });

    if (!response.ok) {
        throw new Error(`Erro na API do OpenRouter: ${response.statusText}`);
    }

    const data = await response.json();
    const script = data.choices[0].message.content || "";

    return NextResponse.json({ script });
  } catch (error: any) {
    console.error("Erro no OpenRouter:", error);
    return NextResponse.json(
      { error: "Falha ao gerar roteiro", details: error.message },
      { status: 500 }
    );
  }
}
