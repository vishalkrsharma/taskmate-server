const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

app.listen(5000, () => {
  console.log('Server Port: 5000');
});
