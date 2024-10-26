const db = require("../models/weatherModel");
const { getWeatherData } = require("../services/weatherService");
const {
  convertTemperature,
  calculateDominantCondition,
} = require("../utils/dbUtils");

const processWeatherData = async () => {
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
  ];
  const weatherSummaries = [];

  for (const city of cities) {
    const weatherData = await getWeatherData(city);

    if (weatherData) {
      const tempCelsius = convertTemperature(weatherData.main.temp, "Celsius");
      const weatherCondition = weatherData.weather[0].main;
      const feelsLike = convertTemperature(
        weatherData.main.feels_like,
        "Celsius"
      );
      const Humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const pressure = weatherData.main.pressure;

      weatherSummaries.push({
        city: weatherData.name,
        temp: tempCelsius,
        Feels_Like: feelsLike,
        Condition: weatherCondition,
        Wind_Speed: windSpeed,
        Pressure: pressure,
        Humidity: Humidity,
        dt: weatherData.dt,
      });

      console.log(
        `City: ${city}, Temp: ${tempCelsius}, Feels Like: ${feelsLike}, Condition: ${weatherCondition}, Wind Speed: ${windSpeed} m/s, Pressure: ${pressure} hPa, Humidity:${Humidity}%`
      );
    }
  }

  // Perform daily rollups
  const currentDate = new Date().toISOString().split("T")[0];
  const aggregateData = rollUpDailyData(weatherSummaries);
  storeDailySummary(currentDate, aggregateData);
};

const rollUpDailyData = (weatherSummaries) => {
  let totalTemp = 0;
  let maxTemp = -Infinity;
  let minTemp = Infinity;
  const conditionFrequency = {};

  weatherSummaries.forEach((summary) => {
    totalTemp += summary.temp;
    maxTemp = Math.max(maxTemp, summary.temp);
    minTemp = Math.min(minTemp, summary.temp);

    // Track frequency of weather conditions
    if (!conditionFrequency[summary.weatherCondition]) {
      conditionFrequency[summary.weatherCondition] = 0;
    }
    conditionFrequency[summary.weatherCondition]++;
  });

  const avgTemp = totalTemp / weatherSummaries.length;
  const dominantCondition = calculateDominantCondition(conditionFrequency);

  return { avgTemp, maxTemp, minTemp, dominantCondition };
};

const storeDailySummary = (date, data) => {
  db.run(
    `INSERT INTO daily_summary (date, city, avg_temp, max_temp, min_temp, dominant_condition) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      date,
      "All Cities",
      data.avgTemp,
      data.maxTemp,
      data.minTemp,
      data.dominantCondition,
    ],
    (err) => {
      if (err) {
        console.error("Error storing daily summary:", err);
      } else {
        console.log("Daily summary stored successfully.");
      }
    }
  );
};

module.exports = { processWeatherData };
