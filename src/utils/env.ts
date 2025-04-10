import dotenv from 'dotenv';
dotenv.config();

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY || '';
