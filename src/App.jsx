import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import './App.css';

const API_KEY = '7aac9a6c9f5fa5076541ffc748f40bf7';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [units, setUnits] = useState({ temp: 'C', speed: 'm/s' });

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('City not found');
      }

      const [weatherData, forecastData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json()
      ]);

      setWeatherData(weatherData);
      setForecastData(forecastData);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity) => {
    fetchWeatherData(searchCity);
  };

  const toggleFavorite = (cityName) => {
    const updatedFavorites = favorites.includes(cityName)
      ? favorites.filter((fav) => fav !== cityName)
      : [...favorites, cityName];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleUnits = (type) => {
    if (type === 'temp') {
      setUnits({ ...units, temp: units.temp === 'C' ? 'F' : 'C' });
    } else if (type === 'speed') {
      setUnits({ ...units, speed: units.speed === 'm/s' ? 'km/h' : 'm/s' });
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="main-container">
        <div className="search-container glass-effect">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(city)}
          />
          <button onClick={() => handleSearch(city)}>Search</button>
        </div>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {weatherData && forecastData && (
          <div className="weather-forecast-container">
            <WeatherDisplay
              data={weatherData}
              units={units}
              toggleUnits={toggleUnits}
              isFavorite={favorites.includes(weatherData.name)}
              toggleFavorite={() => toggleFavorite(weatherData.name)}
            />
            <ForecastDisplay data={forecastData} units={units} />
          </div>
        )}
        <div className="favorites glass-effect">
          <h3>Favorite Cities</h3>
          <ul className="favorites-list">
            {favorites.map((fav) => (
              <li key={fav} onClick={() => handleSearch(fav)}>
                {fav}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

