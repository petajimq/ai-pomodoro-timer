import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Gemini API クライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
  # 命令
  作業の合間にできる簡単なリフレッシュ方法を1つ提案してください。

  # 制約事項
  - 1～2分程度でできること
  - 室内でできること
  - 体を動かすこと
  - 絵文字を1つ含めること
  - 簡潔に1文の中に収めること
  - 「～しよう」のように提案する形で終わること

  # 出力例
  - 大きく背伸びしよう😀
  - 室内で少しだけ歩こう🚶‍♂️
`;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ suggestion: text.trim() }, { status: 200 });
  } catch (err: any) {
    console.error("Gemini API Error in API route:", err);
    return NextResponse.json(
      { message: "ゆっくり深呼吸をしよう😺" },
      { status: 500 }
    );
  }
}
