import React from 'react';
import { getCustomIconFilename } from '../utils/iconMapping';
import { countries } from 'countries-list';

function WeatherDisplay({ data, units, toggleUnits, isFavorite, toggleFavorite }) {
  const {
    name,
    sys,
    weather,
    main,
    wind,
    clouds,
    visibility,
  } = data;

  const convertTemp = (temp) => {
    return units.temp === 'C' ? temp : (temp * 9) / 5 + 32;
  };

  const convertSpeed = (speed) => {
    return units.speed === 'm/s' ? speed : speed * 3.6;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get full country name from country code
  const getCountryName = (countryCode) => {
    return countries[countryCode]?.name || countryCode;
  };

  return (
    <div className="weather-display glass-effect">
      <h2 style={{ color: 'var(--primary-color)' }}>{name}, {getCountryName(sys.country)}</h2>
      <div className="weather-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={`/icons/${getCustomIconFilename(weather[0].icon)}`}
          alt={weather[0].description}
          style={{ display: 'block', margin: 'auto', width: '100px', height: '100px' }}
        />
      </div>
      <p className="weather-description" style={{ color: 'var(--text-color)' }}>{weather[0].description}</p>
      <div className="temperature">
        <span className="temp-value" style={{ color: 'var(--primary-color)' }}>{Math.round(convertTemp(main.temp))}°{units.temp}</span>
        <button className="unit-toggle" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)' }} onClick={() => toggleUnits('temp')}>
          °{units.temp === 'C' ? 'F' : 'C'}
        </button>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label" style={{ color: 'var(--text-color)' }}>Feels like:</span>
          <span className="detail-value" style={{ color: 'var(--text-color)' }}>{Math.round(convertTemp(main.feels_like))}°{units.temp}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label" style={{ color: 'var(--text-color)' }}>Humidity:</span>
          <span className="detail-value" style={{ color: 'var(--text-color)' }}>{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label" style={{ color: 'var(--text-color)' }}>Wind Speed:</span>
          <span className="detail-value" style={{ color: 'var(--text-color)' }}>
            {Math.round(convertSpeed(wind.speed))} {units.speed}
            <button className="unit-toggle small" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)' }} onClick={() => toggleUnits('speed')}>
              {units.speed === 'm/s' ? 'km/h' : 'm/s'}
            </button>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label" style={{ color: 'var(--text-color)' }}>Pressure:</span>
          <span className="detail-value" style={{ color: 'var(--text-color)' }}>{main.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label" style={{ color: 'var(--text-color)' }}>Visibility:</span>
          <span className="detail-value" style={{ color: 'var(--text-color)' }}>{visibility / 1000} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label" style={{ color: 'var(--text-color)' }}>Cloudiness:</span>
          <span className="detail-value" style={{ color: 'var(--text-color)' }}>{clouds.all}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label" style={{ color: 'var(--text-color)' }}>Sunrise:</span>
          <span className="detail-value" style={{ color: 'var(--text-color)' }}>{formatTime(sys.sunrise)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label" style={{ color: 'var(--text-color)' }}>Sunset:</span>
          <span className="detail-value" style={{ color: 'var(--text-color)' }}>{formatTime(sys.sunset)}</span>
        </div>
      </div>
      <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)' }} onClick={toggleFavorite}>
        {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
      </button>
    </div>
  );
}

export default WeatherDisplay;

