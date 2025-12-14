const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Swastik Task API' });
});

const start = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log('API running on http://localhost:' + port);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

start();
