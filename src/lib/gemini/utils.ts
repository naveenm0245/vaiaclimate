import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";

export const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
});

export const visionModel = new ChatGoogleGenerativeAI({
  model: "gemini-pro-vision",
  maxOutputTokens: 2048,
});

export const modelGoogleGenAI = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY as string,
  modelName: "embedding-001",
});
