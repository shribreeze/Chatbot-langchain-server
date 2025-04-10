import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../utils/env";
import { loadTools } from "../utils/loadTools";

export const initializeAgent = async () => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const tools = await loadTools();
  return { model, tools };
};
