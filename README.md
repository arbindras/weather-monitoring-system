# Weather Monitoring System
# Table of Contents
Project Overview
Features
Folder Structure
Installation
Configuration
API Endpoints
Database
Testing
License

# Project Overview
The backend fetches real-time weather data from the OpenWeatherMap API at regular intervals for major Indian cities (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad). It performs data rollups and aggregates daily summaries for each city, including:

Average, minimum, and maximum temperatures.
Dominant weather condition.
Alerts for exceeding configurable thresholds.
This backend can also trigger alerts when user-defined thresholds are breached (e.g., temperature exceeds 35°C for two consecutive updates).

# Features
Weather Data Fetching: Periodically retrieves weather data from OpenWeatherMap.
Data Rollups and Aggregates: Calculates daily averages, maximums, minimums, and dominant weather conditions.
Alert System: Notifies when specific thresholds are exceeded, such as high temperatures.
Data Persistence: Stores daily summaries in a database for further analysis.
Configurable Fetch Intervals: Easily adjust the interval for API calls to OpenWeatherMap.

# Folder Structure
/weather-monitoring-system
│
├── /config              # Configuration files (API key, thresholds, etc.)
│   └── config.js        # API configuration and thresholds
├── /controllers         # Controllers for handling routes and business logic
│   ├── weatherController.js
│   └── alertController.js
├── /services            # Services to handle API requests and processing
│   ├── weatherService.js
│   └── alertService.js
├── /models              # Database models for weather data and summaries
│   └── WeatherSummary.js
├── /routes              # API route definitions
│   └── weatherRoutes.js
├── /utils               # Utility functions (e.g., temperature conversion)
│   └── utils.js
├── /tests               # Unit and integration tests
│   ├── weatherService.test.js
│   └── alertService.test.js
├── .env                 # Environment variables (e.g., API keys)
├── app.js               # Entry point of the application
└── package.json         # Project dependencies and scripts

# Installation
Prerequisites
Node.js (v14.x or higher)
MongoDB (for data storage)
OpenWeatherMap API Key (sign up here)
# Steps to Install
1. Clone the repository:
   git clone https://github.com/yourusername/weather-monitoring-backend.git
   cd weather-monitoring-backend
2. Install dependencies:
   npm install
3. Create a .env file in the root directory and add your OpenWeatherMap API key and MongoDB connection string:
   API_KEY=your_openweathermap_api_key
4. Run the server
    npm start
   The server will start on port 3000 by default.
# Configuration
API Key: Set your OpenWeatherMap API key in the .env file.
Fetch Interval: You can configure the fetch interval for the weather data in config/config.js.
Alert Thresholds: Set the alert thresholds (e.g., max temperature) in config/config.js.
Example configuration in config/config.js:
module.exports = {
  openWeatherMap: {
    apiKey: process.env.API_KEY,
    cities: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'],
    fetchInterval: 300000, // Fetch data every 5 minutes
  },
  thresholds: {
    maxTemperature: 35, // Alert if temperature exceeds 35°C
  },
};
