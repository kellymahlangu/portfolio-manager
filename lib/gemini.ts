import { GoogleGenerativeAI } from "@google/generative-ai";

const token = process.env.GEMINI_API_TOKEN;
const geminiModel = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const genAI = token ? new GoogleGenerativeAI(token) : null;
export const model = genAI?.getGenerativeModel({ model: geminiModel });
