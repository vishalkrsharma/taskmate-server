const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

app.get('/test', (req, res) => {
  res.send('ok');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server Port: 5000');
});
