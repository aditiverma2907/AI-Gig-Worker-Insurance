require('dotenv').config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/smartshield',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY || 'mock-api-key',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_id',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret',
  MAIL_SERVICE: process.env.MAIL_SERVICE || 'gmail',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = config;
