const axios = require("axios");
const { apiKey, cities } = require("../config/config");

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    return null;
  }
};

module.exports = { getWeatherData };
