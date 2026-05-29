import { createOpenAI } from "@ai-sdk/openai";

export function getModel() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Missing env var: OPENAI_API_KEY");
  }

  const modelId = process.env.OPENAI_DEFAULT_MODEL?.trim() || "gpt-4o-mini";

  const openai = createOpenAI({ apiKey });
  
  return openai(modelId);
}