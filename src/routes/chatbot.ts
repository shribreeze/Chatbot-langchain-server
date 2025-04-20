import express, { Request, Response } from 'express';
import { handleChatRequest } from '../services/langchainService';

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    console.log("Incoming body:", req.body); 
    try {
      const { prompt, url, classLevel, subject, chapter, question } = req.body;
      const finalPrompt = `${question} ${prompt}`;
  
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required and must be a string' });
        return;
      }
  
      const response = await handleChatRequest(finalPrompt, url, classLevel, subject, chapter);
      res.json({ response });
    } catch (err) {
      console.error('Chatbot error:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  

export default router;
