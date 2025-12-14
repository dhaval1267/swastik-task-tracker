console.log('🚀 Starting...');
require('dotenv').config();
console.log('PORT:', process.env.PORT ? '✅' : '❌');
console.log('MONGODB:', !!process.env.MONGODB_URI ? '✅' : '❌');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));

// Root route
app.get('/', (req, res) => {
  res.send('Swastik Task API Working!');
});

// Task model (inline schema)
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignee: String,
  status: { type: String, default: 'Pending' },
  priority: String,
  start_date: String,
  due_date: String,
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// GET /api/tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/tasks
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 http://localhost:5000');
});
