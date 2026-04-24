import { API_BASE } from "@/lib/api";
import { useState } from "react";

export function useTranslation() {
  const [translatedHtml, setTranslatedHtml] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);

  const translate = async (bodyHtml: string, sourceLang: string) => {
    if (translatedHtml) {
      setTranslatedHtml(null);
      return;
    }
    setTranslating(true);
    try {
      const response = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: bodyHtml,
          targetLang: sourceLang === "ja" ? "EN" : "JA",
        }),
      });
      const data = await response.json();
      setTranslatedHtml(data.translatedText);
    } catch {
      console.error("Translation failed");
    } finally {
      setTranslating(false);
    }
  };

  const reset = () => setTranslatedHtml(null);

  return { translatedHtml, translating, translate, reset };
}
