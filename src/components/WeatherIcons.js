import React from 'react';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiRain,
  WiDayRain,
  WiNightAltRain,
  WiThunderstorm,
  WiSnow,
  WiFog
} from 'react-icons/wi';

const WeatherIcon = ({ code, isDay, size = 40, color = 'white' }) => {
  // WeatherAPI condition codes mapping
  // https://www.weatherapi.com/docs/weather_conditions.json

  const getIcon = () => {
    switch (code) {
      case 1000: // Sunny / Clear
        return isDay ? <WiDaySunny size={size} color={color} /> : <WiNightClear size={size} color={color} />;
      case 1003: // Partly cloudy
        return isDay ? <WiDayCloudy size={size} color={color} /> : <WiNightAltCloudy size={size} color={color} />;
      case 1006: // Cloudy
      case 1009: // Overcast
        return <WiCloud size={size} color={color} />;
      case 1030: // Mist
      case 1135: // Fog
      case 1147: // Freezing fog
        return <WiFog size={size} color={color} />;
      case 1063: // Patchy rain possible
      case 1180: // Patchy light rain
      case 1183: // Light rain
      case 1240: // Light rain shower
        return isDay ? <WiDayRain size={size} color={color} /> : <WiNightAltRain size={size} color={color} />;
      case 1186: // Moderate rain at times
      case 1189: // Moderate rain
      case 1192: // Heavy rain at times
      case 1195: // Heavy rain
      case 1243: // Moderate or heavy rain shower
        return <WiRain size={size} color={color} />;
      case 1087: // Thundery outbreaks possible
      case 1273: // Patchy light rain with thunder
      case 1276: // Moderate or heavy rain with thunder
        return <WiThunderstorm size={size} color={color} />;
      case 1066: // Patchy snow possible
      case 1114: // Blowing snow
      case 1210: // Patchy light snow
      case 1213: // Light snow
      case 1219: // Moderate snow
      case 1225: // Heavy snow
      case 1255: // Light snow showers
      case 1258: // Moderate or heavy snow showers
        return <WiSnow size={size} color={color} />;
      default:
        return isDay ? <WiDaySunny size={size} color={color} /> : <WiNightClear size={size} color={color} />;
    }
  };

  return (
    <div className="weather-icon">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
