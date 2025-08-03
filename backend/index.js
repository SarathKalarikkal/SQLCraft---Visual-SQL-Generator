import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/sqlRoutes.js';
import logger from './logger.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// HTTP request logging via Morgan, sent to Winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use('/api', router);

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
