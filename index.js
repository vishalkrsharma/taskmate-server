import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
  })
);
app.use(express.json());
connectDB();

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

app.get('/test', (req, res) => {
  res.send('ok');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server Port: 5000');
});
