const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend (localhost:3000 and the deployed frontend)
const corsOptions = {
  origin: ['http://localhost:3000', 'https://ecomm-newfront.onrender.com'], // Allow both localhost and deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200,
};

// Enable CORS with the above options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
