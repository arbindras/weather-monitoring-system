const convertTemperature = (tempKelvin, unit = "Celsius") => {
  if (unit === "Celsius") {
    return tempKelvin - 273.15;
  } else if (unit === "Fahrenheit") {
    return ((tempKelvin - 273.15) * 9) / 5 + 32;
  }
  return tempKelvin;
};

const calculateDominantCondition = (conditionFrequency) => {
  return Object.keys(conditionFrequency).reduce((a, b) =>
    conditionFrequency[a] > conditionFrequency[b] ? a : b
  );
};

module.exports = { convertTemperature, calculateDominantCondition };
