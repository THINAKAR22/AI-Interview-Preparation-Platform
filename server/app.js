const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Core Middleware ───────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'AI Interview API is running 🚀', timestamp: new Date().toISOString() });
});

// ─── API Routes ────────────────────────────────────────────────
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/answers',    require('./routes/answerRoutes'));
app.use('/api/interviews', require('./routes/interviewRoutes'));
app.use('/api/resumes',    require('./routes/resumeRoutes'));

// ─── Error Handling ────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
