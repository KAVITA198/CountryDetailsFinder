import React from 'react';
import CountryInfo from './countryInfo'; 
import AllCountryDetails from './allCountryDetails';

const AppContent = () => {
  return (
    <>
      <header className="navbar">
        <nav>
          <ul>
            <h1>Country Finder Info</h1>
            <li><a href="#home">Home</a></li>
            <li><a href="#all-country-details">All Country Details</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <div id="home" className="home-section">
        <CountryInfo />
      </div>

      <section id="all-country-details" className="section">
        <h2>All Country Details</h2>
        <AllCountryDetails />
      </section>

      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Email: countryfinder@info.in</p>
        <p>Phone: +123-456-7890</p>
      </section>
    </>
  );
}

export default AppContent;