import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "No prompt" }, { status: 400 });

    const safePrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${safePrompt}?width=1080&height=1920&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'image/jpeg'
      }
    });

    if (!res.ok) throw new Error("Failed to fetch image");

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;

    return NextResponse.json({ image: base64 });
  } catch (error: any) {
    console.error("Image generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
