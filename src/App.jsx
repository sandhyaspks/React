<<<<<<< HEAD
import React, { useState } from 'react';
import './App.css';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // Predefined list of Indian cities with their IDs and names
  const cities = [
    { name: 'New Delhi', id: 1269515 },
    { name: 'Mumbai', id: 1275339 },
    { name: 'Bengaluru', id: 1277333 },
    { name: 'Chennai', id: 1269516 },
    { name: 'Kolkata', id: 1275004 },
    { name: 'Hyderabad', id: 1269511 },
    { name: 'Pune', id: 1269518 },
    { name: 'Jaipur', id: 1279261 },
    { name: 'Ahmedabad', id: 1269510 },
    { name: 'Surat', id: 1275835 },
  ];

  const fetchWeather = async (cityId, cityName) => {
    setError('');
    setWeather(null);
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=8776970c88268c270d76dcc4f790972b`
      );

      // If the city ID doesn't work, try fetching by city name
      if (!response.ok) {
        throw new Error('City not found by ID');
      }

      let data = await response.json();
      setWeather({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (err) {
      // Fallback to city name if ID lookup fails
      try {
        const responseByName = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=8776970c88268c270d76dcc4f790972b`
        );
        if (!responseByName.ok) {
          throw new Error('City not found by name');
        }
        const data = await responseByName.json();
        setWeather({
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      } catch (err) {
        setError('City not found');
      }
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <h2>Click a city to see its weather</h2>
      <ul className="city-list">
        {cities.map((city) => (
          <li
            key={city.id}
            onClick={() => fetchWeather(city.id, city.name)}
            className="city-item"
          >
            {city.name}
          </li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-details">
          <h2>Weather in {weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Description: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
        </div>
      )}
=======
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const MagicalTimerAndInputBox = () => {
  const [timer, setTimer] = useState(10); // Timer starts at 10 seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [message, setMessage] = useState('');
  
  const inputRef = useRef(null); // Ref for input box
  const timerRef = useRef(null); // Ref for storing the timer ID

  // Effect to automatically focus on the input box when the page loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Start Timer
  const startTimer = () => {
    if (isTimerActive) return; // Don't start a new timer if one is already running
    setIsTimerActive(true);
    
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerRef.current);
          setIsTimerActive(false);
          setMessage("Time's Up!");
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Stop Timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerActive(false);
    setMessage(''); // Clear any message if stopped manually
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerActive(false);
    setTimer(10); // Reset the timer to 10 seconds
    setMessage(''); // Clear any message
  };

  // Refocus input box
  const focusInputBox = () => {
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h1>Magical Timer and Input Box</h1>
      <div className="input-box">
        <input 
          type="text" 
          ref={inputRef} 
          placeholder="Type here..." 
        />
        <button onClick={focusInputBox}>Focus Box</button>
      </div>

      <div className="timer">
        <h2>Countdown Timer: {timer}s</h2>
        {message && <p className="message">{message}</p>}
        <button onClick={startTimer} disabled={isTimerActive}>Start Timer</button>
        <button onClick={stopTimer} disabled={!isTimerActive}>Stop Timer</button>
        <button onClick={resetTimer}>Reset Timer</button>
      </div>
>>>>>>> b9958e05a3d41fe2159246a936f175b19cbf3168
    </div>
  );
};

<<<<<<< HEAD
export default WeatherApp;
=======
export default MagicalTimerAndInputBox;
>>>>>>> b9958e05a3d41fe2159246a936f175b19cbf3168
