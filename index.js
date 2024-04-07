import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import connectDB from './utils/db.js';
import taskRoutes from './routes/task-routes.js';
import authRoutes from './routes/auth-routes.js';
import userRoutes from './routes/user-routes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/api/hello', (req, res) => {
  return res.send('Hello World!');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server Port: 5000');
});
