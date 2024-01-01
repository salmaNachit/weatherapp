import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import searchIcon from './images/search.png';
import rainIcon from './images/rain.png';
import humidityIcon from './images/humidity.png';
import windIcon from './images/wind.png';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('New York'); // Default city

    const apiKey = 'f64af3a3043ffaca808f2321197567d1';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                console.error('Error fetching weather data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [city]); // Fetch data when city changes

    const handleSearch = () => {
        const input = document.querySelector('.search input');
        if (input) {
            setCity(input.value);
            input.value = ''; // Clear input after search
        }
    };

    return (
        <div>
            <div className="card">
                <div className="search">
                    <input type="text" placeholder="Enter city name" spellCheck="false" />
                    <button onClick={handleSearch}>
                        <img src={searchIcon} alt="Search" />
                    </button>
                </div>

                <div className="weather">
                    {weatherData && (
                        <>
                            <img src={rainIcon} className="weather-icon" alt="Weather Icon" />
                            <h1 className="temp">{weatherData.main.temp}°C</h1>
                            <h2 className="city">{weatherData.name}</h2>
                            <div className="details">
                                <div className="col">
                                    <img src={humidityIcon} alt="Humidity Icon" />
                                    <div>
                                        <p className="humidity">{weatherData.main.humidity}%</p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src={windIcon} alt="Wind Icon" />
                                    <div>
                                        <p className="wind">{weatherData.wind.speed} km/h</p>
                                        <p>Wind Speed</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
