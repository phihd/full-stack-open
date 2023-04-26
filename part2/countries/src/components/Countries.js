import React from 'react'

const Countries = ({ countriesToShow, setCountriesToShow }) => {
    if (countriesToShow.length === 1) {
      return null
    }
  
    const renderCountries = () => {
      return countriesToShow.map((country) => (
        <div key={country.name.official}>
          {country.name.common}{" "}
          <button onClick={() => setCountriesToShow([country])}>show</button>
        </div>
      ));
    };
  
    return (
      <div>
        {renderCountries()}
      </div>
    );
  };
  
  export default Countries