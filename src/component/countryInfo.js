import React, { useState } from 'react';

function CountryInfo() {
  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState('');

  const fetchCountryData = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

      if (!response.ok) {
        throw new Error('Country not found');
      }
      const data = await response.json();
      const countryInfo = data[0]; 
      setCountryData({
        commonName: countryInfo.name.common,
        officialName: countryInfo.name.official,
        population: countryInfo.population.toLocaleString(),
        capitals: countryInfo.capital ? countryInfo.capital.join(', ') : 'N/A',
      });
      setError('');
    } catch (err) {
      setCountryData(null);
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country) {
      setError('Please enter some country name');
      return;
    }
    fetchCountryData(country);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCountry(inputValue);

    // Reset country data and error if input is cleared
    if (inputValue === '') {
      setCountryData(null);
      setError('');
    }
  };

  return (
    <div className="container">
      <h2>Country Information Finder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter country name"
          value={country}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {countryData && (
        <div className="country-info">
          <p><strong>Common Name:</strong> {countryData.commonName}</p>
          <p><strong>Official Name:</strong> {countryData.officialName}</p>
          <p><strong>Population:</strong> {countryData.population}</p>
          <p><strong>Capital(s):</strong> {countryData.capitals}</p>
        </div>
      )}
    </div>
  );
}

export default CountryInfo;