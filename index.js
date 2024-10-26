const { processWeatherData } = require("./controllers/weatherController");
const { interval } = require("./config/config");

const startSystem = () => {
  processWeatherData();
  setInterval(processWeatherData, interval);
};

startSystem();
