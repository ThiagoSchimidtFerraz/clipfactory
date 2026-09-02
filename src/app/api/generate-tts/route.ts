import { NextRequest, NextResponse } from "next/server";
import { EdgeTTS } from "node-edge-tts";
import path from "path";
import fs from "fs/promises";
import os from "os";

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "pt-BR-AntonioNeural" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Texto é obrigatório" }, { status: 400 });
    }

    const tts = new EdgeTTS({ voice, lang: "pt-BR" });
    
    // Gera um nome temporário seguro para o arquivo
    const tempFileName = `tts-${Date.now()}-${Math.random().toString(36).substring(7)}.mp3`;
    const tempFilePath = path.join(os.tmpdir(), tempFileName);

    // Usa a biblioteca free (Microsoft Edge) para gerar a voz e salvar no arquivo
    await tts.ttsPromise(text, tempFilePath);

    // Lê o arquivo gerado
    const audioBuffer = await fs.readFile(tempFilePath);

    // Apaga o temporário pra não lotar o servidor
    await fs.unlink(tempFilePath).catch(console.error);

    // Devolve o áudio direto pro frontend tocar
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="narration.mp3"`,
      },
    });
  } catch (error: any) {
    console.error("Erro no Edge TTS:", error);
    return NextResponse.json(
      { error: "Falha ao gerar narração", details: error.message },
      { status: 500 }
    );
  }
}
