import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import contactRoutes from './routes/contactRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ──────────────────────────────────
// Middleware
// ──────────────────────────────────

// CORS — allow requests from the frontend
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Parse JSON request bodies
app.use(express.json({ limit: '10kb' }));

// Parse cookies (needed for Meta _fbc / _fbp CAPI signals)
app.use(cookieParser());

// Request logger (simple)
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path === '/') {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  }
  next();
});

// ──────────────────────────────────
// Routes
// ──────────────────────────────────

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'IntenPhoto API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/lead', leadRoutes);

// ──────────────────────────────────
// Error Handling
// ──────────────────────────────────

// 404 — Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
});

// ──────────────────────────────────
// Start Server
// ──────────────────────────────────

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║   🟢 IntenPhoto API Server          ║
  ║   Running on port ${PORT}              ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}     ║
  ╚══════════════════════════════════════╝
  `);
  console.log(`  📡 API:   http://localhost:${PORT}`);
  console.log(`  🌐 CORS:  ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log('');
});

export default app;
