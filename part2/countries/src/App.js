import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'
import Countries from './components/Countries'
const baseUrl = 'https://restcountries.com/v3.1/all'


const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => setCountries(response.data))
  }, [])

  const handleQueryChange = (event) => {
    const query = event.target.value
    setQuery(query)
    setCountriesToShow(
      countries.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase()))
    )
  }

  return (
    <div>
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
      </div>
      {countriesToShow.length === 1 ? (
        <CountryData country={countriesToShow[0]} />
      ) : countriesToShow.length <= 10 ? (
        <Countries
          countriesToShow={countriesToShow}
          setCountriesToShow={setCountriesToShow}
        />
      ) : (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  )
}

export default App;