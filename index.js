import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';

import connectDB from './utils/db.js';
import taskRoutes from './routes/task-routes.js';
import authRoutes from './routes/auth-routes.js';
import userRoutes from './routes/user-routes.js';
import scratchpadRoutes from './routes/scratchpad-routes.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  },
});

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
app.use('/api/scratchpad', scratchpadRoutes);

app.get('/api/hello', (req, res) => {
  return res.send('Hello World!');
});

server.listen(process.env.PORT || 5000, () => {
  console.log('Server Port: 5000');
});

io.on('connection', (socket) => {
  console.log('user connected id: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected id: ' + socket.id);
  });

  socket.on('message', (message) => {
    socket.broadcast.emit('receive-message', message);
  });
});
