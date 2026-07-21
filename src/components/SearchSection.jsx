import React from "react";

const SearchSection = ({ getWeatherDetails, searchInputRef }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleCitySearch = (e) => {
    e.preventDefault();

    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInputRef.current.value}&days=1`;
    getWeatherDetails(API_URL);
  };

  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=1`;
        getWeatherDetails(API_URL);
        window.innerWidth >= 768 && searchInputRef.current.focus();
      },
      (error) => {
        console.log("Location error:", error);
      }
    );
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded">search</span>
        <input
          type="search"
          name="city"
          placeholder="Enter a City Name"
          ref={searchInputRef}
          className="search-input"
          required
        />
      </form>

      <button
        className="location-button"
        type="button"
        onClick={handleLocationSearch}
      >
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};

export default SearchSection;
