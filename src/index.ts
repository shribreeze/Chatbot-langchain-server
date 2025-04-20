import express from 'express';
import chatbot from './routes/chatbot';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

app.use('/api/chatbot', chatbot);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
