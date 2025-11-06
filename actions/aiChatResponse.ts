import { streamText, convertToModelMessages } from "ai";

export default async function aiChatResponse(messages) {
  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
