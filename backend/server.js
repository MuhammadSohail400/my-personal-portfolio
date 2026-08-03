const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Start Server
const server = app.listen(PORT, () => {
  console.log(`[Express Backend] Server running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
  console.log(`[Express Backend] Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`[Express Backend] Contact endpoint: http://localhost:${PORT}/api/contact`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection]: ${err.message}`);
});
