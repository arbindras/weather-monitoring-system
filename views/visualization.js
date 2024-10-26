const Chart = require("chart.js");
const db = require("../models/weatherModel");

const visualizeData = () => {
  db.all(`SELECT * FROM daily_summary`, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    const labels = rows.map((row) => row.date);
    const avgTemps = rows.map((row) => row.avg_temp);

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Average Temperature",
            data: avgTemps,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  });
};

module.exports = { visualizeData };
