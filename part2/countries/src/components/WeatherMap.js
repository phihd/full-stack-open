import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const WeatherMap = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
      .then(response => setWeather(response.data))
  }, [])



  return (
    weather? (
      <div>
        <h2>Weather in {city}</h2>
        <div>Temperature {weather.main.temp} Celsius</div>
        <img
          alt="weather icon"
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <div>Wind {weather.wind.speed} m/s</div>
      </div>
    ) : null
  )
}

export default WeatherMap