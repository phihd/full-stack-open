import React from 'react'
import WeatherMap from './WeatherMap'

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area} km²</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img 
        alt={`${country.name.common} flag`} 
        src={country.flags.png}  
      />
      <WeatherMap city={country.capital} />
    </div>
  )
}

export default CountryData