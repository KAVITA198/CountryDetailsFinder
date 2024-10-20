import React, { useEffect, useState } from 'react';

function AllCountryDetails() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  const fetchAllCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');

      if (!response.ok) {
        throw new Error('Failed to fetch country data');
      }

      const data = await response.json();
      setCountries(data);
      setError('');
    } catch (err) {
      setCountries([]);
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  // Function to sort countries by common name
  const sortedCountries = countries.sort((a, b) => {
    const nameA = a.name.common.toLowerCase(); 
    const nameB = b.name.common.toLowerCase();
    if (nameA < nameB) return -1; 
    if (nameA > nameB) return 1;  
    return 0; 
  });

  return (
    <div className="all-country-details">
      {loading && <p>Loading country data...</p>} 
      {error && <p className="error">{error}</p>}
      {countries.length === 0 && !loading && <p>No countries found.</p>}
      {countries.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Common Name</th>
              <th>Official Name</th>
              <th>Population</th>
              <th>Capital(s)</th>
            </tr>
          </thead>
          <tbody>
            {sortedCountries.map((country) => (
              <tr key={country.cca3}> {/* Using country code as key */}
                <td>{country.name.common}</td>
                <td>{country.name.official}</td>
                <td>{country.population.toLocaleString()}</td>
                <td>{country.capital ? country.capital.join(', ') : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllCountryDetails;