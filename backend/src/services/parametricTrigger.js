const cron = require('node-cron');
const { checkAndTriggerClaims } = require('./claimService');
const config = require('../config/config');

// Run parametric trigger every 1 hour (you can adjust this)
// Format: minute hour day month dayOfWeek
const triggerCron = cron.schedule('0 * * * *', async () => {
  console.log('Running parametric trigger check at:', new Date().toISOString());
  
  try {
    await checkAndTriggerClaims();
    console.log('Parametric trigger check completed');
  } catch (error) {
    console.error('Error in parametric trigger:', error);
  }
});

// Alternative: Run every 5 minutes for demo purposes
const demoTriggerCron = cron.schedule('*/5 * * * *', async () => {
  if (config.NODE_ENV === 'development') {
    console.log('Running demo parametric trigger at:', new Date().toISOString());
    
    try {
      await checkAndTriggerClaims();
    } catch (error) {
      console.error('Error in demo trigger:', error);
    }
  }
});

const startTriggerEngine = () => {
  console.log('Parametric Trigger Engine Started');
  // Cron jobs are automatically started
};

const stopTriggerEngine = () => {
  triggerCron.stop();
  demoTriggerCron.stop();
  console.log('Parametric Trigger Engine Stopped');
};

module.exports = {
  startTriggerEngine,
  stopTriggerEngine,
  triggerCron
};
