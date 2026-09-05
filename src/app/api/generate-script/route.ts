import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productName, productUrl, productDetails, objective, visualStyle, aiModel, videoLength } = await req.json();

    if (!productName) {
      return NextResponse.json({ error: "Nome do produto é obrigatório" }, { status: 400 });
    }

    const maxDuration = videoLength || 15;

    const prompt = `Você é um copywriter de altíssima conversão e diretor de arte focado em vídeos curtos (TikTok/Reels).
Produto: "${productName}".
${productDetails ? `Detalhes: ${productDetails}` : ''}
${productUrl ? `Referência: ${productUrl}` : ''}
Objetivo: ${objective === 'escassez' ? 'Urgência e promoção relâmpago' : objective === 'desejo' ? 'Criar desejo com benefícios premium' : 'Venda direta e agressiva'}.
Estilo Visual: ${visualStyle}.

Crie um roteiro estritamente para um vídeo de até ${maxDuration} segundos.
Você OBRIGATORIAMENTE DEVE retornar APENAS um objeto JSON válido (sem textos antes ou depois, sem crases de markdown).
Estrutura do JSON:
{
  "visualDirection": "Descreva o ambiente, tipo de imagem de fundo ou câmera (ex: Câmera rápida, fundo de academia luxuosa).",
  "musicVibe": "Descreva o estilo da música de fundo (ex: Eletrônica tensa, Hip-hop motivacional).",
  "spokenScript": "O texto EXATO que será narrado. Para ${maxDuration} segundos, escreva no MÁXIMO ${Math.max(1, Math.floor(maxDuration / 4))} frases. Crie um gancho agressivo, foque na dor e termine com CTA imperativo. Sem cabeçalhos ou dicas, apenas a fala crua."
}`;

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
        max_tokens: 500 // Aumentado um pouco para caber o JSON completo
      })
    });

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content || "";
    
    // Tenta limpar caso a IA retorne com marcação de markdown (```json ... ```)
    content = content.replace(/```json/gi, '').replace(/```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch(e) {
      // Se falhar o parse, retorna o texto puro como fallback
      parsed = { 
        visualDirection: "Cenário focado no produto.", 
        musicVibe: "Música de fundo envolvente.", 
        spokenScript: content 
      };
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Erro no OpenRouter:", error);
    return NextResponse.json({ error: "Falha ao gerar roteiro", details: error.message }, { status: 500 });
  }
}
