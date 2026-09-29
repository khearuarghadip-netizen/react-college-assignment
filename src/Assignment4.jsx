import React, { useState, useEffect } from 'react';

export default function Assignment4() {
  const [city, setCity] = useState('Kolkata');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputCity, setInputCity] = useState('Kolkata');

  // Fetch worldwide weather data using Open-Meteo API
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError('');
    try {
      // 1. Worldwide Geocoding (India & All International locations)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName.trim())}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City or location not found. Please try another name.');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Fetch current weather data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        country: country || '',
        temp: weatherData.current_weather.temperature,
        windSpeed: weatherData.current_weather.windspeed,
        windDirection: weatherData.current_weather.winddirection,
        time: weatherData.current_weather.time
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Run on initial render or when target city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f1f5f9', minHeight: '85vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#44135b', margin: '0 0 6px 0' }}>Real-time Weather Dashboard</h2>
        <p style={{ color: '#59c1cd', margin: 0, fontSize: '14px' }}>Assignment 4: API Integration & useEffect</p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter any city/town (e.g. Kolkata, London, Delhi, Tokyo)..."
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            width: '280px',
            fontSize: '14px'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#0284c7',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Search
        </button>
      </form>

      {/* Status & Display Area */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {loading && <p style={{ fontSize: '16px', color: '#475569' }}>Fetching weather data...</p>}
        {error && <p style={{ fontSize: '15px', color: '#dc2626', fontWeight: 'bold' }}>{error}</p>}

        {!loading && !error && weather && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            textAlign: 'center',
            width: '320px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#0f172a' }}>{weather.city}</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '13px' }}>{weather.country}</p>

            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#0284c7', marginBottom: '15px' }}>
              {weather.temp}°C
            </div>

            <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '12px', textAlign: 'left', fontSize: '13px', color: '#334155' }}>
              <p style={{ margin: '6px 0' }}><strong>Wind Speed:</strong> {weather.windSpeed} km/h</p>
              <p style={{ margin: '6px 0' }}><strong>Wind Direction:</strong> {weather.windDirection}°</p>
              <p style={{ margin: '6px 0' }}><strong>Updated At:</strong> {weather.time}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}