const iconMapping = {
    // Clear sky
    '01d': 'sunny',   // Day clear
    '01n': 'moon',    // Night clear

    // Few clouds
    '02d': 'partly-cloudy-day', // Day few clouds
    '02n': 'partly-cloudy-night', // Night few clouds

    // Scattered clouds
    '03d': 'cloudy-day',     // Day scattered clouds
    '03n': 'cloudy-night',     // Night scattered clouds

    // Broken clouds
    '04d': 'overcast',   // Day broken clouds
    '04n': 'overcast',   // Night broken clouds

    // Shower rain
    '09d': 'shower-day',     // Day shower rain
    '09n': 'shower-night',     // Night shower rain

    // Rain
    '10d': 'rainy-day',      // Day rain
    '10n': 'rainy-night',      // Night rain

    // Thunderstorm
    '11d': 'storm-day',     // Day thunderstorm
    '11n': 'storm-night',     // Night thunderstorm

    // Snow
    '13d': 'snowy-day',     // Day snow
    '13n': 'snowy-night',     // Night snow

    // Mist
    '50d': 'mist-day',      // Day mist
    '50n': 'mist-night',      // Night mist
};
  
  export function getCustomIconFilename(iconCode) {
    return `${iconMapping[iconCode] || 'cloudy'}.png`;
  }
  
  