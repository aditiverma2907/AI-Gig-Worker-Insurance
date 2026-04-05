const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config');
const authRoutes = require('./routes/auth');
const policyRoutes = require('./routes/policy');
const claimRoutes = require('./routes/claim');
const { startTriggerEngine } = require('./services/parametricTrigger');

const app = express();
let mongoMemoryServer = null;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/claims', claimRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date().toISOString() });
});

// Test endpoint for triggering claims manually
app.post('/api/trigger-claims', (req, res) => {
  const { checkAndTriggerClaims } = require('./services/claimService');
  
  checkAndTriggerClaims()
    .then(() => {
      res.json({ message: 'Parametric trigger executed successfully' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error triggering claims', error: error.message });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: config.NODE_ENV === 'development' ? err : {}
  });
});

const startServer = async () => {
  try {
    try {
      await mongoose.connect(config.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      });
      console.log('MongoDB connected');
    } catch (connectionError) {
      console.warn(`MongoDB connection error: ${connectionError.message}`);
      console.warn('Starting in-memory MongoDB fallback for local development...');

      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri('smartshield');
      await mongoose.connect(memoryUri);

      console.log('In-memory MongoDB connected');
    }

    const PORT = config.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

      // Start parametric trigger engine only after DB is ready
      startTriggerEngine();
    });
  } catch (err) {
    console.error('Server startup failed:', err.message);
  }
};

const shutdown = async () => {
  try {
    await mongoose.connection.close();

    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
    }
  } catch (err) {
    console.error('Error during shutdown:', err.message);
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();

module.exports = app;
