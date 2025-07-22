export const generateRefreshSuggestion = async (): Promise<string> => {
  try {
    // サーバーサイドのAPIルートを呼び出す
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      // バックエンドからのエラーメッセージをログに出力
      console.error("API Route Error Response:", errorData.message);
      throw new Error(
        errorData.message || "Failed to fetch suggestion from API route."
      );
    }

    const data = await response.json();
    return data.suggestion;
  } catch (err: any) {
    console.error(
      err,
      "Failed to generate suggestion (client-side fetch error)"
    );
    return "エラーが発生しました";
  }
};
