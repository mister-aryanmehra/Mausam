import React, { useState, useEffect } from "react";
import Card from "./Card";
import Spinner from "./Spinning2"; // Assuming this is your spinner component

function Home() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [info, setInfo] = useState({
    current: [],
    forecast: [],
    astronomy: [],
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    setNavbarHeight(navbar.offsetHeight);
  }, []);

  useEffect(() => {
    const CityList = [
      "New Delhi",
      "New York",
      "London",
      "Dubai",
      "Sydney",
      "Tokyo",
      "Paris",
      "Shanghai",
      "Moscow",
    ];

    const fetchWeatherData = async (city) => {
      const url = `https://api.weatherapi.com/v1/current.json?key=e6d92c11c9384c31aba94149240109&q=${city}&aqi=yes`;
      return fetch(url).then((response) => response.json());
    };

    const promises = CityList.map((city) => fetchWeatherData(city));

    Promise.all(promises)
      .then((results) => {
        setInfo((prevInfo) => ({ ...prevInfo, current: results }));
        setLoading(false); // Stop loading after fetching
      })
      .catch((error) => console.error("Error fetching current data:", error));
  }, []);

  useEffect(() => {
    const CityList2 = [
      "New Delhi",
      "New York",
      "London",
      "Dubai",
      "Sydney",
      "Tokyo",
      "Paris",
      "Shanghai",
      "Moscow",
    ];

    const fetchWeatherData2 = async (city) => {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=e6d92c11c9384c31aba94149240109&q=${city}&days=4&aqi=yes&alerts=no`;
      return fetch(url).then((response) => response.json());
    };

    const promises = CityList2.map((city) => fetchWeatherData2(city));

    Promise.all(promises)
      .then((results) => {
        setInfo((prevInfo) => ({ ...prevInfo, forecast: results }));
        setLoading(false); // Stop loading after fetching
      })
      .catch((error) => console.error("Error fetching forecast data:", error));
  }, []);

  useEffect(() => {
    const CityList3 = [
      "New Delhi",
      "New York",
      "London",
      "Dubai",
      "Sydney",
      "Tokyo",
      "Paris",
      "Shanghai",
      "Moscow",
    ];

    const fetchWeatherData3 = async (city) => {
      const url = `https://api.weatherapi.com/v1/astronomy.json?key=e6d92c11c9384c31aba94149240109&q=${city}`;
      return fetch(url).then((response) => response.json());
    };

    const promises = CityList3.map((city) => fetchWeatherData3(city));

    Promise.all(promises)
      .then((results) => {
        setInfo((prevInfo) => ({ ...prevInfo, astronomy: results }));
        setLoading(false); // Stop loading after fetching
      })
      .catch((error) => console.error("Error fetching astronomy data:", error));
  }, []);

  function formatDateTime(dateString) {
    if (!dateString) {
      return "Invalid Date";
    }

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const [datePart, timePart] = dateString.split(" ");

    if (!datePart) {
      return "Invalid Date";
    }

    const [year, month, day] = datePart.split("-");

    if (!year || !month || !day) {
      return "Invalid Date";
    }

    const monthNumber = parseInt(month, 10);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return "Invalid Date";
    }

    const formattedDay = parseInt(day, 10);
    const formattedMonth = months[monthNumber - 1];

    if (!timePart) {
      return `${formattedMonth} ${formattedDay}`;
    }

    const [hours, minutes] = timePart.split(":");
    const formattedHours = hours.padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");

    return `${formattedMonth} ${formattedDay}, ${formattedHours}:${formattedMinutes}`;
  }

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1400px', margin: '0 auto' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Spinner />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #38bdf8, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Weather Around the World
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Real-time weather updates for major cities across the globe
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
            animation: 'fadeIn 0.6s ease-in-out'
          }}>
            {info.current.map((cityData, index) => (
              <div
                key={index}
                style={{
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <Card
                  name={cityData.location.name}
                  localTime={formatDateTime(cityData.location.localtime)}
                  temp_c={cityData.current.temp_c}
                  aqi_f={cityData.current.air_quality?.pm2_5 || "N/A"}
                  humidity={cityData.current.humidity}
                  rain={
                    info.forecast[index]?.forecast.forecastday[0]?.day
                      .daily_chance_of_rain || "0"
                  }
                  feelsLike_c={cityData.current.feelslike_c}
                  sunRise={info.astronomy[index]?.astronomy.astro.sunrise || ""}
                  sunSet={info.astronomy[index]?.astronomy.astro.sunset || ""}
                  localDate1={formatDateTime(
                    info.forecast[index]?.forecast.forecastday[1]?.date || ""
                  )}
                  temp_c1={
                    info.forecast[index]?.forecast.forecastday[1]?.day
                      .avgtemp_c || ""
                  }
                  localDate2={formatDateTime(
                    info.forecast[index]?.forecast.forecastday[2]?.date || ""
                  )}
                  temp_c2={
                    info.forecast[index]?.forecast.forecastday[2]?.day
                      .avgtemp_c || ""
                  }
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
