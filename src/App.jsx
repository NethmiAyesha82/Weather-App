import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import NoResultsDiv from "./components/NoResultsDiv";

const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef = useRef(null);

  const getWeatherDetails = async (url) => {
    setHasNoResults(false);
    window.innerWidth <= 768 && searchInputRef.current.focus();

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("No results");

      const data = await response.json();
      const { location, current, forecast } = data;

      setCurrentWeather({
        location: location.name,
        temp: current.temp_c,
        description: current.condition.text,
        icon: current.condition.icon,
      });

      searchInputRef.current.value = location.name;
      setHourlyForecast(forecast.forecastday[0].hour);
    } catch (error) {
      setHasNoResults(true);
      console.log("Error fetching weather:", error);
    }
  };

  useEffect(()=>{
    const defaultCity = "London";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=1`;
    getWeatherDetails(API_URL);
  },[])

  return (
    <div className="container">
      <div className="weather-card">
        <SearchSection
          getWeatherDetails={getWeatherDetails}
          searchInputRef={searchInputRef}
        />

        {hasNoResults ? (
          <NoResultsDiv />
        ) : (
          <div className="weather-section">
            <CurrentWeather currentWeather={currentWeather} />

            {hourlyForecast.length > 0 && (
              <div className="hourly-forecast">
                <ul className="weather-list">
                  {hourlyForecast.slice(0, 6).map((hour, index) => (
                    <HourlyWeatherItem key={index} hour={hour} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
