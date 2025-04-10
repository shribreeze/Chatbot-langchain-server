import { initializeAgent } from "../agents/chatAgent";
import { scrapeWebsiteContent } from "./scrapeService";
import { searchWeb } from "./searchService";

export const handleChatRequest = async (
    prompt: string,
    url?: string
  ): Promise<string> => {
    console.log("➡️ Received prompt:", prompt);
    const { model, tools } = await initializeAgent();
    console.log("🛠️ Tools loaded:", tools.map((t) => t.name));
  
    for (const tool of tools) {
      if (prompt.toLowerCase().includes(tool.name)) {
        console.log(`🔧 Using tool: ${tool.name}`);
        return await tool.call(prompt);
      }
    }
  
    let finalUrl = url;
    if (!finalUrl) {
      const searched = await searchWeb(prompt);
      console.log("🔍 Searched web URL:", searched);
      finalUrl = searched ?? undefined;
    }
  
    let context = "";
    if (finalUrl) {
      console.log("🌐 Scraping from:", finalUrl);
      context = await scrapeWebsiteContent(finalUrl);
      console.log("📄 Context length:", context.length);
    }
  
    const contextualPrompt = finalUrl
        ? `You are an intelligent, friendly AI assistant helping students. If the user asks a question related to studies, use the context provided below. If it is a casual chat like "hi" or "how are you", respond appropriately.

        Webpage URL: ${finalUrl}

        Context:
        ${context}

        Now, answer this:
        ${prompt}`
        : `You are a friendly and helpful AI assistant. If the user is asking about studies, explain clearly and simply. If it's a general conversation, respond politely and engagingly.

        User's message: ${prompt}`;
  
    console.log("🧠 Sending to model:", contextualPrompt.slice(0, 200));
  
    const result = await model.generateContent(contextualPrompt);

console.log("📦 Full model result:", result);

const text = result.response.text();
console.log("🤖 AI response text:", text);

return text;
  };
  