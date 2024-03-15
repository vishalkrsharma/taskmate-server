import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user-routes.js';
import taskRoutes from './routes/task-routes.js';
import authRoutes from './routes/auth-routes.js';
import connectDB from './utils/db.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/test', (req, res) => {
  res.send('ok');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server Port: 5000');
});
