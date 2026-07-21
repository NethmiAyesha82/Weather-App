import React from "react";

const HourlyWeatherItem = ({ hour }) => {
  return (
    <li className="weather-item">
      <p className="time">{hour.time.split(" ")[1]}</p>
      <img
        src={hour.condition.icon}
        className="weather-icon"
        alt="weather"
      />
      <p className="temperature">{hour.temp_c}°</p>
    </li>
  );
};

export default HourlyWeatherItem;
