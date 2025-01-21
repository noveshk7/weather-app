import React from 'react';
import { getCustomIconFilename } from '../utils/iconMapping';

function ForecastDisplay({ data, units }) {
  const convertTemp = (temp) => {
    return units.temp === 'C' ? temp : (temp * 9) / 5 + 32;
  };

  const convertSpeed = (speed) => {
    return units.speed === 'm/s' ? speed : speed * 3.6;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = formatDate(forecast.dt);
    if (!acc[date]) {
      acc[date] = forecast;
    }
    return acc;
  }, {});

  return (
    <div className="forecast-display glass-effect">
      <h3 style={{ color: 'var(--primary-color)' }}>5-Day Forecast</h3>
      <div className="forecast-list">
        {Object.entries(dailyForecasts).map(([date, forecast]) => (
          <div key={date} className="forecast-item" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="forecast-date" style={{ color: 'var(--text-color)' }}>{date}</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
              <img
                src={`/icons/${getCustomIconFilename(forecast.weather[0].icon)}`}
                alt={forecast.weather[0].description}
                style={{ display: 'block', width: '50px', height: '50px' }}
              />
            </div>
            <div className="forecast-temp" style={{ color: 'var(--primary-color)' }}>
              {Math.round(convertTemp(forecast.main.temp))}°{units.temp}
            </div>
            <div className="forecast-description" style={{ color: 'var(--text-color)' }}>{forecast.weather[0].description}</div>
            <div className="forecast-wind" style={{ color: 'var(--text-color)' }}>
              Wind: {Math.round(convertSpeed(forecast.wind.speed))} {units.speed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDisplay;

