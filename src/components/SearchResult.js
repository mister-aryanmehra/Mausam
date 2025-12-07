import React, { useState, useEffect } from "react";
import Spinner from './Spinning2.js';
import WeatherIcon from "./WeatherIcons";
import { WiHumidity, WiStrongWind, WiRain, WiSunrise, WiSunset, WiBarometer } from 'react-icons/wi';
import { FiWind } from 'react-icons/fi';

function SearchResult({ query }) {
  const [info, setInfo] = useState({
    current: null,
    astronomy: null,
    forecast: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          setLoading(true);

          const currentUrl = `https://api.weatherapi.com/v1/current.json?key=e6d92c11c9384c31aba94149240109&q=${query}&aqi=yes`;
          const astronomyUrl = `https://api.weatherapi.com/v1/astronomy.json?key=e6d92c11c9384c31aba94149240109&q=${query}`;
          const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=e6d92c11c9384c31aba94149240109&q=${query}&days=7&aqi=yes&alerts=no`;

          const [currentResponse, astronomyResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(astronomyUrl),
            fetch(forecastUrl),
          ]);

          const [currentData, astronomyData, forecastData] = await Promise.all([
            currentResponse.json(),
            astronomyResponse.json(),
            forecastResponse.json(),
          ]);

          setInfo({
            current: currentData,
            astronomy: astronomyData,
            forecast: forecastData,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spinner />
      </div>
    );
  }

  // Comprehensive validation
  if (!info.current || !info.astronomy || !info.forecast) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
        <h2>Data is not available at the moment.</h2>
      </div>
    );
  }

  const { current, forecast, astronomy } = info;

  if (!current.location || !current.current ||
    !forecast.forecast || !forecast.forecast.forecastday || !forecast.forecast.forecastday[0] ||
    !astronomy.astronomy || !astronomy.astronomy.astro) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
        <h2>Weather data is incomplete.</h2>
      </div>
    );
  }

  const location = current.location;
  const forecastDays = forecast.forecast.forecastday;
  const todayForecast = forecastDays[0];

  const getTempGradient = (temp) => {
    if (temp < 0) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    if (temp < 10) return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    if (temp < 20) return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    if (temp < 30) return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
    return 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)';
  };

  const getAQIStatus = (aqi) => {
    const value = aqi || 0;
    if (value <= 50) return { text: "Good", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" };
    if (value <= 100) return { text: "Moderate", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" };
    if (value <= 150) return { text: "Unhealthy", color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" };
    return { text: "Hazardous", color: "#991b1b", bg: "rgba(153, 27, 27, 0.1)" };
  };

  const aqiStatus = getAQIStatus(current.current.air_quality?.pm2_5);

  const hourlyData = (todayForecast.hour || []).filter((hour) => {
    if (!hour || !hour.time) return false;
    const hourTime = new Date(hour.time);
    const currentTime = new Date(current.location.localtime);
    return hourTime >= currentTime;
  }).slice(0, 12);

  return (
    <div style={{
      padding: '2rem 1rem',
      maxWidth: '1400px',
      margin: '0 auto',
      animation: 'fadeIn 0.6s ease-out'
    }}>
      {/* Hero Section */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(30, 41, 59, 0.7))',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: getTempGradient(current.current.temp_c)
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
          <div>
            <h1 className="text-huge" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {location.name}, {location.country}
            </h1>
            <p className="text-secondary" style={{ marginBottom: '0.5rem' }}>
              {new Date(location.localtime).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-secondary">
              {new Date(location.localtime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <WeatherIcon
              code={current.current.condition?.code || 1000}
              isDay={current.current.is_day}
              size={100}
              color="var(--accent-color)"
            />
            <div>
              <div style={{
                fontSize: '5rem',
                fontWeight: '700',
                background: getTempGradient(current.current.temp_c),
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1
              }}>
                {Math.round(current.current.temp_c)}°
              </div>
              <div className="text-large text-accent">
                {current.current.condition?.text || "N/A"}
              </div>
              <div className="text-secondary">
                Feels like {Math.round(current.current.feelslike_c)}°C
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Humidity */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="text-secondary">Humidity</span>
            <WiHumidity size={32} color="#38bdf8" />
          </div>
          <div className="text-huge" style={{ fontSize: '2.5rem' }}>{current.current.humidity}%</div>
          <div style={{
            marginTop: '1rem',
            background: 'rgba(56, 189, 248, 0.1)',
            height: '6px',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${current.current.humidity}%`,
              height: '100%',
              background: '#38bdf8',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* Wind */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="text-secondary">Wind Speed</span>
            <WiStrongWind size={32} color="#8b5cf6" />
          </div>
          <div className="text-huge" style={{ fontSize: '2.5rem' }}>{current.current.wind_kph}</div>
          <div className="text-secondary">km/h {current.current.wind_dir}</div>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiWind color="#8b5cf6" />
            <span className="text-small text-secondary">Gusts: {current.current.gust_kph} km/h</span>
          </div>
        </div>

        {/* Pressure */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="text-secondary">Pressure</span>
            <WiBarometer size={32} color="#fbbf24" />
          </div>
          <div className="text-huge" style={{ fontSize: '2.5rem' }}>{current.current.pressure_mb}</div>
          <div className="text-secondary">mb</div>
        </div>

        {/* Air Quality */}
        <div className="glass-card" style={{ padding: '1.5rem', background: aqiStatus.bg }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="text-secondary">Air Quality</span>
            <div style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              background: aqiStatus.color,
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {aqiStatus.text}
            </div>
          </div>
          <div className="text-huge" style={{ fontSize: '2.5rem', color: aqiStatus.color }}>
            {Math.round(current.current.air_quality?.pm2_5 || 0)}
          </div>
          <div className="text-secondary">PM2.5 μg/m³</div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h2 className="text-large text-accent" style={{ marginBottom: '1.5rem' }}>7-Day Forecast</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem'
        }}>
          {forecastDays.map((day, index) => {
            if (!day || !day.day) return null;
            const date = new Date(day.date);
            const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });

            return (
              <div key={index} style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="text-secondary" style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  {dayName}
                </div>
                <WeatherIcon
                  code={day.day.condition?.code || 1000}
                  isDay={1}
                  size={48}
                  color="var(--accent-color)"
                />
                <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                    {Math.round(day.day.maxtemp_c)}°
                  </span>
                  <span className="text-secondary">
                    {Math.round(day.day.mintemp_c)}°
                  </span>
                </div>
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                  <WiRain size={16} color="#38bdf8" />
                  <span className="text-small text-secondary">{day.day.daily_chance_of_rain}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h2 className="text-large text-accent" style={{ marginBottom: '1.5rem' }}>Hourly Forecast</h2>
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '1rem',
          paddingBottom: '1rem'
        }}>
          {hourlyData.map((hour, index) => {
            const hourTime = new Date(hour.time);
            return (
              <div key={index} style={{
                minWidth: '100px',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center'
              }}>
                <div className="text-secondary" style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                  {hourTime.getHours()}:00
                </div>
                <WeatherIcon
                  code={hour.condition?.code || 1000}
                  isDay={hour.is_day}
                  size={40}
                />
                <div style={{ marginTop: '0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
                  {Math.round(hour.temp_c)}°
                </div>
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                  <WiRain size={16} color="#38bdf8" />
                  <span className="text-small text-secondary">{hour.chance_of_rain}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sun & Moon */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(30, 41, 59, 0.7))'
      }}>
        <h2 className="text-large text-accent" style={{ marginBottom: '1.5rem' }}>Sun & Moon</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <WiSunrise size={48} color="#fbbf24" />
            <div>
              <div className="text-secondary">Sunrise</div>
              <div className="text-large">{astronomy.astronomy.astro.sunrise}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <WiSunset size={48} color="#fbbf24" />
            <div>
              <div className="text-secondary">Sunset</div>
              <div className="text-large">{astronomy.astronomy.astro.sunset}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '3rem' }}>🌙</div>
            <div>
              <div className="text-secondary">Moon Phase</div>
              <div className="text-large">{astronomy.astronomy.astro.moon_phase}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
