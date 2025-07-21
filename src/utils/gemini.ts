import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API クライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateRefreshSuggestion(): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "1分でできる簡単なリフレッシュ方法を1行で教えて";

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (error) {
    console.error("Failed to generate suggestion:", error);
    return "エラーが発生しました";
  }
}
