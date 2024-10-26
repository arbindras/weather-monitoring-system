const nodemailer = require("nodemailer");
const { alertThreshold } = require("../config/config");

const checkAlerts = (temp, city) => {
  if (temp > alertThreshold) {
    console.log(
      `ALERT: Temperature in ${city} has exceeded ${alertThreshold}°C`
    );
    sendEmailAlert(city, temp);
  }
};

const sendEmailAlert = (city, temp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arbindrapatel0811@gmail.com",
      pass: "arbindra123",
    },
  });

  const mailOptions = {
    from: "arbindrapatel0811@gmail.com",
    to: "recipient_email@gmail.com",
    subject: `Weather Alert for ${city}`,
    text: `The temperature in ${city} has exceeded the threshold. Current temperature is ${temp}°C.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Alert email sent:", info.response);
    }
  });
};

module.exports = { checkAlerts };
