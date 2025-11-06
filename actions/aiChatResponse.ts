import { generateText, type ModelMessage } from "ai";

export default async function aiChatResponse(messages: ModelMessage[]) {
  const result = await generateText({
    model: "openai/gpt-5-mini",
    messages,
  });

  return {
    role: "assistant",
    content: result.text,
  };
}
