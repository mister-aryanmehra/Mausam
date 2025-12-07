import React from "react";
import { WiDaySunny, WiRain, WiHumidity, WiSunrise, WiSunset, WiStrongWind } from 'react-icons/wi';

const Card = (props) => {
  const {
    name,
    localTime,
    temp_c,
    localDate1,
    temp_c1,
    localDate2,
    temp_c2,
    aqi_f,
    humidity,
    rain,
    feelsLike_c,
    sunRise,
    sunSet,
  } = props;

  // Function to get dynamic gradient based on temperature
  const getTemperatureGradient = (temp) => {
    if (temp < 0) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // Very cold - purple
    if (temp < 10) return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'; // Cold - cyan
    if (temp < 20) return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'; // Cool - green
    if (temp < 30) return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'; // Warm - pink/yellow
    return 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)'; // Hot - red/orange
  };

  // Function to get air quality status
  const getAQIStatus = (aqi) => {
    if (aqi === "N/A") return { text: "N/A", color: "#94a3b8" };
    const value = parseFloat(aqi);
    if (value <= 50) return { text: "Good", color: "#10b981" };
    if (value <= 100) return { text: "Moderate", color: "#f59e0b" };
    if (value <= 150) return { text: "Unhealthy", color: "#ef4444" };
    return { text: "Hazardous", color: "#991b1b" };
  };

  const aqiStatus = getAQIStatus(aqi_f);

  return (
    <div
      className="modern-card"
      style={{
        background: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {/* Temperature accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: getTemperatureGradient(temp_c),
        }}
      />

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: 0,
          marginBottom: '0.25rem',
          color: '#f8fafc',
          letterSpacing: '-0.02em'
        }}>
          {name}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#94a3b8',
          margin: 0
        }}>
          {localTime}
        </p>
      </div>

      {/* Temperature Display */}
      <div style={{
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          fontSize: '4rem',
          fontWeight: '700',
          background: getTemperatureGradient(temp_c),
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}>
          {temp_c}°
        </div>
        <div>
          <div style={{
            fontSize: '0.875rem',
            color: '#94a3b8',
            marginBottom: '0.25rem'
          }}>
            Feels like
          </div>
          <div style={{
            fontSize: '1.25rem',
            color: '#f8fafc',
            fontWeight: '600'
          }}>
            {feelsLike_c}°C
          </div>
        </div>
      </div>

      {/* Mini Forecast */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            {localDate1}
          </div>
          <div style={{ fontSize: '1.125rem', color: '#f8fafc', fontWeight: '600' }}>
            {temp_c1}°C
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            {localDate2}
          </div>
          <div style={{ fontSize: '1.125rem', color: '#f8fafc', fontWeight: '600' }}>
            {temp_c2}°C
          </div>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        marginBottom: '1rem',
        flexGrow: 1
      }}>
        {/* Humidity */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem',
          background: 'rgba(56, 189, 248, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(56, 189, 248, 0.2)'
        }}>
          <WiHumidity size={24} color="#38bdf8" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Humidity</div>
            <div style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: '600' }}>{humidity}%</div>
          </div>
        </div>

        {/* Rain Chance */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem',
          background: 'rgba(56, 189, 248, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(56, 189, 248, 0.2)'
        }}>
          <WiRain size={24} color="#38bdf8" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Rain</div>
            <div style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: '600' }}>{rain}%</div>
          </div>
        </div>

        {/* Air Quality */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <WiStrongWind size={24} color="#8b5cf6" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>AQI</div>
            <div style={{ fontSize: '0.875rem', color: aqiStatus.color, fontWeight: '600' }}>
              {aqiStatus.text}
            </div>
          </div>
        </div>

        {/* PM 2.5 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <WiStrongWind size={24} color="#8b5cf6" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>PM 2.5</div>
            <div style={{ fontSize: '0.875rem', color: '#f8fafc', fontWeight: '600' }}>
              {aqi_f}
            </div>
          </div>
        </div>
      </div>

      {/* Sun Times */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem',
        background: 'rgba(251, 191, 36, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(251, 191, 36, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <WiSunrise size={24} color="#fbbf24" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sunrise</div>
            <div style={{ fontSize: '0.875rem', color: '#f8fafc', fontWeight: '600' }}>{sunRise}</div>
          </div>
        </div>
        <div style={{ width: '1px', height: '2rem', background: 'rgba(255, 255, 255, 0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <WiSunset size={24} color="#fbbf24" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sunset</div>
            <div style={{ fontSize: '0.875rem', color: '#f8fafc', fontWeight: '600' }}>{sunSet}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
