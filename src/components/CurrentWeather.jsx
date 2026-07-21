import React from "react";

const CurrentWeather = ({ currentWeather }) => {
  return (
    <div className="current-weather">
      {currentWeather ? (
        <>
          <img
            src={currentWeather.icon}
            className="weather-icon"
            alt="weather"
          />
          <h2 className="temperature">
            {currentWeather.temp}
            <span>°C</span>
          </h2>
          <p className="description">{currentWeather.description}</p>
        </>
      ) : (
        <>
          <img
            src="icons/clouds.svg"
            className="weather-icon"
            alt="default"
          />
          <h2 className="temperature">°C</h2>
        </>
      )}
    </div>
  );
};

export default CurrentWeather;
