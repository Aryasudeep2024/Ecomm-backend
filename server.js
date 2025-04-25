const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importing CORS package
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Updated CORS setup
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests from the frontend (localhost for dev)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Applying CORS middleware

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
