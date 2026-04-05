const axios = require('axios');

// Mock weather API integration
const fetchWeatherData = async (latitude, longitude) => {
  try {
    // In production, integrate with https://openweathermap.org/api
    const mockData = {
      latitude,
      longitude,
      temperature: 38 + Math.random() * 8,
      rainfall: Math.random() * 100,
      humidity: 60 + Math.random() * 30,
      windSpeed: 5 + Math.random() * 20,
      condition: ['sunny', 'rainy', 'stormy'][Math.floor(Math.random() * 3)]
    };
    return mockData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Get weather alerts for a location
const getWeatherAlerts = async (latitude, longitude, city) => {
  const weather = await fetchWeatherData(latitude, longitude);
  const alerts = [];

  if (weather.rainfall > 50) {
    alerts.push({
      type: 'Heavy_Rainfall',
      severity: 'warning',
      value: weather.rainfall
    });
  }

  if (weather.temperature > 42) {
    alerts.push({
      type: 'Extreme_Heat',
      severity: 'alert',
      value: weather.temperature
    });
  }

  if (weather.windSpeed > 40) {
    alerts.push({
      type: 'Strong_Winds',
      severity: 'warning',
      value: weather.windSpeed
    });
  }

  return alerts;
};

module.exports = {
  fetchWeatherData,
  getWeatherAlerts
};
